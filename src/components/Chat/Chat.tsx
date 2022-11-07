import { Grid, makeStyles } from "@material-ui/core";
import { SET_CHAT_SEARCH, SET_LOADING_MESSAGES } from "config/chat.config";
import { UserInterface } from "constants/interfaces/user.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { select, put } from "redux-saga/effects";
import { setAppSelectedChat } from "services/socket.services";
import colors from "../../assets/colors";
import { clearSelectedChat } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import "./chat.css";
import ChatBody from "./ChatBody";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatForm from "./ChatForm";
import ChatSidebar from "./ChatSidebar";
import MediaSidebar from "./MediaSidebar";

const Chat = () => {
  const classes = useStyles();
  const [enable, setEnable] = useState(false);
  // const dispatch = useDispatch();

  // store
  const { user } = useSelector((state: RootState) => state.auth);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const {
    selectedChat,
    sidebarOpen,
    chat: allChats,
  } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    setAppSelectedChat(selectedChat)
    
    if (selectedChat) {
      const myChat = allChats?.find?.(
        (room: any) => String(room._id) == String(selectedChat)
      );
      if (myChat) {
        let members = myChat?.members || [];
        const index = members?.findIndex((member: any) => {
          return (
            String(member?.id) === String(user?.id) ||
            String(member?.id) === String(user?.id)
          );
        });

        // let myUserIndex = members?.findIndex?.(
        //   (member: UserInterface) => member.id === user?.id
        // );
        setEnable(index > -1);
      } else {
        setEnable(false);
      }
    }
    return () => {
      allChats;
      selectedChat;
    };
  }, [selectedChat]);

  return (
    <>
      {/* right sidebar for chat actions */}
      {selectedChat && enable && <MediaSidebar />}
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} md={sidebarOpen && !isTabletOrMobile ? 4 : 3}>
          <ChatSidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={sidebarOpen && !isTabletOrMobile ? 8 : 9}
          style={{ background: "white" }}
        >
          <ChatBoxHeader enable={enable} />
          <ChatBody />
          <ChatForm enable={enable} />
        </Grid>
      </Grid>
    </>
  );




};


export default Chat;
export const isMessageInStore = (msgIdRecieved: any) => {
  const messages: any = select((state: RootState) => state.chat.messages);
  const index = messages?.findIndex((message: any) => {
    return String(message?.id) === String(msgIdRecieved);
  });
  return index > -1;
};

const useStyles = makeStyles({
  wrapper: {
    background: colors.white,
    position: "relative",
    height: "calc(100vh - 85px)",
  },
});
