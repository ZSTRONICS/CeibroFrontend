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
    openTaskDrawer: (isEditable: boolean) => {
        return {
            type: TASK_CONFIG.OPEN_TASK_DRAWER,
            payload: isEditable
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

    postSubtaskComment: createAction(TASK_CONFIG.POST_SUBTASK_COMMENT),
    getAllCommentsOfSubtaskById: createAction(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID),
    getTaskAssignedToMe: createAction(TASK_CONFIG.GET_TASK_ASSIGNED_TO_ME),
    getTaskCreatedFromMe: createAction(TASK_CONFIG.GET_TASK_CREATED_FROM_ME),
}

export const getAllTask = createAction(TASK_CONFIG.GET_TASK)
export const createTask = createAction(TASK_CONFIG.CREATE_TASK)
export const uploadDocs = createAction(TASK_CONFIG.UPLOAD_TASK_DOCS)
export const createSubTask = createAction(TASK_CONFIG.CREATE_SUB_TASK)
export const setSelectedTask = createAction(TASK_CONFIG.SET_SELECTED_TASK)
export const setSubTask = createAction(TASK_CONFIG.SET_SUBTASK)
export const updateTaskById = createAction(TASK_CONFIG.UPDATE_TASK_BY_ID)
export const patchSubTaskById = createAction(TASK_CONFIG.PATCH_SUB_TASK_BY_ID)
export const deleteTask = createAction(TASK_CONFIG.DELETE_TASK)
export const deleteSubtask = createAction(TASK_CONFIG.DELETE_SUBTASK)
export const deleteSubtaskMember = createAction(TASK_CONFIG.DELETE_SUBTASK_MEMBER)
export const subtaskMemberMarkAsDone = createAction(TASK_CONFIG.SUBTASK_MEMBER_MARK_AS_DONE)
export const getAllSubTaskList = createAction(TASK_CONFIG.GET_ALL_SUBTASK_LIST)
// export const postSubtaskComment = createAction(TASK_CONFIG.POST_SUBTASK_COMMENT)
export const getAllSubTaskRejection = createAction(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION)
export const getAllSubTaskOfTask = createAction(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK)
export const taskSubtaskStateChange = createAction(TASK_CONFIG.TASK_SUBTASK_STATE_CHANGE)

export default taskActions