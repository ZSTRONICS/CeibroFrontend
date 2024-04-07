import { takeLatest } from 'redux-saga/effects'
import {
  ACCEPT_ALL_INVITES,
  ACCEPT_INVITE,
  DELETE_MY_CONNECTION,
  GET_AVAILABLE_CHAT_USER,
  GET_AVAILABLE_USERS,
  GET_MY_ALL_INVITES,
  GET_MY_CONNECTIONS,
  GET_USER_BY_ID,
  RESEND_INVITATION,
  REVOKE_INVITAION,
  SEND_INVITATION,
  UPDATE_PROFILE_PIC,
  USER_CONFIG
} from '../../config/user.config'
import apiCall from '../../utills/apiCall'

const getUserContacts = apiCall({
  useV2Route: true,
  type: USER_CONFIG.GET_USER_CONTACTS,
  method: 'get',
  path: payload => `users/contacts`,
})
const deleteUser = apiCall({
  useV2Route: true,
  type: USER_CONFIG.DELETE_USER,
  method: 'delete',
  path: "users/deleteUser",
})

const getRecentUserContacts = apiCall({
  useV2Route: true,
  type: USER_CONFIG.GET_RECENT_USER_CONTACTS,
  method: 'get',
  path: payload => `users/recent/contacts`,
})

const inviteUser = apiCall({
  useV2Route: false,
  type: SEND_INVITATION,
  method: 'post',
  path: '/users/invite',
})

const getMyAllInvites = apiCall({
  useV2Route: false,
  type: GET_MY_ALL_INVITES,
  method: 'get',
  path: '/users/invite',
})

const resendInvites = apiCall({
  useV2Route: false,
  type: RESEND_INVITATION,
  method: 'post',
  path: 'users/reInvite',
})

const revokeInvites = apiCall({
  useV2Route: false,
  type: REVOKE_INVITAION,
  method: 'post',
  path: 'users/revokeInvite',
})

const acceptInvite = apiCall({
  useV2Route: false,
  type: ACCEPT_INVITE,
  method: 'post',
  path: payload => `users/invite/accept/${payload?.other?.accepted}/${payload?.other?.inviteId}`,
})

const getMyConnections = apiCall({
  useV2Route: false,
  type: GET_MY_CONNECTIONS,
  method: 'get',
  path: '/users/connections',

})

const deleteMyConnection = apiCall({
  useV2Route: false,
  type: DELETE_MY_CONNECTION,
  method: 'delete',
  path: (payload: any) => {
    let url = `/users/connection/${payload?.other?._id}`

    const params: string = Object.keys(payload.params).map(
      key => `${key}=${payload.params[key]}&`
    )[0]

    return params ? `${url}?${params.substring(-1)}` : url
  },
})

const acceptAllInvite = apiCall({
  useV2Route: false,
  type: ACCEPT_ALL_INVITES,
  method: 'post',
  path: payload => `users/invite/accept-all/${payload?.other?.accepted}`,
})

const getUsersByRole = apiCall({
  useV2Route: false,
  type: USER_CONFIG.GET_USERS_BY_ROLE,
  method: 'get',
  path: payload => `/users?role=${payload.other.role}`,
})

const getUserById = apiCall({
  useV2Route: false,
  type: GET_USER_BY_ID,
  method: 'get',
  path: payload => `/users/${payload.other.userId}`,
})

const updateProfilePic = apiCall({
  useV2Route: false,
  type: UPDATE_PROFILE_PIC,
  method: 'patch',
  isFormData: true,
  path: `/users/profile/pic`,
})

const getAvailableChatUsers = apiCall({
  useV2Route: false,
  type: GET_AVAILABLE_CHAT_USER,
  method: 'get',
  path: (payload: any) => `/chat/member/available/${payload?.other}`,
})

const getAvailableUsers = apiCall({
  useV2Route: false,
  type: GET_AVAILABLE_USERS,
  method: 'get',

  path: payload => {
    let url = `/users/available`
    url = `${url}?includeMe=true`
    return url
  },
})

function* userSaga() {
  yield takeLatest(USER_CONFIG.GET_USER_CONTACTS, getUserContacts)
  yield takeLatest(USER_CONFIG.DELETE_USER, deleteUser)
  yield takeLatest(USER_CONFIG.GET_RECENT_USER_CONTACTS, getRecentUserContacts)
  yield takeLatest(RESEND_INVITATION, resendInvites)
  yield takeLatest(REVOKE_INVITAION, revokeInvites)
  yield takeLatest(SEND_INVITATION, inviteUser)
  yield takeLatest(GET_MY_ALL_INVITES, getMyAllInvites)
  yield takeLatest(ACCEPT_INVITE, acceptInvite)
  yield takeLatest(GET_MY_CONNECTIONS, getMyConnections)
  yield takeLatest(USER_CONFIG.GET_USERS_BY_ROLE, getUsersByRole)
  yield takeLatest(DELETE_MY_CONNECTION, deleteMyConnection)
  yield takeLatest(ACCEPT_ALL_INVITES, acceptAllInvite)
  yield takeLatest(GET_USER_BY_ID, getUserById)
  yield takeLatest(UPDATE_PROFILE_PIC, updateProfilePic)
  yield takeLatest(GET_AVAILABLE_CHAT_USER, getAvailableChatUsers)
  yield takeLatest(GET_AVAILABLE_USERS, getAvailableUsers)


}

export default userSaga
