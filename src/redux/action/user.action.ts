import {
  CLOSE_VIEW_INVITATIONS,
  GET_AVAILABLE_CHAT_USER,
  GET_AVAILABLE_USERS,
  RESEND_INVITATION,
  REVOKE_INVITAION,
  UPDATE_PROFILE_PIC,
  USER_CONFIG
} from 'config/user.config'
import {
  ACCEPT_ALL_INVITES,
  ACCEPT_INVITE,
  DELETE_MY_CONNECTION,
  GET_MY_ALL_INVITES,
  GET_MY_CONNECTIONS,
  GET_USER_BY_ID,
  SEND_INVITATION,
} from '../../config/user.config'
import { createAction } from './action'

export const userApiAction = {
  getUsersByRole: createAction(USER_CONFIG.GET_USERS_BY_ROLE),
  getUserContacts: createAction(USER_CONFIG.GET_USER_CONTACTS),
  getRecentContacts: createAction(USER_CONFIG.GET_RECENT_USER_CONTACTS)
}

export const sendInvitation = createAction(SEND_INVITATION)
export const getMyAllInvites = createAction(GET_MY_ALL_INVITES)
export const resendInvites = createAction(RESEND_INVITATION)
export const revokeInvites = createAction(REVOKE_INVITAION)
export const acceptInvite = createAction(ACCEPT_INVITE)
export const getMyConnections = createAction(GET_MY_CONNECTIONS)
export const deleteMyConnection = createAction(DELETE_MY_CONNECTION)
export const acceptAllInvites = createAction(ACCEPT_ALL_INVITES)
export const getUserById = createAction(GET_USER_BY_ID)
export const updateProfilePic = createAction(UPDATE_PROFILE_PIC)
export const getAvailableChatUsers = createAction(GET_AVAILABLE_CHAT_USER)
export const getAvailableUsers = createAction(GET_AVAILABLE_USERS)
export const closeViewIvitations = createAction(CLOSE_VIEW_INVITATIONS)
