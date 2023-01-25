import { TASK_CONFIG } from 'config/task.config';
import { createAction } from './action';

const taskActions = {
    openNewTaskModal: () => {
        return {
            type: TASK_CONFIG.OPEN_NEW_TASK
        }
    },
    closeNewTask: () => {
        return {
            type: TASK_CONFIG.CLOSE_NEW_TASK
        }
    },
    setMenue: (id: number) => {
        return {
            type: TASK_CONFIG.SET_MENUE,
            payload: id
        }
    },
    openTaskDrawer: () => {
        return {
            type: TASK_CONFIG.OPEN_TASK_DRAWER,
        };
    },
    closeTaskDrawer: () => {
        return {
            type: TASK_CONFIG.CLOSE_TASK_DRAWER,
        };
    },
    // openTaskDetailDrawer: () => {
    //     return {
    //         type: OPEN_TASK_DETAIL_DRAWER,
    //     };
    // },
    // closeTaskDetailDrawer: () => {
    //     return {
    //         type: CLOSE_TASK_DETAIL_DRAWER,
    //     };
    // },


}

export const getAllTask = createAction(TASK_CONFIG.GET_TASK)
export const createTask = createAction(TASK_CONFIG.CREATE_TASK)
export const createSubTask = createAction(TASK_CONFIG.CREATE_SUB_TASK)
export const setSelectedTask = createAction(TASK_CONFIG.SET_SELECTED_TASK)
export const getAllSubTaskList = createAction(TASK_CONFIG.GET_ALL_SUBTASK_LIST)
export const getAllSubTaskOfTask = createAction(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK)

export default taskActions