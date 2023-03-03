import { ActionInterface } from ".";
import { TASK_CONFIG } from "config/task.config";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { TaskInterface } from "constants/interfaces/task.interface";
import { RecentCommentsInterface, SubtaskInterface, TaskData } from "constants/interfaces/subtask.interface";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import { RejectedComment, RejectionComment } from "constants/interfaces/rejectionComments.interface";

interface TaskReducerInt {
    // showAllTasks:TaskRoot[]
    allTask: TaskInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
    taskLoading: boolean
    dialogOpen: boolean
    openConfirmModal: boolean
    subTaskDetailDrawer: boolean
    subTaskopen: boolean
    selectedTaskId: string
    taskDrawerOpen: boolean
    allSubTaskList: SubtaskInterface[]
    loadingSubTask: boolean
    loadingSubTaskofTask: boolean
    loadingSubTaskRejection: boolean
    allSubTaskOfTask: AllSubtasksOfTaskResult | any
    selectedSubtaskFroDetailView: SubtaskInterface | any
    projectMembersOfSelectedTask: { label: string, id: string }[]
    selectedTaskAdmins: { label: string, id: string }[]
    taskAssignedToMembers: { label: string, id: string }[]
    getAllSubtaskRejection: any[]
    getTaskSubTaskFilterByState:string
    isEditing: boolean
    temporarySubtask: {
        assignedToMembersOnly: []
        taskId: string
        assignedTo: any
        description: string
        dueDate: string
        title: string
        state: any
        _id: string,
        taskData: any
    },
    getAllRecentCommentsOfSubtask: RecentCommentsInterface[] | any
    getAllCommentsOfSubtaskLoading: boolean
}

const intialStatue: TaskReducerInt = {
    getTaskSubTaskFilterByState:'all',
    getAllRecentCommentsOfSubtask: [],
    getAllCommentsOfSubtaskLoading: false,
    temporarySubtask: {
        assignedToMembersOnly: [],
        taskId: "",
        _id: "",
        assignedTo: [],
        description: "",
        dueDate: "",
        title: "",
        state: [],
        taskData: {
            admins: [],
        }
    },
    getAllSubtaskRejection: [],
    isEditing: false,
    loadingSubTaskRejection: false,
    selectedTaskAdmins: [],
    projectMembersOfSelectedTask: [],
    taskAssignedToMembers: [],
    allSubTaskOfTask: {},
    allTask: [],
    allSubTaskList: [],
    selectedSubtaskFroDetailView: {},
    loadingSubTaskofTask: false,
    subTaskopen: false,
    loadingSubTask: false,
    // showAllTasks:[],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
    taskLoading: false,
    openConfirmModal: false,
    dialogOpen: false,
    selectedTaskId: '',
    taskDrawerOpen: false,
    subTaskDetailDrawer: false
}

const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {
        case TASK_CONFIG.PUSH_TASK_TO_STORE:
            return {
                ...state,
                allTask: [action.payload, ...state.allTask],
                allSubTaskOfTask: { task: action.payload, subtasks: [] }
            }


        case TASK_CONFIG.PULL_TASK_FROM_STORE:
            const removeTaskId = action.payload
            state.allTask = state.allTask.filter(task => String(task._id) !== String(removeTaskId))
            return {
                ...state,
                allTask: [...state.allTask]
            }

        case TASK_CONFIG.UPDATE_SUBTASK_IN_STORE:
            const subTaskToUpdate = action.payload
            const isExistingSubTask = state.allSubTaskList.findIndex((subTask: any) => subTask._id === subTaskToUpdate._id)
            if (isExistingSubTask > -1) {
                state.allSubTaskList[isExistingSubTask] = subTaskToUpdate
            } else {
                state.allSubTaskList = [action.payload, ...state.allSubTaskList]
            }
            let updated = false
            if ("subtasks" in state.allSubTaskOfTask) {
                const updateIndex = state.allSubTaskOfTask.subtasks.findIndex((subtask: any) => subtask._id === subTaskToUpdate._id)
                if (updateIndex > -1) {
                    // console.log( "InReducer", "task subtasks updated");
                    state.allSubTaskOfTask.subtasks[updateIndex] = subTaskToUpdate
                    updated = true
                }
            }

            if (!updated) {
                state.allSubTaskOfTask.subtasks = [subTaskToUpdate, ...state.allSubTaskOfTask.subtasks]
            }
            return {
                ...state,
                allSubTaskList: [...state.allSubTaskList],
                allSubTaskOfTask: { ...state.allSubTaskOfTask }
            }


        case TASK_CONFIG.UPDATE_TASK_IN_STORE:
            const index = state.allTask.findIndex((task: any) => String(task._id) === String(action.payload._id))
            if (index === -1) {
                state.allTask = [action.payload, ...state.allTask]
            } else {
                state.allTask[index] = action.payload
            }

            let updateCurrentTask = false
            if (state.allSubTaskOfTask) {
                const currentTask = state.allSubTaskOfTask.task
                if (String(currentTask._id) === String(action.payload._id)) {
                    updateCurrentTask = true
                }
            }

            if (updateCurrentTask) {
                return {
                    ...state,
                    allTask: [...state.allTask],
                    allSubTaskOfTask: { task: action.payload, subtasks: [...state.allSubTaskOfTask.subtasks] }
                }
            } else {
                return {
                    ...state,
                    allTask: [...state.allTask]
                }
            }

        case TASK_CONFIG.GET_TASK_SUBTASK_FILTER_BY_STATE:
          return{
            ...state,
            getTaskSubTaskFilterByState: action.payload,
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

        case TASK_CONFIG.UPDATE_SUB_TASK_BY_ID:

            const updatedSubTak = action.payload
            // console.log( "InReducer", updatedSubTak);
            const allSubTaskIndex = state.allSubTaskList.findIndex((subTask: any) => subTask._id === updatedSubTak._id)
            if (allSubTaskIndex > -1) {
                // console.log( "InReducer", "All subtasks");
                state.allSubTaskList[allSubTaskIndex] = updatedSubTak
            }
            if ("subtasks" in state.allSubTaskOfTask) {
                // console.log( "InReducer", "task subtasks");
                const updateIndex = state.allSubTaskOfTask.subtasks.findIndex((subtask: any) => subtask._id === updatedSubTak._id)
                if (updateIndex > -1) {
                    // console.log( "InReducer", "task subtasks updated");
                    state.allSubTaskOfTask.subtasks[updateIndex] = updatedSubTak
                }
            }
            return {
                ...state,
                allSubTaskList: [...state.allSubTaskList],
                allSubTaskOfTask: { ...state.allSubTaskOfTask }
            }


        case TASK_CONFIG.TASK_SUBTASK_UPDATED:
            const inComingTask = action.payload.task
            const incommingSubTask = action.payload.subtask
            const taskIndex = state.allTask.findIndex(task => task._id === inComingTask._id)
            if (taskIndex > -1) {
                state.allTask[taskIndex] = inComingTask

                const allSubTaskIndex = state.allSubTaskList.findIndex((subTask: any) => subTask._id === incommingSubTask._id)
                if (allSubTaskIndex > -1) {
                    state.allSubTaskList[allSubTaskIndex] = incommingSubTask
                }

                if ("task" in state.allSubTaskOfTask && state.allSubTaskOfTask.task._id === inComingTask._id) {
                    state.allSubTaskOfTask.task = inComingTask

                    if ("subtasks" in state.allSubTaskOfTask) {
                        const updateIndex = state.allSubTaskOfTask.subtasks.findIndex((subtask: any) => subtask._id === incommingSubTask._id)
                        if (updateIndex > -1) {
                            state.allSubTaskOfTask.subtasks[updateIndex] = incommingSubTask
                        }
                    }
                }
            }

            return {
                ...state,
                allTask: [...state.allTask],
                allSubTaskList: [...state.allSubTaskList],
                allSubTaskOfTask: { ...state.allSubTaskOfTask }
            }

        case requestSuccess(TASK_CONFIG.GET_TASK):
            return {
                ...state,
                allTask: action.payload.results.reverse(),
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
                taskDrawerOpen: true,
                isEditing: action.payload
            }
        case TASK_CONFIG.CLOSE_TASK_DRAWER:
            return {
                ...state,
                taskDrawerOpen: false,
                isEditing: false
            }

        case TASK_CONFIG.SET_SELECTED_TASK:
            return {
                ...state,
                allSubTaskOfTask: { task: action.payload, subtasks: [] }
            }
        case TASK_CONFIG.UPDATE_SELECTED_TASK_AND_SUBTASK:
            return {
                ...state,
                allSubTaskOfTask: { task: action.payload.task, subtasks: [...action.payload.subtaskOfTask] }
            }
        case TASK_CONFIG.SET_SUBTASK: {
            return {
                ...state,
                selectedSubtaskFroDetailView: action.payload
            }
        }

        case TASK_CONFIG.SELECTED_TASK_ID:
            return {
                ...state,
                selectedTaskId: action.payload,
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
        case requestSuccess(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                allSubTaskOfTask: action.payload.results,
                loadingSubTaskofTask: false,

            }
        }
        case requestFail(TASK_CONFIG.GET_ALL_SUBTASK_OF_TASK): {
            return {
                ...state,
                loadingSubTaskofTask: false,
            };
        }
        case requestPending(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION): {
            return {
                ...state,
                loadingSubTaskRejection: true,
            };
        }
        case requestFail(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION): {
            return {
                ...state,
                loadingSubTaskRejection: false,
            };
        }
        case requestSuccess(TASK_CONFIG.GET_ALL_SUBTASK_REJECTION): {

            const rejectedComment = action.payload.result.map((item: any) => {
                return {
                    name: `${item.sender.firstName} ${item.sender.surName}`,
                    message: item.message,
                    _id: item._id,
                    createdAt: item.createdAt
                }
            })

            return {
                ...state,
                getAllSubtaskRejection: [...rejectedComment]
            }
        }
        case requestPending(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {

            return {
                ...state,
                getAllCommentsOfSubtaskLoading: true,
            }
        }
        case requestSuccess(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {
            return {
                ...state,
                getAllRecentCommentsOfSubtask: [...action.payload.result, ...state.getAllRecentCommentsOfSubtask],
                getAllCommentsOfSubtaskLoading: false,
            }
        }
        case requestFail(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {

            return {
                ...state,
                getAllCommentsOfSubtaskLoading: false,
            }
        }

        case TASK_CONFIG.PUSH_NEW_COMMENT_IN_STORE: {
            if (String(state.selectedSubtaskFroDetailView._id) === String(action.payload.subTaskId)) {
                state.getAllRecentCommentsOfSubtask = [action.payload, ...state.getAllRecentCommentsOfSubtask]
                return {
                    ...state,
                    getAllRecentCommentsOfSubtask: [...state.getAllRecentCommentsOfSubtask],
                }
            }
            return {
                ...state
            }

        }

        case TASK_CONFIG.CLEAR_SUBTASK_COMMENTS_IN_STORE: {
            return {
                ...state,
                getAllRecentCommentsOfSubtask: [],
            }
        }

        case TASK_CONFIG.UPDATE_COMMENT_WITH_FILES_IN_STORE: {
            const upCommingCommentWithFiles = action.payload._id
            const existingComment = state.getAllRecentCommentsOfSubtask.findIndex((comment:any)=> String(comment._id)=== String(upCommingCommentWithFiles))
            if(existingComment>-1){
                state.getAllRecentCommentsOfSubtask[existingComment]= action.payload
            }

            return {
                ...state,
                getAllRecentCommentsOfSubtask: [...state.getAllRecentCommentsOfSubtask],
            }
        }
        case TASK_CONFIG.PROJECT_MEMBERS_OF_SELECTED_TASK: {
            return {
                ...state,
                projectMembersOfSelectedTask: action.payload
            }
        }
        case TASK_CONFIG.SELECTED_TASK_ADMINS: {
            return {
                ...state,
                selectedTaskAdmins: action.payload,
            }
        }
        case TASK_CONFIG.EDIT_TASK: {
            return {
                ...state,
                isEditing: action.payload,
            }
        }
        case TASK_CONFIG.TASK_ASSIGNED_TO_MEMBERS: {
            return {
                ...state,
                taskAssignedToMembers: action.payload
            }
        }
        case TASK_CONFIG.OPEN_SUBTASK_DETAIL_DRAWER: {
            return {
                ...state,
                subTaskDetailDrawer: true
            }
        }

        case TASK_CONFIG.CLOSE_TASK_DETAIL_DRAWER: {

            return {
                ...state,
                subTaskDetailDrawer: false
            }
        }
        case TASK_CONFIG.OPEN_CONFIRM_DRAWER:
            return {
                ...state,
                openConfirmModal: true
            }
        case TASK_CONFIG.CLOSE_CONFIRM_DRAWER:
            return {
                ...state,
                openConfirmModal: false
            }
        default:
            return state
    }
}

export default TaskReducer