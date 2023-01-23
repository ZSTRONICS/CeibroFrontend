import { ActionInterface } from ".";
import {
    GET_TASK, OPEN_NEW_TASK, CLOSE_NEW_TASK,
    OPEN_TASK_DRAWER,
    CLOSE_TASK_DRAWER,
    SELECTED_TASK_ID,
    GET_ALL_SUBTASK_LIST,
    GET_ALL_SUBTASK_OF_TASK,
    SET_SELECTED_TASK,
    CREATE_TASK,
} from '../../config/task.config'
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { State, TaskInterface } from "constants/interfaces/task.interface";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";

interface TaskReducerInt {
    // showAllTasks:TaskRoot[]
    allTask: TaskInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
    taskLoading: boolean
    dialogOpen: boolean
    subTaskopen: boolean
    selectedTaskId: string
    taskDrawerOpen: boolean
    allSubTaskList: SubtaskInterface[]
    loadingSubTask: boolean
    loadingSubTaskofTask: boolean
    allSubTaskOfTask: AllSubtasksOfTaskResult | any
    selectedTask: TaskInterface | any
}

const intialStatue: TaskReducerInt = {
    allSubTaskOfTask: {},
    allTask: [],
    allSubTaskList: [],

    loadingSubTaskofTask: false,
    subTaskopen: false,
    loadingSubTask: false,
    // showAllTasks:[],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
    taskLoading: false,
    dialogOpen: false,
    selectedTaskId: '',
    taskDrawerOpen: false,
    selectedTask: {}
}

const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {

        case requestSuccess(CREATE_TASK):
            console.log(action.payload);
            return {
                ...state,
            }
        case requestPending(CREATE_TASK): {
            return {
                ...state,
            };
        }
        case requestFail(CREATE_TASK): {
            console.log(action.payload);
            return {
                ...state,
            };
        }


        case requestSuccess(GET_TASK):
            return {
                ...state,
                allTask: action.payload.results.reverse(),
                // showAllTasks:action.payload
            }
        case requestPending(GET_TASK): {
            return {
                ...state,
                taskLoading: true,
            };
        }
        case requestFail(GET_TASK): {
            return {
                ...state,
                taskLoading: false,
            };
        }
        case OPEN_NEW_TASK:
            return {
                ...state,
                dialogOpen: true
            }
        case CLOSE_NEW_TASK:
            return {
                ...state,
                dialogOpen: false
            }
        case OPEN_TASK_DRAWER:
            return {
                ...state,
                taskDrawerOpen: true
            }
        case CLOSE_TASK_DRAWER:
            return {
                ...state,
                taskDrawerOpen: false,
            }

        case SET_SELECTED_TASK:
            return {
                ...state,
                //selectedTask: action.payload,
                allSubTaskOfTask:  {task: action.payload, subtasks: []}
            }

        case SELECTED_TASK_ID:
            return {
                ...state,
                selectedTaskId: action.payload
            }
        case requestSuccess(GET_ALL_SUBTASK_LIST):
            return {
                ...state,
                allSubTaskList: action.payload.results,
            }
        case requestPending(GET_ALL_SUBTASK_LIST): {
            return {
                ...state,
                loadingSubTask: true,
            };
        }
        case requestFail(GET_ALL_SUBTASK_LIST): {
            return {
                ...state,
                loadingSubTask: false,
            };
        }

        case requestPending(GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                loadingSubTaskofTask: true,
            };
        }
        case requestFail(GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                loadingSubTaskofTask: false,
            };
        }
        case requestSuccess(GET_ALL_SUBTASK_OF_TASK):
            return {
                ...state,
                allSubTaskOfTask: action.payload.results
            }
        default:
            return state
    }
}

export default TaskReducer