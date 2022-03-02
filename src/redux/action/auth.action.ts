import { REGISTER } from "redux-persist/es/constants";
import {
  LOGIN,
  GET_USERS,
  CREATE_ROOM,
  LOGOUT,
  GET_PROFILE,
  UPDATE_MY_PROFILE
} from "../../config/auth.config";

import { createAction } from "./action";

export const loginRequest = createAction(LOGIN);
export const registerRequest = createAction(REGISTER);
export const logoutUser = createAction(LOGOUT);

export const getAllusers = createAction(GET_USERS);
export const createChatRoom = createAction(CREATE_ROOM);

export const getMyProfile = createAction(GET_PROFILE);
export const updateMyProfile = createAction(UPDATE_MY_PROFILE);

