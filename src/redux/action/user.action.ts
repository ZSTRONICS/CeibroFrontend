import {
  CLOSE_VIEW_INVITATIONS,
  GET_AVAILABLE_CHAT_USER,
  GET_AVAILABLE_USERS,
  GET_MY_CONNECTIONS_COUNT,
  OPEN_VIEW_INVITATIONS,
  RESEND_INVITATION,
  REVOKE_INVITAION,
  UPDATE_PROFILE_PIC,
  USER_CONFIG,
  DISABLE_REFRESH_CONNECTIONS,
} from 'config/user.config'
import {
  ACCEPT_INVITE,
  GET_MY_ALL_INVITES,
  SEND_INVITATION,
  GET_MY_CONNECTIONS,
  DELETE_MY_CONNECTION,
  ACCEPT_ALL_INVITES,
  GET_MY_INVITES_COUNT,
  GET_USER_BY_ID,
} from '../../config/user.config'
import { createAction } from './action'

export const userAction={
  getUsersByRole:createAction(USER_CONFIG.GET_USERS_BY_ROLE)
}

export const sendInvitation = createAction(SEND_INVITATION)
export const getMyAllInvites = createAction(GET_MY_ALL_INVITES)
export const resendInvites = createAction(RESEND_INVITATION)
export const revokeInvites = createAction(REVOKE_INVITAION)
export const acceptInvite = createAction(ACCEPT_INVITE)
export const getMyConnections = createAction(GET_MY_CONNECTIONS)
export const deleteMyConnection = createAction(DELETE_MY_CONNECTION)
export const acceptAllInvites = createAction(ACCEPT_ALL_INVITES)
export const getMyInvitesCount = createAction(GET_MY_INVITES_COUNT)
export const getUserById = createAction(GET_USER_BY_ID)
export const updateProfilePic = createAction(UPDATE_PROFILE_PIC)
export const getMyConnectionsCount = createAction(GET_MY_CONNECTIONS_COUNT)
export const getAvailableChatUsers = createAction(GET_AVAILABLE_CHAT_USER)
export const getAvailableUsers = createAction(GET_AVAILABLE_USERS)
export const openViewInvitations = createAction(OPEN_VIEW_INVITATIONS)
export const closeViewIvitations = createAction(CLOSE_VIEW_INVITATIONS)
export const resetRefresConnections = createAction(DISABLE_REFRESH_CONNECTIONS)
