import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import colors from "../../assets/colors";
import { goToMessage, setDownBlock } from "redux/action/chat.action";
import { useState } from "react";
import { CBox } from "components/material-ui";
import useStyles from './ChatPinnedStyles'
import ChatPinSearch from "./ChatPinSearch";
import NameAvatar from "components/Utills/Others/NameAvatar";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ChatIcon, GroupAdminIcon, ProfileIcon, RemoveIcon } from "components/material-ui/icons";
import CustomModal from "components/Modal";
import assets from "assets/assets";

interface chatMInt { }

const ChatPinned: React.FC<chatMInt> = (props) => {
  const classes = useStyles();

  const { messages, blockDown } = useSelector(
    (state: RootState) => state.chat
  );
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenu);
  const { pinnedMessages } = useSelector((state: RootState) => state.chat);

  const dispatch = useDispatch();
  const handleReplyClick = (messageId: string) => {
    dispatch(setDownBlock(false))
    dispatch(goToMessage(messageId, messages.length));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  return (
    <>
      <CBox className={classes.box}>
        <CBox fontSize={22} fontWeight={600} fontFamily='Inter' color='#000000'>
          Chat Pinned
          {/* <ChatPinSearch /> */}


          {pinnedMessages?.message?.map?.((message: ChatMessageInterface) => {
            return (
              <CBox className={classes.chatBox} onClick={() => handleReplyClick(message._id)}>
                <CBox display='flex' alignItem='center' flex='7 1 0'>
                  <CBox>
                    <NameAvatar
                      // styleAvater={}
                      firstName={message?.sender?.firstName}
                      surName={message?.sender?.surName}
                      url={message?.sender?.profilePic}
                      variant="small"

                    />
                  </CBox>
                  <CBox className={classes.memberPreview}>
                    <CBox fontSize={14} fontWeight={600} color='#000'>
                      {`${message?.sender?.firstName} ${message?.sender?.surName}`}

                    </CBox>
                    <CBox fontSize={12} fontWeight={600} color='#000'>
                      {message?.message}
                    </CBox>

                  </CBox>
                </CBox>
                <CBox display='flex' justifyContent='flex-end' flex='1 1 0'>

                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={openMenu ? 'long-menu' : undefined}
                    aria-expanded={openMenu ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}

                  >
                    {<assets.MoreVertIcon />}
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorMenu}
                    open={openMenu}
                    onClose={handleMenuClose}

                  >

                    <MenuItem className={classes.iconBtn}>
                      <ListItemIcon>
                        <ProfileIcon />
                      </ListItemIcon>
                      <Typography variant="inherit" noWrap>
                        View Profile
                      </Typography>
                    </MenuItem>

                    <MenuItem className={classes.iconBtn}>
                      <ListItemIcon >
                        <ChatIcon />
                      </ListItemIcon>
                      Go to chat
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} className={classes.iconBtn}>
                      <ListItemIcon>
                        <GroupAdminIcon />
                      </ListItemIcon>
                      Make group admin
                    </MenuItem>
                    <hr className={classes.break} />
                    <MenuItem className={classes.iconBtn}>
                      <ListItemIcon>
                        <RemoveIcon />
                      </ListItemIcon>
                      Remove from group
                    </MenuItem>

                  </Menu>
                </CBox>

              </CBox>

            );
          })}

          <Grid>
            {/* {JSON.stringify(pinnedMessages && pinnedMessages.message?.message)} */}

          </Grid>
        </CBox>
      </CBox>
    </>

  );
};

export default ChatPinned;

const styles = {
  wrapper: {
    height: "auto",
    maxHeight: 240,
    overflow: "auto",
  },

};
