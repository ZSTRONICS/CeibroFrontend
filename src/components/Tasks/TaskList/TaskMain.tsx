import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
// mui
import assets from "assets";
import { TaskCard } from "components/TaskComponent";
import { getTaskCardHeight } from "components/Utills/Globals";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { ITask, TaskRootState } from "constants/interfaces";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { VariableSizeList } from "react-window";
import { TaskFilterType } from "redux/type";
import {
  HEADER_HEIGHT,
  TaskRootSateLocal,
  calcUserSubState,
  filterTasks,
  getTaskFilters,
  searchInData,
} from "utills/common";
import EmptyScreenDescription from "../EmptyScreenDescription";
import TaskFilters from "./TaskFilters";

interface RouteParams {
  subtask: TaskFilterType;
  // filterkey: string;
  taskuid: string;
}
interface IProps {
  setSelectedTask: (selectedTask: ITask | null) => void;
  selectedTask: ITask | null;
  allTaskList: ITask[] | [];
  selectedRootTask: string;
  showHiddenTasks: boolean;
}
const TaskMain = (props: IProps) => {
  const {
    setSelectedTask,
    showHiddenTasks,
    selectedTask,
    allTaskList,
    selectedRootTask,
  } = props;
  const location = useLocation();
  const { subtask, taskuid } = useParams<RouteParams>();
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const [filteredTask, setFilteredTask] = useState<ITask[]>(allTaskList);
  const [searchText, setSearchText] = useState<string>("");
  const [isTaskFromMe, setIsTaskFromMe] = useState<string>("To");
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const isTaskRoute = location.pathname.split("/");
  const [currentTask, setCurrentTask] = useState<number>(-1);
  const [emptyScreenContent, setEmptyScreenContent] = useState([
    {
      heading: "",
      description: "",
    },
  ]);

  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - HEADER_HEIGHT
  );
  const taskCardListRef: any = useRef();
  const task: any = useSelector((state: RootState) => state.task);
  const { loadingAllTasksAllEvents } = task;

  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("ongoing");

  // const subTaskKey = subtask ?? "ongoing";
  const propertiesToSearch = ["taskUID", "title", "description", "creator"];
  useEffect(() => {
    setFilteredTask(allTaskList);
    clearTaskCardListCache();
  }, [allTaskList.length]);

  const handleRootTask = (taskRootState: string) => {
    const rootStateLocal = TaskRootSateLocal[selectedRootTask] || "Ongoing";
    const userSubStateLocal = calcUserSubState[rootStateLocal] || "ongoing";
    const isCanceled = rootStateLocal === TaskRootState.Canceled;
    const filteredTask = getTaskFilters(
      rootStateLocal,
      userSubStateLocal,
      isCanceled
    );

    const criteria = filteredTask[taskRootState];
    const filteredTasks = filterTasks(
      allTaskList,
      criteria.rootState,
      criteria.isHiddenByMe,
      criteria.userSubState,
      criteria.toMeState,
      criteria.fromMeState,
      criteria.isCreator,
      criteria.isAssignedToMe
    );
    setFilteredTask(filteredTasks);
    clearTaskCardListCache();
    setSelectedTask(null);
  };

  // console.log("filteredTask", filteredTask);
  // const getTaskDataRequired = () => {
  //   const subtaskPropertyMapping: any = {
  //     allTaskToMe: ["new", "ongoing", "done"],
  //     allTaskFromMe: ["unread", "ongoing", "done"],
  //     allTaskHidden: ["ongoing", "done", "canceled"],
  //   };
  //   const propertiesToCheck = subtaskPropertyMapping[subtask];
  //   let found = propertiesToCheck?.some(
  //     (property: string) => !_.isEmpty(task[subtask][property])
  //   );
  //   return found;
  // };

  // const getFilterKey = () => {
  //   const defaultKeys = ["new", "unread"];
  //   if (subTaskKey && filterkey) {
  //     if (
  //       defaultKeys.includes(filterkey) &&
  //       task[subTaskKey][filterkey].length === 0
  //     ) {
  //       return "ongoing";
  //     }
  //     return filterkey;
  //   }
  //   const keys = Object.keys(task[subTaskKey]);

  //   const keyIndex = defaultKeys.includes(keys[0])
  //     ? task[subTaskKey][keys[0]].length > 0
  //       ? 0
  //       : 1
  //     : 0;
  //   return keys[keyIndex];
  // };

  const navigateToTask = (taskUID: string) => {
    history.push(`/tasks/${subtask}/${taskUID}`);
  };

  // useEffect(() => {
  //   if (loadingAllTasksAllEvents) {
  //     return;
  //   }
  //   if (isTaskRoute[1] === "tasks") {
  //     let ischangeUrl = false;
  //     let path = "";
  //     let getFilteredKey = getFilterKey();
  //     // let isTaskData = getTaskDataRequired();
  //     const isUnreadOrNew = filterkey === "new" || filterkey === "unread";
  //     let foundTask = filteredTask.find(
  //       (taskItem) => taskItem.taskUID === taskuid
  //     );
  //     let foundIndex = filteredTask.findIndex(
  //       (item, index) => index === currentTask
  //     );

  //     if (!foundTask && filteredTask.length > 0 && !isUnreadOrNew) {
  //       if (foundIndex !== -1 && filteredTask.length - 1 !== foundIndex) {
  //         foundTask = filteredTask[currentTask];
  //       } else {
  //         foundTask = filteredTask[currentTask - 1];
  //       }
  //     }
  //     if (!subtask && !filterkey) {
  //       path = `/tasks/${subTaskKey}/${getFilteredKey}`;
  //       ischangeUrl = true;
  //       selectedTab != null &&
  //         selectedTab !== getFilteredKey &&
  //         setSelectedTab(getFilteredKey);
  //     } else if (subtask && filterkey) {
  //       ischangeUrl = true;
  //       selectedTab != null &&
  //         selectedTab !== filterkey &&
  //         setSelectedTab(filterkey);
  //       path = `/tasks/${subTaskKey}/${getFilteredKey}`;
  //       setSelectedTask(null);
  //       setCurrentTask(0);
  //     } else if (subtask && !filterkey) {
  //       ischangeUrl = true;
  //       path = `/tasks/${subTaskKey}/${getFilteredKey}`;
  //       selectedTab != null &&
  //         selectedTab !== getFilteredKey &&
  //         setSelectedTab(getFilteredKey);
  //     }
  //     if (
  //       ischangeUrl &&
  //       path !== "" &&
  //       filteredTask &&
  //       filteredTask.length > 0
  //     ) {
  //       if (taskuid && foundTask) {
  //         setSelectedTask(foundTask);
  //         const selecteTaskIndex = filteredTask.indexOf(foundTask);
  //         setCurrentTask(selecteTaskIndex);
  //         path = `/tasks/${subTaskKey}/${getFilteredKey}/${foundTask.taskUID}`;
  //       }
  //       history.push(path);
  //     } else if (filteredTask.length === 0) {
  //       history.push(path);
  //     }
  //   }
  //   // Clearing Variable Task Card List Cache in 10ms
  //   setTimeout(() => {
  //     clearTaskCardListCache();
  //   }, 10);
  // }, [subtask, filterkey, taskuid, filteredTask.length, selectedTask]);

  // useEffect(() => {
  //   if (loadingAllTasksAllEvents) {
  //     return;
  //   }
  //   if (subtask || selectedTab) {
  //     !taskuid && setSelectedTask(null);
  //     let dataToSearch;
  //     if (subtask) {
  //       dataToSearch = task[subtask][getFilterKey()];
  //     } else if (selectedTab) {
  //       dataToSearch = task[subtask][selectedTab];
  //     }
  //     // selecting top most task by default
  //     const data = searchInData(dataToSearch, searchText, propertiesToSearch);

  //     if (!taskuid || taskuid === "") {
  //       const newSelectedTask = data.length > 0 ? data[0] : null;
  //       if (newSelectedTask) {
  //         const { isCreator, userSubState, taskUID, isAssignedToMe } =
  //           newSelectedTask;
  //         const isTaskTabNavigate =
  //           (isCreator && userSubState === "unread") ||
  //           (isAssignedToMe && userSubState === "new");
  //         if (!isTaskTabNavigate) {
  //           navigateToTask(taskUID);
  //         }
  //       }
  //     }
  //     setFilteredTask(data);
  //   }
  //   // Clearing Variable Task Card List Cache in 10ms
  //   setTimeout(() => {
  //     clearTaskCardListCache();
  //   }, 10);
  // }, [subtask, selectedTab, RECENT_TASK_UPDATED_TIME_STAMP]);

  // const userSubStateLocal: string =
  //   selectedTask === null
  //     ? "N/A"
  //     : subtask === "allTaskFromMe"
  //     ? selectedTask.creatorState
  //     : selectedTask.userSubState;

  // const markTaskAsSeen = (taskId: string): void => {
  //   dispatch(
  //     taskActions.taskSeen({
  //       other: { taskId },
  //       success: (res: any) => {
  //         if (res) {
  //           dispatch({
  //             type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
  //             payload: {
  //               ...res.data.taskSeen,
  //               userId,
  //               eventType: TASK_CONFIG.TASK_SEEN,
  //             },
  //           });
  //         }
  //       },
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (loadingAllTasksAllEvents) {
  //     return;
  //   }
  //   const isUserSubstateFind =
  //     selectedTask && selectedTask !== null && userSubStateLocal === filterkey;
  //   let taskNeedToBeSeen =
  //     isUserSubstateFind && !selectedTask.seenBy.includes(userId);

  //   if (
  //     taskNeedToBeSeen ||
  //     (selectedTask?.userSubState === "new" && isUserSubstateFind)
  //   ) {
  //     selectedTask !== null && markTaskAsSeen(selectedTask._id);
  //   }
  //   setTimeout(() => {
  //     clearTaskCardListCache();
  //   }, 5);
  // }, [selectedTask, selectedTask?.events?.length]);

  // useEffect(() => {
  //   const newIsTaskFromMe = subtaskToIsTaskFromMe[subtask];
  //   if (typeof newIsTaskFromMe === "string") {
  //     setIsTaskFromMe(newIsTaskFromMe);
  //   } else if (
  //     typeof newIsTaskFromMe === "object" &&
  //     newIsTaskFromMe[filterkey]
  //   ) {
  //     setIsTaskFromMe(newIsTaskFromMe[filterkey]);
  //   }
  //   const emptyScreenContent =
  //     subtask && filterkey && taskConstants[subtask][filterkey];
  //   if (emptyScreenContent) {
  //     setEmptyScreenContent([...emptyScreenContent]);
  //   }
  // }, [filterkey, subtask]);

  // const handleTabClick = (type: string) => {
  //   resetScrollPosition();
  //   history.push(`/tasks/${subtask}/${type}`);
  // };

  // const resetScrollPosition = () => {
  //   if (taskCardListRef.current) {
  //     taskCardListRef.current.scrollTo(0);
  //   }
  // };

  const handleSelectedTask = (task: ITask) => {
    navigateToTask(task.taskUID);
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    const filterData = searchInData(
      filteredTask,
      searchTxt,
      propertiesToSearch
    );
    setSearchText(searchTxt);
    setFilteredTask(filterData);
  };

  // const handleTaskAction = (
  //   actionType: (arg: {
  //     other: { taskId: string };
  //     success: (res: any) => void;
  //   }) => any,
  //   actionConfig: { eventType: any }
  // ) => {
  //   if (selectedTask) {
  //     dispatch(
  //       actionType({
  //         other: { taskId: selectedTask._id },
  //         success: (res: any) => {
  //           if (res) {
  //             dispatch({
  //               type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
  //               payload: {
  //                 ...res.data,
  //                 userId,
  //                 eventType: actionConfig.eventType,
  //               },
  //             });
  //           }
  //           setFilteredTask((prevFilteredTask) =>
  //             prevFilteredTask.filter(
  //               (item) => item.taskUID !== selectedTask.taskUID
  //             )
  //           );
  //         },
  //       })
  //     );
  //   }
  // };

  // const menuOptions = [
  //   {
  //     menuName: "Hide",
  //     callBackHandler: () => {
  //       if (selectedTask) {
  //         handleTaskAction(taskActions.taskHide, {
  //           eventType: TASK_CONFIG.TASK_HIDDEN,
  //         });
  //       }
  //     },
  //   },
  //   {
  //     menuName: "Un-hide",
  //     callBackHandler: () => {
  //       if (selectedTask) {
  //         handleTaskAction(taskActions.taskShow, {
  //           eventType: TASK_CONFIG.TASK_SHOW,
  //         });
  //       }
  //     },
  //   },
  //   {
  //     menuName: "Cancel",
  //     callBackHandler: () => {
  //       if (selectedTask) {
  //         handleTaskAction(taskActions.taskCaneled, {
  //           eventType: TASK_CONFIG.TASK_CANCELED,
  //         });
  //       }
  //     },
  //   },
  //   {
  //     menuName: "Un-cancel",
  //     callBackHandler: () => {
  //       if (selectedTask) {
  //         handleTaskAction(taskActions.taskUnCanel, {
  //           eventType: TASK_CONFIG.TASK_UN_CANCEL,
  //         });
  //       }
  //     },
  //   },
  // ];

  /**
   * Clears the cache of the task card list.
   */
  const clearTaskCardListCache = () => {
    if (taskCardListRef && taskCardListRef.current) {
      // Reset the list starting from the first index
      taskCardListRef.current.resetAfterIndex(0, true);
    } else {
      // If the taskCardListRef is not ready yet, wait for 5 milliseconds and try again
      setTimeout(() => {
        clearTaskCardListCache();
      }, 5);
    }
  };

  // const filteredMenuOptions = (myState: string, subState: string) => {
  //   // Get the option name based on the given state and substate
  //   const optionName = optionMapping[myState]?.[subState];
  //   return optionName
  //     ? menuOptions.filter((option) => option.menuName === optionName)
  //     : [];
  // };

  const TaskRow = ({ index, style }: any) => {
    const localTask = filteredTask[index];
    if (!localTask) {
      return <></>;
    }
    return (
      <div style={{ ...style, width: "98%" }}>
        {localTask && (
          <TaskCard
            userId={userId}
            key={localTask._id}
            isTaskFromMe={isTaskFromMe}
            task={localTask}
            selectedTaskId={selectedTask?._id}
            handleClick={handleSelectedTask}
          />
        )}
      </div>
    );
  };

  const handleResize = () => {
    setWindowHeight(window.innerHeight - (HEADER_HEIGHT + 16));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const LoadingSkeleton = () => (
    <Box style={{ height: windowHeight }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </Box>
  );

  const EmptyScreen = () => (
    <div style={{ height: windowHeight }}>
      <EmptyScreenDescription
        showWaterMark={true}
        content={emptyScreenContent}
      />
    </div>
  );

  const TASK_CARD_GAP_BETWEEN = 18;

  return (
    <>
      <Box>
        <TaskFilters
          handleTaskRootState={handleRootTask}
          handleClearAll={() => {}}
          selectedRootTask={selectedRootTask}
          showHiddenTasks={showHiddenTasks}
        />
        <InputBase
          type="search"
          value={searchText}
          placeholder="Start typing to search"
          sx={{
            pt: 2,
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#818181",
            borderStyle: "solid",
            width: "100%",
            paddingLeft: "38px",
            background: `url(${assets.searchSvgIcon})no-repeat`,
            backgroundPosition: "5px 20px",
          }}
          onChange={handleSearch}
        />
      </Box>

      <Box
        sx={{
          mt: 1,
          pb: 1,
        }}
      >
        {loadingAllTasksAllEvents ? (
          <LoadingSkeleton />
        ) : task && filteredTask.length === 0 ? (
          <EmptyScreen />
        ) : (
          <VariableSizeList
            ref={taskCardListRef}
            style={{ overflowY: "auto" }}
            height={windowHeight - 250}
            itemCount={filteredTask.length}
            overscanCount={20}
            layout="vertical"
            itemSize={(index) =>
              getTaskCardHeight(filteredTask[index]) + TASK_CARD_GAP_BETWEEN
            }
            width={"100%"}
          >
            {TaskRow}
          </VariableSizeList>
        )}
      </Box>
    </>
  );
};
export default TaskMain;
