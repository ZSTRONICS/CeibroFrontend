import { GET_CHAT } from "../../config/chat.config";
import { createAction } from "./action";


export const getAllChats = createAction(GET_CHAT);
