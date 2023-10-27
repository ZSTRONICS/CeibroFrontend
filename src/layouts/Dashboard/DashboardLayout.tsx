import { useState } from "react";
// @mui
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Sidenav";

const APP_BAR_MOBILE = 58;
// const APP_BAR_DESKTOP = 56;
const isTaskRoute = window.location.pathname.includes("/tasks");
const HEADER_HEIGHT = 84;
const MARGIN_BOTTOM = 16;
const childHeight = `calc(100vh - ${HEADER_HEIGHT}px)`;
const navHeight = `calc(100vh - ${HEADER_HEIGHT + MARGIN_BOTTOM}px)`;

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "hidden",
  background: isTaskRoute ? "#F4F4F4" : "transparent",
  maxHeight: childHeight,
  minHeight: childHeight,
  height: "100%",
}));

function DashboardLayout(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpenCloseNav = () => {
    setOpen((prev: boolean) => !prev);
  };
  return (
    <Grid
      sx={{
        background: "#F4F4F4",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
      container
    >
      <Grid item>
        <Header onOpenNav={handleOpenCloseNav} />
      </Grid>

      <Grid
        sx={{
          position: "relative",
          overflow: "hidden",
          height: `calc(100vh - ${HEADER_HEIGHT + MARGIN_BOTTOM}px)`,
          mt: `${HEADER_HEIGHT}px`,
        }}
        item
        container
      >
        <Nav
          height={navHeight}
          openNav={open}
          onCloseNav={handleOpenCloseNav}
        />
        <Main id="appMainContainer">{props.children}</Main>
      </Grid>
    </Grid>
  );
}

export default DashboardLayout;
