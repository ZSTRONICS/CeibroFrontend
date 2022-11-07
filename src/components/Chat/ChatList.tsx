import React, { useEffect } from "react";
import ChatListChip from "../Utills/ChatChip/ChatListChip";
import { CHAT_LIST } from "../../constants/chat.constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, setSelectedChat } from "../../redux/action/chat.action";
import { ActionInterface, RootState } from "../../redux/reducers";
import { ChatListInterface } from "../../constants/interfaces/chat.interface";
import { Grid } from "@material-ui/core";
import { getSocket } from "services/socket.services";

const ChatList = () => {
  const dispatch = useDispatch();
  const { chat, type, favouriteFilter, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);


//   const members = selectedChat
//   ? chat.find((room: any) => String(room._id) == String(selectedChat))
//       ?.members
//   : [];

  useEffect(() => {
    dispatch(
      getAllChats({
        success: (_res: any) => {
          if (!selectedChat && _res?.data?.[0]?._id) {
            dispatch(setSelectedChat({ other: _res?.data?.[0]?._id }));
          }
        },
      })
    );
  }, [type, favouriteFilter]);

  const handleClick = (chat: any) => {
    if (String(chat?._id) != String(selectedChat)) {
     const res = getSocket().emit('JOIN_ROOM', { user, selectedChat });
      dispatch(setSelectedChat({ other: chat._id }));
    }
  };
  
return (
    <Grid container>
      {chat &&
        chat.map((chat: ChatListInterface, index: number) => {
          return (
            <ChatListChip handleClick={handleClick} chat={chat} key={index} />
          );
        })} 
    </Grid>
  );
};

export default ChatList;
