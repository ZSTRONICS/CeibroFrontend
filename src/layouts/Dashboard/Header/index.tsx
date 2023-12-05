import PropTypes from "prop-types";
// @mui
import { AppBar, Box, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import assets from "assets/assets";
import Topbar from "components/Topbar/Topbar";
import UserMenu from "components/Topbar/UserMenu";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { useResponsive } from "hooks";
import { useHistory, useRouteMatch } from "react-router-dom";

const HEADER_MOBILE = 48;

const HEADER_DESKTOP = 51;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  color: "unset",
  background: "white",
  zIndex: 10,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) !important",
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const StyledToolbar = styled("div")(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  overflowX: "auto",
  marginBottom: "-2.3px",
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 2),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
interface Props {
  onOpenNav: () => void;
}

export default function Header({ onOpenNav }: Props) {
  const history = useHistory();
  const showSidebar = useRouteMatch([
    "/projects",
    "/locations",
    "/drawingDetail",
    "/connections",
  ]);
  const isLargeScreen = useResponsive("up", "md", "");

  return (
    <StyledRoot>
      <StyledToolbar>
        {!isLargeScreen && !showSidebar && (
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 0.5,
              color: "text.primary",
              padding: 0.1,
              display: { lg: "none" },
            }}
          >
            <assets.MenuIcon />
          </IconButton>
        )}

        <Topbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          gap={1.4}
          spacing={{
            xs: 0.4,
            sm: 1,
          }}
        >
          <div
            onClick={() => {
              history.push("/connections");
            }}
            style={{ cursor: "pointer", display: "flex" }}
          >
            <ConnectionIcon />
          </div>

          <UserMenu />
          {/* <Notification value={""} /> */}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
