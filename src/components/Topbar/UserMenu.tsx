import React, { useEffect } from "react";

// material
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  Stack,
  Badge,
  Tooltip,
  Button,
} from "@mui/material";

// router-dom
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import {
  getMyConnectionsCount,
  getMyInvitesCount,
  openViewInvitations,
} from "redux/action/user.action";
import { logoutUser } from "../../redux/action/auth.action";

// componnents
import NameAvatar from "components/Utills/Others/NameAvatar";
import assets from "assets/assets";
import { purgeStoreStates } from "redux/store";
import storage from "redux-persist/lib/storage";
import { socket } from "services/socket.services";
import { LogoutIcon } from "components/material-ui/icons/Logout/LogoutIcon";
import { InvitationIcon } from "components/material-ui/icons/invitaiton/invitation";
import { ProfileIcon } from "components/material-ui/icons/profileicon/ProfileIcon";
import { MyConnectionsIcon } from "components/material-ui/icons/myConnections/MyConnectionsIcon";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { AddStatusTag, CustomStack } from "components/CustomTags";
import { MenuItemProps } from "@material-ui/core";

const UserMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const { connections, invites } = useSelector(
    (state: RootState) => state?.user
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    socket.logoutSocketsIO();
    handleCloseUserMenu();
    dispatch(logoutUser());
    purgeStoreStates();
    storage.removeItem("persist:root");
    history.push("/login");
  };

  const openViewInvitation = () => {
    dispatch(openViewInvitations());
    handleCloseUserMenu();
  };

  // useEffect(() => {
  //   dispatch(getMyInvitesCount());
  //   dispatch(getMyConnectionsCount());
  // }, []);
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="user menu">
          <Button
          disableRipple
            onClick={handleOpenUserMenu}
            aria-controls={Boolean(anchorElUser) ? "menu-appbar" : undefined}
            aria-expanded={Boolean(anchorElUser) ? "true" : undefined}
            variant="text"
            sx={{ textTransform: "unset", color:'#131516' }}
          >
            <CustomStack gap={1.8}>
              <NameAvatar
                firstName={user?.firstName}
                surName={user?.surName}
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
        </Tooltip>
        <Menu
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
            component={Link}
            to="/profile"
            onClick={handleCloseUserMenu}
            divider
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
                gap:'16px'
              },
            }}
          >
            <ProfileIcon />
            Profile
          </MenuItem>

          <MenuItem
            disableRipple
            component={Link}
            to="/connections"
            onClick={handleCloseUserMenu}
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
                gap:'15px'
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

          {/* <MenuItem
            disableRipple
            onClick={openViewInvitation}
            divider
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
                marginBottom: "8px",
              },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <InvitationIcon />
              <Typography textAlign="center">Invitations</Typography>

              <Box
                display="flex"
                alignItems="center"
                sx={{ padding: " 0 9px 0" }}
              >
                <Badge
                  showZero={true}
                  color="error"
                  badgeContent={invites.count}
                  overlap="circular"
                />
              </Box>
            </Stack>
          </MenuItem> */}

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
                {/* <img src={assets.logoutNew} className={"w-16"} alt="logout" /> */}
              </Box>
              <Typography textAlign="center">Logout</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;