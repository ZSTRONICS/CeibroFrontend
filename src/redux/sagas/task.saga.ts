import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";
import { TASK_CONFIG } from "config";

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

const taskEventsWithFiles = apiCall({
  useV2Route: true,
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

const createSubTask = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.CREATE_SUB_TASK,
  method: "post",
  path: "/task/subtask",
})
const taskSubtaskStateChange = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE,
  method: "post",
  path: "/task/st/statechange",
})


const getAllSubTask = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.GET_ALL_SUBTASK_LIST,
  method: "get",
  path: '/task/subtask?state=all&noPaginate=true',
});

const getAllSubTaskOfTask = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK,
  method: "get",
  path: (payload) => {
    let url = `/task/${payload.other.taskId}?noPaginate=true`
    return url
  }
});

const getAllSubTaskRejection = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.GET_ALL_SUBTASK_REJECTION,
  method: "get",
  path: (payload) => {
    let url = `/task/st/getRejections/${payload.other.subtaskId}`
    return url
  }
});

const updateTaskById = apiCall({
  useV2Route: false,

  type: TASK_CONFIG.UPDATE_TASK_BY_ID,
  method: "patch",
  path: (payload) => {
    let url = `/task/${payload.other}`
    return url
  }
});


const patchSubTaskById = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.PATCH_SUB_TASK_BY_ID,
  method: "patch",
  path: (payload) => {
    let url = `/task/subTask/${payload.other}`
    return url
  }
});

const deleteTask = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.DELETE_TASK,
  method: "delete",
  path: (payload) => {
    let url = `/task/${payload.other}`
    return url
  }
});
const deleteSubtask = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.DELETE_SUBTASK,
  method: "delete",
  path: (payload) => {
    let url = `/task/subtask/${payload.other}`
    return url
  }
});

const deleteSubtaskMember = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.DELETE_SUBTASK_MEMBER,
  method: "post",
  path: '/task/st/removeMember'
});

const subtaskMemberMarkAsDone = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.SUBTASK_MEMBER_MARK_AS_DONE,
  method: 'post',
  path: '/task/st/markAsDone'
});

const postSubtaskComment = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.POST_SUBTASK_COMMENT,
  method: 'post',
  path: '/task/st/comment'
});

const getAllCommentsOfSubtaskById = apiCall({
  useV2Route: false,
  type: TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID,
  method: 'get',
  path: (payload) => {
    let url = `/task/st/comment/${payload.other}`
    return url
  }
});

function* taskSaga() {
  // topic
  yield takeLatest(TASK_CONFIG.CREATE_TOPIC, createTopic)
  yield takeLatest(TASK_CONFIG.GET_ALL_TOPIC, getAllTopic)
  yield takeLatest(TASK_CONFIG.DELETE_TOPIC, deleteTopic)
  // task
  yield takeLatest(TASK_CONFIG.CREATE_TASK, createTask)
  yield takeLatest(TASK_CONFIG.UPLOAD_TASK_DOCS, uploadDocs)
  yield takeLatest(TASK_CONFIG.FORWARD_TASK, forwardTask)
  yield takeLatest(TASK_CONFIG.TASK_SEEN, taskSeen)
  yield takeLatest(TASK_CONFIG.TASK_HIDE, taskHide)
  yield takeLatest(TASK_CONFIG.TASK_SHOW, taskShow)
  yield takeLatest(TASK_CONFIG.TASK_CANCELED, taskCaneled)
  yield takeLatest(TASK_CONFIG.TASK_EVENT_WITH_FILES, taskEventsWithFiles)

  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_TO_ME, getAllTaskToMe)
  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_FROM_ME, getAllTaskFromMe)
  yield takeLatest(TASK_CONFIG.GET_ALL_TASK_HIDDEN, getAllTaskHidden)

  yield takeLatest(TASK_CONFIG.CREATE_SUB_TASK, createSubTask)
  yield takeLatest(TASK_CONFIG.DELETE_TASK, deleteTask)
  yield takeLatest(TASK_CONFIG.DELETE_SUBTASK_MEMBER, deleteSubtaskMember)
  yield takeLatest(TASK_CONFIG.DELETE_SUBTASK, deleteSubtask)
  yield takeLatest(TASK_CONFIG.SUBTASK_MEMBER_MARK_AS_DONE, subtaskMemberMarkAsDone)
  yield takeLatest(TASK_CONFIG.PATCH_SUB_TASK_BY_ID, patchSubTaskById)
  yield takeLatest(TASK_CONFIG.UPDATE_TASK_BY_ID, updateTaskById)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_LIST, getAllSubTask)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK, getAllSubTaskOfTask)
  yield takeLatest(TASK_CONFIG.POST_SUBTASK_COMMENT, postSubtaskComment)
  yield takeLatest(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID, getAllCommentsOfSubtaskById)
  yield takeLatest(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION, getAllSubTaskRejection)
  yield takeLatest(TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE, taskSubtaskStateChange)
}

export default taskSaga