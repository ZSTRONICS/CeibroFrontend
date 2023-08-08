import {
  addEventToTask,
  findTaskIndex,
  pushSeenBy,
  updateTak
} from "components/Utills/Globals";
import { TASK_CONFIG } from "config";
import {
  AllSubtasksOfTaskResult,
  AllTaskFromMeInterface,
  AllTaskHiddenInterface,
  AllTaskToMeInterface,
  TaskInterface
} from "constants/interfaces";
import {
  RecentCommentsInterface,
  SubtaskInterface,
} from "constants/interfaces/subtask.interface";
import { TopicInterface } from "constants/interfaces/topic.interface";
import { selectedTaskFilterType } from "redux/type";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { ActionInterface } from "./appReducer";
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
  Topics: TopicInterface;
  loadingTopics: boolean;
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
  loadingTopics: false,
  Topics: { allTopics: [], recentTopics: [] },
};

const TaskReducer = (
  state = intialStatue,
  action: ActionInterface
): TaskReducerInt => {
  switch (action.type) {
    case requestPending(TASK_CONFIG.GET_ALL_TOPIC): {
      return {
        ...state,
        loadingTopics: true,
      };
    }
    case requestSuccess(TASK_CONFIG.GET_ALL_TOPIC):
      return {
        ...state,
        loadingTopics: false,
        Topics: action.payload,
      };

    case requestFail(TASK_CONFIG.GET_ALL_TOPIC): {
      return {
        ...state,
        loadingTopics: false,
      };
    }
    case TASK_CONFIG.SELECTED_TASK_FILTER:
      return {
        ...state,
        selectedTaskFilter: action.payload,
      };

    case TASK_CONFIG.PUSH_TASK_TO_STORE:
      const taskFromMeUnread = state.allTaskFromMe.unread;
      const taskToMeNew = state.allTaskToMe.new;
      //todo TASK_UPDATED_WITH_FIELS
      // to-me [new],
      // from-me [unread]
      if (action.payload.isAssignedToMe === true) {
        const isTaskUnique = !taskToMeNew.some((task: any) => task._id === action.payload._id);
        if (isTaskUnique) {
          taskToMeNew.unshift(action.payload);
          console.log("push task to me new", taskToMeNew[taskToMeNew.length - 1]);
        }
      }
      if (action.payload.isCreator === true) {
        const isTaskUnique = !taskFromMeUnread.some((task: any) => task._id === action.payload._id);
        if (isTaskUnique) {
          taskFromMeUnread.unshift(action.payload);
          console.log("pus task from-me [unread]", taskFromMeUnread);
        } else {
          console.log("Task is already present in the unread ");
        }
      }

      return {
        ...state,
        allTaskFromMe: { ...state.allTaskFromMe },
        allTaskToMe: { ...state.allTaskToMe },
      };

    case TASK_CONFIG.PULL_TASK_FROM_STORE:
      const reupdateTakId = action.payload;
      state.allTask = state.allTask.filter(
        (task) => String(task._id) !== String(reupdateTakId)
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

    // push topic in store
    case TASK_CONFIG.PUSH_TOPIC_IN_STORE:
      return {
        ...state,
        Topics: {
          allTopics: [...state.Topics.allTopics, action.payload],
          recentTopics: [...state.Topics.recentTopics],
        }
      };
    // update task when event received
    case TASK_CONFIG.UPDATE_TASK_WITH_EVENTS:
      const eventData = action.payload;
      console.log("eventData", eventData);

      // hidden
      const hiddenCanceled = state.allTaskHidden.canceled;
      const hiddenOngoing = state.allTaskHidden.ongoing;
      const hiddenDone = state.allTaskHidden.done;

      // from-me
      const fromMeDone = state.allTaskFromMe.done;
      const fromMeOngoing = state.allTaskFromMe.ongoing;
      const fromMeUnread = state.allTaskFromMe.unread;

      // To-me
      const toMeNew = state.allTaskToMe.new;
      const toMeOngoing = state.allTaskToMe.ongoing;
      const toMeDone = state.allTaskToMe.done;

      const isAssignedToMe = eventData.oldTaskData.isAssignedToMe === true;
      const isCreator = eventData.oldTaskData.isCreator === true;
      const isOngoing = eventData.oldTaskData.userSubState === "ongoing";
      const isHiddenByMe = eventData.oldTaskData.isHiddenByMe === true;
      const taskIdLocal = eventData.taskId;

      // canceled task
      if (eventData.eventType === "cancelTask") {
        if (isCreator && isAssignedToMe) {
          // from-me [unread]  => hidden [canceled]
          if (eventData.oldTaskData.creatorState === "unread") {
            const taskIndex = findTaskIndex(fromMeUnread, taskIdLocal);
            if (taskIndex > -1) {
              updateTak(fromMeUnread[taskIndex], taskIndex, eventData)
              hiddenCanceled.unshift(fromMeUnread[taskIndex])
              fromMeUnread.splice(taskIndex, 1)
              console.log('fromMeUnread => hiddenCanceled', hiddenCanceled[0]._id)
            }
          } else if (isOngoing) {
            // from-me [ongoing]  => hidden [canceled]
            const taskIndex = findTaskIndex(fromMeOngoing, taskIdLocal);
            if (taskIndex > -1) {
              updateTak(fromMeOngoing[taskIndex], taskIndex, eventData)
              hiddenCanceled.unshift(fromMeOngoing[taskIndex])
              fromMeOngoing.splice(taskIndex, 1)
              console.log('fromMeOngoing => hiddenCanceled', hiddenCanceled[0]._id)
            }
          }
        }
        if (isAssignedToMe) {
          // to-me [new]  => hidden [canceled]
          if (eventData.oldTaskData.userSubState === "new") {
            const taskIndex = findTaskIndex(toMeNew, taskIdLocal);
            const checkTaskExist = findTaskIndex(hiddenCanceled, taskIdLocal)

            if (checkTaskExist === -1) {
              if (taskIndex > -1) {
                updateTak(toMeNew[taskIndex], taskIndex, eventData)
                hiddenCanceled.unshift(toMeNew[taskIndex])
                toMeNew.splice(taskIndex, 1)
                console.log('toMeNew => hiddenCanceled', hiddenCanceled[0]._id)
              }
            } else if (checkTaskExist > -1) {
              toMeNew.splice(taskIndex, 1)
              console.log('task already moved 1')
            }
          } else if (isOngoing) {
            // hidden [ongoing]  => hidden [canceled]
            if (isHiddenByMe === true) {
              const taskIndex = findTaskIndex(hiddenOngoing, taskIdLocal);
              const checkTaskExist = findTaskIndex(hiddenCanceled, taskIdLocal)
              if (checkTaskExist === -1) {
                if (taskIndex > -1) {
                  updateTak(hiddenOngoing[taskIndex], taskIndex, eventData)
                  hiddenCanceled.unshift(hiddenOngoing[taskIndex])
                  hiddenOngoing.splice(taskIndex, 1)
                  console.log('hiddenOngoing => hiddenCanceled', hiddenCanceled[0]._id)
                }
              } else if (checkTaskExist > -1) {
                hiddenOngoing.splice(taskIndex, 1);
                console.log('Task already moved 2',)
              }
            } else {
              // to-me [ongoing]  => hidden [canceled]
              console.log('isOngoing', isOngoing)
              const taskIndex = findTaskIndex(toMeOngoing, taskIdLocal);
              const checkTaskExist = findTaskIndex(hiddenCanceled, taskIdLocal)
              if (checkTaskExist === -1) {
                if (taskIndex > -1) {
                  updateTak(toMeOngoing[taskIndex], taskIndex, eventData);
                  hiddenCanceled.unshift(toMeOngoing[taskIndex]);
                  toMeOngoing.splice(taskIndex, 1);
                  console.log('toMeOngoing => hiddenCanceled', hiddenCanceled[0]._id);
                }
              } else if (checkTaskExist > -1) {
                toMeOngoing.splice(taskIndex, 1);
              }
            }
          }
        }
      }
      // unCancelTask
      if (eventData.eventType === "UN_CANCEL_TASK") {
        const taskIndex = findTaskIndex(hiddenCanceled, taskIdLocal);
        if (taskIndex > -1) {
          const taskToMove = hiddenCanceled[taskIndex];
          addEventToTask(taskToMove, eventData, taskIndex);
          taskToMove.hiddenBy = eventData.taskData.hiddenBy;
          taskToMove.creatorState = "unread";
          taskToMove.userSubState = "new";
          fromMeUnread.unshift(taskToMove);
          console.log('UN_CANCEL_TASK fromMeUnread', fromMeUnread[0]._id);
          if (eventData.oldTaskData.isAssignedToMe === true) {
            toMeNew.unshift(taskToMove);
            console.log("UN_CANCEL_TASK toMeNew", toMeNew[0]._id);
          }
          hiddenCanceled.splice(taskIndex, 1)
        }
      }
      // task with comment
      if (eventData.eventType === "comment") {
        if (eventData.taskData.creatorState === "canceled") {
          const taskIndex = findTaskIndex(
            hiddenCanceled,
            eventData.taskId
          );
          if (taskIndex > -1) {
            addEventToTask(hiddenCanceled[taskIndex], eventData, taskIndex);
            console.log("update hiddenCanceled", hiddenCanceled[taskIndex]);
          }
        }
        // task creator add comment in unread and update assignto new if not seen
        if (
          eventData.oldTaskData.creatorState === "unread" &&
          eventData.oldTaskData.isCreator === true
        ) {
          const checktaskIndex = findTaskIndex(fromMeUnread, taskIdLocal);
          if (checktaskIndex > -1) {
            addEventToTask(fromMeUnread[checktaskIndex], eventData, checktaskIndex);
            console.log("updated fromMeUnread", fromMeUnread[checktaskIndex]);
          }
        }

        // task AssignedToMe and task state is new
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "new"
        ) {
          const checktaskIndex = findTaskIndex(toMeNew, taskIdLocal);
          if (checktaskIndex > -1) {
            addEventToTask(toMeNew[checktaskIndex], eventData, checktaskIndex);
            console.log("updated new", toMeNew[toMeNew.length - 1]);
          }
        }
        // task isHiddenByMe and task state is hidden [ongoing]
        if (
          isHiddenByMe &&
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(hiddenOngoing, taskIdLocal);
          if (taskIndex > -1) {
            addEventToTask(hiddenOngoing[taskIndex], eventData, taskIndex);
            hiddenOngoing[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
            toMeOngoing.unshift(hiddenOngoing[taskIndex]);
            hiddenOngoing.splice(taskIndex, 1);
            console.log("updated hiddenOngoing => toMeOngoing", toMeOngoing[0]._id);
          }
        }
        // task AssignedToMe and task state is to-me [ongoing]
        if (
          eventData.oldTaskData.isHiddenByMe === false &&
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(toMeOngoing, taskIdLocal);
          if (taskIndex > -1) {
            addEventToTask(toMeOngoing[taskIndex], eventData, taskIndex);
            console.log("updated toMeOngoing", toMeOngoing[taskIndex]);
          }
        }

        // task creator and updated task from-me in ongoing
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(fromMeOngoing, taskIdLocal);
          if (taskIndex > -1) {
            addEventToTask(fromMeOngoing[taskIndex], eventData, taskIndex);
            fromMeOngoing[taskIndex].userSubState = "done"
            console.log("updated fromMeOngoing", fromMeOngoing[taskIndex]);
          }
        }

        // done task comment hidden [done] and move to to-me [done]
        if (
          isHiddenByMe &&
          eventData.oldTaskData.isAssignedToMe === true
        ) {
          const taskIndex = findTaskIndex(hiddenDone, taskIdLocal);
          if (taskIndex > -1) {
            addEventToTask(hiddenDone[taskIndex], eventData, taskIndex)
            toMeDone.unshift(hiddenDone[taskIndex]);
            hiddenDone.splice(taskIndex, 1);
            console.log("hiddenDone => toMeDone", toMeDone[0]._id);
          }
        }
        // done task comment from-me [done]
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "done"
        ) {
          const checktaskIndex = findTaskIndex(fromMeDone, taskIdLocal);;
          addEventToTask(fromMeDone[checktaskIndex], eventData, checktaskIndex)
          console.log("updated fromMeDone", fromMeDone[checktaskIndex]);
        }
        // done task comment to-me [done]
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "done"
        ) {
          const checktaskIndex = findTaskIndex(toMeDone, taskIdLocal);
          addEventToTask(toMeDone[checktaskIndex], eventData, checktaskIndex)
          console.log("updated toMeDone 1", toMeDone[checktaskIndex].events);
        }
      }
      // doneTask
      if (eventData.eventType === "doneTask") {
        if (eventData.oldTaskData.isCreator === true) {
          if (eventData.oldTaskData.creatorState === "unread") {
            const taskIndex = findTaskIndex(fromMeUnread, taskIdLocal);
            if (taskIndex !== -1) {
              // always push event on bottom
              const taskToMove = fromMeUnread[taskIndex]
              addEventToTask(fromMeUnread[taskIndex], eventData, taskIndex)
              fromMeUnread[taskIndex].userSubState = "done";
              fromMeDone.unshift(taskToMove);
              fromMeUnread.splice(taskIndex, 1);
              console.log("fromMeUnread=> fromMeDone", fromMeDone[0]._id);
            }
          }
          // check task from-me [ongoing] and move to from-me [Done]
          if (eventData.oldTaskData.creatorState === "ongoing") {
            const taskIndex = findTaskIndex(fromMeOngoing, taskIdLocal);
            addEventToTask(fromMeOngoing[taskIndex], eventData, taskIndex)
            fromMeDone.unshift(fromMeOngoing[taskIndex]);
            fromMeOngoing.splice(taskIndex, 1);
            console.log("move fromMeOngoing=>  fromMeDone", fromMeDone[0]._id);
          }
        }

        if (eventData.oldTaskData.isAssignedToMe === true) {
          // if task Assingtome move to-me [new] to to-me [done]
          if (eventData.oldTaskData.userSubState === "new") {
            const taskIndex = findTaskIndex(toMeNew, taskIdLocal);
            if (taskIndex !== -1) {
              const taskToMove = toMeNew[taskIndex];
              addEventToTask(taskToMove, eventData, taskIndex)
              taskToMove.userSubState = "done";
              toMeDone.unshift(taskToMove);
              toMeNew.splice(taskIndex, 1);
              console.log("toMeNew=> toMeDone", toMeDone[0]._id);
            }
          }

          // if task Assingtome move to-me [ongoing] to to-me [done]
          if (eventData.oldTaskData.userSubState === "ongoing") {
            // if task isHiddenByMe move hidden [ongoing] to to-me [done]
            if (isHiddenByMe) {
              const taskIndex = findTaskIndex(hiddenOngoing, taskIdLocal);
              if (taskIndex !== -1) {
                const taskToMove = hiddenOngoing[taskIndex];
                addEventToTask(taskToMove, eventData, taskIndex)
                taskToMove.userSubState = "done";
                toMeDone.unshift(taskToMove);
                hiddenOngoing.splice(taskIndex, 1)
                console.log("hiddenOngoing=> toMeDone", toMeDone[0]._id);
              }
            }
            // check task to-me [ongoing] and move to to-me [Done]
            else {
              const taskIndex = findTaskIndex(toMeOngoing, taskIdLocal);
              addEventToTask(toMeOngoing[taskIndex], eventData, taskIndex)
              toMeDone.unshift(toMeOngoing[taskIndex]);
              toMeOngoing.splice(taskIndex, 1);
              console.log("move toMeOngoing=>  toMeDone", toMeDone[taskIndex]);
            }
          }
        }
      }
      // task shown
      if (eventData.eventType === "TASK_SHOWN") {
        // task unHide from hidden [ongoing]  and move to to-me [ongoing]
        if (eventData.userSubState === "ongoing") {
          const taskIndex = findTaskIndex(hiddenOngoing, taskIdLocal);
          if (taskIndex !== -1) {
            const taskToMove = hiddenOngoing[taskIndex];
            const hiddenBy = taskToMove.hiddenBy;
            let index = hiddenBy.indexOf(eventData.userId);
            hiddenBy.splice(index, 1);
            toMeOngoing.unshift(taskToMove);
            hiddenOngoing.splice(taskIndex, 1)
            console.log("hiddenOngoing => toMeOngoing", toMeOngoing[0]._id);
          }
        }
        // task unHide from hidden [done] and move to to-me [done]
        if (eventData.userSubState === "done") {
          const taskIndex = findTaskIndex(hiddenDone, taskIdLocal);
          if (taskIndex !== -1) {
            const taskToMove = hiddenDone[taskIndex];
            taskToMove.hiddenBy.push(...eventData.hiddenBy)
            toMeDone.unshift(taskToMove);
            hiddenDone.splice(taskIndex, 1);
            console.log("unHide hiddenDone => toMeDone", toMeDone[0]._id);
          }
        }
      }
      // task hidden
      if (eventData.eventType === "TASK_HIDDEN") {
        // task hidden from-me ongoing and push to hidden ongoing
        if (
          eventData.userSubState === "ongoing" &&
          eventData.hiddenBy.includes(eventData.userId)
        ) {
          const taskIndex = findTaskIndex(toMeOngoing, taskIdLocal);
          if (taskIndex !== -1) {
            const taskToMove = toMeOngoing[taskIndex];
            taskToMove.hiddenBy.push(...eventData.hiddenBy)
            hiddenOngoing.unshift(taskToMove);
            toMeOngoing.splice(taskIndex, 1)
            console.log("toMeOngoing => hiddenOngoing", hiddenOngoing[0]._id);
          }
        }

        // task hidden from-me [done] and push to hidden done
        if (
          eventData.userSubState === "done" &&
          eventData.hiddenBy.includes(eventData.userId)
        ) {
          const taskIndex = findTaskIndex(toMeDone, taskIdLocal);
          if (taskIndex !== -1) {
            const taskToMove = toMeDone[taskIndex];
            taskToMove.hiddenBy.push(...eventData.hiddenBy)
            hiddenDone.unshift(taskToMove);
            toMeDone.splice(taskIndex, 1);
            console.log("hidden toMeDone => hiddenDone", hiddenDone[0]._id);
          }
        }
      }

      // task seen
      if (eventData.eventType === "TASK_SEEN") {
        // to-me [new] to-me [ongoing]
        if (isAssignedToMe && eventData.oldTaskData.userSubState === "new" && eventData.stateChanged === true) {
          // find task in new and move to ongoing and update task
          const taskIndex = findTaskIndex(toMeNew, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(toMeNew, taskIndex, eventData);
            toMeNew[taskIndex].userSubState = "ongoing"
            toMeNew[taskIndex].creatorState = "ongoing"
            toMeOngoing.unshift(toMeNew[taskIndex]);
            toMeNew.splice(taskIndex, 1);
            console.log("task seen toMeNew => toMeOngoing", toMeOngoing[0]._id);
          }
        }

        // from-me [unread] from-me [ongoing]
        if (
          eventData.isCreator === true &&
          eventData.creatorStateChanged &&
          eventData.newTaskData.creatorState === "ongoing"
        ) {
          // find task in unread and move to ongoing
          const taskIndex = findTaskIndex(fromMeUnread, taskIdLocal);
          if (taskIndex > -1) {
            fromMeUnread[taskIndex].userSubState = "ongoing"
            fromMeUnread[taskIndex].creatorState = "ongoing"
            fromMeOngoing.unshift(fromMeUnread[taskIndex]);
            fromMeUnread.splice(taskIndex, 1);
            console.log("task seen fromMeUnread => fromMeOngoing", fromMeOngoing[fromMeOngoing.length - 1]);
          }
        }

        // update  task to-me [ongoing]
        if (isAssignedToMe && isOngoing) {
          const taskIndex = findTaskIndex(toMeOngoing, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(toMeOngoing, taskIndex, eventData);
            console.log("updated toMeOngoing seenBy ", toMeOngoing[taskIndex]._id);
          }
        }
        // update  task from-me [ongoing] 
        if (isCreator && isOngoing) {
          const taskIndex = findTaskIndex(fromMeOngoing, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(fromMeOngoing, taskIndex, eventData);
            console.log("updated fromMeOngoing seenBy ", fromMeOngoing[taskIndex]._id);
          }
        }
        // update  task to-me [done] 
        if (isAssignedToMe &&
          eventData.oldTaskData.userSubState === "done"
        ) {
          const taskIndex = findTaskIndex(toMeDone, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(toMeDone, taskIndex, eventData);
            console.log("updated ongoing seenBy ", toMeDone[taskIndex]);
          }
        }
        // update  task from-me [done]
        if (isCreator &&
          eventData.oldTaskData.creatorState === "done"
        ) {
          const taskIndex = findTaskIndex(fromMeDone, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(fromMeDone, taskIndex, eventData);
            console.log("updated fromMeDone seenBy ", fromMeDone[taskIndex]);
          }
        }

        // update  task hidden [canceled]]
        if ((isCreator || isAssignedToMe) &&
          eventData.oldTaskData.creatorState === "canceled"
        ) {
          const taskIndex = findTaskIndex(hiddenCanceled, taskIdLocal);
          if (taskIndex > -1) {
            pushSeenBy(hiddenCanceled, taskIndex, eventData);
            console.log("updated hiddenCanceled seenBy ",
              hiddenCanceled[taskIndex]._id
            );
          }
        }
      }

      // forward task and update existing task
      if (eventData.eventType === "TASK_FORWARDED") {
        if (eventData.isAssignedToMe === true) {
          if (
            eventData.isHiddenByMe === true) {
            const taskIndex = findTaskIndex(hiddenOngoing, taskIdLocal);
            if (taskIndex !== -1) {
              toMeOngoing.unshift(hiddenOngoing[taskIndex]);
              hiddenOngoing.splice(taskIndex, 1);
              console.log("TASK_FORWARDED hiddenOngoing=> toMeOngoing", toMeOngoing[0]._id);
            }
          } else {
            const checktaskToMeInOngoing = findTaskIndex(toMeOngoing, taskIdLocal);
            if (checktaskToMeInOngoing > -1) {
              toMeOngoing[checktaskToMeInOngoing] = eventData;
              console.log("TASK_FORWARDED update toMeOngoing", toMeOngoing);
            }
            const taskIndex = findTaskIndex(toMeNew, taskIdLocal);
            if (taskIndex > -1) {
              toMeNew[taskIndex] = eventData;
              console.log("TASK_FORWARDED update toMeNew", toMeNew[taskIndex]);
            }
          }
        }

        if (eventData.isCreator === true) {
          const taskIndex = findTaskIndex(fromMeOngoing, taskIdLocal);
          if (taskIndex > -1) {
            fromMeOngoing[taskIndex] = eventData;
            console.log("TASK_FORWARDED update fromMeOngoing", fromMeOngoing[taskIndex]);
          }

          const taskIndex1 = findTaskIndex(fromMeUnread, taskIdLocal);
          if (taskIndex1 > -1) {
            fromMeUnread[taskIndex1] = eventData;
            console.log("TASK_FORWARDED update fromMeUnread", fromMeUnread[taskIndex1]);
          }
        }

        // forward task to other
        const isAssignedToMeExist = eventData.assignedToState.some(
          (assignTo: any) =>
            assignTo.userId === eventData.userId && assignTo.state === "new"
        );
        if (isAssignedToMeExist === true) {
          toMeNew.unshift(eventData);
          console.log("push to newtask ");
        }
      }

      return {
        ...state,
        allTaskHidden: {
          ...state.allTaskHidden,
          canceled: hiddenCanceled,
          ongoing: hiddenOngoing,
          done: hiddenDone,
        },
        allTaskFromMe: {
          ...state.allTaskFromMe,
          done: fromMeDone,
          ongoing: fromMeOngoing,
          unread: fromMeUnread,
        },
        allTaskToMe: {
          ...state.allTaskToMe,
          new: toMeNew,
          ongoing: toMeOngoing,
          done: toMeDone,
        },
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
