import {
  CLEAR_SELECTED_CHAT,
  PIN_MESSAGE,
  GET_CHAT,
  SEND_REPLY_MESSAGE,
  GET_MESSAGES,
  MUTE_CHAT,
  ADD_TO_FAVOURITE,
  PUSH_MESSAGE,
  SET_MESSAGE_READ,
  SET_SELECTED_CHAT,
  OPEN_QUESTIONIAR_DRAWER,
  CLOSE_QUESTIONIAR_DRAWER,
  SET_QUESTIONS,
  GET_ROOM_MEDIA
} from "../../config/chat.config";
import { createAction } from "./action";

export const getAllChats = createAction(GET_CHAT);
export const setSelectedChat = createAction(SET_SELECTED_CHAT);
export const clearSelectedChat = createAction(CLEAR_SELECTED_CHAT);
export const pushMessage = createAction(PUSH_MESSAGE);
export const getRoomMessages = createAction(GET_MESSAGES);
export const setMessagesRead = createAction(SET_MESSAGE_READ);
export const muteChat = createAction(MUTE_CHAT);
export const addToFavourite = createAction(ADD_TO_FAVOURITE);
export const sendReplyMessage = createAction(SEND_REPLY_MESSAGE);
export const pinMessage = createAction(PIN_MESSAGE);
export const getRoomMedia = createAction(GET_ROOM_MEDIA);

export const openQuestioniarDrawer = () => ({
  type: OPEN_QUESTIONIAR_DRAWER,
  payload: true,
});

export const closeQuestioniarDrawer = () => ({
  type: CLOSE_QUESTIONIAR_DRAWER,
  payload: false,
});

export const setQuestions = (payload: any) => ({
  type: SET_QUESTIONS,
  payload,
});
