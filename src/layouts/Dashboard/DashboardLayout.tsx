import React, { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Sidenav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function DashboardLayout(props:any) {
    const [open, setOpen]= useState(false)
  return (
    <StyledRoot>
      <Header onOpenNav={()=>setOpen(!open)}/>
      <Nav/>
      <Main>
       {props.children}
      </Main>
    </StyledRoot>
  );
}

export default DashboardLayout;
