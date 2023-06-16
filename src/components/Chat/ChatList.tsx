import React, { useEffect, useState } from "react";
import ChatListChip from "../Utills/ChatChip/ChatListChip";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChats,
  getPinnedMessages,
  getRoomMedia,
  getRoomMessages,
  getRoomQuestioniars,
  setSelectedChat,
} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers/appReducer";
import { ChatListInterface } from "../../constants/interfaces/chat.interface";
import { Grid } from "@material-ui/core";
import { socket } from "services/socket.services";


const ChatList = (props:any) => {
  const dispatch = useDispatch();
  const {chatList}= props
  const {type, selectedChatId } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const { roomMessageData } = useSelector((state: RootState) => state.chat);
  //   const members = selectedChatId
  //   ? chat.find((room: any) => String(room._id) == String(selectedChatId))
  //       ?.members
  //   : [];
  const startChatRoom = (roomId: string) => {
    dispatch(
      getRoomMessages({
        other: {
          roomId: roomId,
          limit: 20,
        },
        // success: (res:any) => {
        //  },
      })
    );

    dispatch(
      getRoomMedia({
        other: roomId,
      })
    );
    dispatch(
      getPinnedMessages({
        other: roomId,
      })
    );
    const payload = {
      other: roomId,
    };
    dispatch(getRoomQuestioniars(payload));

    dispatch(setSelectedChat({ other: roomId }));
  };

  useEffect(() => {
    dispatch(
      getAllChats({
        success: (_res: any) => {
          if (_res?.data?.userallchat.length === 0) {
            dispatch(setSelectedChat({ other: null }));
          }
          else {
            startChatRoom(_res?.data?.userallchat[0]._id);
          }
        },
      })
    );
  }, [type]);

  const handleClick = (chat: any) => {
    if (String(chat?._id) !== String(selectedChatId)) {
      startChatRoom(chat._id);
    }
  };

  return (
    <Grid container>
      {chatList &&
        chatList?.map((localChat: ChatListInterface, index: number) => {
          try {
            const chatMembers = [
              ...localChat.members,
              ...localChat.removedMembers,
            ];
            if ("unreadCount" in localChat && roomMessageData != null) {
              if (roomMessageData.has(localChat._id)) {
                localChat.unreadCount = roomMessageData.get(
                  localChat._id
                ).unreadMessageCount;
                localChat.lastMessage = roomMessageData.get(
                  localChat._id
                ).lastMessage;
              }
            }

            if (
              chatMembers?.findIndex((item: any) => item?._id === user?._id) > -1
            ) {
              return (
                <ChatListChip
                  handleClick={handleClick}
                  chat={localChat}
                  key={index}
                />
              );
            } else {
              return null;
            }
          } catch (e: any) {
            console.error("Erros is ", e);
          }
        })}
    </Grid>
  );
};




export default ChatList;

