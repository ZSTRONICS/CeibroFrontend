import { Box, Grid } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import { useParams } from "react-router-dom";
import LocationDrawingFiles from "./Components/DrawingComp/LocationDrawingFiles";
import { ExpandableProjectList } from "./Components/ProjectComponents";
function Location() {
  const dispatch = useDispatch();
  const { groupId } = useParams<any>();
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const { allProjects, allGroups, allFloors } = useSelector(
    (state: RootState) => state.project
  );
  // const task = useSelector((state: RootState) => state.task);
  // const { allTaskToMe } = task;
  // console.log("windowHeight", windowHeight);
  useEffect(() => {
    if (isRenderEffect.current && allProjects.length === 0) {
      isRenderEffect.current = false;
      dispatch(PROJECT_APIS.getAllProjects());
    }
  }, []);
  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  const sideBarStyle = {
    borderRadius: "4px",
    background: "#FFF",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    height: `${windowActualHeight}px`,
    // minWidth: '290px',
    // width: '97%',
  };
  const emptyDrawingContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E5E5E5",
  };
  return (
    <>
      {/* reuse drawing header with selected project, floor, drawing dropdown 
       <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <StickyHeader title="Drawing Title" children={<DrawingMenu />} />
      </Box> */}
      <Grid container spacing={0} sx={{ width: "98%", margin: "auto" }}>
        <Grid
          item
          md={4}
          lg={3}
          xl={3}
          sx={{
            ...sideBarStyle,
            px: 2,
            py: 1.5,
            marginRight: 2, // Adjust the value to control the spacing
          }}
        >
          <ExpandableProjectList
            windowActualHeight={windowActualHeight}
            allProjects={allProjects}
            groups={allGroups}
            allFloors={allFloors}
          />
        </Grid>
        <Grid
          item
          md={3}
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
          {/* <DrawingFiles /> */}
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          md={3.5}
          lg={5.6}
          xl={5.7}
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
    </>
  );
}

export default Location;
