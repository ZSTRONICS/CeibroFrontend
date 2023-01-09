import { GET_TASK } from "config/task.config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const getTask = apiCall({
    type: GET_TASK,
    method: "get",
    path: "/task",
  });

function* taskSaga() {
    yield takeLatest(GET_TASK, getTask)
  }

 export default taskSaga