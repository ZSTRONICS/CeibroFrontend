import PropTypes from "prop-types";
// @mui
import { AppBar, Box, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import assets from "assets/assets";
import Topbar from "components/Topbar/Topbar";
import UserMenu from "components/Topbar/UserMenu";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { useHistory } from "react-router-dom";

const NAV_WIDTH = 72;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: "1px solid #E2E4E5",
  color: "unset",
  background: "white",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled("div")(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  overflowX: "auto",
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 4),
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
  return (
    <StyledRoot>
      <StyledToolbar>
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
        {/* <Title /> */}

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
            style={{ cursor: "pointer" }}
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
