import { DrawingMenu, StickyHeader } from "./Components";
import { Box, Grid } from "@mui/material";
import Task from "components/Tasks/TaskList/Task";
import DocumentReader from "components/pdfviewer/index.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";

function DrawingDetails() {
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const {
    allTaskAssignedToMe,
    allTaskCreatedFromMe,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = useSelector((state: RootState) => state.task);
  // later debug the issue of re-rendering component
  // useApiCallOnce(taskActions.getTaskAssignedToMe(), [])
  // useApiCallOnce(taskActions.getTaskCreatedFromMe(), [])
  useEffect(() => {
    if (!isRenderEffect.current) {
      if (allTaskAssignedToMe.new.length === 0) {
        dispatch(taskActions.getTaskAssignedToMe());
      }
      if (allTaskCreatedFromMe.unread.length === 0) {
        dispatch(taskActions.getTaskCreatedFromMe());
      }
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <StickyHeader title="Drawing Title" children={<DrawingMenu />} />
      </Box>
      <Grid container>
        <Grid item md={2.5} sx={sideBarStyle}>
          <Task />
        </Grid>
        <Grid item md={9.5}>
          <DocumentReader newTask={allTaskAssignedToMe.new} />
        </Grid>
        {/* <Grid item md={1} sx={sideBarStyle}>
          Toolbar
        </Grid> */}
      </Grid>
    </>
  );
}
const sideBarStyle = {
  position: "relative",
  zIndex: 10,
  height: "calc(100vh - 137px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  background: "white",
};
export default DrawingDetails;
