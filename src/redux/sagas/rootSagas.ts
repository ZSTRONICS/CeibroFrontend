import { all } from "@redux-saga/core/effects";
import projectSaga from './project.sagas';
import authSaga from './auth.saga';
import chatSaga from './chat.saga';

export default function* rootSaga() {
    yield all([
        projectSaga(),
        authSaga(),
        chatSaga()
    ])
    // code after all-effect
  }