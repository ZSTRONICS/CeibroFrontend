import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, Grid, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
// mui
import assets from "assets";
import { TaskCard } from "components/TaskComponent";
import {
  getTaskCardHeight,
  optionMapping,
  subtaskToIsTaskFromMe,
} from "components/Utills/Globals";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import _ from "lodash";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { VariableSizeList } from "react-window";
import { selectedTaskFilterType } from "redux/type";
import { HEADER_HEIGHT, searchInData, taskConstants } from "utills/common";
import EmptyScreenDescription from "../EmptyScreenDescription";
import TaskDetails from "../TaskDetails";
import FilterTabs from "./FilterTabs";

interface RouteParams {
  subtask: selectedTaskFilterType;
  filterkey: string;
  taskuid: string;
}
const Task = () => {
  const location = useLocation();
  const { subtask, filterkey, taskuid } = useParams<RouteParams>();
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const [filteredTask, setFilteredTask] = useState<ITask[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isTaskFromMe, setIsTaskFromMe] = useState<string>("To");
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const isTaskRoute = location.pathname.split("/");
  const [currentTask, setCurrentTask] = useState<number>(-1);
  const {
    containerRef: taskDetailContRef,
    dimensions: taskDetailContDimension,
  } = useDynamicDimensions();
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
  const {
    allTaskToMe,
    allTaskFromMe,
    loadingAllTasks,
    RECENT_TASK_UPDATED_TIME_STAMP,
  } = task;
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("");
  const subTaskKey = subtask ?? "allTaskFromMe";
  const propertiesToSearch = ["taskUID", "title", "description", "creator"];
  const getTaskDataRequired = () => {
    const subtaskPropertyMapping: any = {
      allTaskToMe: ["new", "ongoing", "done"],
      allTaskFromMe: ["unread", "ongoing", "done"],
      allTaskHidden: ["ongoing", "done", "canceled"],
    };
    const propertiesToCheck = subtaskPropertyMapping[subtask];
    let found = propertiesToCheck?.some(
      (property: string) => !_.isEmpty(task[subtask][property])
    );
    return found;
  };

  useEffect(() => {
    if (!isRenderEffect.current) {
      if (
        _.isEmpty(allTaskFromMe.ongoing) &&
        _.isEmpty(allTaskFromMe.unread) &&
        _.isEmpty(allTaskToMe.new) &&
        _.isEmpty(allTaskToMe.ongoing)
      ) {
        dispatch(
          taskActions.syncAllTasks({
            other: {
              syncTime: RECENT_TASK_UPDATED_TIME_STAMP,
            },
          })
        );
      }
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  const getFilterKey = () => {
    const defaultKeys = ["new", "unread"];
    if (subTaskKey && filterkey) {
      if (
        defaultKeys.includes(filterkey) &&
        task[subTaskKey][filterkey].length === 0
      ) {
        return "ongoing";
      }
      return filterkey;
    }
    const keys = Object.keys(task[subTaskKey]);

    const keyIndex = defaultKeys.includes(keys[0])
      ? task[subTaskKey][keys[0]].length > 0
        ? 0
        : 1
      : 0;
    return keys[keyIndex];
  };

  const navigateToTask = (taskUID: string) => {
    history.push(`/tasks/${subtask}/${getFilterKey()}/${taskUID}`);
  };

  useEffect(() => {
    if (loadingAllTasks) {
      return;
    }
    if (isTaskRoute[1] === "tasks") {
      let ischangeUrl = false;
      let path = "";
      let getFilteredKey = getFilterKey();
      let isTaskData = getTaskDataRequired();
      const isUnreadOrNew = filterkey === "new" || filterkey === "unread";
      let foundTask = filteredTask.find(
        (taskItem) => taskItem.taskUID === taskuid
      );
      let foundIndex = filteredTask.findIndex(
        (item, index) => index === currentTask
      );

      if (!foundTask && filteredTask.length > 0 && !isUnreadOrNew) {
        if (foundIndex !== -1 && filteredTask.length - 1 !== foundIndex) {
          foundTask = filteredTask[currentTask];
        } else {
          foundTask = filteredTask[currentTask - 1];
        }
      }
      if (!subtask && !filterkey) {
        path = `/tasks/${subTaskKey}/${getFilteredKey}`;
        ischangeUrl = true;
        selectedTab != null &&
          selectedTab !== getFilteredKey &&
          setSelectedTab(getFilteredKey);
      } else if (subtask && filterkey) {
        ischangeUrl = true;
        selectedTab != null &&
          selectedTab !== filterkey &&
          setSelectedTab(filterkey);
        path = `/tasks/${subTaskKey}/${getFilteredKey}`;
        setSelectedTask(null);
        setCurrentTask(0);
      } else if (subtask && !filterkey) {
        ischangeUrl = true;
        path = `/tasks/${subTaskKey}/${getFilteredKey}`;
        selectedTab != null &&
          selectedTab !== getFilteredKey &&
          setSelectedTab(getFilteredKey);
      }
      if (
        ischangeUrl &&
        path !== "" &&
        isTaskData &&
        filteredTask &&
        filteredTask.length > 0
      ) {
        if (taskuid && foundTask) {
          setSelectedTask(foundTask);
          const selecteTaskIndex = filteredTask.indexOf(foundTask);
          setCurrentTask(selecteTaskIndex);
          path = `/tasks/${subTaskKey}/${getFilteredKey}/${foundTask.taskUID}`;
        }
        history.push(path);
      } else if (filteredTask.length === 0) {
        history.push(path);
      }
    }
    // Clearing Variable Task Card List Cache in 10ms
    setTimeout(() => {
      clearTaskCardListCache();
    }, 10);
  }, [subtask, filterkey, taskuid, filteredTask.length, selectedTask]);

  useEffect(() => {
    if (loadingAllTasks) {
      return;
    }
    if (subtask || selectedTab) {
      !taskuid && setSelectedTask(null);
      let dataToSearch;
      if (subtask) {
        dataToSearch = task[subtask][getFilterKey()];
      } else if (selectedTab) {
        dataToSearch = task[subtask][selectedTab];
      }
      // selecting top most task by default
      const data = searchInData(dataToSearch, searchText, propertiesToSearch);

      if (!taskuid || taskuid === "") {
        const newSelectedTask = data.length > 0 ? data[0] : null;
        if (newSelectedTask) {
          const { isCreator, userSubState, taskUID, isAssignedToMe } =
            newSelectedTask;
          const isTaskTabNavigate =
            (isCreator && userSubState === "unread") ||
            (isAssignedToMe && userSubState === "new");
          if (!isTaskTabNavigate) {
            navigateToTask(taskUID);
          }
        }
      }
      setFilteredTask(data);
    }
    // Clearing Variable Task Card List Cache in 10ms
    setTimeout(() => {
      clearTaskCardListCache();
    }, 10);
  }, [subtask, selectedTab, RECENT_TASK_UPDATED_TIME_STAMP]);

  const userSubStateLocal: string =
    selectedTask === null
      ? "N/A"
      : subtask === "allTaskFromMe"
      ? selectedTask.creatorState
      : selectedTask.userSubState;

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
    if (loadingAllTasks) {
      return;
    }
    const isUserSubstateFind =
      selectedTask && selectedTask !== null && userSubStateLocal === filterkey;
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

  useEffect(() => {
    const newIsTaskFromMe = subtaskToIsTaskFromMe[subtask];
    if (typeof newIsTaskFromMe === "string") {
      setIsTaskFromMe(newIsTaskFromMe);
    } else if (
      typeof newIsTaskFromMe === "object" &&
      newIsTaskFromMe[filterkey]
    ) {
      setIsTaskFromMe(newIsTaskFromMe[filterkey]);
    }
    const emptyScreenContent =
      subtask && filterkey && taskConstants[subtask][filterkey];
    if (emptyScreenContent) {
      setEmptyScreenContent([...emptyScreenContent]);
    }
  }, [filterkey, subtask]);

  const handleTabClick = (type: string) => {
    resetScrollPosition();
    history.push(`/tasks/${subtask}/${type}`);
  };

  const resetScrollPosition = () => {
    if (taskCardListRef.current) {
      taskCardListRef.current.scrollTo(0);
    }
  };

  const handleSelectedTask = (task: ITask) => {
    navigateToTask(task.taskUID);
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    const filterData = searchInData(
      task[subtask][selectedTab],
      searchTxt,
      propertiesToSearch
    );
    setSearchText(searchTxt);
    setFilteredTask(filterData);
  };

  const handleTaskAction = (
    actionType: (arg: {
      other: { taskId: string };
      success: (res: any) => void;
    }) => any,
    actionConfig: { eventType: any }
  ) => {
    if (selectedTask) {
      dispatch(
        actionType({
          other: { taskId: selectedTask._id },
          success: (res: any) => {
            if (res) {
              dispatch({
                type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                payload: {
                  ...res.data,
                  userId,
                  eventType: actionConfig.eventType,
                },
              });
            }
            setFilteredTask((prevFilteredTask) =>
              prevFilteredTask.filter(
                (item) => item.taskUID !== selectedTask.taskUID
              )
            );
          },
        })
      );
    }
  };

  const menuOptions = [
    {
      menuName: "Hide",
      callBackHandler: () => {
        if (selectedTask) {
          handleTaskAction(taskActions.taskHide, {
            eventType: TASK_CONFIG.TASK_HIDDEN,
          });
        }
      },
    },
    {
      menuName: "Un-hide",
      callBackHandler: () => {
        if (selectedTask) {
          handleTaskAction(taskActions.taskShow, {
            eventType: TASK_CONFIG.TASK_SHOW,
          });
        }
      },
    },
    {
      menuName: "Cancel",
      callBackHandler: () => {
        if (selectedTask) {
          handleTaskAction(taskActions.taskCaneled, {
            eventType: TASK_CONFIG.TASK_CANCELED,
          });
        }
      },
    },
    {
      menuName: "Un-cancel",
      callBackHandler: () => {
        if (selectedTask) {
          handleTaskAction(taskActions.taskUnCanel, {
            eventType: TASK_CONFIG.TASK_UN_CANCEL,
          });
        }
      },
    },
  ];

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

  const filteredMenuOptions = (myState: string, subState: string) => {
    // Get the option name based on the given state and substate
    const optionName = optionMapping[myState]?.[subState];
    return optionName
      ? menuOptions.filter((option) => option.menuName === optionName)
      : [];
  };

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

  const TASK_CARD_GAP_BETWEEN = 14;
  return (
    <Grid container flexWrap={"nowrap"}>
      <Grid
        item
        height={windowHeight}
        pt={1}
        sx={{
          maxWidth: "22.5rem",
          width: "100%",
          paddingLeft: "16px",
          paddingRight: "10px",
          borderRadius: "4px",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 1.25, md: 2.5 },
            overflow: "auto",
            padding: "12px 6px 8px 1px",
          }}
        >
          {task && subtask && (
            <FilterTabs
              userId={userId}
              subTaskKey={subtask}
              activeTab={filterkey}
              filterKeys={Object.keys(task[subtask])}
              handleTabClick={handleTabClick}
            />
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            pt: 1.25,
          }}
        >
          <InputBase
            type="search"
            value={searchText}
            placeholder="Start typing to search"
            sx={{
              borderWidth: "0px 0px 1px 0px",
              borderColor: "#818181",
              borderStyle: "solid",
              width: "100%",
              paddingLeft: "38px",
              background: `url(${assets.searchSvgIcon})no-repeat`,
              backgroundPosition: "5px center",
            }}
            onChange={handleSearch}
          />
        </Box>
        <Box
          sx={{
            mt: 3,
            pb: 1,
          }}
        >
          {loadingAllTasks ? (
            <LoadingSkeleton />
          ) : task && filteredTask.length === 0 ? (
            <EmptyScreen />
          ) : (
            <VariableSizeList
              ref={taskCardListRef}
              style={{ overflowY: "auto" }}
              height={windowHeight - 123}
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
      </Grid>

      <Grid
        height={windowHeight}
        id="taskDetailContainer"
        ref={taskDetailContRef}
        item
        sx={{
          borderRadius: "4px",
          width: "100%",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          ml: 2,
          mr: 2,
          overflow: "auto",
        }}
      >
        {selectedTask !== null &&
        filteredTask &&
        filteredTask.some(
          (task: ITask) => task.taskUID === selectedTask?.taskUID
        ) ? (
          <TaskDetails
            taskDetailContDimension={taskDetailContDimension}
            DrawDetailCollapse={false}
            task={selectedTask}
            userSubStateLocal={userSubStateLocal}
            TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              color: "black",
            }}
          >
            No Task Selected!
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default Task;
