// @ts-nocheck
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
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

interface Props{
  enable:boolean
}

const MediaSidebar:React.FC<Props> = ({enable}) => {
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
  const dispatch = useDispatch();
  const selectedChatRoom = chat.find(
    (room: any) => String(room._id) == String(selectedChat)
  );

  const [media, setMedia] = useState<any>(null);

  useEffect(() => {
    if (selectedChat) {
      dispatch(
        getRoomMedia({
          other: selectedChat,
        })
      );
      dispatch(
        getPinnedMessages({
          other: selectedChat,
        })
      );
      const payload = {
        other: selectedChat,
      };
      dispatch(getRoomQuestioniars(payload));
    }
  }, [selectedChat, openIndex]);

  const getStyles = () => {
    return {
      width: sidebarOpen ? 240 : 50,
      background: colors.lightGrey,
    };
  };

  const handleClick = (index: number) => {
    if (!sidebarOpen) {
      dispatch({
        type: SET_CHAT_SIDE_BAR,
        payload: true,
      });
    }
    setOpenIndex((openIndex) => (index === openIndex ? 0 : index));
  };

  const handleOutsideClick = () => {
    if (sidebarOpen) {
      setOpenIndex(0);
      dispatch({
        type: SET_CHAT_SIDE_BAR,
        payload: false,
      });
    }
  };

  const handleAddMember = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    dispatch(setMembersDialog(true));
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div style={getStyles()} className={classes.mediaSidebarWrapper}>
        <button className="accordion" onClick={() => handleClick(1)}>
          <span className={classes.chatMembersWrapper}>
            <Badge
              overlap='circular'
              badgeContent={selectedChatRoom?.members?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            >
              <div  className={`${classes.addIconContainer}`}>
              <img alt="usersIcon" src={assets.usersIcon}  className={`${classes.IconSize}`} />
              </div>
            </Badge>
            {sidebarOpen && (
              <span
                className={`accordion-title ${classes.chatMembers} ${
                  openIndex === 1 ? "active" : ""
                }`}
              >
                Chat members
                <div className={`${classes.addIconContainerSide}`}>
                {enable &&<img alt="addIcon"
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
        {openIndex === 1 && <ChatMembers enable={enable} />}

        <button className="accordion" onClick={() => handleClick(2)}>
          <span>
            <Badge
            overlap='circular'
              badgeContent={pinnedMessages?.message?.length}
              color="secondary"
              classes={{
                badge: classes.font1,
              }}
            >
              <img src={assets.pinIcon} alt="" />
            </Badge>
            {/* <AiOutlinePushpin style={{ fontSize: 20 }} color="action" /> */}
            {/* <img src={assets.pinIcon} /> */}
            {sidebarOpen && (
              <span className="accordion-title">Pinned messages</span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {openIndex === 2 && <ChatPinned />}

        <button className="accordion" onClick={() => handleClick(3)}>
          <span className={"chat-room-media"}>
            <Badge
             overlap='circular' badgeContent={chatMedia?.length} color="secondary">
              <img src={assets.mediaIcon} alt="mediaIcon" />
            </Badge>
            {sidebarOpen && (
              <span className="accordion-title">Media & Files</span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {openIndex === 3 && <ChatMedia media={chatMedia} />}

        <button className="accordion" onClick={() => handleClick(4)}>
          <span>
            <Badge
            overlap='circular' badgeContent={roomQuestioniars?.length} color="secondary">
              <img src={assets.documentIcon} alt="documentIcon"/>
            </Badge>
            {sidebarOpen && (
              <span className="accordion-title">Questioniar</span>
            )}
          </span>
          {sidebarOpen && <assets.KeyboardArrowDown />}
        </button>
        {openIndex === 4 && <ChatQuestioniar />}
      </div>
    </OutsideClickHandler>
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
  addIconContainer:{
    width: 18,
    marginLeft: '0px'
  },
  addIconContainerSide:{
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
});
