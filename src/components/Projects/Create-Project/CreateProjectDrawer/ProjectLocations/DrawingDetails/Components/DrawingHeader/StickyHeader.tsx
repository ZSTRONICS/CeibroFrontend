import React from "react";
import { AppBar, Typography, styled } from "@mui/material";

interface HeaderProps {
  title: string;
}
function StickyHeader(props: HeaderProps) {
  return (
    <StyledAppBar position="static">
      <Typography variant="h6" component="div" textAlign="center">
        {props.title}
      </Typography>
    </StyledAppBar>
  );
}

export default StickyHeader;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: "1px solid #E2E4E5",
  color: "unset",
  background: "white",
}));
