import { put, takeLatest } from "redux-saga/effects";
import { SEND_INVITATION } from "../../config/user.config";
import apiCall from "../../utills/apiCall";

const inviteUser = apiCall({
  type: SEND_INVITATION,
  method: "get",
  path: "/project/all",
});

function* projectSaga() {
  yield takeLatest(SEND_INVITATION, inviteUser);
}

export default projectSaga;
