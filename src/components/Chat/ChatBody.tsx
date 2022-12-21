/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import {
  getUpMessages
} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import AddTempChatMember from "../Utills/ChatChip/AddTempChatMember";
import MessageChat from "../Utills/ChatChip/MessageChat";

import { Box } from "@mui/material";
import moment from "moment-timezone";
import React from "react";
import NoConversation from "./NoConversation";

interface ChatBodyInt {
  enable: boolean;
}

const areEqual = (prevProps: any, nextProps: any) => true;

const ChatBody: React.FC<ChatBodyInt> = React.memo((props) => {
  const messages: ChatMessageInterface[] = useSelector(
    (store: RootState) => store.chat.messages);

  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedChat: any = useSelector(
    (store: RootState) => store.chat.selectedChat);

  // const { user } = useSelector((store: RootState) => store.auth);

  //API call to get messages of Selected-ROOM
  // const [upMessagesState, setUpMessagesState] = useState(false);
  // const [previousScrollHeight, setPreviousScrollHeight] = useState();
  const [blockAutoDownScroll, setBlockAutoDownScroll] = useState(true);
  // useEffect(() => {
  //   if (selectedChat) {
  //     //socket.getUnreadMsgCount(user.id);

  //     dispatch(
  //       getRoomMessages({
  //         other: {
  //           roomId: selectedChat,
  //           limit: 21,
  //         },
  //         success: () => {
  //           dispatch(
  //             getRoomMedia({
  //               other: selectedChat,
  //             })
  //           );
  //           dispatch(
  //             getPinnedMessages({
  //               other: selectedChat,
  //             })
  //           );
  //           const payload = {
  //             other: selectedChat,
  //           };
  //           dispatch(getRoomQuestioniars(payload));
  //         },
  //       })
  //     );
  //   }
  //   return (): void => {
  //     selectedChat;
  //   };
  // }, [selectedChat]);

  const chatBox: any = document.getElementById("chatBox");
  useEffect(() => {
    const goToBottom: any = document.getElementById("goToBottom");
      if (chatBox) {
        chatBox.scrollIntoView();
    //     var maxHeight = 100 * chatBox.scrollTop / (chatBox.scrollHeight-chatBox.clientHeight);
    }
    if (chatBox && blockAutoDownScroll === true) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    if (chatBox) {
      const currScrollPercentage =
        (100 * chatBox.scrollTop) /
        (chatBox.scrollHeight - chatBox.clientHeight);
      // if (currScrollPercentage >= 70) {
      //   chatBox.scrollTop = chatBox.scrollHeight;
      // } else {
      //   // Add view to go-to botton on click
      // }
    }
    // scrollToBottom()

    return (): void => {
      messages;
    };
  }, [messages]);

  if (!selectedChat) {
    return <NoConversation />;
  }

  const goToBottom: any = document.getElementById("goToBottom");
  const handleGoToBottom=()=>{
      chatBox.scrollTop= chatBox.scrollHeight
  }
  if(goToBottom){
    goToBottom.onclick = function() {handleGoToBottom()};
    }
  //   function preventScroll(e:any){
  //     e.preventDefault();
  //     e.stopPropagation();
  //     return false;
  // }

  // function diableScroll(){
  //   if(document){
  //     document?.getElementsByClassName('.custom-scrollbar').addEventListener('scroll', preventScroll);

  //   }
  // }

  //   function disableScrolling(){
  //     const elem = document?.querySelector('.custom-scrollbar')
  //     if(elem){
  //       elem.style.overflowY = "hidden";
  //       elem.scrollIntoView()
  //     }
  // }

  // function enableScrolling(){
  //     window.onscroll=function(){};
  // }
  const messageBot = messages?.map((message: any) => {
    if (message.type === "start-bot") {
      return moment.utc(moment(message.createdAt)).fromNow();
    }
  }).find((item:any)=> item);
  
  const handleScroll = (e: any) => {
    let chatBox = e.target;

    const currScrollPercentage = (100 * chatBox.scrollTop) / (chatBox.scrollHeight - chatBox.clientHeight);

    if (currScrollPercentage <= 80) {
      goToBottom.style.display= 'block'
    }else if(currScrollPercentage === 100){
      goToBottom.style.display= 'none'
    }
    if (currScrollPercentage <= 70) {
      setBlockAutoDownScroll(false);
    } else {
      setBlockAutoDownScroll(true);
    }

    if (currScrollPercentage <= 0 &&  messageBot === "start-bot") {
      // disableScrolling()
      //setUpMessagesState(true)
      // setPreviousScrollHeight(chatBox.scrollHeight)
      dispatch(getUpMessages());
    }
  };

  return (
    <>
      <Grid
        className={`${classes.wrapper} custom-scrollbar`}
        id="chatBox"
        container
        onScroll={handleScroll}
      >
       {messageBot&& <Box className={classes.botContainer}>
          <Typography>{messageBot}</Typography>
        </Box>}
        {messages &&
          messages?.filter((message: any) => message.type !== "start-bot")
            .map((message: ChatMessageInterface) => {
              if (message.chat === selectedChat) {
                return (<>
                  <MessageChat message={message} enable={props.enable} />
                </>
                );
              } else {
                return null;
              }
            })}
        <AddTempChatMember />
      </Grid>
    </>
  );
}, areEqual);

export default ChatBody;

const useStyles = makeStyles({
  botContainer: {
    background: "#ECF0F1",
    borderRadius: 20,
    maxWidth: 125,
    margin: "0 auto",
    width: "100%",
    textAlign: "center",
    padding: "2px 0",
    "& .MuiTypography-root": {
      fontSize: "12px",
    },
  },
  wrapper: {
    maxHeight: "calc(100vh - 305px)",
    overflowY: "scroll",
    height: "100%",
    display: "block",
    position: "relative",
  },
});
