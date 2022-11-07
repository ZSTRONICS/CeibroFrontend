import { Grid, makeStyles } from "@material-ui/core";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import {
  getDownMessages,
  getRoomMessages,
  getUpMessages,
} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import MessageChat from "../Utills/ChatChip/MessageChat";
import AddTempChatMember from "../Utills/ChatChip/AddTempChatMember";
import {
  SET_ALLOW_SCROLL,
  SET_PAGINATION_BLOCK,
  SET_VIEWPORT,
} from "../../config/chat.config";
import NoConversation from "./NoConversation";

const ChatBody= memo(() => {

  const messages: ChatMessageInterface[] = useSelector(
    (store: RootState) => store.chat.messages
  );

  const [blockLocal, setBlockLocal] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedChat = useSelector( (store: RootState) => store.chat.selectedChat );

  const viewport = useSelector((store: RootState) => store.chat.viewport);

  const { blockPagination, allowChangeBlock, blockDown } = useSelector( (store: RootState) => store.chat );

  const allowScroll = useSelector((store: RootState) => store.chat.allowScroll);
  
  let chatBox = document.getElementById("chatBox")

  useEffect(() => {
    if (selectedChat) {
      const payload = {
        other: {
          roomId: selectedChat,
        },
      };
      dispatch(getRoomMessages(payload));
    }
    return ()=>{
      selectedChat
      null
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!blockLocal) {
      if (chatBox) {
        chatBox?.removeEventListener("scroll", () => {});
      }
      chatBox?.addEventListener("scroll", () => handleScroll(blockLocal));
    }
    return () => {
      chatBox?.removeEventListener("scroll", () => {});
      null
    };
  }, [blockPagination, allowChangeBlock, blockLocal]);

  const handleScroll = (blockLocal: boolean) => {
    if (chatBox && chatBox?.scrollTop <= 0) {
      if (!blockPagination) {
        dispatch(getUpMessages());
      }
    }
    if (
      (chatBox?.clientHeight || 0) > 300 &&
      (chatBox?.scrollHeight || 0) - (chatBox?.scrollTop || 0) ===
        chatBox?.clientHeight
    ) {
      if (!blockLocal) {
        dispatch(getDownMessages());
      }
    }
  };

  useEffect(() => {
    if (!viewport && !blockDown) {
      setBlockLocal(()=> true);
      setTimeout(() => {
        const chatBox = document.getElementById("chatBox") || {
          scrollTop: 0,
          scrollHeight: 0,
        };
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(() => {
          setBlockLocal(()=> false);
        }, 5000);
      }, 300);
    }
    return ()=>{
      blockDown
      clearTimeout(viewport)
    }
  }, [messages, blockDown]);

  useEffect(() => {
    if (allowScroll) {
      // will run when something merge at top
       chatBox || {
        scrollTop: 0,
        scrollHeight: 0,
      };
       chatBox = document.getElementById(viewport);
      if (chatBox) {
        chatBox.scrollTop = chatBox.offsetTop - 20;
        // chatBox.scrollIntoView({ behavior: "auto" });
        // scroll.setScroll($(window).scrollTop()  -120- 120);

        dispatch({
          type: SET_VIEWPORT,
          payload: null,
        });
        dispatch({
          type: SET_ALLOW_SCROLL,
          payload: false,
        });
      }
    }
  return ()=>{
      allowScroll
    }
  }, [viewport]);

  if (!selectedChat) {
    return <NoConversation />;
  }
  
  return (
    <Grid
      className={`${classes.wrapper} custom-scrollbar`}
      id="chatBox"
      container
    >
      <MessageChat />
      <AddTempChatMember />
    </Grid>
  );
});

export default ChatBody;

const useStyles = makeStyles({
  wrapper: {
    height: "calc(100vh - 235px)",
    overflowY: "auto",
    display: "block",
    position: "relative",
  },
});