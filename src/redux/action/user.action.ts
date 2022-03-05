import { GET_AVAILABLE_CHAT_USER, GET_MY_CONNECTIONS_COUNT, UPDATE_PROFILE_PIC } from "config/user.config";
import {
  ACCEPT_INVITE,
  GET_MY_ALL_INVITES,
  SEND_INVITATION,
  GET_MY_CONNECTIONS,
  ACCEPT_ALL_INVITES,
  GET_MY_INVITES_COUNT,
  GET_USER_BY_ID,
} from "../../config/user.config";
import { createAction } from "./action";

export const sendInvitation = createAction(SEND_INVITATION);
export const getMyAllInvites = createAction(GET_MY_ALL_INVITES);
export const acceptInvite = createAction(ACCEPT_INVITE);
export const getMyConnections = createAction(GET_MY_CONNECTIONS);
export const acceptAllInvites = createAction(ACCEPT_ALL_INVITES);
export const getMyInvitesCount = createAction(GET_MY_INVITES_COUNT);
export const getUserById = createAction(GET_USER_BY_ID);
export const updateProfilePic = createAction(UPDATE_PROFILE_PIC);
export const getMyConnectionsCount = createAction(GET_MY_CONNECTIONS_COUNT);
export const getAvailableChatUsers = createAction(GET_AVAILABLE_CHAT_USER);
