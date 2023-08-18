import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, Grid, InputBase } from "@mui/material";
import { TaskCard } from "components/TaskComponent";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
// mui
import { optionMapping } from "components/Utills/Globals";
import StyledChip from "components/Utills/StyledChip";
import { Task as ITask } from "constants/interfaces";
import _, { isEmpty } from "lodash";
import { RouteComponentProps, useParams } from "react-router-dom";
import { VariableSizeList } from "react-window";
import { selectedTaskFilterType } from "redux/type";
import TaskDetails from "../TaskDetails";

interface RouteParams {
  subtask: selectedTaskFilterType;
  filterkey: string;
  taskid: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}
const Task = (props: IProps) => {
  const { subtask, filterkey, taskid } = useParams<RouteParams>();
  const [value, setValue] = useState(0);
  const [filteredTask, setFilteredTask] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { user } = useSelector((store: RootState) => store.auth);
  const headerHeight = 173;
  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - headerHeight
  );
  const userId = user && String(user._id);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const { task } = useSelector((state: RootState) => state);
  const {
    allTaskToMe,
    allTaskFromMe,
    allTaskHidden,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = task;
  const [selectedTab, setSelectedTab] = useState("");

  const getParticukarSubtask = (subtask: selectedTaskFilterType) => {
    if (
      subtask === "allTaskToMe" &&
      _.isEmpty(allTaskToMe.new) &&
      _.isEmpty(allTaskToMe.ongoing) &&
      _.isEmpty(allTaskToMe.done)
    )
      dispatch(taskActions.getAllTaskToMe());
    else if (
      subtask === "allTaskFromMe" &&
      _.isEmpty(allTaskFromMe.unread) &&
      _.isEmpty(allTaskFromMe.ongoing) &&
      _.isEmpty(allTaskFromMe.done)
    )
      dispatch(taskActions.getAllTaskFromMe());
    else if (
      subtask === "allTaskHidden" &&
      _.isEmpty(allTaskHidden.ongoing) &&
      _.isEmpty(allTaskHidden.done) &&
      _.isEmpty(allTaskHidden.canceled)
    ) {
      dispatch(taskActions.getAllTaskHidden());
    }
  };

  useEffect(() => {
    if (subtask) {
      getParticukarSubtask(subtask);
      const key = Object.keys(task[subtask])[0];
      setFilteredTask(searchInData(task[subtask][key], "", "taskUID"));
    }
    if (filterkey) {
      setSelectedTab(filterkey);
    } else {
      if (subtask) {
        const key = Object.keys(task[subtask])[0];
        props.history.push(`/tasks/${subtask}/${key}`);
      }
    }
    if (taskid && taskid !== selectedTask?._id) {
      if (filteredTask && filteredTask.length > 0) {
        setSelectedTask(
          filteredTask.find((taskItem) => taskItem._id === taskid)!
        );
      }
    }
  }, [subtask, filterkey, taskid]);

  useEffect(() => {
    subtask &&
      setFilteredTask(searchInData(task[subtask][selectedTab], "", "taskUID"));
  }, [allTaskFromMe, allTaskToMe, allTaskHidden]);

  useEffect(() => {
    if (subtask) {
      const keys = Object.keys(task[subtask]);
      if (!filterkey && subtask) {
        props.history.replace(`/tasks/${subtask}/${keys[0]}`);
      }
      handleTabClick(keys[0]);
    }
  }, [subtask]);

  // useEffect(() => {
  //   if (selectedTab) {
  //     handleTabClick(selectedTab);
  //   }
  // }, [selectedTab]);

  const markTaskAsSeen = (taskId: string) => {
    dispatch(
      taskActions.taskSeen({
        other: { taskId },
      })
    );
  };

  useEffect(() => {
    let taskNeedToBeSeen =
      selectedTask !== null && !selectedTask.seenBy.includes(userId);

    if (
      selectedTask &&
      taskNeedToBeSeen &&
      subtask === "allTaskFromMe" &&
      selectedTask.creatorState === "unread"
    ) {
      taskNeedToBeSeen = false;
    }

    if (taskNeedToBeSeen) {
      selectedTask !== null && markTaskAsSeen(selectedTask._id);
    }
  }, [selectedTask]);

  const handleTabClick = (type: string) => {
    setSelectedTask(null);
    setFilteredTask(searchInData(task[subtask][type], "", "taskUID"));
    props.history.push(`/tasks/${subtask}/${type}`);
  };

  const handleSelectedTask = (task: ITask) => {
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    const filterData = searchInData(
      task[subtask][selectedTab],
      searchTxt,
      "taskUID"
    );
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

  let taskOngoingCount = 0;
  let taskDoneCount = 0;

  const { ongoing, done } =
    subtask === "allTaskFromMe"
      ? allTaskFromMe
      : subtask === "allTaskToMe"
      ? allTaskToMe
      : allTaskHidden;

  ongoing.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (taskOngoingCount += 1) : 0
  );
  done.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (taskDoneCount += 1) : 0
  );

  useEffect(() => {
    setSelectedTask(null);
  }, [
    allTaskFromMe.unread.length,
    allTaskHidden.canceled.length,
    taskOngoingCount,
    taskDoneCount,
  ]);

  const menuOptions = [
    {
      menuName: "Hide",
      callBackHandler: () => {
        if (selectedTask) {
          dispatch(
            taskActions.taskHide({
              other: { taskId: selectedTask._id },
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

  let newUnSeenCount = 0;
  let fromMeUnReadCount = 0;
  let canceledCount = 0;
  let ongoingHasTask = false;
  let doneHasTask = false;

  allTaskToMe.new.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (newUnSeenCount += 1) : 0
  );
  allTaskFromMe.unread.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (fromMeUnReadCount += 1) : 0
  );

  allTaskHidden.canceled.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (canceledCount += 1) : 0
  );
  const taskLists: any = {
    allTaskFromMe,
    allTaskToMe,
    allTaskHidden,
  };

  if (taskLists.hasOwnProperty(subtask)) {
    ongoingHasTask = isEmpty(taskLists[subtask].ongoing);
    doneHasTask = isEmpty(taskLists[subtask].done);
  }

  const renderTabs = (type: string, activeTab: string) => {
    const tabConfig = [
      {
        type: "new",
        label: "New",
        notifyCount: newUnSeenCount,
        isDisabled: isEmpty(allTaskToMe.new),
        bgColor: "#CFECFF",
      },
      {
        type: "unread",
        label: "Unread",
        notifyCount: fromMeUnReadCount,
        isDisabled: isEmpty(allTaskFromMe.unread),
        bgColor: "#CFECFF",
      },
      {
        type: "ongoing",
        label: "Ongoing",
        notifyCount: taskOngoingCount,
        isDisabled: ongoingHasTask,
        bgColor: "#F1B740",
      },
      {
        type: "done",
        label: "Done",
        notifyCount: taskDoneCount,
        isDisabled: doneHasTask,
        bgColor: "#55BCB3",
      },
      {
        type: "canceled",
        label: "Canceled",
        notifyCount: canceledCount,
        isDisabled: isEmpty(allTaskHidden.canceled),
        bgColor: "#FFE7E7",
      },
    ];
    const tab = tabConfig.find((tab) => tab.type === type);

    if (!tab) {
      return null;
    }
    return (
      <StyledChip
        isDisabled={tab.isDisabled}
        key={tab.type}
        label={tab.label}
        notifyCount={tab.notifyCount}
        bgColor={tab.bgColor}
        active={activeTab === tab.type}
        callback={() => handleTabClick(tab.type)}
      />
    );
  };

  const TaskRow = ({ index, style }: any) => {
    const localTask = filteredTask[index];
    return (
      <div style={{ ...style }}>
        <TaskCard
          key={localTask._id}
          task={localTask}
          selectedTaskId={selectedTask?._id}
          handleClick={handleSelectedTask}
          menuOption={filteredMenuOptions(subtask, selectedTab)}
          disableMenu={
            selectedTab === "canceled"
              ? localTask && localTask.creator._id !== userId
              : false
          }
        />
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

  return (
    <Grid container>
      <Grid
        item
        md={3}
        sx={{
          borderRight: "1px solid #ADB5BD",
        }}
      >
        <Box pt={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              overflow: "auto",
              padding: "8px 0 4px 0",
            }}
          >
            {task &&
              subtask &&
              Object.keys(task[subtask]).map((key: string) => {
                return renderTabs(key, selectedTab);
              })}
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
              placeholder="Start typing to search"
              sx={{ height: "48px" }}
              onChange={handleSearch}
            />
          </Box>
        </Box>
        <Box
          className="custom-scrollbar"
          sx={{
            height: "calc(100vh - 178px)",
            // overflow: "auto",
            // padding: " 0 1px",
            pl: 0.7,
            pr: 0.7,
          }}
        >
          <div style={{ position: "relative" }}>
            {/* <CustomStack
          // gap={1.4}
          // flexWrap="wrap"
          // sx={{ scrollbarWidth: "8px", alignItems: "flex-start" }}
          > */}
            {task && filteredTask && (
              <VariableSizeList
                height={windowHeight}
                itemCount={filteredTask.length}
                itemSize={(index) =>
                  filteredTask[index].description.length > 0 ? 145 : 135
                }
                width={"100%"}
              >
                {TaskRow}
              </VariableSizeList>
            )}
          </div>
          {/* /</CustomStack> */}
        </Box>
      </Grid>
      <Grid item md={9} xs={6}>
        {selectedTask !== null &&
        filteredTask.some((task: ITask) => task._id === selectedTask._id) ? (
          <TaskDetails task={selectedTask} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
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
