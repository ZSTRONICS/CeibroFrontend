import { DrawingMenu, StickyHeader } from "./Components";
import { Box, Grid } from "@mui/material";
import Tasks from "components/Tasks/TaskList/Task";
import DocumentReader from "components/pdfviewer/index.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";

function DrawingDetails() {
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const {
    allTaskList,
    allTaskFromMe,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = useSelector((state: RootState) => state.task);
  // later debug the issue of re-rendering component
  // useApiCallOnce(taskActions.getAllTaskToMe(), [])
  // useApiCallOnce(taskActions.getAllTaskFromMe(), [])
  useEffect(() => {
    if (!isRenderEffect.current) {
      if (allTaskList.new.length === 0) {
        dispatch(taskActions.getAllTaskToMe());
      }
      if (allTaskFromMe.unread.length === 0) {
        dispatch(taskActions.getAllTaskFromMe());
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
        <Grid item md={2.8} sx={sideBarStyle}>
          <Tasks />
        </Grid>
        <Grid item md={8.2}>
          <DocumentReader newTask={allTaskList.new} />
        </Grid>
        <Grid item md={1} sx={sideBarStyle}>
          Toolbar
        </Grid>
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
