import {
    GET_TASK, SET_MENUE, 
    OPEN_NEW_TASK, 
    CLOSE_NEW_TASK, 
    SELECTED_TASK_ID, 
    OPEN_TASK_DRAWER,
    CLOSE_TASK_DRAWER,
    GET_ALL_SUBTASK_LIST,
    GET_ALL_SUBTASK_OF_TASK,
} from "../../config/task.config"
import { createAction } from './action';

const taskActions = {

    openNewTaskModal: () => {
        return {
            type: OPEN_NEW_TASK
        }
    },
    closeNewTask: () => {
        return {
            type: CLOSE_NEW_TASK
        }
    },
    setMenue: (id: number) => {
        return {
            type: SET_MENUE,
            payload: id
        }
    },
    selectedTaskId: (taskId: string | null) => {
        return {
            type: SELECTED_TASK_ID,
            payload: taskId,
        };
    },
    openTaskDrawer: () => {
        return {
            type: OPEN_TASK_DRAWER,
        };
    },
    closeTaskDrawer: () => {
        return {
            type: CLOSE_TASK_DRAWER,
        };
    },

}

export const getAllTask = createAction(GET_TASK)
export const getAllSubTaskList = createAction(GET_ALL_SUBTASK_LIST)
export const getAllSubTaskOfTask = createAction(GET_ALL_SUBTASK_OF_TASK)

export default taskActions