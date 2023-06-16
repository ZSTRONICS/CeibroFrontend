import { all } from "@redux-saga/core/effects";
import projectSaga from "./project.sagas";
import authSaga from "./auth.saga";
import chatSaga from "./chat.saga";
import userSaga from "./user.saga";
import taskSaga from './task.saga';
import docsSaga from "./docs.saga";

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), chatSaga(), userSaga(), taskSaga(), docsSaga()]);
  // code after all-effect
}
