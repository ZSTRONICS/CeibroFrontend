import { TASK_CONFIG } from "config/task.config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const createTask = apiCall({
  type: TASK_CONFIG.CREATE_TASK,
  method: "post",
  path: "/task/",
})

const createSubTask = apiCall({
  type: TASK_CONFIG.CREATE_SUB_TASK,
  method: "post",
  path: "/task/subtask",
})

const getTask = apiCall({
    type: TASK_CONFIG.GET_TASK,
    method: "get",
    path: "/task?state=all&isMultiTask=false&noPaginate=true",
  });

const getAllSubTask = apiCall({
    type: TASK_CONFIG.GET_ALL_SUBTASK_LIST,
    method: "get",
    path: '/task/subtask?state=all',
  });

const getAllSubTaskOfTask = apiCall({
    type: TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK,
    method: "get",
    path: (payload) => {
      let url = `/task/${payload.other.taskId}`;
      return url
    }
  });

function* taskSaga() {
  yield takeLatest(TASK_CONFIG.CREATE_TASK, createTask)
  yield takeLatest(TASK_CONFIG.GET_TASK, getTask)
  yield takeLatest(TASK_CONFIG.CREATE_SUB_TASK, createSubTask)
    yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_LIST, getAllSubTask)
    yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK, getAllSubTaskOfTask)
  }

 export default taskSaga