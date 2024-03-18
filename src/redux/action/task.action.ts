import { TASK_CONFIG } from "config/task.config";
import { ITaskFilterInterace } from "constants/interfaces";
import { selectedTaskFilterType } from "redux/type";
import { createAction } from "./action";

const taskActions = {
  selectedTaskFilter: (taskFilter: selectedTaskFilterType) => {
    return {
      type: TASK_CONFIG.SELECTED_TASK_FILTER,
      payload: taskFilter,
    };
  },
  updateDrawingFilters: (drawingTaskFilter: ITaskFilterInterace) => {
    return {
      type: TASK_CONFIG.UPDATE_DRAWING_TASK_FILTERS,
      payload: drawingTaskFilter,
    };
  },
  resetDrawingFilters: () => {
    return {
      type: TASK_CONFIG.UPDATE_DRAWING_RESET_TASK_FILTERS,
    };
  },
  getAllTasksAllEvents: createAction(TASK_CONFIG.GET_ALL_TASKS_ALL_EVENTS),
  getAllTaskFiles: createAction(TASK_CONFIG.GET_ALL_TASK_FILES),
  syncTaskEventsByTaskId: createAction(TASK_CONFIG.SYNC_TASK_EVENTS_BY_TASK_ID),
  syncAllTasks: createAction(TASK_CONFIG.SYNC_ALL_TASKS),
  createTask: createAction(TASK_CONFIG.CREATE_TASK),
  createTopic: createAction(TASK_CONFIG.CREATE_TOPIC),
  getAllTopic: createAction(TASK_CONFIG.GET_ALL_TOPIC),
  deleteTopic: createAction(TASK_CONFIG.DELETE_TOPIC),
  forwardTask: createAction(TASK_CONFIG.FORWARD_TASK),
  taskSeen: createAction(TASK_CONFIG.TASK_SEEN),
  taskHide: createAction(TASK_CONFIG.TASK_HIDE),
  taskShow: createAction(TASK_CONFIG.TASK_SHOW),
  taskCaneled: createAction(TASK_CONFIG.TASK_CANCELED),
  taskUnCanel: createAction(TASK_CONFIG.TASK_UN_CANCEL),
  taskEventsWithFiles: createAction(TASK_CONFIG.TASK_EVENT_WITH_FILES),
  pinUnPinTaskComment: createAction(TASK_CONFIG.PIN_UNPIN_TASK_COMMENT),
  taskApprove: createAction(TASK_CONFIG.TASK_APPROVE),
  taskRejectReopen: createAction(TASK_CONFIG.TASK_REJECTED_REOPEN),
  taskRejectClose: createAction(TASK_CONFIG.TASK_REJECTED_CLOSE),
};

export default taskActions;
