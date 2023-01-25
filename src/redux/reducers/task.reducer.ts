import { ActionInterface } from ".";
import { TASK_CONFIG } from "config/task.config";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { TaskInterface } from "constants/interfaces/task.interface";
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
    taskDetailDrawer:boolean
    subTaskopen: boolean
    selectedTaskId: string
    taskDrawerOpen: boolean
    allSubTaskList: SubtaskInterface[]
    loadingSubTask: boolean
    loadingSubTaskofTask: boolean
    allSubTaskOfTask: AllSubtasksOfTaskResult | any
    selectedTask: TaskInterface | any
    projectMembersOfSelectedTask:{label:string,id:string}[]
    taskAssignedToMembers:{label:string,id:string}[]
}

const intialStatue: TaskReducerInt = {
    projectMembersOfSelectedTask:[],
    taskAssignedToMembers:[],
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
taskDetailDrawer:false,
    selectedTask: {}
}

const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {

        // case requestSuccess(TASK_CONFIG.CREATE_TASK):
        //     return {
        //         ...state,
        //     }
        // case requestPending(TASK_CONFIG.CREATE_TASK): {
        //     return {
        //         ...state,
        //     };
        // }
        // case requestFail(TASK_CONFIG.CREATE_TASK): {
        //     return {
        //         ...state,
        //     };
        // }


        case requestSuccess(TASK_CONFIG.GET_TASK):
            return {
                ...state,
                allTask: action.payload.results.reverse(),
                // showAllTasks:action.payload
            }
        case requestPending(TASK_CONFIG.GET_TASK): {
            return {
                ...state,
                taskLoading: true,
            };
        }
        case requestFail(TASK_CONFIG.GET_TASK): {
            return {
                ...state,
                taskLoading: false,
            };
        }
        case TASK_CONFIG.OPEN_NEW_TASK:
            return {
                ...state,
                dialogOpen: true
            }
        case TASK_CONFIG.CLOSE_NEW_TASK:
            return {
                ...state,
                dialogOpen: false
            }
        case TASK_CONFIG.OPEN_TASK_DRAWER:
            return {
                ...state,
                taskDrawerOpen: true
            }
        case TASK_CONFIG.CLOSE_TASK_DRAWER:
            return {
                ...state,
                taskDrawerOpen: false,
            }

        case TASK_CONFIG.SET_SELECTED_TASK:
            return {
                ...state,
                //selectedTask: action.payload,
                allSubTaskOfTask:  {task: action.payload, subtasks: []}
            }

        case TASK_CONFIG.SELECTED_TASK_ID:
            return {
                ...state,
                selectedTaskId: action.payload
            }
        case requestSuccess(TASK_CONFIG.GET_ALL_SUBTASK_LIST):
            return {
                ...state,
                allSubTaskList: action.payload.results,
            }
        case requestPending(TASK_CONFIG.GET_ALL_SUBTASK_LIST): {
            return {
                ...state,
                loadingSubTask: true,
            };
        }
        case requestFail(TASK_CONFIG.GET_ALL_SUBTASK_LIST): {
            return {
                ...state,
                loadingSubTask: false,
            };
        }

        case requestPending(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                loadingSubTaskofTask: true,
            };
        }
        case requestFail(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                loadingSubTaskofTask: false,
            };
        }
        case requestSuccess(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK):
            return {
                ...state,
                allSubTaskOfTask: action.payload.results
            }
            case TASK_CONFIG.PROJECT_MEMBERS_OF_SELECTED_TASK:
                return {
                    ...state,
                    projectMembersOfSelectedTask: action.payload
                }
            case TASK_CONFIG.TASK_ASSIGNED_TO_MEMBERS:
                return {
                    ...state,
                    taskAssignedToMembers: action.payload
                }
    //    case OPEN_TASK_DETAIL_DRAWER:
    //         return {
    //             ...state,
    //             taskDetailDrawer: true
    //         }
    //         case CLOSE_TASK_DETAIL_DRAWER:
    //             return {
    //                 ...state,
    //                 taskDetailDrawer: false
    //             }

        default:
            return state
    }
}

export default TaskReducer