import { GET_CHAT, GET_MESSAGES, PUSH_MESSAGE, SET_SELECTED_CHAT } from "../../config/chat.config";
import { createAction } from "./action";


export const getAllChats = createAction(GET_CHAT);
export const setSelectedChat = createAction(SET_SELECTED_CHAT);
export const pushMessage = createAction(PUSH_MESSAGE);
export const getRoomMessages = createAction(GET_MESSAGES);
