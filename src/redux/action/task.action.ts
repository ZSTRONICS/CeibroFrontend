import { TASK_CONFIG } from "config/task.config";
import { selectedTaskFilterType } from "redux/type";
import { createAction } from "./action";

const taskActions = {
  selectedTaskFilter: (taskFilter: selectedTaskFilterType) => {
    return {
      type: TASK_CONFIG.SELECTED_TASK_FILTER,
      payload: taskFilter,
    };
  },
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
  getAllTaskToMe: createAction(TASK_CONFIG.GET_ALL_TASK_TO_ME),
  getAllTaskFromMe: createAction(TASK_CONFIG.GET_ALL_TASK_FROM_ME),
  getAllTaskHidden: createAction(TASK_CONFIG.GET_ALL_TASK_HIDDEN),
};

export default taskActions;
