
import { DrawingMenu, StickyHeader } from "./Components";
import { Box, Grid } from "@mui/material";
import DocumentReader from "components/pdfviewer/index.js";

function DrawingDetails() {
  return (
    <>
      <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <StickyHeader title="Drawing Title" children={<DrawingMenu />} />
      </Box>
      <Grid container>
        <Grid item md={2.5} sx={sideBarStyle}>
          TASK(s)
        </Grid>
        <Grid item md={8.4}>
          <DocumentReader />
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "white",
};
export default DrawingDetails;
