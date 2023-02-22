import { TASK_CONFIG } from "config/task.config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const createTask = apiCall({
  type: TASK_CONFIG.CREATE_TASK,
  method: "post",
  path: "/task/",
})

const uploadDocs = apiCall({
  type: TASK_CONFIG.UPLOAD_TASK_DOCS,
  isFormData: true,
  method: "post",
  path: "/docs/uploadFiles",
})

const createSubTask = apiCall({
  type: TASK_CONFIG.CREATE_SUB_TASK,
  method: "post",
  path: "/task/subtask",
})
const taskSubtaskStateChange = apiCall({
  type: TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE,
  method: "post",
  path: "/task/st/statechange",
})

const getTask = apiCall({
  type: TASK_CONFIG.GET_TASK,
  method: "get",
  path: "/task?state=all&isMultiTask=false&noPaginate=true",
});

const getAllSubTask = apiCall({
  type: TASK_CONFIG.GET_ALL_SUBTASK_LIST,
  method: "get",
  path: '/task/subtask?state=all&noPaginate=true',
});

const getAllSubTaskOfTask = apiCall({
  type: TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK,
  method: "get",
  path: (payload) => {
    let url = `/task/${payload.other.taskId}?noPaginate=true`
    return url
  }
});

const getAllSubTaskRejection = apiCall({
  type: TASK_CONFIG.GET_ALL_SUBTASK_REJECTION,
  method: "get",
  path: (payload) => {
    let url = `/task/st/getRejections/${payload.other.subtaskId}`
    return url
  }
});

const patchSubTaskById = apiCall({
  type: TASK_CONFIG.PATCH_SUB_TASK_BY_ID,
  method: "patch",
  path: (payload) => {
    let url = `/task/subTask/${payload.other}`
    return url
  }
});

const deleteTask = apiCall({
  type: TASK_CONFIG.DELETE_TASK,
  method: "delete",
  path: (payload) => {
    let url = `/task/${payload.other}`
    return url
  }
});

function* taskSaga() {
  yield takeLatest(TASK_CONFIG.CREATE_TASK, createTask)
  yield takeLatest(TASK_CONFIG.UPLOAD_TASK_DOCS, uploadDocs)
  yield takeLatest(TASK_CONFIG.GET_TASK, getTask)
  yield takeLatest(TASK_CONFIG.CREATE_SUB_TASK, createSubTask)
  yield takeLatest(TASK_CONFIG.DELETE_TASK, deleteTask)
  yield takeLatest(TASK_CONFIG.PATCH_SUB_TASK_BY_ID, patchSubTaskById)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_LIST, getAllSubTask)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK, getAllSubTaskOfTask)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION, getAllSubTaskRejection)
  yield takeLatest(TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE, taskSubtaskStateChange)
}

export default taskSaga