import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, Grid, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
// mui
import { TaskCard } from "components/TaskComponent";
import { optionMapping } from "components/Utills/Globals";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { TASK_CONFIG } from "config";
import { Task as ITask } from "constants/interfaces";
import _ from "lodash";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { VariableSizeList } from "react-window";
import { selectedTaskFilterType } from "redux/type";
import { taskConstantEn, taskConstantEt } from "translation/TaskConstant";
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
  const [isTaskFromMe, setIsTaskFromMe] = useState("To");
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const isTaskRoute = location.pathname.split("/");
  const [updateTaskEvent, setUpdateTaskEvent] = useState<any>(null);

  const [emptyScreenContent, setEmptyScreenContent] = useState([
    {
      heading: "",
      description: "",
    },
  ]);
  const headerHeight = 172;
  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - headerHeight
  );

  const task: any = useSelector((state: RootState) => state.task);
  const { allTaskToMe, allTaskFromMe, allTaskHidden, loadingAllTasks, RECENT_TASK_UPDATED_TIME_STAMP } = task;
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("");
  const subTaskKey = subtask ?? "allTaskFromMe";
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
        dispatch(taskActions.syncAllTasks(
          {
            other: {
              syncTime: RECENT_TASK_UPDATED_TIME_STAMP,
            },
          }
        ));
      }
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  const getFilterKey = () => {
    if (subTaskKey && filterkey) {
      return filterkey;
    } else {
      let keyIndex = 0;
      const keys = Object.keys(task[subTaskKey]);
      if (keys[0] === "new" || keys[0] === "unread") {
        keyIndex = task[subTaskKey][keys[0]].length > 0 ? 0 : 1;
      }
      return keys[keyIndex];
    }
  };
  useEffect(() => {
    if (loadingAllTasks) {
      return;
    }
    // console.log(loadingAllTasks, "taskuid", taskuid, subtask, getFilterKey(), filteredTask.length);
    if (isTaskRoute[1] === "tasks") {
      let ischangeUrl = false;
      let path = "";
      let getFilteredKey = getFilterKey();
      let isTaskData = getTaskDataRequired();
      let foundTask = filteredTask.find(
        (taskItem) => taskItem.taskUID === taskuid
      );

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
          path = `/tasks/${subTaskKey}/${getFilteredKey}/${taskuid}`;
        }
        history.push(path);
      } else if (filteredTask.length === 0 && taskuid) {
        history.push(path);
      }
    }
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
      const data = searchInData(dataToSearch, "", "taskUID");
      if (!taskuid || taskuid === "") {
        const newSelectedTask = data.length > 0 ? data[0] : null;
        if (newSelectedTask) {
          history.push(
            `/tasks/${subtask}/${getFilterKey()}/${newSelectedTask?.taskUID}`
          );
        }
        // setSelectedTask(newSelectedTask);
      }
      setFilteredTask(data);
    }
    setSearchText("");
  }, [allTaskFromMe, allTaskToMe, allTaskHidden, subtask, selectedTab]);

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
    let taskNeedToBeSeen =
      selectedTask &&
      selectedTask !== null &&
      !selectedTask.seenBy.includes(userId);

    if (taskNeedToBeSeen) {
      selectedTask !== null && markTaskAsSeen(selectedTask._id);
    }
  }, [selectedTask, selectedTask?.events.length]);

  useEffect(() => {
    switch (subtask) {
      case "allTaskFromMe":
        setIsTaskFromMe("To");
        if (filterkey === "ongoing") {
          setEmptyScreenContent([
            {
              heading: taskConstantEt.FromMe_Ongoing_Qestion_et,
              description: taskConstantEt.FromMe_Ongoing_desc_et,
            },
            {
              heading: taskConstantEn.FromMe_Ongoing_Qestion_en,
              description: taskConstantEn.FromMe_Ongoing_desc_en,
            },
          ]);
        } else if (filterkey === "done") {
          setEmptyScreenContent([
            {
              heading: taskConstantEt.FromMe_Done_Qestion_et,
              description: taskConstantEt.FromMe_Done_desc_et,
            },
            {
              heading: taskConstantEn.FromMe_Done_Qestion_en,
              description: taskConstantEn.FromMe_Done_desc_en,
            },
          ]);
        }
        break;
      case "allTaskToMe":
        setIsTaskFromMe("From");
        if (filterkey === "ongoing") {
          setEmptyScreenContent([
            {
              heading: taskConstantEt.To_Me_Ongoing_Qestion_et,
              description: taskConstantEt.To_Me_Ongoing_desc_et,
            },
            {
              heading: taskConstantEn.To_Me_Ongoing_Qestion_en,
              description: taskConstantEn.To_Me_Ongoing_desc_en,
            },
          ]);
        } else if (filterkey === "done") {
          setEmptyScreenContent([
            {
              heading: taskConstantEt.To_Me_Done_Qestion_et,
              description: taskConstantEt.To_Me_Done_desc_et,
            },
            {
              heading: taskConstantEn.To_Me_Done_Qestion_en,
              description: taskConstantEn.To_Me_Done_desc_en,
            },
          ]);
        }
        break;
      case "allTaskHidden":
        if (filterkey === "canceled") {
          setIsTaskFromMe("To");
          setEmptyScreenContent([
            {
              heading: taskConstantEt.Hidden_Canceled_Qestion_et,
              description: taskConstantEt.Hidden_Canceled_desc_et,
            },
            {
              heading: taskConstantEn.Hidden_Canceled_Qestion_en,
              description: taskConstantEn.Hidden_Canceled_desc_en,
            },
          ]);
        } else if (filterkey === "done") {
          setIsTaskFromMe("From");
          setEmptyScreenContent([
            {
              heading: taskConstantEt.Hidden_Done_Qestion_et,
              description: taskConstantEt.Hidden_Done_desc_et,
            },
            {
              heading: taskConstantEn.Hidden_Done_Qestion_en,
              description: taskConstantEn.Hidden_Done_desc_en,
            },
          ]);
        } else if (filterkey === "ongoing") {
          setIsTaskFromMe("From");
          setEmptyScreenContent([
            {
              heading: taskConstantEt.Hidden_Ongoing_Qestion_et,
              description: taskConstantEt.Hidden_Ongoing_Qestion_et,
            },
            {
              heading: taskConstantEn.Hidden_Ongoing_Qestion_en,
              description: taskConstantEn.Hidden_Ongoing_desc_en,
            },
          ]);
        }
        break;
      default:
        break;
    }
  }, [filterkey, subtask]);

  const handleTabClick = (type: string) => {
    history.push(`/tasks/${subtask}/${type}`);
  };

  const handleSelectedTask = (task: ITask) => {
    history.push(`/tasks/${subtask}/${getFilterKey()}/${task.taskUID}`);
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    const filterData = searchInData(
      task[subtask][selectedTab],
      searchTxt,
      "taskUID"
    );
    setSearchText(searchTxt);
    setFilteredTask(filterData);
  };

  function searchInData(data: ITask[], searchText: string, property: string) {
    let filteredData: ITask[] = data;
    if (searchText !== "") {
      filteredData = data.filter((item: any) => {
        const searchValue = item[property].toLowerCase();
        return searchValue.includes(searchText.toLowerCase());
      });
    }

    return filteredData;
  }

  useEffect(() => {
    if (updateTaskEvent !== null) {
      dispatch({
        type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
        payload: updateTaskEvent.data.data,
      });
    }
  }, [updateTaskEvent]);

  const menuOptions = [
    {
      menuName: "Hide",
      callBackHandler: () => {
        if (selectedTask) {
          dispatch(
            taskActions.taskHide({
              other: { taskId: selectedTask._id },
              success: (res: any) => {
                if (res) {
                  dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: {
                      ...res.data,
                      userId,
                      eventType: TASK_CONFIG.TASK_HIDDEN,
                    },
                  });
                }
                setFilteredTask(
                  filteredTask.filter(
                    (item: any) => item.taskUID !== selectedTask.taskUID
                  )
                );
              },
            })
          );
        }
      },
    },
    {
      menuName: "Un-hide",
      callBackHandler: () => {
        if (selectedTask) {
          dispatch(
            taskActions.taskShow({
              other: { taskId: selectedTask._id },
              success: (res: any) => {
                if (res) {
                  dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: {
                      ...res.data,
                      userId,
                      eventType: TASK_CONFIG.TASK_SHOWN,
                    },
                  });
                }
                setFilteredTask(
                  filteredTask.filter(
                    (item: any) => item.taskUID !== selectedTask.taskUID
                  )
                );
              },
            })
          );
        }
      },
    },
    {
      menuName: "Cancel",
      callBackHandler: () => {
        if (selectedTask) {
          dispatch(
            taskActions.taskCaneled({
              other: { taskId: selectedTask._id },
              success: (res: any) => {
                dispatch({
                  type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                  payload: res.data.data,
                });
                setFilteredTask(
                  filteredTask.filter(
                    (item: any) => item.taskUID !== selectedTask.taskUID
                  )
                );
              },
            })
          );
        }
      },
    },
    {
      menuName: "Un-cancel",
      callBackHandler: () => {
        if (selectedTask) {
          dispatch(
            taskActions.taskUnCanel({
              other: { taskId: selectedTask._id },
              success: (res: any) => {
                const localTasks = filteredTask.filter(
                  (item: any) => String(item._id) !== String(selectedTask._id)
                );
                setFilteredTask(localTasks);
                setSelectedTask(null);
                setUpdateTaskEvent(res);
              },
            })
          );
        }
      },
    },
  ];

  const filteredMenuOptions = (myState: string, subState: string) => {
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
      <div style={{ ...style }}>
        {localTask && (
          <TaskCard
            key={localTask._id}
            isTaskFromMe={isTaskFromMe}
            task={localTask}
            selectedTaskId={selectedTask?._id}
            handleClick={handleSelectedTask}
            menuOption={subtask && filteredMenuOptions(subtask, selectedTab)}
            disableMenu={
              selectedTab === "canceled"
                ? localTask && localTask.creator._id !== userId
                : false
            }
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight - headerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [headerHeight]);

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
  return (
    <Grid container>
      <Grid
        item
        lg={2.85}
        md={3.5}
        xs={4}
        sx={{
          borderRight: "1px solid #ADB5BD",
        }}
      >
        <Box sx={{ padding: "5px 3px" }}>
          <Box
            className="custom-scrollbar"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, md: 2.2, lg: 3 },
              overflow: "auto",
              padding: "8px 8px 4px 8px",
            }}
          >
            {task && subtask && (
              <FilterTabs
                subTaskKey={subtask}
                activeTab={selectedTab}
                filterKeys={Object.keys(task[subtask])}
                handleTabClick={handleTabClick}
              />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              borderWidth: "0px 0px 1px 0px",
              borderColor: "#818181",
              borderStyle: "solid",
              paddingLeft: "8px",
            }}
          >
            <InputBase
              value={searchText}
              placeholder="Start typing to search"
              sx={{ height: "48px", width: "100%" }}
              onChange={handleSearch}
            />
          </Box>
        </Box>
        <Box sx={{ pl: 0.7, pr: 0.5 }}>
          {loadingAllTasks ? (
            <LoadingSkeleton />
          ) : task && filteredTask.length === 0 ? (
            <EmptyScreen />
          ) : (
            <VariableSizeList
              className="custom-scrollbar"
              height={windowHeight}
              itemCount={filteredTask.length}
              overscanCount={10}
              layout="vertical"
              itemSize={(index) => 115}
              width={"100%"}
            >
              {TaskRow}
            </VariableSizeList>
          )}
        </Box>
      </Grid>
      <Grid item md={8.5} lg={9.15} xs={7}>
        {selectedTask !== null &&
          filteredTask &&
          filteredTask.some(
            (task: ITask) => task.taskUID === selectedTask?.taskUID
          ) ? (
          <TaskDetails task={selectedTask} />
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
