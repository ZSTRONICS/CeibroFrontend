import { Box, CircularProgress, Grid } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS, docsAction, taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT, isValidURL } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import DeepZoomImgViewer from "components/pdfviewer/Components/DocumentViewer/DeepZoomImgViewer";
import { Drawing } from "constants/interfaces";
import { useHistory, useParams } from "react-router-dom";
import LocationDrawingFiles from "./Components/DrawingComp/LocationDrawingFiles";
import { ExpandableProjectList } from "./Components/ProjectComponents";
function Location() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId, groupId } = useParams<any>();
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const [isFileSelect, setIsFileSelect] = useState(false);
  const {
    allProjects,
    allGroups,
    allFloors,
    isProjectsLoading,
    loadingFilePreview,
    updatedDrawingPreview,
    selectedDrawingFiles,
  } = useSelector((state: RootState) => state.project);

  const sortProjects = (projects: Project[]): Project[] => {
    return projects.sort((a, b) => {
      if (a.isFavoriteByMe !== b.isFavoriteByMe) {
        return a.isFavoriteByMe ? -1 : 1;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  };

  const sortedProjects = sortProjects(allProjects);

  useEffect(() => {
    if (isRenderEffect.current && allProjects.length === 0) {
      isRenderEffect.current = false;
      dispatch(PROJECT_APIS.getAllProjects());
      dispatch(taskActions.getAllTasksAllEvents());
    } else if (!projectId) {
      sortedProjects?.length > 0 &&
        history.push(`/location/${sortedProjects[0]._id}`);
    }
    setIsFileSelect(false);
  }, [allProjects.length]);
  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  const sideBarStyle = {
    borderRadius: "4px",
    background: "#FFF",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    height: `${windowActualHeight}px`,
  };
  const emptyDrawingContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E5E5E5",
  };
  const handleFilePreview = (drawing: Drawing) => {
    dispatch(
      docsAction.getDrawingFileDZIUrls({
        other: drawing._id,
      })
    );
    setIsFileSelect(true);
  };

  return (
    <Grid
      container
      gap={1.8}
      sx={{ width: "98%", margin: "auto", flexWrap: "nowrap" }}
    >
      <Grid
        item
        md={4.2}
        lg={3.4}
        xl={3}
        sx={{
          ...sideBarStyle,
          px: 2,
          py: 1.5,
        }}
      >
        <ExpandableProjectList
          isProjectsLoading={isProjectsLoading}
          windowActualHeight={windowActualHeight}
          allProjects={allProjects}
          groups={allGroups}
          allFloors={allFloors}
        />
      </Grid>
      <Grid
        item
        md={4.7}
        lg={3.9}
        xl={3}
        sx={{
          ...sideBarStyle,
          ...(!groupId ? emptyDrawingContainer : {}),
          px: 2,
          py: 1.5,
        }}
      >
        {groupId ? (
          <LocationDrawingFiles
            windowActualHeight={windowActualHeight}
            handleFilePreview={handleFilePreview}
          />
        ) : (
          <Box>
            <Heading2 sx={{ fontWeight: 500 }}>
              Click group to see drawing files in it
            </Heading2>
          </Box>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent={"center"}
        alignItems={"center"}
        md={3.1}
        lg={4.7}
        xl={5.8}
        sx={{
          ...sideBarStyle,
          background:
            "linear-gradient(0deg, #E5E5E5 0%, #E5E5E5 100%), url(<path-to-image>), lightgray 50% / cover no-repeat",
        }}
      >
        {selectedDrawingFiles.length === 0 ? (
          <Heading2 sx={{ fontWeight: 500 }}>
            No drawing selected for preview
          </Heading2>
        ) : loadingFilePreview ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={40} />
          </Box>
        ) : isFileSelect && isValidURL(updatedDrawingPreview?.dziFileURL) ? (
          <DeepZoomImgViewer selectedDrawing={updatedDrawingPreview} />
        ) : (
          <Heading2 sx={{ fontWeight: 500 }}>
            Unable to load file preview
          </Heading2>
        )}
      </Grid>
    </Grid>
  );
}

export default Location;
