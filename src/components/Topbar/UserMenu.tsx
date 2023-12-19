import React, { useEffect, useRef } from "react";

// material
import { Badge, Box, Button, Menu, MenuItem, Stack } from "@mui/material";

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
import { userApiAction } from "redux/action";
import { purgeStoreStates } from "redux/store";
import { socket } from "services/socket.services";
import { LOGIN_ROUTE } from "utills/axios";

const UserMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isRenderEffect = useRef<any>(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const { firstName, surName, profilePic } = user || {};

  const { userAllContacts } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!isRenderEffect.current) {
      userAllContacts.length < 1 && dispatch(userApiAction.getUserContacts());
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenu = (routeName: string) => {
    history.push(routeName);
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    socket.getSocket()?.emit("logout-window");
    localStorage.removeItem("showFullView");
    setAnchorElUser(null);
    dispatch(logoutUser());
    purgeStoreStates();
    history.push(LOGIN_ROUTE);
  };
  return !user ? (
    <></>
  ) : (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Button
          disableRipple
          onClick={handleOpenUserMenu}
          aria-controls={anchorElUser ? "menu-appbar" : undefined}
          aria-expanded={anchorElUser ? "true" : undefined}
          variant="text"
          sx={{ textTransform: "unset", color: "#131516" }}
        >
          <CustomStack gap={1.8}>
            <NameAvatar
              firstname={firstName}
              surname={surName}
              url={profilePic}
              variant="rounded"
            />
            <Stack
              justifyContent="flex-end"
              sx={{
                flexDirection: "column !important",
                alignItems: "flex-start",
                "@media (max-width:460px)": {
                  display: "none",
                },
              }}
            >
              <AddStatusTag sx={{ color: "#131516" }}>
                {firstName || ""}
              </AddStatusTag>
              <AddStatusTag sx={{ color: "#131516" }}>
                {surName || ""}
              </AddStatusTag>
            </Stack>
            <assets.KeyboardArrowDownIcon />
          </CustomStack>
        </Button>
        {anchorElUser && (
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
            MenuListProps={{
              role: "listbox",
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
                  gap: "16px",
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
                  padding: "12px 20px",
                  gap: "15px",
                },
              }}
            >
              <ConnectionIcon />
              My Connections
              <Badge
                sx={{
                  color: "#F1B740",
                  padding: "0px  14px",
                }}
                showZero={true}
                color="primary"
                badgeContent={userAllContacts.length}
                overlap="circular"
              />
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={handleLogout}
              sx={{
                gap: 2,
                "&.MuiMenuItem-root": {
                  padding: "10px 20px",
                },
              }}
            >
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        )}
      </Box>
    </>
  );
};

export default UserMenu;
