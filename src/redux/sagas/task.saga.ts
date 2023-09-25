import { TASK_CONFIG } from "config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const createTask = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.CREATE_TASK,
  method: "post",
  path: "/task",
})

const createTopic = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.CREATE_TOPIC,
  method: "post",
  path: "/task/topic",
})
const syncAllTasks = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.SYNC_ALL_TASKS,
  method: "get",
  path: "/task/sync/2020-01-05T17:01:40.038Z"
})

const getAllTopic = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.GET_ALL_TOPIC,
  method: "get",
  path: "/task/topic",
})

const deleteTopic = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.DELETE_TOPIC,
  method: "delete",
  path: (payload) => `/task/topic/${payload.other.topicId}`
})

const forwardTask = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.FORWARD_TASK,
  method: "post",
  path: (payload) => `/task/forward/${payload.other.taskId}`
})

const taskSeen = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.TASK_SEEN,
  method: "post",
  path: (payload) => `/task/seen/${payload.other.taskId}`
})

const taskHide = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.TASK_HIDE,
  method: "post",
  path: (payload) => `/task/hide/${payload.other.taskId}`
})

const taskShow = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.TASK_SHOW,
  method: "post",
  path: (payload) => `/task/unhide/${payload.other.taskId}`
})

const taskCaneled = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.TASK_CANCELED,
  method: "post",
  path: (payload) => `/task/cancel/${payload.other.taskId}`
})

const taskUnCanel = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.TASK_UN_CANCEL,
  method: "post",
  path: (payload) => `/task/uncancel/${payload.other.taskId}`
})

const taskEventsWithFiles = apiCall({
  useV2Route: true,
  isFormData: true,
  type: TASK_CONFIG.TASK_EVENT_WITH_FILES,
  method: "post",
  path: (payload) => `/task/upload/${payload.other.eventName}/${payload.other.taskId}?hasFiles=${payload.other.hasFiles}`  // eventName = [comment, doneTask]
})

// get task assigned to me 
const getAllTaskToMe = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.GET_ALL_TASK_TO_ME,
  method: "get",
  path: "/task/to-me",
})

// get task created from me 
const getAllTaskFromMe = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.GET_ALL_TASK_FROM_ME,
  method: "get",
  path: "/task/from-me",
})

// get task created from me 
const getAllTaskHidden = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.GET_ALL_TASK_HIDDEN,
  method: "get",
  path: "/task/hidden",
})

const uploadDocs = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.UPLOAD_TASK_DOCS,
  isFormData: true,
  method: "post",
  path: "/docs/uploadFiles",
})

function* taskSaga() {
  // topic
  yield takeLatest(TASK_CONFIG.CREATE_TOPIC, createTopic)
  yield takeLatest(TASK_CONFIG.GET_ALL_TOPIC, getAllTopic)
  yield takeLatest(TASK_CONFIG.DELETE_TOPIC, deleteTopic)
  // task
  yield takeLatest(TASK_CONFIG.CREATE_TASK, createTask)
  yield takeLatest(TASK_CONFIG.SYNC_ALL_TASKS, syncAllTasks)
  yield takeLatest(TASK_CONFIG.UPLOAD_TASK_DOCS, uploadDocs)
  yield takeLatest(TASK_CONFIG.FORWARD_TASK, forwardTask)
  yield takeLatest(TASK_CONFIG.TASK_SEEN, taskSeen)
  yield takeLatest(TASK_CONFIG.TASK_HIDE, taskHide)
  yield takeLatest(TASK_CONFIG.TASK_SHOW, taskShow)
  yield takeLatest(TASK_CONFIG.TASK_CANCELED, taskCaneled)
  yield takeLatest(TASK_CONFIG.TASK_UN_CANCEL, taskUnCanel)
  yield takeLatest(TASK_CONFIG.TASK_EVENT_WITH_FILES, taskEventsWithFiles)

  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_TO_ME, getAllTaskToMe)
  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_FROM_ME, getAllTaskFromMe)
  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_HIDDEN, getAllTaskHidden)

}

export default taskSaga