import { Box, Grid } from "@mui/material";
import Task from "components/Tasks/TaskList/Task";
import DocumentReader from "components/pdfviewer/index.js";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { DrawingMenu, StickyHeader } from "./Components";

function DrawingDetails() {
  const { task } = useSelector((state: RootState) => state);
  const { allTaskToMe } = task;

  return (
    <>
      <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <StickyHeader title="Drawing Title" children={<DrawingMenu />} />
      </Box>
      <Grid container>
        <Grid item md={4} sx={sideBarStyle}>
          <Task />
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
