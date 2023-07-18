import { ActionInterface } from "./appReducer";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { TASK_CONFIG } from "config";
import { AllSubtasksOfTaskResult, AllTaskFromMeInterface, AllTaskHiddenInterface, AllTaskToMeInterface, Task, TaskInterface } from "constants/interfaces";
import { RecentCommentsInterface, SubtaskInterface } from "constants/interfaces/subtask.interface";
import { addEventToTask, findTaskIndex, moveTask, moveTaskToSpecifiedArr, } from "components/Utills/Globals";
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
            const taskFromMeUnread = state.allTaskFromMe.unread;
            const taskToMeNew = state.allTaskToMe.new;
            if (action.payload.isAssignedToMe === true) {
                taskToMeNew.push(action.payload.data)
            }
            taskFromMeUnread.push(action.payload.data)

            return {
                ...state,
                allTaskFromMe: { ...state.allTaskFromMe },
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
      console.log("eventData", eventData,);

            // hidden
            // const checktaskInOngoing = findTaskIndex(state.allTaskHidden.ongoing, eventData.taskId)
            // const checktaskInDone = findTaskIndex(state.allTaskHidden.done, eventData.taskId)

      const hiddenCanceled = state.allTaskHidden.canceled;
      const hiddenOngoing = state.allTaskHidden.ongoing;
      const hiddenDone = state.allTaskHidden.done;

            // from-me
            // const checktaskFromMeInUnread = findTaskIndex(state.allTaskFromMe.unread, eventData.taskId)
            // const checktaskFromMeInDone = findTaskIndex(state.allTaskFromMe.done, eventData.taskId)

      const fromMeDone = state.allTaskFromMe.done;
      const fromMeOngoing = state.allTaskFromMe.ongoing;
      const fromMeUnread = state.allTaskFromMe.unread;

            // To-me
            // const checktaskToMeInNew = findTaskIndex(state.allTaskToMe.new, eventData.taskId)
            // const checktaskToMeInDone = findTaskIndex(state.allTaskToMe.done, eventData.taskId)

      const toMeNew = state.allTaskToMe.new;
      const toMeOngoing = state.allTaskToMe.ongoing;
      const toMeDone = state.allTaskToMe.done;

            // task with comment
            if (eventData.eventType === "comment") {
                if (eventData.taskData.creatorState === "canceled") {
                    const checktaskInCanceled = findTaskIndex(state.allTaskHidden.canceled, eventData.taskId)
                    addEventToTask(hiddenCanceled, eventData, checktaskInCanceled);
                }
                // task creator add comment in unread and update assignto new if not seen
                if (eventData.oldTaskData.creatorState === 'unread' && eventData.oldTaskData.isCreator === true) {
                    const checktaskIndex = findTaskIndex(fromMeUnread, eventData.taskId)
                    fromMeUnread[checktaskIndex].events.push(eventData);
                    console.log('updated fromMeUnread', fromMeUnread[checktaskIndex])
                }
                // task AssignedToMe and task state is new
                if (eventData.oldTaskData.isAssignedToMe === true && eventData.oldTaskData.userSubState === "new") {
                    const checktaskIndex = findTaskIndex(toMeNew, eventData.taskId)
                    toMeNew[checktaskIndex].events.push(eventData);
                    console.log('updated new')
                }

                // task creator and updated task from-me in ongoing
                if (eventData.oldTaskData.isCreator === true && eventData.oldTaskData.creatorState === 'ongoing') {
                    const checktaskIndex = findTaskIndex(fromMeOngoing, eventData.taskId)
                    fromMeOngoing[checktaskIndex].events.push(eventData);
                    console.log('updated fromMeOngoing', fromMeOngoing[checktaskIndex])
                }

                if (eventData.oldTaskData.userSubState === "ongoing") {
                    //  check if task in hidden ongoin, update and push to to-me ongoin
                    if (eventData.oldTaskData.isHiddenByMe === true && eventData.oldTaskData.isAssignedToMe === true) {
                        const checktaskInOngoing = findTaskIndex(hiddenOngoing, eventData.taskId)
                        hiddenOngoing[checktaskInOngoing].events.push(eventData);
                        const task = hiddenOngoing.splice(checktaskInOngoing, 1)[0];
                        toMeOngoing.push(task);
                    }
                    //  check if task not hidden ,only update  to-me ongoin
                    if (eventData.oldTaskData.isHiddenByMe === false && eventData.oldTaskData.isAssignedToMe === true) {
                        const checktaskToMeInOngoing = findTaskIndex(toMeOngoing, eventData.taskId)
                        addEventToTask(toMeOngoing, eventData, checktaskToMeInOngoing);
                    }

                    // update from-me ongoin if task creator 
                    if (eventData.oldTaskData.isCreator === true) {
                        const checktaskFromMeInOngoing = findTaskIndex(fromMeOngoing, eventData.taskId)
                        addEventToTask(fromMeOngoing, eventData, checktaskFromMeInOngoing);
                    }

                }
                // update  task events on done task
                //   done task from-me ongoin to done 
                // done task to-me ongoing to done 



                // addEventToTask(hiddenOngoing, eventData, checktaskInOngoing);
                // addEventToTask(hiddenDone, eventData, checktaskInDone);
                // addEventToTask(fromMeDone, eventData, checktaskFromMeInDone);
                // addEventToTask(fromMeUnread, eventData, checktaskFromMeInUnread);
                // addEventToTask(toMeNew, eventData, checktaskToMeInNew);
                // addEventToTask(toMeDone, eventData, checktaskToMeInDone);
            }

            // done task
            if (eventData.eventType === "doneTask" && eventData.oldTaskData.userSubState === 'ongoing') {
                // if task hidden by me move to to-me done 
                if (eventData.oldTaskData.isHiddenByMe === true && eventData.oldTaskData.isAssignedToMe === true) {
                    const taskIndex = findTaskIndex(hiddenOngoing, eventData.taskId)
                    hiddenOngoing[taskIndex].events.push(eventData);
                    const task = hiddenOngoing.splice(taskIndex, 1)[0];
                    toMeDone.push(task);
                    console.log('hiddenOngoing=> toMeDone', toMeDone[taskIndex])
                }
                // check task from-me and move to from-me Done 
                if (eventData.oldTaskData.isCreator === true && eventData.oldTaskData.creatorState === "ongoing") {
                    const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId)
                    fromMeOngoing[taskIndex].events.push(eventData);
                    const task = fromMeOngoing.splice(taskIndex, 1)[0];
                    fromMeDone.push(task);
                    console.log('move fromMeOngoing=>  fromMeDone', fromMeDone[taskIndex])
                }

                // check task to-me and move to to-me Done 
                if (eventData.oldTaskData.isAssignedToMe === true && eventData.oldTaskData.userSubState === "ongoing") {
                    const taskIndex = findTaskIndex(toMeOngoing, eventData.taskId)
                    toMeOngoing[taskIndex].events.push(eventData);
                    const task = toMeOngoing.splice(taskIndex, 1)[0];
                    toMeDone.push(task);
                    console.log('move toMeOngoing=>  toMeDone', toMeDone[taskIndex])
                }

            }

            // task unHide from hidden ongoing  and move to to-me ongoing
            if (eventData.userSubState === 'ongoing') {
                moveTask(hiddenOngoing, toMeOngoing, eventData);
            }

            // task unHide from hidden done and move to to-me done
            if (eventData.userSubState === 'done') {
                moveTask(hiddenDone, toMeDone, eventData);
            }

            // task hidden from-me ongoing and push to hidden ongoing
            if (eventData.userSubState === 'ongoing' && eventData.hiddenBy.includes(eventData.userId)) {
                moveTask(toMeOngoing, hiddenOngoing, eventData);
            }

            // task hidden from-me done and push to hidden done
            if (eventData.userSubState === 'done' && eventData.hiddenBy.includes(eventData.userId)) {
                moveTask(toMeDone, hiddenDone, eventData)
            }


            // forward task and update existing task
            if (eventData.eventType === 'TASK_FORWARDED') {
                if (eventData.isHiddenByMe === true && eventData.isAssignedToMe === true) {
                    moveTaskToSpecifiedArr(hiddenOngoing, toMeOngoing, eventData)
                    console.log('TASK_FORWARDED hiddenOngoing=> toMeOngoing', toMeOngoing)
                }

                if (eventData.isAssignedToMe === true && eventData.isHiddenByMe === false) {
                    const checktaskToMeInOngoing = findTaskIndex(toMeOngoing, eventData.taskId)
                    toMeOngoing[checktaskToMeInOngoing] = eventData
                    console.log('TASK_FORWARDED update toMeOngoing', toMeOngoing)

                    const taskIndex = findTaskIndex(toMeNew, eventData.taskId)
                    toMeNew[taskIndex] = eventData
                    console.log('TASK_FORWARDED update toMeNew', toMeNew)
                }
                if (eventData.isCreator === true) {
                    const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId)
                    fromMeOngoing[taskIndex] = eventData
                    console.log('TASK_FORWARDED update fromMeOngoing', fromMeOngoing)

                    const taskIndex1 = findTaskIndex(fromMeUnread, eventData.taskId)
                    fromMeUnread[taskIndex1] = eventData
                    console.log('TASK_FORWARDED update fromMeUnread', fromMeUnread)
                }

                // forward task to other
                const isAssignedToMeExist = eventData.assignedToState
                    .some((assignTo: any) => assignTo.userId === eventData.userId && assignTo.state === 'new')
                console.log('isAssignedToMeExist', isAssignedToMeExist)
                if (isAssignedToMeExist === true) {
                    toMeNew.push(eventData)
                    console.log('push to newtask ')
                }
            }

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
