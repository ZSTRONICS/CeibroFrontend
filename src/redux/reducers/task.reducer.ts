import { ActionInterface } from "./appReducer";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { TASK_CONFIG } from "config";
import {
  AllSubtasksOfTaskResult,
  AllTaskFromMeInterface,
  AllTaskHiddenInterface,
  AllTaskToMeInterface,
  Task,
  TaskInterface,
} from "constants/interfaces";
import {
  RecentCommentsInterface,
  SubtaskInterface,
} from "constants/interfaces/subtask.interface";
import {
  addEventToTask,
  findTaskIndex,
  moveTask,
  moveTaskToSpecifiedArr,
  pushSeenBy,
} from "components/Utills/Globals";
import { selectedTaskFilterType } from "redux/type";
import { TopicInterface } from "constants/interfaces/topic.interface";
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

    // push topic in store
    case TASK_CONFIG.PUSH_TOPIC_IN_STORE:
      return {
        ...state,
        // getAllTopic: [...state.getAllTopic, action.payload]
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
      // canceled task
      if (eventData.eventType === "cancelTask") {
        // task isAssignedToMe and canceled  to-me [ongoing] -> hidden [canceled]
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing" &&
          eventData.newTaskData.isHiddenByMe === false
        ) {
          const taskIndex = findTaskIndex(toMeOngoing, eventData.taskId);
          toMeOngoing[taskIndex].events.unshift(eventData);
          toMeOngoing[taskIndex].creatorState = "canceled";
          toMeOngoing[taskIndex].userSubState = "canceled";
          const task = toMeOngoing.splice(taskIndex, 1)[0];

          hiddenCanceled.unshift(task);
          console.log(
            "move toMeOngoing=> hiddenCanceled",
            hiddenCanceled[hiddenCanceled.length - 1]
          );
        }
        // task isAssignedToMe hidden [ongoing]  => hidden [canceled]
        if (
          eventData.newTaskData.isHiddenByMe === true &&
          eventData.oldTaskData.userSubState === "ongoing" &&
          eventData.oldTaskData.isAssignedToMe === true
        ) {
          const taskIndex = findTaskIndex(hiddenOngoing, eventData.taskId);
          hiddenOngoing[taskIndex].events.unshift(eventData);
          const task = hiddenOngoing.splice(taskIndex, 1)[0];
          hiddenCanceled.unshift(task);
          console.log(
            "move hiddenOngoing=> hiddenCanceled",
            hiddenCanceled[hiddenCanceled.length - 1]
          );
        }

        // isCreator  from-me [unread]  => hidden [canceled]
        if (
          eventData.newTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "unread"
        ) {
          const taskIndex = findTaskIndex(fromMeUnread, eventData.taskId);
          fromMeUnread[taskIndex].events.unshift(eventData);
          const task = fromMeUnread.splice(taskIndex, 1)[0];
          hiddenCanceled.unshift(task);
          console.log(
            "move fromMeUnread=> hiddenCanceled",
            hiddenCanceled[hiddenCanceled.length - 1]
          );
        }

        // isCreator  to-me [new]  => hidden [canceled]
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "new"
        ) {
          const taskIndex = findTaskIndex(toMeNew, eventData.taskId);
          const checkTaskInhiddenCanel = findTaskIndex(
            hiddenCanceled,
            eventData.taskId
          );
          if (
            eventData.newTaskData.isCreator === true &&
            checkTaskInhiddenCanel > -1
          ) {
            console.log(
              "task already canceled to-me new",
              hiddenCanceled[checkTaskInhiddenCanel]
            );
          } else {
            toMeNew[taskIndex].events.unshift(eventData);
            const task = toMeNew.splice(taskIndex, 1)[0];
            hiddenCanceled.unshift(task);
            console.log(
              "move toMeNew=> hiddenCanceled",
              hiddenCanceled[hiddenCanceled.length - 1]
            );
          }
        }

        // isCreator and isAssignedToMe  from-me [ongoing]  => hidden [canceled]
        if (
          eventData.newTaskData.isCreator === true &&
          eventData.oldTaskData.userSubState === "ongoing" &&
          eventData.oldTaskData.isAssignedToMe === true
        ) {
          const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId);
          const checkTaskInhiddenCanel = findTaskIndex(
            hiddenCanceled,
            eventData.taskId
          );
          if (checkTaskInhiddenCanel < -1) {
            fromMeOngoing[taskIndex].events.unshift(eventData);
            const task = fromMeOngoing.splice(taskIndex, 1)[0];
            hiddenCanceled.unshift(task);
            console.log(
              "move fromMeOngoing=> hiddenCanceled",
              hiddenCanceled[hiddenCanceled.length - 1]
            );
          } else {
            console.log(
              "task already canceled from-me ongoing",
              hiddenCanceled[checkTaskInhiddenCanel]
            );
          }
        }
      }
      // unCancelTask
      if (eventData.eventType === "UN_CANCEL_TASK") {
        if (
          eventData.oldTaskData.creatorState === "canceled" &&
          eventData.oldTaskData.isCreator === true
        ) {
          const taskIndex = findTaskIndex(hiddenCanceled, eventData.taskId);
          hiddenCanceled[taskIndex].events.unshift(eventData);
          hiddenCanceled[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
          hiddenCanceled[taskIndex].creatorState = "unread";
          hiddenCanceled[taskIndex].userSubState = "new";
          const task = hiddenCanceled.splice(taskIndex, 1)[0];
          fromMeUnread.unshift(task);
          console.log(
            "hiddenCanceled => Move to fromMeUnread",
            fromMeUnread[0]
          );
        }
        if (
          eventData.oldTaskData.userSubState === "canceled" &&
          eventData.oldTaskData.isAssignedToMe === true
        ) {
          const taskIndex = findTaskIndex(hiddenCanceled, eventData.taskId);
          hiddenCanceled[taskIndex].events.unshift(eventData);
          hiddenCanceled[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
          hiddenCanceled[taskIndex].creatorState = "unread";
          hiddenCanceled[taskIndex].userSubState = "new";
          const task = hiddenCanceled.splice(taskIndex, 1)[0];
          toMeNew.unshift(task);
          console.log(
            "hiddenCanceled => Move to toMeNew",
            toMeNew[toMeNew.length - 1]
          );
        }
      }
      // task with comment
      if (eventData.eventType === "comment") {
        if (eventData.taskData.creatorState === "canceled") {
          const checktaskInCanceled = findTaskIndex(
            hiddenCanceled,
            eventData.taskId
          );
          addEventToTask(hiddenCanceled, eventData, checktaskInCanceled);
          console.log(
            "update hiddenCanceled",
            hiddenCanceled[checktaskInCanceled]
          );
        }
        // task creator add comment in unread and update assignto new if not seen
        if (
          eventData.oldTaskData.creatorState === "unread" &&
          eventData.oldTaskData.isCreator === true
        ) {
          const checktaskIndex = findTaskIndex(fromMeUnread, eventData.taskId);
          fromMeUnread[checktaskIndex].events.unshift(eventData);
          console.log("updated fromMeUnread", fromMeUnread[checktaskIndex]);
        }

        // task AssignedToMe and task state is new
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "new"
        ) {
          const checktaskIndex = findTaskIndex(toMeNew, eventData.taskId);
          addEventToTask(toMeNew, eventData, checktaskIndex);
          console.log("updated new", toMeNew[toMeNew.length - 1]);
        }
        // task isHiddenByMe and task state is hidden [ongoing]
        if (
          eventData.oldTaskData.isHiddenByMe === true &&
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(hiddenOngoing, eventData.taskId);
          addEventToTask(hiddenOngoing, eventData, taskIndex);
          hiddenOngoing[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
          const task = hiddenOngoing.splice(taskIndex, 1)[0];
          toMeOngoing.unshift(task);
          console.log(
            "updated hiddenOngoing => toMeOngoing",
            toMeOngoing[toMeOngoing.length - 1]
          );
        }
        // task AssignedToMe and task state is to-me [ongoing]
        if (
          eventData.oldTaskData.isHiddenByMe === false &&
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          const checktaskIndex = findTaskIndex(toMeOngoing, eventData.taskId);
          addEventToTask(toMeOngoing, eventData, checktaskIndex);
          console.log("updated toMeOngoing", toMeOngoing[checktaskIndex]);
        }

        // task creator and updated task from-me in ongoing
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "ongoing"
        ) {
          const checktaskIndex = findTaskIndex(fromMeOngoing, eventData.taskId);
          addEventToTask(fromMeOngoing, eventData, checktaskIndex);
          fromMeOngoing[checktaskIndex].userSubState = "done"
          console.log("updated fromMeOngoing", fromMeOngoing[checktaskIndex]);
        }

        // done task comment hidden [done] and move to to-me [done]
        if (
          eventData.oldTaskData.isHiddenByMe === true &&
          eventData.oldTaskData.isAssignedToMe === true
        ) {
          const checktaskIndex = findTaskIndex(hiddenDone, eventData.taskId);
          hiddenDone[checktaskIndex].events.unshift(eventData);
          const task = hiddenDone.splice(checktaskIndex, 1)[0];
          toMeDone.unshift(task);
          console.log(
            "updated hiddenDone => toMeDone",
            toMeDone[toMeDone.length - 1]
          );
        }
        // done task comment from-me [done]
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "done"
        ) {
          const checktaskIndex = findTaskIndex(fromMeDone, eventData.taskId);
          fromMeDone[checktaskIndex].events.unshift(eventData);
          console.log("updated fromMeDone", fromMeDone[checktaskIndex]);
        }
        // done task comment to-me [done]
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "done"
        ) {
          const checktaskIndex = findTaskIndex(toMeDone, eventData.taskId);
          toMeDone[checktaskIndex].events.unshift(eventData);
          console.log("updated toMeDone", toMeDone[checktaskIndex]);
        }
      }

      // doneTask
      if (eventData.eventType === "doneTask") {
        if (
          eventData.oldTaskData.creatorState === "unread" &&
          eventData.oldTaskData.isCreator === true
        ) {
          const taskIndex = findTaskIndex(fromMeUnread, eventData.taskId);
          if (taskIndex !== -1) {
            const taskToMove = fromMeUnread[taskIndex];
            taskToMove.events.unshift(eventData);
            taskToMove.userSubState = "done";
            fromMeDone.unshift(taskToMove);
            fromMeUnread.splice(taskIndex, 1);
            console.log("fromMeUnread=> fromMeDone", fromMeDone[0]._id);
          }
        }
        if (
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          // if task isHiddenByMe move hidden [ongoing] to to-me [done]
          if (
            eventData.oldTaskData.isHiddenByMe === true &&
            eventData.oldTaskData.isAssignedToMe === true
          ) {
            const taskIndex = findTaskIndex(hiddenOngoing, eventData.taskId);
            if (taskIndex !== -1) {
              const taskToMove = hiddenOngoing[taskIndex];
              taskToMove.events.unshift(eventData);
              taskToMove.userSubState = "done";
              toMeDone.unshift(taskToMove);
              hiddenOngoing.splice(taskIndex, 1)
              console.log("hiddenOngoing=> toMeDone", toMeDone[0]._id);
            }
          }
          // check task from-me [ongoing] and move to from-me [Done]
          if (
            eventData.oldTaskData.isCreator === true &&
            eventData.oldTaskData.creatorState === "ongoing"
          ) {
            const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId);
            fromMeOngoing[taskIndex].events.unshift(eventData);
            const task = fromMeOngoing.splice(taskIndex, 1)[0];
            fromMeDone.unshift(task);
            console.log(
              "move fromMeOngoing=>  fromMeDone",
              fromMeDone[taskIndex]
            );
          }

          // check task to-me [ongoing] and move to to-me [Done]
          if (
            eventData.oldTaskData.isAssignedToMe === true &&
            eventData.oldTaskData.userSubState === "ongoing"
          ) {
            const taskIndex = findTaskIndex(toMeOngoing, eventData.taskId);
            toMeOngoing[taskIndex].events.unshift(eventData);
            const task = toMeOngoing.splice(taskIndex, 1)[0];
            toMeDone.unshift(task);
            console.log("move toMeOngoing=>  toMeDone", toMeDone[taskIndex]);
          }
        }
      }


      if (eventData.eventType === "TASK_SHOWN") {
        // task unHide from hidden [ongoing]  and move to to-me [ongoing]
        if (eventData.userSubState === "ongoing") {
          const taskIndex = findTaskIndex(hiddenOngoing, eventData.taskId);
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
          moveTask(hiddenDone, toMeDone, eventData);
          const hiddenBy = toMeDone[toMeDone.length - 1].hiddenBy;
          let index = hiddenBy.indexOf(eventData.userId);
          hiddenBy.splice(index, 1);
          console.log(
            "unHide hiddenDone => toMeDone",
            index,
            toMeDone[toMeDone.length - 1]
          );
        }
      }

      if (eventData.eventType === "TASK_HIDDEN") {
        // task hidden from-me ongoing and push to hidden ongoing
        if (
          eventData.userSubState === "ongoing" &&
          eventData.hiddenBy.includes(eventData.userId)
        ) {
          const taskIndex = findTaskIndex(toMeOngoing, eventData.taskId);
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
          moveTask(toMeDone, hiddenDone, eventData);
          console.log("hidden toMeDone => hiddenDone");
        }
      }
      // task seen
      if (eventData.eventType === "TASK_SEEN") {
        // move task assigne new state to ongoing
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "new"
        ) {
          // find task in new and move to ongoing and update task
          const taskIndex = findTaskIndex(toMeNew, eventData.taskId);
          pushSeenBy(toMeNew, taskIndex, eventData);
          const task = toMeNew.splice(taskIndex, 1)[0];
          toMeOngoing.unshift(task);
          console.log(
            "task seen toMeNew => toMeOngoing",
            toMeOngoing[toMeOngoing.length - 1]
          );
        }

        // task creator move unread state to ongoing
        if (
          eventData.isCreator === true &&
          eventData.stateChanged === true &&
          eventData.newTaskData.creatorState === "ongoing"
        ) {
          // find task in unread and move to ongoing
          const taskIndex = findTaskIndex(fromMeUnread, eventData.taskId);
          const task = fromMeUnread.splice(taskIndex, 1)[0];
          fromMeOngoing.unshift(task);
          console.log(
            "task seen fromMeUnread => fromMeOngoing",
            fromMeOngoing[fromMeOngoing.length - 1]
          );
        }

        // update  task to-me [ongoing] when seen
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(toMeOngoing, eventData.taskId);
          pushSeenBy(toMeOngoing, taskIndex, eventData);
          console.log("updated toMeOngoing seenBy ", toMeOngoing[taskIndex]);
        }
        // update  task from-me [ongoing] when seen
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "ongoing"
        ) {
          const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId);
          pushSeenBy(fromMeOngoing, taskIndex, eventData);
          console.log(
            "updated fromMeOngoing seenBy ",
            fromMeOngoing[taskIndex]
          );
        }
        // update  task to-me [done] when seen
        if (
          eventData.oldTaskData.isAssignedToMe === true &&
          eventData.oldTaskData.userSubState === "done"
        ) {
          const taskIndex = findTaskIndex(toMeDone, eventData.taskId);
          pushSeenBy(toMeDone, taskIndex, eventData);
          console.log("updated ongoing seenBy ", toMeDone[taskIndex]);
        }
        // update  task from-me [done] when seen
        if (
          eventData.oldTaskData.isCreator === true &&
          eventData.oldTaskData.creatorState === "done"
        ) {
          const taskIndex = findTaskIndex(fromMeDone, eventData.taskId);
          pushSeenBy(fromMeDone, taskIndex, eventData);
          console.log("updated fromMeDone seenBy ", fromMeDone[taskIndex]);
        }

        // update  task hidden [canceled]] when seen
        if (
          (eventData.oldTaskData.isCreator === true ||
            eventData.oldTaskData.isAssignedToMe === true) &&
          eventData.oldTaskData.creatorState === "canceled"
        ) {
          const taskIndex = findTaskIndex(hiddenCanceled, eventData.taskId);
          pushSeenBy(hiddenCanceled, taskIndex, eventData);
          console.log(
            "updated hiddenCanceled seenBy ",
            hiddenCanceled[taskIndex]
          );
        }
      }

      // forward task and update existing task
      if (eventData.eventType === "TASK_FORWARDED") {
        if (
          eventData.isHiddenByMe === true &&
          eventData.isAssignedToMe === true
        ) {
          moveTaskToSpecifiedArr(hiddenOngoing, toMeOngoing, eventData);
          console.log(
            "TASK_FORWARDED hiddenOngoing=> toMeOngoing",
            toMeOngoing
          );
        }

        if (
          eventData.isAssignedToMe === true &&
          eventData.isHiddenByMe === false
        ) {
          const checktaskToMeInOngoing = findTaskIndex(
            toMeOngoing,
            eventData.taskId
          );
          toMeOngoing[checktaskToMeInOngoing] = eventData;
          console.log("TASK_FORWARDED update toMeOngoing", toMeOngoing);

          const taskIndex = findTaskIndex(toMeNew, eventData.taskId);
          toMeNew[taskIndex] = eventData;
          console.log("TASK_FORWARDED update toMeNew", toMeNew);
        }
        if (eventData.isCreator === true) {
          const taskIndex = findTaskIndex(fromMeOngoing, eventData.taskId);
          if (taskIndex > -1) {
            fromMeOngoing[taskIndex] = eventData;
            console.log("TASK_FORWARDED update fromMeOngoing", fromMeOngoing);
          }

          const taskIndex1 = findTaskIndex(fromMeUnread, eventData.taskId);
          if (taskIndex1 > -1) {
            fromMeUnread[taskIndex1] = eventData;
            console.log("TASK_FORWARDED update fromMeUnread", fromMeUnread);
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
