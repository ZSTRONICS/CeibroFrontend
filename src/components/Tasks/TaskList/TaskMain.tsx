import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
// mui
import assets from "assets";
import { Span } from "components/CustomTags";
import { TaskCard } from "components/TaskComponent";
import { getTaskCardHeight } from "components/Utills/Globals";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { TASK_CONFIG } from "config";
import { ITask, TaskRootState, Topic } from "constants/interfaces";
import { useHistory, useParams } from "react-router-dom";
import { VariableSizeList } from "react-window";
import { taskActions } from "redux/action";
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
  // const location = useLocation();
  const history = useHistory();
  const taskCardListRef: any = useRef();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [selectedTopicTags, setSelectedTopicTags] = useState<Topic[]>([]);
  const [selectedTaskRootState, setSelectedTaskRootState] = useState("All");
  const { subtask, taskuid } = useParams<RouteParams>();
  // const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const [filteredTask, setFilteredTask] = useState<ITask[]>(allTaskList);
  const [searchText, setSearchText] = useState<string>("");
  const [isTaskFromMe, setIsTaskFromMe] = useState<string>("To");
  // const isTaskRoute = location.pathname.split("/");
  // const [currentTask, setCurrentTask] = useState<number>(-1);
  const [emptyScreenContent, setEmptyScreenContent] = useState([
    {
      heading: "",
      description: "",
    },
  ]);

  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - HEADER_HEIGHT
  );

  const task: any = useSelector((state: RootState) => state.task);
  const { loadingAllTasksAllEvents } = task;
  const propertiesToSearch = ["taskUID", "title", "description", "creator"];
  const findSelectedTask = allTaskList.findIndex(
    (task: ITask) => task.taskUID === taskuid
  );
  useEffect(() => {
    setFilteredTask(allTaskList);
    clearTaskCardListCache();
    if (findSelectedTask === -1) {
      setSelectedTask(null);
    }
  }, [allTaskList.length]);

  useEffect(() => {
    // console.log(selectedProjects, selectedTopicTags, selectedUsers);
    let filteredData = handleFilterRootTask(selectedTaskRootState);
    if (selectedProjects && selectedProjects.length > 0) {
      filteredData = filteredData.filter((task: ITask) =>
        selectedProjects.some(
          (selectedProject) =>
            task.project && task.project.title.includes(selectedProject.title)
        )
      );
    }
    if (selectedUsers && selectedUsers.length > 0) {
      filteredData = filteredData.filter((task: ITask) =>
        selectedUsers.some(
          (id) =>
            (task.confirmer && task.confirmer._id == id) ||
            (task.creator && task.creator._id == id)
        )
      );
    }
    if (selectedTopicTags && selectedTopicTags.length > 0) {
      filteredData = filteredData.filter((task: ITask) =>
        selectedTopicTags.some(
          (selectedTopicTag) =>
            task.topic && task.topic._id == selectedTopicTag._id
        )
      );
    }
    setFilteredTask(filteredData);
  }, [selectedProjects.length, selectedTopicTags.length, selectedUsers]);

  const handleFilterRootTask = (taskRootState: string) => {
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
    return filteredTasks;
  };

  const handleRootTask = (taskRootState: string) => {
    const filteredTasks = handleFilterRootTask(taskRootState);
    setFilteredTask(filteredTasks);
    setSelectedTaskRootState(taskRootState);
    clearTaskCardListCache();
    setSelectedTask(null);
  };

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
  //     let foundTask = filteredTask.find(
  //       (taskItem) => taskItem.taskUID === taskuid
  //     );
  //     let foundIndex = filteredTask.findIndex(
  //       (item, index) => index === currentTask
  //     );

  //     if (!foundTask && filteredTask.length > 0) {
  //       if (foundIndex !== -1 && filteredTask.length - 1 !== foundIndex) {
  //         foundTask = filteredTask[currentTask];
  //       } else {
  //         foundTask = filteredTask[currentTask - 1];
  //       }
  //     }
  //     if (!subtask) {
  //       // path = `/tasks/${subTaskKey}/${getFilteredKey}`;
  //       ischangeUrl = true;
  //     } else if (subtask) {
  //       ischangeUrl = true;
  //       // path = `/tasks/${subTaskKey}/${getFilteredKey}`;
  //       setSelectedTask(null);
  //       setCurrentTask(0);
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
  //         // path = `/tasks/${subTaskKey}/${getFilteredKey}/${foundTask.taskUID}`;
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
  // }, [subtask, taskuid, filteredTask.length, selectedTask]);

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

  const markTaskAsSeen = (taskId: string): void => {
    dispatch(
      taskActions.taskSeen({
        other: { taskId },
        success: (res: any) => {
          if (res) {
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
              payload: {
                ...res.data.taskSeen,
                userId,
                eventType: TASK_CONFIG.TASK_SEEN,
              },
            });
          }
        },
      })
    );
  };

  useEffect(() => {
    if (loadingAllTasksAllEvents) {
      return;
    }
    const isUserSubstateFind = selectedTask && selectedTask !== null;
    let taskNeedToBeSeen =
      isUserSubstateFind && !selectedTask.seenBy.includes(userId);

    if (
      taskNeedToBeSeen ||
      (selectedTask?.userSubState === "new" && isUserSubstateFind)
    ) {
      selectedTask !== null && markTaskAsSeen(selectedTask._id);
    }
    setTimeout(() => {
      clearTaskCardListCache();
    }, 5);
  }, [selectedTask, selectedTask?.events?.length]);

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
    const filterData = searchInData(allTaskList, searchTxt, propertiesToSearch);
    setSearchText(searchTxt);
    setFilteredTask(filterData);
  };

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

  const TASK_CARD_GAP_BETWEEN = 10;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "15px",
        }}
      >
        <Box sx={{ width: "94%", marginLeft: "3%" }}>
          <TaskFilters
            handleTaskRootState={handleRootTask}
            handleClearAll={() => {
              setSelectedTopicTags([]);
              setSelectedProjects([]);
              setSelectedUsers([]);
              setSelectedTaskRootState("All");
            }}
            selectedRootTask={selectedRootTask}
            showHiddenTasks={showHiddenTasks}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            selectedTopicTags={selectedTopicTags}
            setSelectedTopicTags={setSelectedTopicTags}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
          />
        </Box>
        <Box sx={{ border: "1px solid #E2E4E5", marginTop: "15px" }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // border: "solid 1px red",
            width: "96%",
            marginLeft: "2%",
          }}
        >
          <InputBase
            type="search"
            value={searchText}
            placeholder="Start typing to search"
            sx={{
              pt: 2,
              borderWidth: "0px 0px 1px 0px",
              borderColor: "#818181",
              borderStyle: "solid",
              width: "92%",
              paddingLeft: "38px",
              background: `url(${assets.searchSvgIcon})no-repeat`,
              backgroundPosition: "5px 20px",
              paddingBottom: "10px",
            }}
            onChange={handleSearch}
          />
          <Span>
            <SortIcon />
          </Span>
        </Box>
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
