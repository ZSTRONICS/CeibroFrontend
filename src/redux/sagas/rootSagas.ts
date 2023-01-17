import { all } from "@redux-saga/core/effects";
import projectSaga from "./project.sagas";
import authSaga from "./auth.saga";
import chatSaga from "./chat.saga";
import userSaga from "./user.saga";
import taskSaga from './task.saga';

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), chatSaga(), userSaga(), taskSaga()]);
  // code after all-effect
}
