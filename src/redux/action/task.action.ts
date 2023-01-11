import { GET_TASK, SET_MENUE, OPEN_NEW_TASK, CLOSE_NEW_TASK } from "../../config/task.config"
import { createAction } from './action';

const taskActions = {
    
    openNewTask: () => {
        return {
                type: OPEN_NEW_TASK
            }
    },
    closeNewTask: () =>{
        return{
            type:CLOSE_NEW_TASK
        }
    },
    setMenue: (id: number) => {
        return {
            type: SET_MENUE,
            payload: id
        }
    }
}

export const getAllTask = createAction(GET_TASK)

export default taskActions