import { CREATE_TASK, GET_ALL_SUBTASK_LIST, GET_ALL_SUBTASK_OF_TASK, GET_TASK } from "config/task.config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const createTask = apiCall({
  type: CREATE_TASK,
  method: "post",
  path: "/task/",
})
const getTask = apiCall({
    type: GET_TASK,
    method: "get",
    path: "/task?state=all&isMultiTask=false&noPaginate=true",
  });
const getAllSubTask = apiCall({
    type: GET_ALL_SUBTASK_LIST,
    method: "get",
    path: '/task/subtask?state=all',
  });
const getAllSubTaskOfTask = apiCall({
    type: GET_ALL_SUBTASK_OF_TASK,
    method: "get",
    path: (payload) => {
      let url = `/task/${payload.other.taskId}`;
      return url
    }
  });

function* taskSaga() {
    yield takeLatest(GET_TASK, getTask)
    yield takeLatest(CREATE_TASK, createTask)
    yield takeLatest(GET_ALL_SUBTASK_LIST, getAllSubTask)
    yield takeLatest(GET_ALL_SUBTASK_OF_TASK, getAllSubTaskOfTask)
  }

 export default taskSaga