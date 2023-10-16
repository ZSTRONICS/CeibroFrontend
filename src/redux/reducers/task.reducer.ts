import {
  addEventToTask,
  moveTaskOnTopByIndex,
  pushSeenBy,
  updateTaskOnCancelEvent
} from "components/Utills/Globals";
import { TASK_CONFIG } from "config";
import {
  AllTaskFromMeInterface,
  AllTaskHiddenInterface,
  AllTaskToMeInterface,
  Task
} from "constants/interfaces";
import { TopicInterface } from "constants/interfaces/topic.interface";
import { selectedTaskFilterType } from "redux/type";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { ActionInterface } from "./appReducer";
export interface TaskReducerInt {
  RECENT_TASK_UPDATED_TIME_STAMP: string;
  allTaskToMe: AllTaskToMeInterface;
  allTaskFromMe: AllTaskFromMeInterface;
  allTaskHidden: AllTaskHiddenInterface;
  loadingAllTasks: boolean;
  selectedTaskFilter: selectedTaskFilterType;
  Topics: TopicInterface;
  loadingTopics: boolean;
}

const intialStatue: TaskReducerInt = {
  RECENT_TASK_UPDATED_TIME_STAMP: "2020-10-13T12:00:00Z", // default time stamp for syncing all data
  selectedTaskFilter: "allTaskFromMe",
  allTaskToMe: { new: [], ongoing: [], done: [] },
  allTaskFromMe: { unread: [], ongoing: [], done: [] },
  allTaskHidden: { ongoing: [], done: [], canceled: [] },
  loadingAllTasks: true,
  loadingTopics: false,
  Topics: { allTopics: [], recentTopics: [] },
};

const taskReducer = (
  state = intialStatue,
  action: ActionInterface
): TaskReducerInt => {
  switch (action.type) {
    case TASK_CONFIG.SELECTED_TASK_FILTER:
      return {
        ...state,
        selectedTaskFilter: action.payload,
      };

    case TASK_CONFIG.PUSH_NEW_TASK_TO_STORE:
      const taskUpdatedAt = action.payload.updatedAt;
      if (taskUpdatedAt) {
        const currentUpdatedAt = new Date(taskUpdatedAt);
        const recentTaskUpdatedDate = new Date(state.RECENT_TASK_UPDATED_TIME_STAMP);
        if (currentUpdatedAt > recentTaskUpdatedDate) {
          // console.log("TASK_CREATED", "updating RECENT_TASK_UPDATED_TIME_STAMP");
          state.RECENT_TASK_UPDATED_TIME_STAMP = taskUpdatedAt;
        } else if (currentUpdatedAt !== recentTaskUpdatedDate) {
          // console.log("TIME NOT UPDATED", taskUpdatedAt, state.RECENT_TASK_UPDATED_TIME_STAMP)
          // console.log("TASK_CREATED", "eventData.taskUpdatedAt is not recent");
        }
      } else {
        console.log("TASK_CREATED", "taskUpdatedAt not found in eventData");
      }


      if (action.payload.isAssignedToMe === true) {
        const isTaskUnique = !state.allTaskToMe.new.some((task: any) => task._id === action.payload._id);
        if (isTaskUnique) {
          const assigneeTask = {
            ...action.payload,
            userSubState: 'new',
          };
          state.allTaskToMe.new.unshift(assigneeTask);
          console.log("push task to me new", assigneeTask);
        }
      }
      if (action.payload.isCreator === true) {
        const isTaskUnique = !state.allTaskFromMe.unread.some((task: any) => task._id === action.payload._id);
        if (isTaskUnique) {
          const creatorTask = {
            ...action.payload,
            userSubState: 'unread',
          };
          const newAllTaskFromMe = [creatorTask, ...state.allTaskFromMe.unread];
          console.log("pus task from-me [unread]", newAllTaskFromMe[0]);
          return {
            ...state,
            allTaskFromMe: {
              ...state.allTaskFromMe,
              unread: newAllTaskFromMe,
            },
          };

        } else {
          console.log("Task is already present in the unread ");
        }
      }
      return {
        ...state
      }

    // push topic in store
    case TASK_CONFIG.PUSH_TOPIC_IN_STORE:
      const isTopicUnique = !state.Topics.allTopics.some((topic: any) => topic._id === action.payload._id);
      if (isTopicUnique) {
        state.Topics.allTopics.unshift(action.payload)
      }
      return {
        ...state,
      };

    // update task when event received
    case TASK_CONFIG.UPDATE_TASK_WITH_EVENTS:
      const eventData = action.payload;
      console.log("eventData", eventData);

      const isAssignedToMe = eventData?.oldTaskData?.isAssignedToMe || false;
      const isCreator = eventData?.oldTaskData?.isCreator || false;
      const isOngoing = eventData?.oldTaskData?.userSubState === "ongoing" || false;
      const isHiddenByMe = eventData?.oldTaskData?.isHiddenByMe || false;


      let currentUpdatedAt = null;
      let recentTaskUpdatedDate = null;

      if (eventData.eventType === "TASK_FORWARDED") {
        currentUpdatedAt = new Date(eventData.task.updatedAt);
        recentTaskUpdatedDate = new Date(state.RECENT_TASK_UPDATED_TIME_STAMP);
      }

      if (eventData.taskUpdatedAt) {
        currentUpdatedAt = new Date(eventData.taskUpdatedAt);
        recentTaskUpdatedDate = new Date(state.RECENT_TASK_UPDATED_TIME_STAMP);
      } else {
        console.log(eventData.eventType, "taskUpdatedAt not found in eventData");
      }

      if (currentUpdatedAt && recentTaskUpdatedDate) {
        if (currentUpdatedAt > recentTaskUpdatedDate) {
          // console.log(eventData.eventType, "updating RECENT_TASK_UPDATED_TIME_STAMP");

          if (eventData.eventType === "TASK_FORWARDED") {
            state.RECENT_TASK_UPDATED_TIME_STAMP = eventData.task.updatedAt;
          } else {
            state.RECENT_TASK_UPDATED_TIME_STAMP = eventData.taskUpdatedAt;
          }
        } else if (currentUpdatedAt !== recentTaskUpdatedDate) {
          // console.log("TIME NOT UPDATED", currentUpdatedAt.toString(), state.RECENT_TASK_UPDATED_TIME_STAMP)
          // console.log(eventData.eventType, "eventData.taskUpdatedAt is not recent");
        }
      }

      switch (eventData.eventType) {
        case "cancelTask":
          if (isCreator) {
            // creator canceled task in unread state
            if (eventData.oldTaskData.creatorState === "unread") {
              const taskIndex = state.allTaskFromMe.unread.findIndex((task: any) => task._id === eventData.taskId);
              if (taskIndex > -1) {
                updateTaskOnCancelEvent(state.allTaskFromMe.unread[taskIndex], taskIndex, eventData);
                state.allTaskHidden.canceled.unshift(state.allTaskFromMe.unread[taskIndex]);
                state.allTaskFromMe.unread.splice(taskIndex, 1)
                console.log('allTaskFromMe.unread => allTaskHidden.canceled', state.allTaskHidden.canceled[0]._id)
              }
            } else if (isOngoing) {
              // creator canceled task in ongoing state
              const taskIndex = state.allTaskFromMe.ongoing.findIndex((task: any) => task._id === eventData.taskId);
              if (taskIndex > -1) {
                updateTaskOnCancelEvent(state.allTaskFromMe.ongoing[taskIndex], taskIndex, eventData)
                state.allTaskHidden.canceled.unshift(state.allTaskFromMe.ongoing[taskIndex])
                state.allTaskFromMe.ongoing.splice(taskIndex, 1)
                console.log('state.allTaskFromMe.ongoing => state.allTaskHidden.canceled', state.allTaskHidden.canceled[0]._id)
              }
            }
          }
          if (isAssignedToMe) {
            // to-me [new]  => hidden [canceled]
            if (eventData.oldTaskData.userSubState === "new") {
              const taskIndex = state.allTaskToMe.new.findIndex(task => task._id === eventData.taskId);
              const checkTaskExist = state.allTaskHidden.canceled.findIndex(task => task._id === eventData.taskId);
              if (checkTaskExist === -1) {
                if (taskIndex > -1) {
                  updateTaskOnCancelEvent(state.allTaskToMe.new[taskIndex], taskIndex, eventData)
                  state.allTaskHidden.canceled.unshift(state.allTaskToMe.new[taskIndex])
                  state.allTaskToMe.new.splice(taskIndex, 1)
                  console.log('allTaskToMe.new => allTaskHidden.canceled', state.allTaskHidden.canceled[0]._id)
                }
              } else if (checkTaskExist > -1) {
                state.allTaskToMe.new.splice(taskIndex, 1)
                console.log('task already moved 1')
              }
            } else if (isOngoing) {
              // hidden [ongoing]  => hidden [canceled]
              if (isHiddenByMe === true) {
                const taskIndex = state.allTaskHidden.ongoing.findIndex(task => task._id === eventData.taskId);
                const checkTaskExist = state.allTaskHidden.canceled.findIndex(task => task._id === eventData.taskId);
                if (checkTaskExist === -1) {
                  if (taskIndex > -1) {
                    updateTaskOnCancelEvent(state.allTaskHidden.ongoing[taskIndex], taskIndex, eventData)
                    state.allTaskHidden.canceled.unshift(state.allTaskHidden.ongoing[taskIndex])
                    state.allTaskHidden.ongoing.splice(taskIndex, 1)
                    console.log('state.allTaskHidden.ongoing => state.allTaskHidden.canceled', state.allTaskHidden.canceled[0]._id)
                  }
                } else if (checkTaskExist > -1) {
                  state.allTaskHidden.ongoing.splice(taskIndex, 1);
                  console.log('Task already moved 2',)
                }
              } else {
                // to-me [ongoing]  => hidden [canceled]
                console.log('isOngoing', isOngoing)
                const taskIndex = state.allTaskToMe.ongoing.findIndex(task => task._id === eventData.taskId);
                const checkTaskExist = state.allTaskHidden.canceled.findIndex(task => task._id === eventData.taskId);
                if (checkTaskExist === -1) {
                  if (taskIndex > -1) {
                    updateTaskOnCancelEvent(state.allTaskToMe.ongoing[taskIndex], taskIndex, eventData);
                    state.allTaskHidden.canceled.unshift(state.allTaskToMe.ongoing[taskIndex]);
                    state.allTaskToMe.ongoing.splice(taskIndex, 1);
                    console.log('state.allTaskToMe.ongoing => state.allTaskHidden.canceled', state.allTaskHidden.canceled[0]._id);
                  }
                } else if (checkTaskExist > -1) {
                  state.allTaskToMe.ongoing.splice(taskIndex, 1);
                }
              }
            }
          }
          break;
        case "unCancelTask":
          const taskIndex = state.allTaskHidden.canceled.findIndex(task => task._id === eventData.taskId);
          if (taskIndex > -1) {
            addEventToTask(state.allTaskHidden.canceled[taskIndex], eventData, taskIndex);
            state.allTaskHidden.canceled[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
            state.allTaskHidden.canceled[taskIndex].creatorState = "unread";
            state.allTaskHidden.canceled[taskIndex].isCanceled = false;
            const modifiedTask = {
              ...state.allTaskHidden.canceled[taskIndex],
              userSubState: 'unread',
            };
            if (eventData.oldTaskData.isCreator) {
              state.allTaskFromMe.unread.unshift(modifiedTask);
            }
            if (isAssignedToMe) {
              const modifiedTask = {
                ...state.allTaskHidden.canceled[taskIndex],
                userSubState: 'new',
              };
              console.log("UN_CANCEL_TASK allTaskToMe.new", modifiedTask);
              state.allTaskToMe.new.unshift(modifiedTask);
            }
            state.allTaskHidden.canceled.splice(taskIndex, 1)
          }
          break;
        case "comment":
          if (eventData.taskData.creatorState === "canceled") {
            const taskIndex = state.allTaskHidden.canceled.findIndex(task => task._id === eventData.taskId)
            if (taskIndex > -1) {
              addEventToTask(state.allTaskHidden.canceled[taskIndex], eventData, taskIndex);
              moveTaskOnTopByIndex(state.allTaskHidden.canceled, taskIndex);
              console.log("update state.allTaskHidden.canceled", state.allTaskHidden.canceled[taskIndex]);
            }
          }
          // task creator add comment in unread and update assignto new if not seen
          if (isCreator && eventData.oldTaskData.creatorState === "unread") {
            const checktaskIndex = state.allTaskFromMe.unread.findIndex(task => task._id === eventData.taskId);
            if (checktaskIndex > -1) {
              addEventToTask(state.allTaskFromMe.unread[checktaskIndex], eventData, checktaskIndex);
              moveTaskOnTopByIndex(state.allTaskFromMe.unread, checktaskIndex);
              console.log("updated state.allTaskFromMe.unread", state.allTaskFromMe.unread[checktaskIndex]);
            }
          }

          // task AssignedToMe and task state is new
          if (isAssignedToMe && eventData.oldTaskData.userSubState === "new") {
            const checktaskIndex = state.allTaskToMe.new.findIndex(task => task._id === eventData.taskId);
            if (checktaskIndex > -1) {
              addEventToTask(state.allTaskToMe.new[checktaskIndex], eventData, checktaskIndex);
              moveTaskOnTopByIndex(state.allTaskToMe.new, checktaskIndex);
              console.log("updated new", state.allTaskToMe.new[state.allTaskToMe.new.length - 1]);
            }
          }
          // task isHiddenByMe and task state is hidden [ongoing]
          if (isHiddenByMe && isAssignedToMe && isOngoing) {
            const taskIndex = state.allTaskHidden.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              addEventToTask(state.allTaskHidden.ongoing[taskIndex], eventData, taskIndex);
              state.allTaskHidden.ongoing[taskIndex].hiddenBy = eventData.taskData.hiddenBy;
              state.allTaskToMe.ongoing.unshift(state.allTaskHidden.ongoing[taskIndex]);
              state.allTaskHidden.ongoing.splice(taskIndex, 1);
              console.log("updated state.allTaskHidden.ongoing => state.allTaskToMe.ongoing", state.allTaskToMe.ongoing[0]._id);
            }
          }
          // task AssignedToMe and task state is to-me [ongoing]
          if (isAssignedToMe && isOngoing) {
            const taskIndex = state.allTaskToMe.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              addEventToTask(state.allTaskToMe.ongoing[taskIndex], eventData, taskIndex);
              moveTaskOnTopByIndex(state.allTaskToMe.ongoing, taskIndex);
              console.log("updated state.allTaskToMe.ongoing", state.allTaskToMe.ongoing[taskIndex]._id);
            }
          }

          // task creator and updated task from-me in ongoing
          if (isCreator && eventData.oldTaskData.creatorState === "ongoing") {
            const taskIndex = state.allTaskFromMe.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              addEventToTask(state.allTaskFromMe.ongoing[taskIndex], eventData, taskIndex);
              moveTaskOnTopByIndex(state.allTaskFromMe.ongoing, taskIndex);
              console.log("updated state.allTaskFromMe.ongoing", state.allTaskFromMe.ongoing[taskIndex]);
            }
          }

          // done task comment hidden [done] and move to to-me [done]
          if (isHiddenByMe && isAssignedToMe) {
            const taskIndex = state.allTaskHidden.done.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              addEventToTask(state.allTaskHidden.done[taskIndex], eventData, taskIndex);
              state.allTaskToMe.done.unshift(state.allTaskHidden.done[taskIndex]);
              state.allTaskHidden.done.splice(taskIndex, 1);
              console.log("state.allTaskHidden.done => state.allTaskToMe.done", state.allTaskToMe.done[0]._id);
            }
          }

          // done task comment from-me [done]
          if (isCreator && eventData.oldTaskData.creatorState === "done") {
            const checktaskIndex = state.allTaskFromMe.done.findIndex(task => task._id === eventData.taskId);
            addEventToTask(state.allTaskFromMe.done[checktaskIndex], eventData, checktaskIndex);
            moveTaskOnTopByIndex(state.allTaskFromMe.done, checktaskIndex);
            console.log("updated state.allTaskFromMe.done", state.allTaskFromMe.done[checktaskIndex]);
          }

          // done task comment to-me [done]
          if (isAssignedToMe && eventData.oldTaskData.userSubState === "done") {
            const checktaskIndex = state.allTaskToMe.done.findIndex(task => task._id === eventData.taskId);
            if (checktaskIndex > -1) {
              addEventToTask(state.allTaskToMe.done[checktaskIndex], eventData, checktaskIndex)
              moveTaskOnTopByIndex(state.allTaskToMe.done, checktaskIndex);
              console.log("updated state.allTaskToMe.done 1", state.allTaskToMe.done[checktaskIndex].events);
            }
          }
          break;
        case "doneTask":
          if (isCreator) {
            if (eventData.oldTaskData.creatorState === "unread") {
              const taskIndex = state.allTaskFromMe.unread.findIndex((task: any) => task._id === eventData.taskId);
              if (taskIndex !== -1) {
                // always push event on bottom
                const taskToMove = state.allTaskFromMe.unread[taskIndex]
                addEventToTask(state.allTaskFromMe.unread[taskIndex], eventData, taskIndex)
                state.allTaskFromMe.unread[taskIndex].userSubState = "done";
                state.allTaskFromMe.done.unshift(taskToMove);
                state.allTaskFromMe.unread.splice(taskIndex, 1);
                console.log("state.allTaskFromMe.unread=> state.allTaskFromMe.done", state.allTaskFromMe.done[0]._id);
              }
            }
            // check task from-me [ongoing] and move to from-me [Done]
            if (eventData.oldTaskData.creatorState === "ongoing") {
              const taskIndex = state.allTaskFromMe.ongoing.findIndex((task: any) => task._id === eventData.taskId);
              if (taskIndex > -1) {
                addEventToTask(state.allTaskFromMe.ongoing[taskIndex], eventData, taskIndex)
                state.allTaskFromMe.ongoing[taskIndex].userSubState = "done";
                state.allTaskFromMe.done.unshift(state.allTaskFromMe.ongoing[taskIndex]);
                state.allTaskFromMe.ongoing.splice(taskIndex, 1);
                console.log("move state.allTaskFromMe.ongoing=>  allTaskFromMe.done", state.allTaskFromMe.done[0]._id);
              }
            }
          }

          if (isAssignedToMe) {
            // if task Assingtome move to-me [new] to to-me [done]
            if (eventData.oldTaskData.userSubState === "new") {
              const taskIndex = state.allTaskToMe.new.findIndex((task: any) => task._id === eventData.taskId);
              if (taskIndex !== -1) {
                addEventToTask(state.allTaskToMe.new[taskIndex], eventData, taskIndex)
                state.allTaskToMe.new[taskIndex].userSubState = "done";
                state.allTaskToMe.done.unshift(state.allTaskToMe.new[taskIndex]);
                state.allTaskToMe.new.splice(taskIndex, 1);
                console.log("state.allTaskToMe.new=> state.allTaskToMe.done", state.allTaskToMe.done[0]._id);
              }
            }

            // if task Assingtome move to-me [ongoing] to to-me [done]
            if (isOngoing) {
              // if task isHiddenByMe move hidden [ongoing] to to-me [done]
              if (isHiddenByMe) {
                const taskIndex = state.allTaskHidden.ongoing.findIndex((task: any) => task._id === eventData.taskId);
                if (taskIndex !== -1) {
                  const taskToMove = state.allTaskHidden.ongoing[taskIndex];
                  addEventToTask(taskToMove, eventData, taskIndex)
                  state.allTaskHidden.ongoing[taskIndex].userSubState = "done";
                  state.allTaskToMe.done.unshift(taskToMove);
                  state.allTaskHidden.ongoing.splice(taskIndex, 1)
                  console.log("state.allTaskHidden.ongoing=> state.allTaskToMe.done", state.allTaskToMe.done[0]._id);
                }
              }
              // check task to-me [ongoing] and move to to-me [Done]
              else {
                const taskIndex = state.allTaskToMe.ongoing.findIndex((task: any) => task._id === eventData.taskId);
                if (taskIndex > -1) {
                  addEventToTask(state.allTaskToMe.ongoing[taskIndex], eventData, taskIndex)
                  state.allTaskToMe.ongoing[taskIndex].userSubState = "done";
                  state.allTaskToMe.done.unshift(state.allTaskToMe.ongoing[taskIndex]);
                  state.allTaskToMe.ongoing.splice(taskIndex, 1);
                  console.log("move state.allTaskToMe.ongoing=>  state.allTaskToMe.done", state.allTaskToMe.done[taskIndex]);
                }
              }
            }
          }
          break;
        case "TASK_SHOWN":
          // task unHide from hidden [ongoing]  and move to to-me [ongoing]
          if (eventData.userSubState === "ongoing") {
            const taskIndex = state.allTaskHidden.ongoing.findIndex((task: Task) => task._id === eventData.taskId);
            if (taskIndex !== -1) {
              const hiddenBy = state.allTaskHidden.ongoing[taskIndex].hiddenBy;
              let index = hiddenBy.indexOf(eventData.userId);
              hiddenBy.splice(index, 1);
              state.allTaskToMe.ongoing.unshift(state.allTaskHidden.ongoing[taskIndex]);
              state.allTaskHidden.ongoing.splice(taskIndex, 1)
              console.log("state.allTaskHidden.ongoing => state.allTaskToMe.ongoing", state.allTaskToMe.ongoing[0]._id);
            }
          }
          // task unHide from hidden [done] and move to to-me [done]
          if (eventData.userSubState === "done") {
            const taskIndex = state.allTaskHidden.done.findIndex((task: Task) => task._id === eventData.taskId)
            if (taskIndex !== -1) {
              state.allTaskHidden.done[taskIndex].hiddenBy.push(...eventData.hiddenBy)
              state.allTaskToMe.done.unshift(state.allTaskHidden.done[taskIndex]);
              state.allTaskHidden.done.splice(taskIndex, 1);
              console.log("unHide allTaskHidden.done => allTaskToMe.done", state.allTaskToMe.done[0]._id);
            }
          }
          break;
        case "TASK_HIDDEN":
          // task hidden from-me ongoing and push to hidden ongoing
          if (
            eventData.userSubState === "ongoing" &&
            eventData.hiddenBy.includes(eventData.userId)
          ) {
            const taskIndex = state.allTaskToMe.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex !== -1) {
              state.allTaskToMe.ongoing[taskIndex].hiddenBy = eventData.hiddenBy
              state.allTaskHidden.ongoing.unshift(state.allTaskToMe.ongoing[taskIndex]);
              state.allTaskToMe.ongoing.splice(taskIndex, 1)
              console.log("state.allTaskToMe.ongoing => state.allTaskHidden.ongoing", state.allTaskHidden.ongoing[0]._id);
            }
          }

          // task hidden from-me [done] and push to hidden done
          if (
            eventData.userSubState === "done" &&
            eventData.hiddenBy.includes(eventData.userId)
          ) {
            const taskIndex = state.allTaskToMe.done.findIndex(task => task._id === eventData.taskId);
            if (taskIndex !== -1) {
              state.allTaskToMe.done[taskIndex].hiddenBy.push(...eventData.hiddenBy)
              state.allTaskHidden.done.unshift(state.allTaskToMe.done[taskIndex]);
              state.allTaskToMe.done.splice(taskIndex, 1);
              console.log("hidden state.allTaskToMe.done => state.allTaskHidden.done", state.allTaskHidden.done[0]._id);
            }
          }
          break;
        case "TASK_SEEN":
          // to-me [new]=> to-me [ongoing]
          if (eventData.isAssignedToMe && eventData.oldTaskData.userSubState === "new" && eventData.stateChanged === true) {
            // find task in new and move to ongoing and update task
            const taskIndex = state.allTaskToMe.new.findIndex((task: Task) => task._id === eventData.taskId);
            if (taskIndex > -1) {
              // pushSeenBy(state.allTaskToMe.new, taskIndex, eventData);
              state.allTaskToMe.new[taskIndex].userSubState = "ongoing"
              state.allTaskToMe.new[taskIndex].creatorState = "ongoing"
              state.allTaskToMe.new[taskIndex].seenBy = eventData.seenBy;
              state.allTaskToMe.ongoing.unshift(state.allTaskToMe.new[taskIndex]);
              state.allTaskToMe.new.splice(taskIndex, 1);
              console.log("task seen allTaskToMe.new => allTaskToMe.ongoing", state.allTaskToMe.ongoing[0]._id);
            }
          }

          if (
            eventData.isCreator &&
            eventData.oldTaskData.userSubState === "new" &&
            eventData.oldTaskData.isAssignedToMe
          ) {
            // find task in to-me [ongoing]
            const taskIndex = state.allTaskToMe.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              state.allTaskToMe.ongoing[taskIndex].seenBy = eventData.seenBy;
            }
          }
          // from-me [unread] => from-me [ongoing]
          if (
            eventData.isCreator === true &&
            eventData.creatorStateChanged &&
            eventData.newTaskData.creatorState === "ongoing"
          ) {
            // find task in unread and move to ongoing
            const taskIndex = state.allTaskFromMe.unread.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              state.allTaskFromMe.unread[taskIndex].userSubState = "ongoing"
              state.allTaskFromMe.unread[taskIndex].seenBy = eventData.seenBy;
              state.allTaskFromMe.unread[taskIndex].creatorState = "ongoing"
              state.allTaskFromMe.ongoing.unshift(state.allTaskFromMe.unread[taskIndex]);
              state.allTaskFromMe.unread.splice(taskIndex, 1);
              console.log("task seen allTaskFromMe.unread => allTaskFromMe.ongoing", state.allTaskFromMe.ongoing[0].seenBy);
            }
          }

          // from-me unread when only task creator not self assigned
          if (
            eventData.isCreator === true &&
            eventData.oldTaskData.creatorState === "unread" &&
            !eventData.oldTaskData.isAssignedToMe
          ) {
            // find task in unread and move to ongoing
            const taskIndex = state.allTaskFromMe.unread.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              state.allTaskFromMe.unread[taskIndex].seenBy = eventData.seenBy;
              console.log("task seen allTaskFromMe.unread", state.allTaskFromMe.unread[taskIndex].seenBy);
            }
          }
          // update  task from-me [ongoing] 
          if (isCreator && isOngoing) {
            const taskIndex = state.allTaskFromMe.ongoing.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              pushSeenBy(state.allTaskFromMe.ongoing[taskIndex], eventData);
              console.log("updated allTaskFromMe.ongoing seenBy", state.allTaskFromMe.ongoing[taskIndex].seenBy);
            }
          }

          // update  task to-me [ongoing]
          if (isAssignedToMe && isOngoing) {
            const taskIndex = state.allTaskToMe.ongoing.findIndex(task => task._id === eventData.taskId);

            if (taskIndex > -1) {
              pushSeenBy(state.allTaskToMe.ongoing[taskIndex], eventData);
              console.log("updated state.allTaskToMe.ongoing seenBy ", state.allTaskToMe.ongoing[taskIndex]._id);
            }
          }

          // update  task to-me [done] 
          if (isAssignedToMe &&
            eventData.oldTaskData.userSubState === "done"
          ) {
            const taskIndex = state.allTaskToMe.done.findIndex(task => task._id === eventData.taskId);
            if (taskIndex > -1) {
              pushSeenBy(state.allTaskToMe.done[taskIndex], eventData);
              console.log("updated allTaskToMe done ", state.allTaskToMe.done[taskIndex].seenBy);
            }
          }
          // update  task from-me [done]
          if (isCreator &&
            eventData.oldTaskData.creatorState === "done"
          ) {
            const taskIndex = state.allTaskFromMe.done.findIndex(task => task._id === eventData.taskId);

            if (taskIndex > -1) {
              pushSeenBy(state.allTaskFromMe.done[taskIndex], eventData);
              console.log("updated state.allTaskFromMe.done seenBy ", state.allTaskFromMe.done[taskIndex]);
            }
          }

          // update  task hidden [canceled]]
          if ((isCreator || isAssignedToMe) &&
            eventData.oldTaskData.creatorState === "canceled"
          ) {
            const taskIndex = state.allTaskHidden.canceled.findIndex((task: any) => task._id === eventData.taskId);
            if (taskIndex > -1) {
              pushSeenBy(state.allTaskHidden.canceled[taskIndex], eventData);
              console.log("canceled seenBy ", state.allTaskHidden.canceled[taskIndex]._id);
            }
          }
          break;
        case "TASK_FORWARDED":
          const forwardedTask = eventData.task;
          if (forwardedTask.isAssignedToMe === true) {
            console.log('eventData.isHiddenByMe', forwardedTask.isHiddenByMe)
            if (forwardedTask.isHiddenByMe === true) {
              const taskIndex = state.allTaskHidden.ongoing.findIndex((task: any) => task._id === forwardedTask._id);
              if (taskIndex !== -1) {
                state.allTaskToMe.ongoing.unshift(forwardedTask);
                state.allTaskHidden.ongoing.splice(taskIndex, 1);
                console.log("TASK_FORWARDED allTaskHidden.ongoing=> allTaskToMe.ongoing", state.allTaskToMe.ongoing[0]._id);
              }
            } else {
              const toMeNewIndex = state.allTaskToMe.new.findIndex((task: any) => task._id === forwardedTask._id);
              const toMeOngoingIndex = state.allTaskToMe.ongoing.findIndex((task: any) => task._id === forwardedTask._id);
              if (toMeNewIndex > -1) {
                // state.allTaskToMe.new[taskIndex] = forwardedTask;
                state.allTaskToMe.new[toMeNewIndex].events = forwardedTask.events;
                state.allTaskToMe.new[toMeNewIndex].invitedNumbers = forwardedTask.invitedNumbers;
                state.allTaskToMe.new[toMeNewIndex].assignedToState = forwardedTask.assignedToState;
                state.allTaskToMe.new[toMeNewIndex].updatedAt = forwardedTask.updatedAt;
                moveTaskOnTopByIndex(state.allTaskToMe.new, toMeNewIndex);
                console.log("TASK_FORWARDED update allTaskToMe.new", state.allTaskToMe.new[toMeNewIndex]._id);
              } else if (toMeOngoingIndex > -1) {
                // state.allTaskToMe.ongoing[checktaskToMeInOngoing] = forwardedTask;
                state.allTaskToMe.ongoing[toMeOngoingIndex].events = forwardedTask.events;
                state.allTaskToMe.ongoing[toMeOngoingIndex].assignedToState = forwardedTask.assignedToState;
                state.allTaskToMe.ongoing[toMeOngoingIndex].invitedNumbers = forwardedTask.invitedNumbers;
                state.allTaskToMe.ongoing[toMeOngoingIndex].updatedAt = forwardedTask.updatedAt;
                moveTaskOnTopByIndex(state.allTaskToMe.ongoing, toMeOngoingIndex);
                console.log("TASK_FORWARDED update allTaskToMe.ongoing", state.allTaskToMe.ongoing[toMeOngoingIndex]._id);
              } else {
                const isTaskUnique = !state.allTaskToMe.new.some((task: any) => task._id === forwardedTask._id);
                if (isTaskUnique) {
                  state.allTaskToMe.new.unshift(forwardedTask);
                  console.log("push to newtask ");
                }
              }
            }
          }

          if (forwardedTask.isCreator === true) {
            const fromMeUnreadIndex = state.allTaskFromMe.unread.findIndex((task: any) => task._id === forwardedTask._id);
            if (fromMeUnreadIndex > -1) {
              state.allTaskFromMe.unread[fromMeUnreadIndex].events = forwardedTask.events;
              state.allTaskFromMe.unread[fromMeUnreadIndex].assignedToState = forwardedTask.assignedToState;
              state.allTaskFromMe.unread[fromMeUnreadIndex].invitedNumbers = forwardedTask.invitedNumbers;
              state.allTaskFromMe.unread[fromMeUnreadIndex].updatedAt = forwardedTask.updatedAt;
              moveTaskOnTopByIndex(state.allTaskFromMe.unread, fromMeUnreadIndex);
              console.log("TASK_FORWARDED update allTaskFromMe.unread", state.allTaskFromMe.unread[fromMeUnreadIndex]._id);
            } else {
              const fromMeOngoingIndex = state.allTaskFromMe.ongoing.findIndex((task: any) => task._id === forwardedTask._id);
              if (fromMeOngoingIndex > -1) {
                state.allTaskFromMe.ongoing[fromMeOngoingIndex].events = forwardedTask.events;
                state.allTaskFromMe.ongoing[fromMeOngoingIndex].assignedToState = forwardedTask.assignedToState;
                state.allTaskFromMe.ongoing[fromMeOngoingIndex].invitedNumbers = forwardedTask.invitedNumbers;
                state.allTaskFromMe.ongoing[fromMeOngoingIndex].updatedAt = forwardedTask.updatedAt;
                moveTaskOnTopByIndex(state.allTaskFromMe.ongoing, fromMeOngoingIndex);
                console.log("TASK_FORWARDED update allTaskFromMe.ongoing", state.allTaskFromMe.ongoing[fromMeOngoingIndex]._id);
              }
            }
          }
          break;

        default:
          break;
      }

      return {
        ...state,
      };

    // API Request Start
    case requestPending(TASK_CONFIG.SYNC_ALL_TASKS): {
      return {
        ...state,
        loadingAllTasks: true
      }
    }
    case requestSuccess(TASK_CONFIG.SYNC_ALL_TASKS): {
      const { fromMe, hidden, toMe, latestUpdatedAt } = action.payload.allTasks
      // assign latestUpdatedAt to RECENT_TASK_UPDATED_TIME_STAMP if the latestUpdatedAt
      //  is greater than RECENT_TASK_UPDATED_TIME_STAMP both values are in string
      const currentUpdatedAt = new Date(latestUpdatedAt);
      const recentTaskUpdatedDate = new Date(state.RECENT_TASK_UPDATED_TIME_STAMP);

      if (currentUpdatedAt > recentTaskUpdatedDate) {
        state.RECENT_TASK_UPDATED_TIME_STAMP = latestUpdatedAt;
      }

      return {
        ...state,
        loadingAllTasks: false,
        allTaskToMe: {
          new: toMe.new,
          ongoing: toMe.ongoing,
          done: toMe.done,
        },
        allTaskFromMe: {
          unread: fromMe.unread,
          ongoing: fromMe.ongoing,
          done: fromMe.done,
        },
        allTaskHidden: {
          ongoing: hidden.ongoing,
          done: hidden.done,
          canceled: hidden.canceled,
        },
      }
    }

    case requestFail(TASK_CONFIG.SYNC_ALL_TASKS): {
      return {
        ...state,
        loadingAllTasks: false,
      }
    }

    // case requestPending(TASK_CONFIG.GET_ALL_TASK_TO_ME): {
    //   return {
    //     ...state,
    //     loadingAllTaskToMe: true,
    //   };
    // }

    // case requestSuccess(TASK_CONFIG.GET_ALL_TASK_TO_ME):
    //   return {
    //     ...state,
    //     loadingAllTaskToMe: false,
    // allTaskToMe: {
    //   new: action.payload.allTasks.new,
    //   ongoing: action.payload.allTasks.ongoing,
    //   done: action.payload.allTasks.done,
    // },
    // };

    // case requestFail(TASK_CONFIG.GET_ALL_TASK_TO_ME): {
    //   return {
    //     ...state,
    //     loadingAllTaskToMe: false,
    //   };
    // }

    // get task created from me

    // case requestPending(TASK_CONFIG.GET_ALL_TASK_FROM_ME): {
    //   return {
    //     ...state,
    //     loadingAllTaskfromMe: true,
    //   };
    // }

    // case requestSuccess(TASK_CONFIG.GET_ALL_TASK_FROM_ME):

    //   return {
    //     ...state,
    //     loadingAllTaskfromMe: false,
    //     // allTaskFromMe: {
    //     //   unread: action.payload.allTasks.unread,
    //     //   ongoing: action.payload.allTasks.ongoing,
    //     //   done: action.payload.allTasks.done,
    //     // },
    //   };

    // case requestFail(TASK_CONFIG.GET_ALL_TASK_FROM_ME): {
    //   return {
    //     ...state,
    //     loadingAllTaskfromMe: false,
    //   };
    // }

    // case requestPending(TASK_CONFIG.GET_ALL_TASK_HIDDEN): {
    //   return {
    //     ...state,
    //     loadingHiddenTask: true,
    //   };
    // }

    // case requestSuccess(TASK_CONFIG.GET_ALL_TASK_HIDDEN):
    //   return {
    //     ...state,
    //     loadingHiddenTask: false,
    //     // allTaskHidden: {
    //     //   ongoing: action.payload.allTasks.ongoing,
    //     //   done: action.payload.allTasks.done,
    //     //   canceled: action.payload.allTasks.canceled,
    //     // },
    //   };

    // case requestFail(TASK_CONFIG.GET_ALL_TASK_HIDDEN): {
    //   return {
    //     ...state,
    //     loadingHiddenTask: false,
    //   };
    // }

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
    // API Request End
    default:
      return state;
  }
};

export default taskReducer;
