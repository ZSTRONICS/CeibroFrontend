import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Sidenav";

const APP_BAR_MOBILE = 58;
// const APP_BAR_DESKTOP = 56;
const isTaskRoute = window.location.pathname.includes("/tasks");

export const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  background: isTaskRoute ? "#F4F4F4" : "transparent",
  margin: "0 auto",
  marginTop: "16px",
  paddingTop: APP_BAR_MOBILE,
  // maxWidth: "1440px",
  // minWidth: "960px",
  paddingBottom: theme.spacing(0.56),
  // [theme.breakpoints.up("lg")]: {
  //   paddingTop: APP_BAR_DESKTOP,
  // },
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
      <Main id="appMainContainer">{props.children}</Main>
    </StyledRoot>
  );
}

export default DashboardLayout;
