import { GET_CHAT, PUSH_MESSAGE } from "../../config/chat.config";
import { createAction } from "./action";


export const getAllChats = createAction(GET_CHAT);
export const pushMessage = createAction(PUSH_MESSAGE);
