import { ActionInterface } from "./appReducer";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { TASK_CONFIG } from "config";
import { AllSubtasksOfTaskResult, AllTaskFromMeInterface, AllTaskHiddenInterface, AllTaskToMeInterface, Task, TaskInterface } from "constants/interfaces";
import { RecentCommentsInterface, SubtaskInterface } from "constants/interfaces/subtask.interface";
import { findTaskIndex, } from "components/Utills/Globals";
import { selectedTaskFilterType } from "redux/type";

interface TaskReducerInt {
  // showAllTasks:TaskRoot[]
  allTaskToMe: AllTaskToMeInterface;
  allTaskFromMe: AllTaskFromMeInterface;
  allTaskHidden: AllTaskHiddenInterface;
  loadingAllTaskToMe: boolean;
  loadingAllTaskfromMe: boolean;
  loadingHiddenTask: boolean;
  allTask: TaskInterface[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  taskLoading: boolean;
  dialogOpen: boolean;
  openConfirmModal: boolean;
  subTaskDetailDrawer: boolean;
  subTaskopen: boolean;
  selectedTaskId: string;
  taskDrawerOpen: boolean;
  allSubTaskList: SubtaskInterface[];
  loadingSubTask: boolean;
  loadingSubTaskofTask: boolean;
  loadingSubTaskRejection: boolean;
  allSubTaskOfTask: AllSubtasksOfTaskResult | any;
  selectedSubtaskFroDetailView: SubtaskInterface | any;
  projectMembersOfSelectedTask: { label: string; id: string }[];
  selectedTaskAdmins: { label: string; id: string }[];
  taskAssignedToMembers: { label: string; id: string }[];
  getAllSubtaskRejection: any[];
  getTaskSubTaskFilterByState: string;
  isEditing: boolean;
  temporarySubtask: {
    assignedToMembersOnly: [];
    taskId: string;
    assignedTo: any;
    description: string;
    dueDate: string;
    title: string;
    state: any;
    _id: string;
    taskData: any;
  };
  getAllRecentCommentsOfSubtask: RecentCommentsInterface[] | any;
  getAllCommentsOfSubtaskLoading: boolean;
  selectedTaskFilter: selectedTaskFilterType;
}

const intialStatue: TaskReducerInt = {
  selectedTaskFilter: "allTaskFromMe",
  allTaskToMe: { done: [], new: [], ongoing: [] },
  allTaskFromMe: { done: [], ongoing: [], unread: [] },
  allTaskHidden: { canceled: [], done: [], ongoing: [] },
  loadingAllTaskToMe: false,
  loadingAllTaskfromMe: false,
  loadingHiddenTask: false,

  getTaskSubTaskFilterByState: "all",
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
    },
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
  selectedTaskId: "",
  taskDrawerOpen: false,
  subTaskDetailDrawer: false,
};


const TaskReducer = (state = intialStatue, action: ActionInterface): TaskReducerInt => {
    switch (action.type) {
        case TASK_CONFIG.PUSH_TASK_TO_STORE:
            return {
                ...state,
                allTask: [action.payload, ...state.allTask],
                allSubTaskOfTask: { task: action.payload, subtasks: [] }
            }


    case TASK_CONFIG.PULL_TASK_FROM_STORE:
      const removeTaskId = action.payload;
      state.allTask = state.allTask.filter(
        (task) => String(task._id) !== String(removeTaskId)
      );
      return {
        ...state,
        allTask: [...state.allTask],
      };

    case TASK_CONFIG.UPDATE_SUBTASK_IN_STORE:
      const subTaskToUpdate = action.payload;
      const isExistingSubTask = state.allSubTaskList.findIndex(
        (subTask: any) => subTask._id === subTaskToUpdate._id
      );
      if (isExistingSubTask > -1) {
        state.allSubTaskList[isExistingSubTask] = subTaskToUpdate;
      } else {
        state.allSubTaskList = [action.payload, ...state.allSubTaskList];
      }
      let updated = false;
      if ("subtasks" in state.allSubTaskOfTask) {
        const updateIndex = state.allSubTaskOfTask.subtasks.findIndex(
          (subtask: any) => subtask._id === subTaskToUpdate._id
        );
        if (updateIndex > -1) {
          state.allSubTaskOfTask.subtasks[updateIndex] = subTaskToUpdate;
          updated = true;
        }
      }

      if (!updated) {
        state.allSubTaskOfTask.subtasks = [
          subTaskToUpdate,
          ...state.allSubTaskOfTask.subtasks,
        ];
      }
      return {
        ...state,
        allSubTaskList: [...state.allSubTaskList],
        allSubTaskOfTask: { ...state.allSubTaskOfTask },
      };

    case TASK_CONFIG.UPDATE_TASK_IN_STORE:
      const index = state.allTask.findIndex(
        (task: any) => String(task._id) === String(action.payload._id)
      );
      if (index === -1) {
        state.allTask = [action.payload, ...state.allTask];
      } else {
        state.allTask[index] = action.payload;
      }

      let updateCurrentTask = false;
      if (state.allSubTaskOfTask) {
        const currentTask = state.allSubTaskOfTask.task;
        if (String(currentTask._id) === String(action.payload._id)) {
          updateCurrentTask = true;
        }
      }

      if (updateCurrentTask) {
        return {
          ...state,
          allTask: [...state.allTask],
          allSubTaskOfTask: {
            task: action.payload,
            subtasks: [...state.allSubTaskOfTask.subtasks],
          },
        };
      } else {
        return {
          ...state,
          allTask: [...state.allTask],
        };
      }

    case TASK_CONFIG.GET_TASK_SUBTASK_FILTER_BY_STATE:
      return {
        ...state,
        getTaskSubTaskFilterByState: action.payload,
      };
    case TASK_CONFIG.PUSH_SUB_TASK_TO_STORE:
      const taskId = action.payload.taskId;

      if (state.allSubTaskOfTask) {
        const currentTask = state.allSubTaskOfTask.task;
        if (String(currentTask._id) === String(taskId)) {
          return {
            ...state,
            allSubTaskList: [action.payload, ...state.allSubTaskList],
            allSubTaskOfTask: {
              task: currentTask,
              subtasks: [action.payload, ...state.allSubTaskOfTask.subtasks],
            },
          };
        }
      }

      return {
        ...state,
        allSubTaskList: [action.payload, ...state.allSubTaskList],
      };

    case TASK_CONFIG.UPDATE_SUB_TASK_BY_ID:
      const updatedSubTak = action.payload;
      const allSubTaskIndex = state.allSubTaskList.findIndex(
        (subTask: any) => subTask._id === updatedSubTak._id
      );
      if (allSubTaskIndex > -1) {
        state.allSubTaskList[allSubTaskIndex] = updatedSubTak;
      }
      if ("subtasks" in state.allSubTaskOfTask) {
        const updateIndex = state.allSubTaskOfTask.subtasks.findIndex(
          (subtask: any) => subtask._id === updatedSubTak._id
        );
        if (updateIndex > -1) {
          state.allSubTaskOfTask.subtasks[updateIndex] = updatedSubTak;
        }
      }
      return {
        ...state,
        allSubTaskList: [...state.allSubTaskList],
        allSubTaskOfTask: { ...state.allSubTaskOfTask },
      };

    case TASK_CONFIG.TASK_SUBTASK_UPDATED:
      const inComingTask = action.payload.task;
      const incommingSubTask = action.payload.subtask;
      const taskIndex = state.allTask.findIndex(
        (task) => task._id === inComingTask._id
      );
      if (taskIndex > -1) {
        state.allTask[taskIndex] = inComingTask;

        const allSubTaskIndex = state.allSubTaskList.findIndex(
          (subTask: any) => subTask._id === incommingSubTask._id
        );
        if (allSubTaskIndex > -1) {
          state.allSubTaskList[allSubTaskIndex] = incommingSubTask;
        }

        if (
          "task" in state.allSubTaskOfTask &&
          state.allSubTaskOfTask.task._id === inComingTask._id
        ) {
          state.allSubTaskOfTask.task = inComingTask;

          if ("subtasks" in state.allSubTaskOfTask) {
            const updateIndex = state.allSubTaskOfTask.subtasks.findIndex(
              (subtask: any) => subtask._id === incommingSubTask._id
            );
            if (updateIndex > -1) {
              state.allSubTaskOfTask.subtasks[updateIndex] = incommingSubTask;
            }
          }
        }
      }

      return {
        ...state,
        allTask: [...state.allTask],
        allSubTaskList: [...state.allSubTaskList],
        allSubTaskOfTask: { ...state.allSubTaskOfTask },
      };

    // get task assigned to me
    case requestPending(TASK_CONFIG.GET_ALL_TASK_TO_ME): {
      return {
        ...state,
        loadingAllTaskToMe: true,
      };
    }
    case requestSuccess(TASK_CONFIG.GET_ALL_TASK_TO_ME):
      return {
        ...state,
        loadingAllTaskToMe: false,
        allTaskToMe: {
          new: action.payload.allTasks.new,
          ongoing: action.payload.allTasks.ongoing,
          done: action.payload.allTasks.done,
        },
      };

    case requestFail(TASK_CONFIG.GET_ALL_TASK_TO_ME): {
      return {
        ...state,
        loadingAllTaskToMe: false,
      };
    }

    // get task created from me
    case requestPending(TASK_CONFIG.GET_ALL_TASK_FROM_ME): {
      return {
        ...state,
        loadingAllTaskfromMe: true,
      };
    }
    case requestSuccess(TASK_CONFIG.GET_ALL_TASK_FROM_ME):
      return {
        ...state,
        loadingAllTaskfromMe: false,
        allTaskFromMe: {
          unread: action.payload.allTasks.unread,
          ongoing: action.payload.allTasks.ongoing,
          done: action.payload.allTasks.done,
        },
      };

    case requestFail(TASK_CONFIG.GET_ALL_TASK_FROM_ME): {
      return {
        ...state,
        loadingAllTaskfromMe: false,
      };
    }

    case requestPending(TASK_CONFIG.GET_ALL_TASK_HIDDEN): {
      return {
        ...state,
        loadingHiddenTask: true,
      };
    }
    case requestSuccess(TASK_CONFIG.GET_ALL_TASK_HIDDEN):
      return {
        ...state,
        loadingHiddenTask: false,
        allTaskHidden: {
          ongoing: action.payload.allTasks.ongoing,
          done: action.payload.allTasks.done,
          canceled: action.payload.allTasks.canceled,
        },
      };

    case requestFail(TASK_CONFIG.GET_ALL_TASK_HIDDEN): {
      return {
        ...state,
        loadingHiddenTask: false,
      };
    }

    // update task when event received
    case TASK_CONFIG.UPDATE_TASK_WITH_EVENTS:
      const eventData = action.payload;
      console.log("eventData", eventData, eventData.taskId);

            // hidden
            const checktaskInOngoing = findTaskIndex(state.allTaskHidden.ongoing, eventData.taskId)

            const checktaskInDone = findTaskIndex(state.allTaskHidden.done, eventData.taskId)

      const hiddenCanceled = state.allTaskHidden.canceled;
      const hiddenOngoing = state.allTaskHidden.ongoing;
      const hiddenDone = state.allTaskHidden.done;

            // from-me
            const checktaskFromMeInUnread = findTaskIndex(state.allTaskFromMe.unread, eventData.taskId)
            const checktaskFromMeInOngoing = findTaskIndex(state.allTaskFromMe.ongoing, eventData.taskId)
            const checktaskFromMeInDone = findTaskIndex(state.allTaskFromMe.done, eventData.taskId)

      const fromMeDone = state.allTaskFromMe.done;
      const fromMeOngoing = state.allTaskFromMe.ongoing;
      const fromMeUnread = state.allTaskFromMe.unread;

            // To-me
            const checktaskToMeInNew = findTaskIndex(state.allTaskToMe.new, eventData.taskId)
            const checktaskToMeInOngoing = findTaskIndex(state.allTaskToMe.ongoing, eventData.taskId)
            const checktaskToMeInDone = findTaskIndex(state.allTaskToMe.done, eventData.taskId)

      const toMeNew = state.allTaskToMe.new;
      const toMeOngoing = state.allTaskToMe.ongoing;
      const toMeDone = state.allTaskToMe.done;


            console.log('checktaskInOngoing', checktaskInOngoing)
            console.log('checktaskInDone', checktaskInDone)

            console.log('checktaskFromMeInUnread', checktaskFromMeInUnread)
            console.log('checktaskFromMeInOngoing', checktaskFromMeInOngoing)
            console.log('checktaskFromMeInDone', checktaskFromMeInDone)

            console.log('checktaskToMeInNew', checktaskToMeInNew)
            console.log('checktaskToMeInOngoing', checktaskToMeInOngoing)
            console.log('checktaskToMeInDone', checktaskToMeInDone)

            // task with comment 
            if (eventData.eventType === "comment") {

                // hidden canceled 
                if (eventData.taskData.creatorState === "canceled") {
                    const checktaskInCanceled = findTaskIndex(state.allTaskHidden.canceled, eventData.taskId)
                    if (checktaskInCanceled > -1) {
                        hiddenCanceled[checktaskInCanceled].events.push(eventData);
                        console.log('state.allTaskHidden.canceled', hiddenCanceled[checktaskInCanceled])
                    }
                }

                // hidden ongoing 
                // hidden done 

                if (checktaskInOngoing > -1) {
                    hiddenOngoing[checktaskInOngoing].events.push(eventData);
                    console.log('prevHiddenOngoin', hiddenOngoing[checktaskInOngoing])
                }
                if (checktaskInDone > -1) {
                    hiddenDone[checktaskInDone].events.push(eventData);
                    console.log('checktaskInDone', hiddenDone[checktaskInDone])
                }

                if (checktaskFromMeInDone > -1) {
                    fromMeDone[checktaskFromMeInDone].events.push(eventData);
                    console.log('checktaskFromMeInDone', fromMeDone[checktaskFromMeInDone])
                }
                if (checktaskFromMeInOngoing > -1) {
                    const prevFromMeOngoind = state.allTaskFromMe.ongoing
                    prevFromMeOngoind[checktaskFromMeInOngoing].events = [...prevFromMeOngoind[checktaskFromMeInOngoing].events, eventData];
                    console.log('state.allTaskFromMe.ongoing', state.allTaskFromMe.ongoing)
                }
                if (checktaskFromMeInUnread > -1) {
                    const prevFromMeUnread = state.allTaskFromMe.unread
                    prevFromMeUnread[checktaskFromMeInUnread].events = [...prevFromMeUnread[checktaskFromMeInUnread].events, eventData];
                    console.log('state.allTaskFromMe.unread', prevFromMeUnread[checktaskFromMeInUnread])
                }

                if (checktaskToMeInNew > -1) {
                    const prevToMeNew = state.allTaskToMe.new
                    prevToMeNew[checktaskToMeInNew].events = [...prevToMeNew[checktaskToMeInNew].events, eventData];
                    console.log('checktaskToMeInNew', prevToMeNew[checktaskToMeInNew])
                }
                if (checktaskToMeInOngoing > -1) {
                    const prevToMeOngoing = state.allTaskToMe.ongoing
                    prevToMeOngoing[checktaskToMeInOngoing].events = [...prevToMeOngoing[checktaskToMeInOngoing].events, eventData];
                    console.log('checktaskToMeInOngoing', prevToMeOngoing[checktaskToMeInOngoing])
                }
                if (checktaskToMeInDone > -1) {
                    const prevToMeDone = state.allTaskToMe.done
                    prevToMeDone[checktaskToMeInDone].events = [...prevToMeDone[checktaskToMeInDone].events, eventData];
                    console.log('checktaskToMeInDone', checktaskToMeInDone)
                }
            }
            // done task
            if (eventData.eventType === "doneTask") {


            }

            // canceled
            if (eventData.eventType === "cancelTask") {
                if (checktaskInOngoing > -1) {
                }
                if (checktaskInDone > -1) {
                }
            }

            // task hidden
            if (eventData.userSubState === 'ongoing') {
                if (checktaskToMeInOngoing > -1) {
                    state.allTaskHidden.ongoing.push(toMeOngoing[checktaskToMeInOngoing])
                    console.log('state.allTaskHidden.ongoing', state.allTaskHidden.ongoing)
                }
            }
            if (eventData.userSubState === 'done') {
                if (checktaskToMeInDone > -1) {
                    state.allTaskHidden.done.push(toMeDone[checktaskToMeInDone])
                    console.log('state.allTaskHidden.ongoing', state.allTaskHidden.done)
                }
            }

            // forward task and update existing task
            if (checktaskFromMeInUnread > -1) {
                const prevFromMeUnreadTask = state.allTaskFromMe.unread
                prevFromMeUnreadTask[checktaskFromMeInUnread].events = [...prevFromMeUnreadTask[checktaskFromMeInUnread].events, eventData]
            }



            // forward task to other

            // task unhide
            return {
                ...state,
                allTaskHidden: { ...state.allTaskHidden },
                allTaskFromMe: { ...state.allTaskFromMe },
                allTaskToMe: { ...state.allTaskToMe },
            };

    case TASK_CONFIG.OPEN_NEW_TASK:
      return {
        ...state,
        dialogOpen: true,
      };
    case TASK_CONFIG.CLOSE_NEW_TASK:
      return {
        ...state,
        dialogOpen: false,
      };
    case TASK_CONFIG.OPEN_TASK_DRAWER:
      return {
        ...state,
        taskDrawerOpen: true,
        isEditing: action.payload,
      };
    case TASK_CONFIG.CLOSE_TASK_DRAWER:
      return {
        ...state,
        taskDrawerOpen: false,
        isEditing: false,
      };

    case TASK_CONFIG.SET_SELECTED_TASK:
      return {
        ...state,
        allSubTaskOfTask: { task: action.payload, subtasks: [] },
      };
    case TASK_CONFIG.UPDATE_SELECTED_TASK_AND_SUBTASK:
      return {
        ...state,
        allSubTaskOfTask: {
          task: action.payload.task,
          subtasks: [...action.payload.subtaskOfTask],
        },
      };
    case TASK_CONFIG.SET_SUBTASK: {
      return {
        ...state,
        selectedSubtaskFroDetailView: action.payload,
      };
    }

    case TASK_CONFIG.SELECTED_TASK_ID:
      return {
        ...state,
        selectedTaskId: action.payload,
      };
    case requestSuccess(TASK_CONFIG.GET_ALL_SUBTASK_LIST):
      return {
        ...state,
        allSubTaskList: action.payload.results,
      };
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
      };
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
          createdAt: item.createdAt,
        };
      });

      return {
        ...state,
        getAllSubtaskRejection: [...rejectedComment],
      };
    }
    case requestPending(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {
      return {
        ...state,
        getAllCommentsOfSubtaskLoading: true,
      };
    }
    case requestSuccess(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {
      return {
        ...state,
        getAllRecentCommentsOfSubtask: [...action.payload.result],
        getAllCommentsOfSubtaskLoading: false,
      };
    }
    case requestFail(TASK_CONFIG.GET_ALL_COMMENT_OF_SUBTASK_BY_ID): {
      return {
        ...state,
        getAllCommentsOfSubtaskLoading: false,
      };
    }

    case TASK_CONFIG.PUSH_NEW_COMMENT_IN_STORE: {
      if (
        String(state.selectedSubtaskFroDetailView._id) ===
        String(action.payload.subTaskId)
      ) {
        const commentIndex = state.getAllRecentCommentsOfSubtask.findIndex(
          (comment: any) => comment._id === action.payload._id
        );
        if (commentIndex > -1) {
          state.getAllRecentCommentsOfSubtask[commentIndex] = action.payload;
        } else {
          state.getAllRecentCommentsOfSubtask = [
            action.payload,
            ...state.getAllRecentCommentsOfSubtask,
          ];
        }
        return {
          ...state,
          getAllRecentCommentsOfSubtask: [
            ...state.getAllRecentCommentsOfSubtask,
          ],
        };
      }
      return {
        ...state,
      };
    }

    case TASK_CONFIG.CLEAR_SUBTASK_COMMENTS_IN_STORE: {
      return {
        ...state,
        getAllRecentCommentsOfSubtask: [],
      };
    }

    case TASK_CONFIG.UPDATE_COMMENT_WITH_FILES_IN_STORE: {
      const upCommingCommentWithFiles = action.payload._id;
      const existingComment = state.getAllRecentCommentsOfSubtask.findIndex(
        (comment: any) =>
          String(comment._id) === String(upCommingCommentWithFiles)
      );
      if (existingComment > -1) {
        state.getAllRecentCommentsOfSubtask[existingComment] = action.payload;
      }

      return {
        ...state,
        getAllRecentCommentsOfSubtask: [...state.getAllRecentCommentsOfSubtask],
      };
    }
    case TASK_CONFIG.PROJECT_MEMBERS_OF_SELECTED_TASK: {
      return {
        ...state,
        projectMembersOfSelectedTask: action.payload,
      };
    }
    case TASK_CONFIG.SELECTED_TASK_ADMINS: {
      return {
        ...state,
        selectedTaskAdmins: action.payload,
      };
    }
    case TASK_CONFIG.EDIT_TASK: {
      return {
        ...state,
        isEditing: action.payload,
      };
    }
    case TASK_CONFIG.TASK_ASSIGNED_TO_MEMBERS: {
      return {
        ...state,
        taskAssignedToMembers: action.payload,
      };
    }
    case TASK_CONFIG.OPEN_SUBTASK_DETAIL_DRAWER: {
      return {
        ...state,
        subTaskDetailDrawer: true,
      };
    }

    case TASK_CONFIG.CLOSE_TASK_DETAIL_DRAWER: {
      return {
        ...state,
        subTaskDetailDrawer: false,
      };
    }
    case TASK_CONFIG.OPEN_CONFIRM_DRAWER:
      return {
        ...state,
        openConfirmModal: true,
      };
    case TASK_CONFIG.CLOSE_CONFIRM_DRAWER:
      return {
        ...state,
        openConfirmModal: false,
      };
    default:
      return state;
  }
};

export default TaskReducer;
