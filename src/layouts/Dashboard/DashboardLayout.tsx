import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Sidenav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 70;
export const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  background: "#F4F4F4",
  marginTop: "1rem",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(0.56),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 5,
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
      <Main id="appMainContainer">{props.children}</Main>
    </StyledRoot>
  );
}

export default DashboardLayout;
