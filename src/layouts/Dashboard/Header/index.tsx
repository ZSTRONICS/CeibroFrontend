import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ProfileView from "components/Topbar/ProfileView";
import Notification from "components/Notification/Notification";
import Title from "components/Topbar/Title";
import assets from "assets/assets";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";

const NAV_WIDTH = 200;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: "unset",
  background: "white",
  mb:1,
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
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
  const { user } = useSelector((store: RootState) => store.auth);

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
        <Title />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Stack
            direction="column"
            justifyContent="flex-end"
            sx={{
              "@media (max-width:460px)": {
                display: "none",
              },
            }}
          >
            <Typography>{user?.firstName}</Typography>
            <Typography>{user?.surName} </Typography>
          </Stack>
          <ProfileView />
          <Notification value={""} />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
