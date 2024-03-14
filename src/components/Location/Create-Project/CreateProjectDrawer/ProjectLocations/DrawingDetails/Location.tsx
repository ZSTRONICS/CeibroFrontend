import { Box, Grid } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS, taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import { useHistory, useParams } from "react-router-dom";
import LocationDrawingFiles from "./Components/DrawingComp/LocationDrawingFiles";
import { ExpandableProjectList } from "./Components/ProjectComponents";
function Location() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams<any>();
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const { allProjects, allGroups, allFloors, isProjectsLoading } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (isRenderEffect.current && allProjects.length === 0) {
      isRenderEffect.current = false;
      dispatch(PROJECT_APIS.getAllProjects());
      dispatch(taskActions.getAllTasksAllEvents());
    } else {
      allProjects?.length > 0 &&
        history.push(`/location/${allProjects[0]._id}`);
    }
  }, [allProjects]);
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
          <LocationDrawingFiles windowActualHeight={windowActualHeight} />
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
        <Heading2 sx={{ fontWeight: 500 }}>No drawing selected</Heading2>
        {/* <DocumentReader /> */}
      </Grid>
    </Grid>
  );
}

export default Location;
