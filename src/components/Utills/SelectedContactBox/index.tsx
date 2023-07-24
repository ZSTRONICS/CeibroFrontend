import { Box, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon, AccountCircle } from "@mui/icons-material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import React from "react";

export default function SelectedContactBox({ name, imageSrc, onDelete }) {
  const placeholder = name ? name.slice(0, 2) : "NA";

  return (
    <Box sx={{ position: "relative", display: "inline-block", m: 1 }}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        <Box
          sx={{
            width: "50px",
            height: "50px",
            bgcolor: "#F4F4F4", // You can set a placeholder background color here
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="text.primary">
            {placeholder}
          </Typography>
        </Box>
      )}
      <IconButton
        aria-label="delete"
        onClick={onDelete}
        sx={{
          position: "absolute",
          bottom: "-4px",
          right: "-6px",
          backgroundColor: "#0076C8",
          color: "#fff",
          width: "16px",
          height: "16px",
        }}
      >
        <ClearOutlinedIcon sx={{ width: "16px", height: "16px" }} />
      </IconButton>
    </Box>
  );
}
