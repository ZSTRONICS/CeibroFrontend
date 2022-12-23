/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import colors from "../../assets/colors";
import { CHAT_LIST, CHAT_MESSAGE } from "../../constants/chat.constants";
import { clearSelectedChat, setDownBlock, setGoToMessageId } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import "./chat.css";
import ChatBody from "./ChatBody";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatForm from "./ChatForm";
import ChatSidebar from "./ChatSidebar";
import MediaSidebar from "./MediaSidebar";
import { SET_CHAT_SEARCH } from "config/chat.config";
import { UserInterface } from "constants/interfaces/user.interface";
import { socket } from "services/socket.services";
import { ChatMessageInterface } from "constants/interfaces/chat.interface";

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // store
  const { user } = useSelector((state: RootState) => state.auth);
  const { lastMessageIdInChat } = useSelector((state: RootState) => state.chat);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const goToMessageId: string = useSelector((store: RootState) => store.chat.goToMessageId);
  const messages: ChatMessageInterface[] = useSelector((store: RootState) => store.chat.messages);

  
  const { blockDown } = useSelector( (state: RootState) => state.chat);

  const {
    selectedChat,
    sidebarOpen,
    chat: allChats,
  } = useSelector((state: RootState) => state.chat);

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: null,
    });
    dispatch(clearSelectedChat());
    return () => {
      dispatch(clearSelectedChat());
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      socket.joinChatRoom(user.id, selectedChat)
      const myChat = allChats?.find?.(
        (room: any) => String(room._id) === String(selectedChat)
      );

      if (myChat) {
        let members = myChat?.members || [];
        let myUserIndex = members?.findIndex?.(
          (member: UserInterface) => member.id === user?.id
        );
        setEnable(myUserIndex > -1);
      } else {
        setEnable(false);
      }
    }else{
      socket.setAppSelectedChat(null)
    }
    return (): void => {
      selectedChat;
    };
  }, [selectedChat]);

  const scrollToMessage = () => {
    if (lastMessageIdInChat === null) {
      return
    }
    const elem = document.getElementById(lastMessageIdInChat);
    elem?.scrollIntoView();
    // setLastMessageIdInChatClear(null)
  }

  function gotoMsg(messageId: any): Boolean {
    const elem = document.getElementById(messageId);
    if (elem === null){
      return false 
    }
    const attrs:any = elem?.getAttributeNames().reduce((acc, name) => {
      return {...acc, [name]: elem?.getAttribute(name)};
    }, {});
  
    let newStyle = String(attrs?.class) + " chatReplyBox"
    elem?.setAttribute("class", newStyle);
    if (elem) {
      elem?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
      setTimeout((elem, oldclass) => {
        elem?.setAttribute("class", oldclass)
      }, 1000, elem, attrs?.class);
    }
    return true
  }



  useEffect(() => {
    if (goToMessageId !== '') {
        gotoMsg(goToMessageId)
      }
      return (): void => {
        dispatch(setGoToMessageId({ other: '' }));
      };
  }, [goToMessageId]);



  useEffect(() => {
    console.log(goToMessageId);
    const chatBox: any = document.getElementById("chatBox");
    if (chatBox && goToMessageId.length === 0 && blockDown){
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    if (!blockDown){
      dispatch(setDownBlock(true))
    }

    return (): void => {
      messages
    };
  }, [messages]);


  return (
    <>
      {/* right sidebar for chat actions */}
      {selectedChat && <MediaSidebar enable={enable} />}
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} md={sidebarOpen && !isTabletOrMobile ? 4 : 3}>
          <ChatSidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={sidebarOpen && !isTabletOrMobile ? 8 : 9}
          style={{ background: "white", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <ChatBoxHeader enable={enable} chat={CHAT_LIST[0]} />
          <ChatBody enable={enable} />

          <ChatForm enable={enable} />
          {/* {scrollToMessage()} */}
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;

const useStyles = makeStyles({
  wrapper: {
    background: colors.white,
    position: "relative",
    height: "calc(100vh - 85px)",
  },
});
