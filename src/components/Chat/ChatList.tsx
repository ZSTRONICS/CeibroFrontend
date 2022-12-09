import React, { useEffect, useState } from "react";
import ChatListChip from "../Utills/ChatChip/ChatListChip";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, setSelectedChat } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import { ChatListInterface } from "../../constants/interfaces/chat.interface";
import { Grid } from "@material-ui/core";
import { socket } from "services/socket.services";

const ChatList = () => {
  const dispatch = useDispatch();
  const { chat, type, favouriteFilter, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { roomMessageData } = useSelector((state: RootState) => state.chat);
  //   const members = selectedChat
  //   ? chat.find((room: any) => String(room._id) == String(selectedChat))
  //       ?.members
  //   : [];

  useEffect(() => {
    dispatch(
      getAllChats({
        success: (_res: any) => {
          socket.getUnreadMsgCount(user.id)

          if (_res?.data?.userallchat.length > 0) {

            if (_res?.data?.userallchat[0]._id) {
              dispatch(
                setSelectedChat({ other: _res?.data?.userallchat[0]._id })
              );
            }
          }
        },
      })
    );
  }, [type]);

  const handleClick = (chat: any) => {
    if (String(chat?._id) !== String(selectedChat)) {
      dispatch(setSelectedChat({ other: chat._id }));
    }
  };

  return (
    <Grid container>
      {chat &&
        chat?.map((localChat: ChatListInterface, index: number) => {
          try {
            const chatMembers = [...localChat.members, ...localChat.removedMembers];
            if ('unreadCount' in localChat && roomMessageData != null) {
              if (roomMessageData.has(localChat._id)) {
                localChat.unreadCount = roomMessageData.get(localChat._id).unreadMessageCount

                localChat.lastMessage = roomMessageData.get(localChat._id).lastMessage
              }
            }

            if (chatMembers?.findIndex((item: any) => item?.id === user?.id) > -1) {
              return (

                <ChatListChip handleClick={handleClick} chat={localChat} key={index} />
              );
            } else {
              return null;
            }
          } catch (e: any) {
            console.log("Erros is ", e);
          }
        })}
    </Grid>
  );
};

export default ChatList;
