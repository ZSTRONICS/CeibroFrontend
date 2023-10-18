import { TASK_CONFIG } from "config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const createTask = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.CREATE_TASK,
  method: "post",
  isFormData: true,
  path: (payload) => `/task/files?hasFiles=${payload.other.hasFiles}`
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
  path: (payload) => `/task/sync/${payload.other.syncTime}`
})

const getAllTasksAllEvents = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.GET_ALL_TASKS_ALL_EVENTS,
  method: "get",
  path: (payload) => `task/syncTask/2023-10-17T16:13:41.345Z`
})

const syncTaskEventsByTaskId = apiCall({
  useV2Route: true,
  type: TASK_CONFIG.SYNC_TASK_EVENTS_BY_TASK_ID,
  method: "post",
  path: (payload) => `/task/syncEvents/${payload.other.taskId}`
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
  yield takeLatest(TASK_CONFIG.GET_ALL_TASKS_ALL_EVENTS, getAllTasksAllEvents)
  yield takeLatest(TASK_CONFIG.SYNC_TASK_EVENTS_BY_TASK_ID, syncTaskEventsByTaskId)
  yield takeLatest(TASK_CONFIG.UPLOAD_TASK_DOCS, uploadDocs)
  yield takeLatest(TASK_CONFIG.FORWARD_TASK, forwardTask)
  yield takeLatest(TASK_CONFIG.TASK_SEEN, taskSeen)
  yield takeLatest(TASK_CONFIG.TASK_HIDE, taskHide)
  yield takeLatest(TASK_CONFIG.TASK_SHOW, taskShow)
  yield takeLatest(TASK_CONFIG.TASK_CANCELED, taskCaneled)
  yield takeLatest(TASK_CONFIG.TASK_UN_CANCEL, taskUnCanel)
  yield takeLatest(TASK_CONFIG.TASK_EVENT_WITH_FILES, taskEventsWithFiles)
}

export default taskSaga