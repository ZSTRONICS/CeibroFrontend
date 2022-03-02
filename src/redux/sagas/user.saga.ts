import { put, takeLatest } from "redux-saga/effects";
import { GET_MY_ALL_INVITES, SEND_INVITATION } from "../../config/user.config";
import apiCall from "../../utills/apiCall";

const inviteUser = apiCall({
  type: SEND_INVITATION,
  method: "get",
  path: "/project/all",
});

const getMyAllInvites = apiCall({
  type: GET_MY_ALL_INVITES,
  method:"get",
  path:"/users/invite"
});


function* projectSaga() {
  yield takeLatest(SEND_INVITATION, inviteUser);
  yield takeLatest(GET_MY_ALL_INVITES,getMyAllInvites)
}

export default projectSaga;
