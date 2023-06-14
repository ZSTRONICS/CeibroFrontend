import React from "react";
import { CSkeleton } from "./Skeleton";
import { Box } from "@mui/material";

function CardSkeleton() {
  return (
      <Box width={345} sx={{margin:'0 auto'}}>
        <CSkeleton
          variant="text"
          sx={{ fontSize: "2.5rem" }}
          animation="wave"
        />
        <CSkeleton variant="rectangular" height={300} />
      </Box>
  );
}

export default CardSkeleton;
