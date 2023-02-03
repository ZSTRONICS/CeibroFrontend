import { TASK_CONFIG } from 'config/task.config';
import { SubtaskInterface } from 'constants/interfaces/subtask.interface';
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
    openSubtaskDetailDrawer: () => {
        return {
            type: TASK_CONFIG.OPEN_SUBTASK_DETAIL_DRAWER,
        };
    },
    closeSubtaskDetailDrawer: () => {
        return {
            type: TASK_CONFIG.CLOSE_TASK_DETAIL_DRAWER,
        };
    },
    openConfirmModal: () => {
        return {
            type: TASK_CONFIG.OPEN_CONFIRM_DRAWER,
        };
    },
    closeConfirmModal: () => {
        return {
            type: TASK_CONFIG.CLOSE_CONFIRM_DRAWER,
        };
    },
}

export const getAllTask = createAction(TASK_CONFIG.GET_TASK)
export const createTask = createAction(TASK_CONFIG.CREATE_TASK)
export const createSubTask = createAction(TASK_CONFIG.CREATE_SUB_TASK)
export const setSelectedTask = createAction(TASK_CONFIG.SET_SELECTED_TASK)
export const setSubTask = createAction(TASK_CONFIG.SET_SUBTASK)
export const getAllSubTaskList = createAction(TASK_CONFIG.GET_ALL_SUBTASK_LIST)
export const getAllSubTaskOfTask = createAction(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK)
export const taskSubtaskStateChange = createAction(TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE)

export default taskActions