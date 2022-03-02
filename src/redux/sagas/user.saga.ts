import { put, takeLatest } from "redux-saga/effects";
import { SEND_INVITATION } from "../../config/user.config";
import apiCall from "../../utills/apiCall";

const inviteUser = apiCall({
  type: SEND_INVITATION,
  method: "post",
  path: "/users/invite",
});

function* userSaga() {
  yield takeLatest(SEND_INVITATION, inviteUser);
}

export default userSaga;
