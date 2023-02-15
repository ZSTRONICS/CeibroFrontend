
export const TASK_CONFIG = {
  // task
  GET_TASK: 'GET_TASK',
  PUSH_TASK_TO_STORE: 'PUSH_TASK_TO_STORE',
  PULL_TASK_FROM_STORE: 'PULL_TASK_FROM_STORE',
  UPDATE_TASK_IN_STORE: 'UPDATE_TASK_IN_STORE',
  UPLOAD_TASK_DOCS: 'UPLOAD_TASK_DOCS',
  CREATE_TASK: 'CREATE_TASK',
  TASK_ASSIGNED_TO_MEMBERS: 'TASK_ASSIGNED_TO_MEMBERS',
  EDIT_TASK: 'EDIT_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SELECTED_TASK_ID: 'SELECTED_TASK_ID',
  SET_SELECTED_TASK: 'SET_SELECTED_TASK',
  UPDATE_TASK_BY_ID: 'UPDATE_TASK_BY_ID',
  UPDATE_TASK_BY_ID_IN_STORE: 'UPDATE_TASK_BY_ID_IN_STORE',

  // subtask
  SET_SUBTASK: 'SET_SUBTASK',
  SUBTASK_DETAIL: 'SUBTASK_DETAIL',
  CREATE_SUB_TASK: 'CREATE_SUB_TASK',
  UPDATE_SUBTASK_IN_STORE: 'UPDATE_SUBTASK_IN_STORE',
  UPDATE_TASK_SUBTASK: 'UPDATE_TASK_SUBTASK',
  GET_ALL_SUBTASK_LIST: 'GET_ALL_SUBTASK_LIST',
  PUSH_SUB_TASK_TO_STORE: 'PUSH_SUB_TASK_TO_STORE',
  GET_ALL_SUBTASK_OF_TASK: 'GET_ALL_SUBTASK_OF_TASK',
  GET_ALL_SUBTASK_REJECTION: 'GET_ALL_SUBTASK_REJECTION',
  TASK_SUBTASK_STATE_CHANGE: 'TASK_SUBTASK_STATE_CHANGE',

  // drawer & modal 
  OPEN_NEW_TASK: 'OPEN_NEW_TASK',
  CLOSE_NEW_TASK: 'CLOSE_NEW_TASK',
  OPEN_TASK_MODAL: 'OPEN_TASK_MODAL',
  OPEN_TASK_DRAWER: 'OPEN_TASK_DRAWER',
  CLOSE_TASK_DRAWER: 'CLOSE_TASK_DRAWER',
  CLOSE_TASK_DETAIL_DRAWER: 'CLOSE_TASK_DETAIL_DRAWER',
  OPEN_SUBTASK_DETAIL_DRAWER: 'OPEN_SUBTASK_DETAIL_DRAWER',
  OPEN_CONFIRM_DRAWER: 'OPEN_CONFIRM_DRAWER',
  CLOSE_CONFIRM_DRAWER: 'CLOSE_CONFIRM_DRAWER',

  // other
  SET_MENUE: 'SET_MENUE',
  PROJECT_MEMBERS_OF_SELECTED_TASK: 'PROJECT_MEMBERS_OF_SELECTED_TASK',
  SELECTED_TASK_ADMINS: 'SELECTED_TASK_ADMINS',

  // task socket events
  TASK_CREATED: 'TASK_CREATED',
  SUB_TASK_CREATED: 'SUB_TASK_CREATED',
  TASK_UPDATE_PUBLIC: 'TASK_UPDATE_PUBLIC',
  TASK_UPDATE_PRIVATE: 'TASK_UPDATE_PRIVATE',
  SUB_TASK_UPDATE_PUBLIC: 'SUB_TASK_UPDATE_PUBLIC',
  SUB_TASK_UPDATE_PRIVATE: 'SUB_TASK_UPDATE_PRIVATE',
  TASK_SUBTASK_UPDATED: 'TASK_SUBTASK_UPDATED',
}