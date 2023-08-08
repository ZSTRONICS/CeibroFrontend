import { Box, Grid } from "@mui/material";
import Tasks from "components/Tasks/TaskList/Task";
import DocumentReader from "components/pdfviewer/index.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { DrawingMenu, StickyHeader } from "./Components";

function DrawingDetails() {
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const { task } = useSelector((state: RootState) => state);
  const { allTaskToMe, allTaskFromMe, allTaskHidden } = task;

  const allTasksTome = Object.values(allTaskToMe).flat();
  const allTasksFromMe = Object.values(allTaskFromMe).flat();
  const allTasksHidden = Object.values(allTaskHidden).flat();

  // later debug the issue of re-rendering component
  // useApiCallOnce(taskActions.getAllTaskToMe(), [])
  // useApiCallOnce(taskActions.getAllTaskFromMe(), [])
  useEffect(() => {
    if (!isRenderEffect.current) {
      if (allTasksTome.length === 0) {
        dispatch(taskActions.getAllTaskToMe());
      }
      if (allTasksFromMe.length === 0) {
        dispatch(taskActions.getAllTaskFromMe());
      }
      if (allTasksHidden.length === 0) {
        dispatch(taskActions.getAllTaskHidden());
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
        <Grid item md={4} sx={sideBarStyle}>
          <Tasks />
        </Grid>
        <Grid item md={8}>
          <DocumentReader newTask={allTaskToMe.new} />
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
