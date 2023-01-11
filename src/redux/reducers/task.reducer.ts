import { ActionInterface } from ".";
import { GET_TASK, OPEN_NEW_TASK, CLOSE_NEW_TASK } from '../../config/task.config'
import { Result } from "constants/interfaces/Tasks.interface";
import { requestFail, requestPending, requestSuccess } from "utills/status";

interface TaskReducerInt {
    // showAllTasks:TaskRoot[]
    allTask: Result[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
    taskLoading: boolean
    dialogOpen: boolean
}

const intialStatue: TaskReducerInt = {
    allTask: [],
    // showAllTasks:[],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
    taskLoading: false,
    dialogOpen: false
}

const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {

        case requestSuccess(GET_TASK):
            return {
                ...state,
                allTask: action.payload.results,
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
        default:
            return state
    }
}

export default TaskReducer