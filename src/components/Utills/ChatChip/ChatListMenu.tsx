import React, { useState } from "react";

// material
import {
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";

// components
import assets from "assets/assets";
import { ChatListInterface } from "constants/interfaces/chat.interface";
import { RootState } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import {
  addToFavourite,
  deleteConversation,
  getAllChats,
  setSelectedChat,
} from "redux/action/chat.action";
import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";

interface Props {
  room: ChatListInterface;
}

const ChatListMenue: React.FC<Props> = (props) => {
  const { room } = props;
  const classes = useStyles();
  const { user } = useSelector((state: RootState) => state.auth);
  const isMuted = room?.mutedBy?.includes(user?._id);
  const isFavourite = room?.pinnedBy?.includes(user?._id);
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenChatListMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleFavouriteClick = (e: any) => {
    e.stopPropagation();
    dispatch(
      addToFavourite({
        other: room._id,
        success: () => {
          dispatch(getAllChats());
        },
      })
    );
    setAnchorElUser(null);
  };
  const handleDeleteClick = (e: any) => {
    e.stopPropagation();
    confirm({ description: "Are you confirm want to delete" }).then(() => {
      dispatch(
        deleteConversation({
          other: room._id,
          success: () => {
            dispatch(
              getAllChats({
                success: (_res: any) => {
                  if (_res?.data?.userallchat.length === 0){
                    dispatch(setSelectedChat({ other: null }));
                  }
                  if (_res?.data?.userallchat[0]?._id) {
                    dispatch(
                      setSelectedChat({
                        other: _res?.data?.userallchat[0]?._id,
                      })
                    );
                  }
                },
              })
            );
          },
        })
      );
    });
    setAnchorElUser(null);
  };

  const markunread = (e: any) => {
    e.stopPropagation();
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          onClick={handleOpenChatListMenu}
          disableRipple
          disableFocusRipple
          sx={{ p: 1 }}
        >
          <assets.MoreVertOutlinedIcon />
        </IconButton>
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
          onClose={handleCloseMenu}
        >
          <MenuItem
            disableRipple
            onClick={markunread}
            divider
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <Box display="flex" alignItems="center">
                <assets.MarkUnreadChatAltOutlinedIcon />
              </Box>
              <Typography textAlign="center">Mark unread</Typography>
            </Stack>
          </MenuItem>

          <MenuItem
            divider
            disableRipple
            onClick={handleCloseMenu}
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
                {isMuted ? (
                  <assets.VolumeOffOutlinedIcon />
                ) : (
                  <assets.VolumeUpOutlinedIcon />
                )}
              </Box>
              <Typography textAlign="center">
                {isMuted ? "Un mute" : "Mute"} chat
              </Typography>
            </Stack>
          </MenuItem>

          <MenuItem
            divider
            disableRipple
            onClick={handleFavouriteClick}
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
                {isFavourite ? (
                  <assets.StarIcon className={classes.star} />
                ) : (
                  <assets.StarOutlineIcon className={classes.star} />
                )}
              </Box>
              <Typography textAlign="center">
                {isFavourite ? "Remove favorites" : "Add to favorites"}
              </Typography>
            </Stack>
          </MenuItem>

          <MenuItem
            disableRipple
            onClick={handleDeleteClick}
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
                <img
                  src={assets.DeleteIcon}
                  className={`width-16`}
                  alt="delete"
                />
              </Box>
              <Typography textAlign="center" pl={1}>
                Delete Chat
              </Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ChatListMenue;

const useStyles = makeStyles({
  star: {
    color: colors.darkYellow,
  },
});
