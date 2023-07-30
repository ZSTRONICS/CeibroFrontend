import { Button, Box, TextField } from "@mui/material";
import React from "react";

interface IProps {
  searchBtnLabel?: string;
  placeholder?: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox(props: IProps) {
  const {
    searchBtnLabel = "Search",
    placeholder = "Searching....",
    handleSearchChange,
  } = props;
  return (
    <Box
      sx={{
        width: "100%",
        padding: "4px 16px",
        display: "flex",
        gap: "12px",
        boxSizing: "border-box",
        alignItems: "baseline",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          variant="standard"
          placeholder={placeholder}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            height: "28px",
            color: "#818181",
            borderColor: "#818181",
          }}
        >
          {searchBtnLabel}
        </Button>
      </Box>
    </Box>
  );
}
