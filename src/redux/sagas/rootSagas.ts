import { all } from "@redux-saga/core/effects";
import authSaga from "./auth.saga";
import docsSaga from "./docs.saga";
import projectSaga from "./project.sagas";
import taskSaga from './task.saga';
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), userSaga(), taskSaga(), docsSaga()]);
  // code after all-effect
}
