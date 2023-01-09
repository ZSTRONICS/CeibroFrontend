import { ActionInterface } from ".";
import config, { GET_TASK } from '../../config/task.config'
import { TaskCards } from "constants/interfaces/Tasks.interface";

interface TaskReducerInt {
    TaskCards: TaskCards[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
}

const intialStatue:TaskReducerInt = {
    TaskCards: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0
}

const TaskReducer = (state = intialStatue, action: ActionInterface ):TaskReducerInt => {
    switch(action.type) {
        case GET_TASK:
            console.log(action.payload)
            return {
                    ...state,
                    TaskCards:action.payload
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