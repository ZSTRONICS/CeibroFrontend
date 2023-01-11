import { ActionInterface } from ".";
import { GET_TASK } from '../../config/task.config'
import {  Result, TaskRoot } from "constants/interfaces/Tasks.interface";
import { requestFail, requestPending, requestSuccess } from "utills/status";

interface TaskReducerInt {
    allTask: Result[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
    taskLoading:boolean
}

const intialStatue:TaskReducerInt = {
    allTask: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
    taskLoading: false
}

const TaskReducer = (state = intialStatue, action: ActionInterface ):TaskReducerInt => {
    switch(action.type) {
        case requestSuccess(GET_TASK):
            return {
                    ...state,
                    allTask:action.payload.results,
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
            default:
            return state
        
    }
    // switch(action.type) {
    //     case config.OPEN_TASK_DRAWER:
    //         return {
    //             ...state,
    //             drawerOpen: true
    //         }

    //     case config.CLOSE_TASK_DRAWER: 
    //         return {
    //             ...state,
    //             drawerOpen: false
    //         }

    //     case config.SET_MENUE: 
    //         return {
    //             ...state,
    //             menue: action.payload
    //         }
        
    //     default:
    //         return state
    // }
        
} 

export default TaskReducer