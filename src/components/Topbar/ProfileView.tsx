import React, { useEffect } from "react";

// material
import {Tooltip } from "@material-ui/core";
import { Menu, IconButton, MenuItem, Typography,Box, Stack, Badge } from "@mui/material";

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

const ProfileView = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const { connections, invites } = useSelector((state: RootState) => state?.user);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = () => {
    history.push("/login");
    dispatch(logoutUser());
    handleCloseUserMenu()
  };

  const openViewInvitation =() =>{
    dispatch(openViewInvitations());
    handleCloseUserMenu()
  }
  useEffect(() => {
    dispatch(getMyInvitesCount());
    dispatch(getMyConnectionsCount());
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="user info">
          <IconButton onClick={handleOpenUserMenu} disableRipple disableFocusRipple sx={{ p: 1}}>
            <NameAvatar
             firstName={user?.firstName}
             surName={user?.surName}
             url={user?.profilePic} 
             variant="rounded" />
          </IconButton>
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
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <Box display="flex" alignItems="center">
                <img src={assets.bluePencil} className={`w-16`} alt="" />
              </Box>
              <Typography textAlign="center">Profile</Typography>
            </Stack>
          </MenuItem>

          <MenuItem
          disableRipple
            component={Link}
            to="/connections"
            onClick={handleCloseUserMenu}
            sx={{
                "&.MuiMenuItem-root": {
                    padding: "10px 20px",
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
                <img src={assets.contactsBlack} className="w-16" alt="" />
              </Box>
              <Typography textAlign="center"> My connections</Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ padding: " 0 10px 0" }}
              >
                <Badge 
                sx={{
                        color:"#F1B740"
                }}
                    color="primary"
                  badgeContent={connections}
                  overlap="circular"
                />
              </Box>
            </Stack>
          </MenuItem>

          <MenuItem 
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
            <Stack direction="row" spacing={2}>
              <img src={assets.addUser} className={`w-16`} alt="" />
              <Typography textAlign="center">Invitations</Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ padding: " 0 10px 0" }}
              >
                <Badge
                 color="error"
                  badgeContent={invites}
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
                <img src={assets.logout} className={"w-16"} alt="logout" />
              </Box>
              <Typography textAlign="center">Logout</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ProfileView;