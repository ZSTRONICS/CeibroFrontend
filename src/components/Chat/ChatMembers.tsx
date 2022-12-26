import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { Grid, IconButton, Typography, Button } from "@material-ui/core";
// redux-imports
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
// components
import { UserInterface } from "constants/interfaces/user.interface";
import assets from "assets/assets";
import useStyles from "./styles";
import ChatMemberSearch from "./ChatMemberSearch";
import ChatMemberFilters from "./ChatMemberFilters";
import NameAvatar from "components/Utills/Others/NameAvatar";
import RollOver from "components/RollOver/RollOver";
import { createSingleRoom } from "../../redux/action/chat.action";
import { useHistory } from "react-router-dom";
import CustomModal from "components/Modal";
import ProfileContent from "components/Profile/ProfileContent";
import { getUserById } from "redux/action/user.action";

import Tab, { tabClasses } from '@mui/joy/Tab';

import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import { CBox } from "components/material-ui";
import { ChatIcon, GroupAdminIcon, ProfileIcon, RemoveIcon } from "components/material-ui/icons";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

interface Props {
  enable: boolean
}

const ChatMembers: React.FC<Props> = ({ enable }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false)
  const [getUser, setGetUser] = useState<any>({})
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const members = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
      ?.members
    : [];

  const [searchText, setSearchText] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const [btnIndex, setBtnIndex] = useState(null);
  const [show, setShow] = useState(false);

  const [index, setIndex] = React.useState(0);

  const handleToggle = (e: any, i: any) => {
    e.stopPropagation();
    setBtnIndex(i);
  };

  // start singleRoom chat
  const startRoom = (id: string) => {
    const payload = { other: { id }, success: () => dispatch(getAllChats()) };
    dispatch(createSingleRoom(payload));


  };

  const handleMembersShow = (e: any) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const handleClick = (userId: any) => {
    confirm({ description: "User will be removed from this chat" }).then(() => {
      dispatch(
        addMemberToChat({
          other: {
            roomId: selectedChat,
            userId: userId,
          },
          success: () => {
            dispatch(getAllChats());
            toast.success("Chat member removed successfully");
          },
        })
      );
    });
  };

  const handleSearchChange = (e: any) => {
    setSearchText(e?.target?.value);
  };

  let myMembers = members;
  if (searchText && members) {
    myMembers = members?.filter((member: UserInterface) => {
      return (
        member?.firstName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        member?.surName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    });
  }
  const handleToggleClose = (userId: any) => {
    const payload = {
      success: (val: any) => {
        setGetUser(val.data)
      },
      other: {
        userId,
      },
    }
    dispatch(getUserById(payload))

    setOpen((prev) => !prev)
  }

  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenu);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  return (
    <div>
      {/* <ChatMemberFilters handleMembersShow={handleMembersShow} show={show} /> */}

      <ChatMemberSearch value={searchText} handleChange={handleSearchChange} />
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{ '--Tabs-gap': '0px' }}

      >
        <TabList
          variant="plain"
          sx={{
            width: '100%',
            maxWidth: 400,
            pl: 0,
            marginBottom: '20px',

            // mx: 'auto',
            // pt: 2,
            // alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              boxShadow: 'none',
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              fontSize: '14px',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: '#0076C8',

                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  width: '77%',
                  // left: '0px',
                  // right: '65px',
                  height: '2px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: '#0076C8',
                },
              },
            },
          }}

        >
          <Tab>All Members  </Tab>
          <Tab>Admins</Tab>

          <Tab>Group</Tab>
          <Tab>Companies</Tab>
        </TabList>


        <TabPanel value={0}>
          {
            myMembers &&
            myMembers?.map?.((member: UserInterface, i: any) => {
              return (
                <div key={member.id} className="chat-member-chip">
                  <CBox display='flex' justifyContent='space-between'>
                    <CBox flex='2 1 0' display='flex' alignItems='center'>
                      <CBox className={classes.imgBox}>
                        <NameAvatar
                          // styleAvater={}
                          firstName={member?.firstName}
                          surName={member?.surName}
                          url={member?.profilePic}
                          variant="small"

                        />
                      </CBox>
                      <CBox className={classes.memberPreview}>
                        <Typography
                          className={`chat-member-name ${classes.memberName}`}
                        >
                          {member.firstName} {member.surName}
                        </Typography>

                        {member.companyName && (
                          <CBox display='flex' alignItems='center'>

                            <Typography
                              className={`${classes.memberCompany} chat-member-company`}

                            >
                              Company
                            </Typography>
                            &nbsp;
                            <Typography
                              className={`${classes.memberCompany} chat-member-company`}
                            >
                              &nbsp;
                              &nbsp;
                              &nbsp;

                              {member.companyName}
                            </Typography>

                          </CBox>

                        )}
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

                        <MenuItem onClick={() => handleToggleClose(member.id)} className={classes.iconBtn}>
                          <ListItemIcon>
                            <ProfileIcon />
                          </ListItemIcon>
                          <Typography variant="inherit" noWrap>
                            View Profile
                          </Typography>
                        </MenuItem>
                        <CustomModal isOpen={open} title="Profile Overview" handleClose={() => handleToggleClose(member.id)}>
                          <ProfileContent getUser={getUser} />
                        </CustomModal>
                        <MenuItem onClick={() => startRoom(member.id)} className={classes.iconBtn}>
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
                        <MenuItem onClick={() => handleClick(member.id)} className={classes.iconBtn}>
                          <ListItemIcon>
                            <RemoveIcon />
                          </ListItemIcon>
                          Remove from group
                        </MenuItem>

                      </Menu>
                    </CBox>
                  </CBox>

                </div>

              );
            })
          }


        </TabPanel>
        <TabPanel value={1}>

          Admins

        </TabPanel>
        <TabPanel value={2}>
          Groups
        </TabPanel>
        <TabPanel value={3}>
          Companies
        </TabPanel>


      </Tabs>


    </div >
  );
};

const styles = {
  trashWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trashImage: {
    cursor: "pointer",
  },
  tabs: {
    cursor: "pointer",
  },



};
export default ChatMembers;

