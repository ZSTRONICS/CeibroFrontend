import { Box, IconButton } from "@mui/material";
import { DeleteIcon } from "components/material-ui/icons";
import React from "react";

export default function SelectedContactBox() {
  return (
    <Box>
      <Box>
        <img />
      </Box>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
