import { LOGIN, GET_USERS, CREATE_ROOM } from "../../config/auth.config"
import { createAction } from "./action"


export const loginRequest = createAction(LOGIN);

export const  getAllusers = createAction(GET_USERS)
export const  createChatRoom = createAction(CREATE_ROOM)
