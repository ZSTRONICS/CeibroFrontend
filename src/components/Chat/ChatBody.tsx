/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import {getUpMessages} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import AddTempChatMember from "../Utills/ChatChip/AddTempChatMember";
import MessageChat from "../Utills/ChatChip/MessageChat";
import { Box } from "@mui/material";
import moment from "moment-timezone";
import NoData from "./NoData";
import { Chat } from "@material-ui/icons";
import colors from "assets/colors";

interface ChatBodyInt {
  enable: boolean;
}

const ChatBody: React.FC<ChatBodyInt> = React.memo((props) => {
  const messages: ChatMessageInterface[] = useSelector((store: RootState) => store.chat.messages);
  const selectedChat: any = useSelector((store: RootState) => store.chat.selectedChat);
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!selectedChat) {
    return <NoData title="There is no conversation" icon={<Chat className={classes.chatIcon} />}/>;
  }

  const goToBottom: any = document.getElementById("goToBottom");
  const handleGoToBottom=()=>{
    const chatBox: any = document.getElementById("chatBox");
      chatBox.scrollTop= chatBox.scrollHeight
      goToBottom.style.display= 'none'
  }
  if(goToBottom){
    goToBottom.onclick = function() {handleGoToBottom()};
  }

  const messageBot = messages?.map((message: any) => {
    if (message.type === "start-bot") {
      return moment.utc(moment(message.createdAt)).fromNow();
    }
  }).find((item:any)=> item);
  
  const handleScroll = (e: any) => {
    let chatBox = e.target;

    const currScrollPercentage = (100 * chatBox.scrollTop) / (chatBox.scrollHeight - chatBox.clientHeight);
   
    if (currScrollPercentage <= 95) {
      goToBottom.style.display= 'block'
    }

    if (currScrollPercentage === 0 &&  messages[0].type !== "start-bot") {
      dispatch(getUpMessages());
    }
  };

  if (goToBottom)
    goToBottom.style.display= 'none'

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
});

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
    overflowY: "auto",
    height: "100%",
    display: "block",
    position: "relative",
  },
  chatIcon: {
    fontSize: 50,
    color: colors.lightBlack
}
});
