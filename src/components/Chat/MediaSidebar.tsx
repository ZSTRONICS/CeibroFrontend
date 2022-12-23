
import { Badge, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHAT_SIDE_BAR } from "../../config/chat.config";
import { RootState } from "../../redux/reducers";
import ChatMembers from "./ChatMembers";
import ChatMedia from "./ChatMedia";
import ChatQuestioniar from "./ChatQuestioniar";
import ChatPinned from "./ChatPinned";
import assets from "../../assets/assets";
import {
  getPinnedMessages,
  getRoomMedia,
  getRoomQuestioniars,
  setMembersDialog,
} from "../../redux/action/chat.action";
import colors from "assets/colors";
import CustomPopover from "components/popover/Popover";
import { Box } from "@mui/material";
import { CBox } from "components/material-ui";

import { MediaIcon, MemberIcon, PinIcon, QuestionnairIcon } from "components/material-ui/icons";
import Tooltip from '@mui/joy/Tooltip';

interface Props {
  enable: boolean
}

const MediaSidebar: React.FC<Props> = ({ enable }) => {
  const classes = useStyles();
  const {
    sidebarOpen,
    selectedChat,
    chat,
    chatMedia,
    pinnedMessages,
    roomQuestioniars,
  } = useSelector((state: RootState) => state.chat);
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [anchorGroupEl, setAnchorGroupEl] = React.useState<any>(undefined);
  const [anchorMemberEl, setAnchorMemberEl] = React.useState<any>(undefined);
  const [pinElement, setPinElement] = React.useState<any>(undefined);

  const dispatch = useDispatch();
  const selectedChatRoom = chat.find(
    (room: any) => String(room._id) == String(selectedChat)
  );






  const getStyles = () => {
    return {
      width: sidebarOpen ? 240 : 50,
      background: colors.lightGrey,
    };
  };

  // const handleClick = (index: number) => {
  //   setOpenIndex((openIndex) => (index === openIndex ? 0 : index))
  // };
  // const handlePinClick = () => {
  //   setPinElement(divRef.current)
  // };

  // const handleOutsideClick = () => {
  //   if (sidebarOpen) {
  //     setOpenIndex(0);
  //     dispatch({
  //       type: SET_CHAT_SIDE_BAR,
  //       payload: false,
  //     });
  //   }
  // };

  const handleAddMember = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    dispatch(setMembersDialog(true));
  };
  const handleOutsideClick = () => {
    setOpenIndex(0)

  }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isActive, setActive] = useState(0);
  const [content, setContent]: any = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, content: string, id: number) => {
    setContent(content);
    setAnchorEl(event.currentTarget);
    setActive(id)

  };
  const toggleClass = () => {

  }
  const handleClose = () => {
    setAnchorEl(null);
    setContent(content);
    setActive(0);

  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div style={getStyles()} className={classes.mediaSidebarWrapper}>
        {/* member */}
        <button className={isActive === 1 ? 'active' : "accordion"} onClick={(e) => handleClick(e, "member", 1)}>
          <span className={classes.chatMembersWrapper}>
            {/* <Badge
              overlap='circular'
              badgeContent={selectedChatRoom?.members?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            > */}

            <CBox className={`${classes.addIconContainer}`}>
              <Tooltip title="Delete">
                <MemberIcon />
              </Tooltip>

            </CBox>
            {/* </Badge> */}
            {sidebarOpen && (
              <span
                className={`accordion-title ${classes.chatMembers} ${openIndex === 1 ? "active" : ""
                  }`}
              >
                Chat members
                <div className={`${classes.addIconContainerSide}`}>
                  {enable && <img alt="addIcon"
                    src={assets.Add}
                    onClick={handleAddMember}
                    className={`${classes.addIcon}`}
                  />}
                </div>
              </span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {/* pin */}
        <button className={isActive === 2 ? 'active' : "accordion"} onClick={(e) => handleClick(e, "pin", 2)}>
          <span className={classes.chatMembersWrapper}>
            {/* <Badge
              overlap='circular'
              badgeContent={selectedChatRoom?.members?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            > */}
            <CBox className={`${classes.addIconContainer}`}>
              <PinIcon />
              {/* <img src={assets.pinIcon} alt="" /> */}
            </CBox>
            {/* </Badge> */}
            {sidebarOpen && (
              <span
                className={`accordion-title ${classes.chatMembers} ${openIndex === 1 ? "active" : ""
                  }`}
              >
                Chat members
                <div className={`${classes.addIconContainerSide}`}>
                  {enable && <img alt="addIcon"
                    src={assets.Add}
                    onClick={handleAddMember}
                    className={`${classes.addIcon}`}
                  />}
                </div>
              </span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {/* media */}
        <button className={isActive === 3 ? 'active' : "accordion"} onClick={(e) => handleClick(e, "media", 3)}>
          <span className={classes.chatMembersWrapper}>
            {/* <Badge
              overlap='circular'
              badgeContent={selectedChatRoom?.members?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            > */}
            <CBox className={`${classes.addIconContainer}`}>
              <MediaIcon />
            </CBox>
            {/* </Badge> */}
            {sidebarOpen && (
              <span
                className={`accordion-title ${classes.chatMembers} ${openIndex === 1 ? "active" : ""
                  }`}
              >
                Chat members
                <div className={`${classes.addIconContainerSide}`}>
                  {enable && <img alt="addIcon"
                    src={assets.Add}
                    onClick={handleAddMember}
                    className={`${classes.addIcon}`}
                  />}
                </div>
              </span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {/* questionnaire */}
        <button className={isActive === 4 ? 'active' : "accordion"} onClick={(e) => handleClick(e, "questionnaire", 4)}>
          <span className={classes.chatMembersWrapper}>
            {/* <Badge
              overlap='circular'
              badgeContent={selectedChatRoom?.members?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            > */}
            <CBox className={`${classes.addIconContainer}`}>
              <QuestionnairIcon />
            </CBox>
            {/* </Badge> */}
            {sidebarOpen && (
              <span
                className={`accordion-title ${classes.chatMembers} ${openIndex === 1 ? "active" : ""
                  }`}
              >
                Chat members
                <div className={`${classes.addIconContainerSide}`}>
                  {enable && <img alt="addIcon"
                    src={assets.Add}
                    onClick={handleAddMember}
                    className={`${classes.addIcon}`}
                  />}
                </div>
              </span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {/* {openIndex === 1 && */}


        <CustomPopover id={id} open={open} anchorEl={anchorEl} handleClose={handleClose}>

          {content === 'member' &&
            <>

              <CBox className={classes.box}>
                <CBox fontSize={22} fontWeight={600} fontFamily='Inter' color='#000000'>
                  Chat Members
                  <ChatMembers enable={false} />
                </CBox>
              </CBox>

              <CBox>
                <IconButton>
                  {<assets.ArrowForwardIosIcon />}
                </IconButton>
              </CBox>
            </>

          }
          {content === 'pin' && <CBox className={classes.box}>'pin'</CBox>}
          {content === 'media' && <CBox className={classes.box}>'media'</CBox>}
          {content === 'questionnaire' && <CBox className={classes.box}>'questionnaire'</CBox>}



        </CustomPopover >





        {/* } */}


      </div >
    </OutsideClickHandler >
  );
};

export default MediaSidebar;

const useStyles = makeStyles({
  mediaSidebarWrapper: {
    position: "absolute",
    right: 18,
    zIndex: 10,
    background: "white",
    height: "calc(100vh - 85px)",
    display: "flex",
    flexDirection: "column",
  },
  font1: {
    fontSize: "0.5rem",
  },
  addIconContainer: {
    width: 18,
    marginLeft: '0px'
  },
  addIconContainerSide: {
    width: 18,
    marginLeft: '5px'
  },
  addIcon: {
    border: `2px solid ${colors.primary}`,
    padding: 2,
    width: '100%'
  },
  IconSize: {
    padding: 2,
    width: '100%'
  },
  chatMembersWrapper: {
    display: "flex",
    // width: "100%",
  },
  chatMembers: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  box: {
    backgroundColor: '#E8F2F9',
    minHeight: 775,
    height: '100%',
    width: 466,
    padding: '15px 20px',
    position: 'relative'
  },
  active: {
    color: '#444',
    cursor: 'pointer',
    padding: 18,
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    fontSize: 15,
    transition: '0.4s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
    backgroundColor: '#E5F0F8',
    borderBottom: '1px solid #ecf0f1',

  }

});
