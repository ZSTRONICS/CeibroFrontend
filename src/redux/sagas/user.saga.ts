import { put, takeLatest } from "redux-saga/effects";
import { acceptAllInvites } from "redux/action/user.action";
import {
  ACCEPT_ALL_INVITES,
  ACCEPT_INVITE,
  GET_MY_ALL_INVITES,
  GET_MY_CONNECTIONS,
  GET_MY_INVITES_COUNT,
  GET_USER_BY_ID,
  SEND_INVITATION,
  UPDATE_PROFILE_PIC,
} from "../../config/user.config";
import apiCall from "../../utills/apiCall";

const inviteUser = apiCall({
  type: SEND_INVITATION,
  method: "post",
  path: "/users/invite",
});

const getMyAllInvites = apiCall({
  type: GET_MY_ALL_INVITES,
  method: "get",
  path: "/users/invite",
});
const acceptInvite = apiCall({
  type: ACCEPT_INVITE,
  method: "post",
  path: (payload) =>
    `users/invite/accept/${payload?.other?.accepted}/${payload?.other?.inviteId}`,
});

const getMyConnections = apiCall({
  type: GET_MY_CONNECTIONS,
  method: "get",
  path: "/users/connections",
});

const acceptAllInvite = apiCall({
  type: ACCEPT_ALL_INVITES,
  method: "post",
  path: (payload) => `users/invite/accept-all/${payload?.other?.accepted}`,
});

const getMyAllInviteCount = apiCall({
  type: GET_MY_INVITES_COUNT,
  method: "get",
  path: "/users/invite/count",
});

const getUserById = apiCall({
  type: GET_USER_BY_ID,
  method: "get",
  path: (payload) => `/users/${payload.other.userId}`,
});

const updateProfilePic = apiCall({
  type: UPDATE_PROFILE_PIC,
  method: "patch",
  isFormData: true,
  path: `/users/profile/pic`,
});

function* userSaga() {
  yield takeLatest(SEND_INVITATION, inviteUser);
  yield takeLatest(GET_MY_ALL_INVITES, getMyAllInvites);
  yield takeLatest(ACCEPT_INVITE, acceptInvite);
  yield takeLatest(GET_MY_CONNECTIONS, getMyConnections);
  yield takeLatest(GET_MY_CONNECTIONS, getMyConnections);
  yield takeLatest(GET_MY_CONNECTIONS, getMyConnections);
  yield takeLatest(ACCEPT_ALL_INVITES, acceptAllInvite);
  yield takeLatest(GET_MY_INVITES_COUNT, getMyAllInviteCount);
  yield takeLatest(GET_USER_BY_ID, getUserById);
  yield takeLatest(UPDATE_PROFILE_PIC, updateProfilePic);
}

export default userSaga;