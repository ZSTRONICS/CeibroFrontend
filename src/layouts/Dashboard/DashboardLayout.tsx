import React, { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Sidenav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 70;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  background: "white",

  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(1.4),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP+20,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function DashboardLayout(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpenCloseNav = () => {
    setOpen((prev: boolean) => !prev);
  };
  return (
    <StyledRoot>
      <Header onOpenNav={handleOpenCloseNav} />
      <Nav openNav={open} onCloseNav={handleOpenCloseNav} />
      <Main>{props.children}</Main>
    </StyledRoot>
  );
}

export default DashboardLayout;
