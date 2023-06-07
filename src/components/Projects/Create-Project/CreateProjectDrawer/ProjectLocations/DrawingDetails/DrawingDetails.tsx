import { DrawingMenu, StickyHeader } from "./Components";
import { Box } from "@mui/material";

function DrawingDetails() {
  return (
    <>
      <Box sx={{ display: "flex", height:'100%' }}>
        
        <Box
          sx={{
            border: "1px solid",
            width: "200px",
            height: "100%",
          }}
        >
          Side
        </Box>
        <Box sx={{ border: "1px solid red", width: "100%" }}>
          <StickyHeader title="Drawing Title" />
          <DrawingMenu />
        </Box>
        <Box
          sx={{
            border: "1px solid",
            width: "200px",
            height: "100%",
          }}
        >
          R-Side
        </Box>
      </Box>
    </>
  );
}

export default DrawingDetails;
