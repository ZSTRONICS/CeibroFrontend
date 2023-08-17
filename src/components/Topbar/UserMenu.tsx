import React from "react";

// material
import {
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

// router-dom
import { useHistory } from "react-router";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import { logoutUser } from "../../redux/action/auth.action";

// componnents
import assets from "assets/assets";
import { AddStatusTag, CustomStack } from "components/CustomTags";
import NameAvatar from "components/Utills/Others/NameAvatar";
import { LogoutIcon } from "components/material-ui/icons/Logout/LogoutIcon";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { ProfileIcon } from "components/material-ui/icons/profileicon/ProfileIcon";
import storage from "redux-persist/lib/storage";
import { purgeStoreStates } from "redux/store";

const UserMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const { connections, } = useSelector(
    (state: RootState) => state?.user
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenu = (routeName: string) => {
    history.push(routeName)
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // socket.logoutSocketsIO();
    handleCloseUserMenu();
    dispatch(logoutUser());
    purgeStoreStates();
    storage.removeItem("persist:root");
    history.push("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Button
          disableRipple
          onClick={handleOpenUserMenu}
          aria-controls={anchorElUser ? "menu-appbar" : undefined}
          aria-expanded={anchorElUser ? "true" : undefined}
          variant="text"
          sx={{ textTransform: "unset", color: '#131516' }}
        >
          <CustomStack gap={1.8}>
            <NameAvatar
              firstname={user?.firstName}
              surname={user?.surName}
              url={user?.profilePic}
              variant="rounded"
            />
            <Stack
              direction="column"
              justifyContent="flex-end"
              sx={{
                "@media (max-width:460px)": {
                  display: "none",
                },
              }}
            >
              <AddStatusTag sx={{ color: "#131516" }}>
                {user?.firstName}
              </AddStatusTag>
              <AddStatusTag sx={{ color: "#131516" }}>
                {user?.surName}{" "}
              </AddStatusTag>
            </Stack>
            <assets.KeyboardArrowDownIcon />
          </CustomStack>
        </Button>
        {anchorElUser && <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            disableRipple
            onClick={() => handleUserMenu("/profile")}
            divider
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
                gap: '16px'
              },
            }}
          >
            <ProfileIcon />
            Profile
          </MenuItem>

          <MenuItem
            disableRipple
            divider
            onClick={() => handleUserMenu("/connections")}
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
                gap: '15px'
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                paddingRight: "16px",
              }}
            >
              <Box display="flex" alignItems="center">
                <ConnectionIcon />
              </Box>
              <Typography textAlign="center"> My Connections</Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ padding: " 0 10px 0" }}
              >
                <Badge
                  sx={{
                    color: "#F1B740",
                  }}
                  showZero={true}
                  color="primary"
                  badgeContent={connections.count}
                  overlap="circular"
                />
              </Box>
            </Stack>
          </MenuItem>

          <MenuItem
            disableRipple
            onClick={handleLogout}
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <Box display="flex" alignItems="center">
                <LogoutIcon />
              </Box>
              <Typography textAlign="center">Logout</Typography>
            </Stack>
          </MenuItem>
        </Menu>}
      </Box>
    </>
  );
};

export default UserMenu;