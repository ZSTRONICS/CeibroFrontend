import { Grid } from "@mui/material";
import DocumentReader from "components/pdfviewer/index.js";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import { ExpandableProjectList } from "./Components/ProjectComponents";
import DrawingFiles from "./DrawingFiles";

function DrawingDetails() {
  const dispatch = useDispatch();
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const { allProjects, allGroupsByProjectId } = useSelector(
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
    overflow: "auto",
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
          }}
        >
          <ExpandableProjectList
            allProjects={allProjects}
            groups={allGroupsByProjectId}
          />
        </Grid>
        <Grid item md={3} sx={{ ...sideBarStyle }}>
          <DrawingFiles />
        </Grid>
        <Grid item md={5}>
          <DocumentReader />
        </Grid>
      </Grid>
    </>
  );
}

export default DrawingDetails;
