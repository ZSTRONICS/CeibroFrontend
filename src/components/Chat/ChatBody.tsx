/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Grid, makeStyles } from "@material-ui/core";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import {
  getRoomMessages,
  getUpMessages,

} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import MessageChat from "../Utills/ChatChip/MessageChat";
import AddTempChatMember from "../Utills/ChatChip/AddTempChatMember";

import NoConversation from "./NoConversation";
import React from "react";
import { socket } from "services/socket.services";

interface ChatBodyInt {
  enable: boolean
}

const areEqual = (prevProps: any, nextProps: any) => true;

const ChatBody: React.FC<ChatBodyInt> = React.memo(props => {



  const messages: ChatMessageInterface[] = useSelector(
    (store: RootState) => store.chat?.messages
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedChat: any = useSelector((store: RootState) => store.chat.selectedChat);
  const { user } = useSelector((store: RootState) => store.auth);
 

  //API call to get messages of Selected-ROOM
  // const [upMessagesState, setUpMessagesState] = useState(false);
  // const [previousScrollHeight, setPreviousScrollHeight] = useState();
  const [blockAutoDownScroll, setBlockAutoDownScroll] = useState(true);
  useEffect(() => {

    if (selectedChat) {
      socket.getUnreadMsgCount(user.id);
      
      dispatch(
        getRoomMessages({
          other: {
            roomId: selectedChat,
            limit: 21,
          },
          success: () => {
            setBlockAutoDownScroll(true)
          }
        })
      );
    }
    return (): void => {
      selectedChat
    }
  }, [selectedChat]);


  useEffect(() => {

    const chatBox: any = document.getElementById("chatBox")

    if (chatBox && blockAutoDownScroll === true) {
      chatBox.scrollTop = chatBox.scrollHeight
    }


    if (chatBox) {
      const currScrollPercentage = (chatBox?.scrollTop / chatBox.scrollHeight) * 100
      if (currScrollPercentage >= 70) {
        chatBox.scrollTop = chatBox.scrollHeight
      } else {
        // Add view to go-to botton on click 
      }
    }

    return (): void => {
      messages
    }
  }, [messages]);

  if (!selectedChat) {
    return <NoConversation />;
  }
  const handleScroll = (e: any) => {
    let chatBox = e.target;

    const currScrollPercentage = (chatBox.scrollTop / chatBox.scrollHeight) * 100


    if (currScrollPercentage <= 70) {
      setBlockAutoDownScroll(false)
    } else {
      setBlockAutoDownScroll(true)
    }



    if (chatBox.scrollTop === 0) {
      // setUpMessagesState(true)
      // setPreviousScrollHeight(chatBox.scrollHeight)
      dispatch(getUpMessages());
    }
  }

  return (
    <>

      <Grid
        className={`${classes.wrapper} custom-scrollbar`}
        id="chatBox"
        container
        onScroll={handleScroll}
      >

        {messages &&
          messages?.map?.((message: ChatMessageInterface) => {
            if (message.chat === selectedChat) {
              return <MessageChat message={message} enable={props.enable} />;
            } else {
              return <></>
            }
          })

        }
        <AddTempChatMember />
      </Grid>

    </>
  );
}, areEqual);

export default ChatBody;

const useStyles = makeStyles({
  wrapper: {
    maxHeight: "calc(100vh - 305px)",
    overflowY: "auto",
    height: '100%',
    display: "block",
    position: "relative",
  },
});