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
    taskDetailDrawer: boolean
    subTaskopen: boolean
    selectedTaskId: string
    taskDrawerOpen: boolean
    allSubTaskList: SubtaskInterface[]
    loadingSubTask: boolean
    loadingSubTaskofTask: boolean
    allSubTaskOfTask: AllSubtasksOfTaskResult | any
    projectMembersOfSelectedTask: { label: string, id: string }[]
    selectedTaskAdmins: { label: string, id: string }[]
    taskAssignedToMembers: { label: string, id: string }[]
}

const intialStatue: TaskReducerInt = {
    selectedTaskAdmins: [],
    projectMembersOfSelectedTask: [],
    taskAssignedToMembers: [],
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
    taskDetailDrawer: false
}

const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {

        case TASK_CONFIG.PUSH_TASK_TO_STORE:
            return {
                ...state,
                allTask: [action.payload, ...state.allTask],
                allSubTaskOfTask: { task: action.payload, subtasks: [] }
            }

        case TASK_CONFIG.UPDATE_TASK_IN_STORE:
            const index = state.allTask.findIndex(task => task._id === action.payload._id)
            if (index === -1) {
                state.allTask = [action.payload, ...state.allTask]
            } else {
                state.allTask[index] = action.payload
            }
            return {
                ...state,
            }

        case TASK_CONFIG.PUSH_SUB_TASK_TO_STORE:
            const taskId = action.payload.taskId

            if (state.allSubTaskOfTask) {
                const currentTask = state.allSubTaskOfTask.task
                if (String(currentTask._id) === String(taskId)) {
                    return {
                        ...state,
                        allSubTaskList: [action.payload, ...state.allSubTaskList],
                        allSubTaskOfTask: { task: currentTask, subtasks: [action.payload, ...state.allSubTaskOfTask.subtasks] }
                    }
                }
            }

            return {
                ...state,
                allSubTaskList: [action.payload, ...state.allSubTaskList]
            }

        case TASK_CONFIG.UPDATE_TASK_SUBTASK:
            const inComingTask = action.payload.task
            const incommingSubTask = action.payload.subtask
            const taskIndex = state.allTask.findIndex(task => task._id === inComingTask._id)
            if (taskIndex > -1) {
                state.allTask[taskIndex] = inComingTask

                const allSubTaskIndex = state.allSubTaskList.findIndex((subTask: any) => subTask._id === incommingSubTask._id)
                if (allSubTaskIndex >= 0) {
                    state.allSubTaskList[allSubTaskIndex] = incommingSubTask
                }

                if ("task" in state.allSubTaskOfTask && state.allSubTaskOfTask.task._id === inComingTask._id) {
                    state.allSubTaskOfTask.task = inComingTask

                    if ("subtasks" in state.allSubTaskOfTask) {
                        const updateIndex = state.allSubTaskOfTask.subtasks.findIndex((subtask: any) => subtask._id === incommingSubTask._id)
                        state.allSubTaskOfTask.subtasks[updateIndex] = incommingSubTask
                    }
                }
            }

            return {
                ...state,
            }



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
                allSubTaskOfTask: { task: action.payload, subtasks: [] }
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

        case TASK_CONFIG.SELECTED_TASK_ADMINS:
            return {
                ...state,
                selectedTaskAdmins: action.payload
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