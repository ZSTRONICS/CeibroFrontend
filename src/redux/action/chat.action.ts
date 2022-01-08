import { CLEAR_SELECTED_CHAT, GET_CHAT, GET_MESSAGES, MUTE_CHAT, ADD_TO_FAVOURITE, PUSH_MESSAGE, SET_MESSAGE_READ, SET_SELECTED_CHAT } from "../../config/chat.config";
import { createAction } from "./action";

export const getAllChats = createAction(GET_CHAT);
export const setSelectedChat = createAction(SET_SELECTED_CHAT);
export const clearSelectedChat = createAction(CLEAR_SELECTED_CHAT);
export const pushMessage = createAction(PUSH_MESSAGE);
export const getRoomMessages = createAction(GET_MESSAGES);
export const setMessagesRead = createAction(SET_MESSAGE_READ);
export const muteChat = createAction(MUTE_CHAT);
export const addToFavourite = createAction(ADD_TO_FAVOURITE);
