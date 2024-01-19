import { Grid } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import LocationDrawingFiles from "./Components/DrawingComp/LocationDrawingFiles";
import { ExpandableProjectList } from "./Components/ProjectComponents";

function Location() {
  const dispatch = useDispatch();
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
  };

  return (
    <>
      {/* reuse drawing header with selected project, floor, drawing dropdown 
       <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <StickyHeader title="Drawing Title" children={<DrawingMenu />} />
      </Box> */}
      <Grid container sx={{ mx: 2 }} gap={2}>
        <Grid
          item
          md={3}
          xs={4}
          sx={{
            ...sideBarStyle,
            px: 2,
            py: 1.5,
          }}
        >
          <ExpandableProjectList
            windowActualHeight={windowActualHeight}
            allProjects={allProjects}
            groups={allGroups}
            allFloors={allFloors}
          />
        </Grid>
        <Grid item md={3} sx={{ ...sideBarStyle, px: 2, py: 1.5 }}>
          <LocationDrawingFiles windowActualHeight={windowActualHeight} />
          {/* <DrawingFiles /> */}
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          md={5}
          sx={{
            ...sideBarStyle,
            background:
              "linear-gradient(0deg, #E5E5E5 0%, #E5E5E5 100%), url(<path-to-image>), lightgray 50% / cover no-repeat",
          }}
        >
          No drawing selected
          {/* <DocumentReader /> */}
        </Grid>
      </Grid>
    </>
  );
}

export default Location;
