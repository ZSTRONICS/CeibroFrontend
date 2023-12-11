import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
// @mui
import { Box, Drawer } from "@mui/material";
// hooks
import Sidebar from "components/Sidebar/Sidebar";
import useResponsive from "../../../hooks/useResponsive";

const NAV_WIDTH = 72;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  height: PropTypes.string,
};

interface Props {
  openNav: any;
  onCloseNav: any;
  height: any;
}

export default function Nav({ openNav, onCloseNav, height }: Props) {
  const { pathname } = useLocation();
  const showSidebar = useRouteMatch([
    "/projects",
    "/locations",
    "/drawingDetail",
    "/connections",
    "/profile",
  ]);
  const isDesktop = useResponsive("up", "md", "");
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        overflow: "hidden",
        height,
        background: "rgba(244, 244, 244, 1)",
      }}
    >
      <Sidebar onClose={onCloseNav} />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop && !showSidebar ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              position: "relative",
              zIndex: 1,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
