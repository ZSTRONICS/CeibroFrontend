import { ChangeEvent, useEffect, useRef, useState } from "react";
// components
import { Box, Grid, InputBase } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import { TaskCard } from "components/TaskComponent";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
// mui
import { optionMapping } from "components/Utills/Globals";
import StyledChip from "components/Utills/StyledChip";
import { Task as ITask } from "constants/interfaces";
import TaskDetails from "../TaskDetails";

const Task = () => {
  const [value, setValue] = useState(0);
  const [filteredTask, setFilteredTask] = useState<ITask[] | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const { task } = useSelector((state: RootState) => state);
  const {
    selectedTaskFilter,
    allTaskToMe,
    allTaskFromMe,
    allTaskHidden,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = task;
  const [selectedTab, setSelectedTab] = useState("");
  useEffect(() => {
    const key = Object.keys(task[selectedTaskFilter])[0];
    if (!isRenderEffect.current) {
      if (allTaskToMe.new.length === 0) {
        dispatch(taskActions.getAllTaskToMe());
      }
      if (allTaskFromMe.unread.length === 0) {
        dispatch(taskActions.getAllTaskFromMe());
      }
      if (
        allTaskHidden.ongoing.length === 0 ||
        allTaskHidden.done.length === 0 ||
        allTaskHidden.canceled.length === 0
      ) {
        dispatch(taskActions.getAllTaskHidden());
      }
    }
    setSelectedTab(key);
    // setSelectedTask(task[selectedTaskFilter][key][0]);
    setFilteredTask(searchInData(task[selectedTaskFilter][key], "", "taskUID"));
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  useEffect(() => {
    setFilteredTask(
      searchInData(task[selectedTaskFilter][selectedTab], "", "taskUID")
    );
  }, [allTaskFromMe, allTaskToMe, allTaskHidden]);

  useEffect(() => {
    const key = Object.keys(task[selectedTaskFilter])[0];
    handleTabClick(key);
  }, [selectedTaskFilter]);

  useEffect(() => {
    if (selectedTab) {
      handleTabClick(selectedTab);
    }
  }, [selectedTab]);

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
      selectedTaskFilter === "allTaskFromMe" &&
      selectedTask.creatorState === "unread"
    ) {
      taskNeedToBeSeen = false;
    }

    if (taskNeedToBeSeen) {
      selectedTask !== null && markTaskAsSeen(selectedTask._id);
    }
  }, [selectedTask]);

  const handleTabClick = (type: string) => {
    setSelectedTab(type);
    setSelectedTask(null);
    // setSelectedTask(task[selectedTaskFilter][type][0]);
    setFilteredTask(
      searchInData(task[selectedTaskFilter][type], "", "taskUID")
    );
  };

  const handleSelectedTask = (task: ITask) => {
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    const filterData = searchInData(
      task[selectedTaskFilter][selectedTab],
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
    // selectedTaskFilter === "allTaskFromMe" ? allTaskFromMe : allTaskToMe;
    selectedTaskFilter === "allTaskFromMe"
      ? allTaskFromMe
      : selectedTaskFilter === "allTaskToMe"
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

  allTaskToMe.new.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (newUnSeenCount += 1) : 0
  );
  allTaskFromMe.unread.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (fromMeUnReadCount += 1) : 0
  );

  allTaskHidden.canceled.forEach((task: ITask) =>
    !task.seenBy.includes(userId) ? (canceledCount += 1) : 0
  );

  const renderTabs = (type: string, activeTab: string) => {
    switch (type) {
      case "new":
        return (
          <StyledChip
            key={type}
            label="New"
            notfiyCount={newUnSeenCount}
            bgColor="#CFECFF"
            active={activeTab === "new" ? true : false}
            callback={() => handleTabClick("new")}
          />
        );
      case "unread":
        return (
          <StyledChip
            key={type}
            label="Unread"
            notfiyCount={fromMeUnReadCount}
            bgColor="#CFECFF"
            active={activeTab === "unread" ? true : false}
            callback={() => handleTabClick("unread")}
          />
        );
      case "ongoing":
        return (
          <StyledChip
            key={type}
            label="Ongoing"
            notfiyCount={taskOngoingCount}
            bgColor="#F1B740"
            active={activeTab === "ongoing" ? true : false}
            callback={() => handleTabClick("ongoing")}
          />
        );
      case "done":
        return (
          <StyledChip
            key={type}
            label="Done"
            notfiyCount={taskDoneCount}
            bgColor="#55BCB3"
            active={activeTab === "done" ? true : false}
            callback={() => handleTabClick("done")}
          />
        );
      case "canceled":
        return (
          <StyledChip
            key={type}
            label="Canceled"
            notfiyCount={canceledCount}
            bgColor="#FFE7E7"
            active={activeTab === "canceled" ? true : false}
            callback={() => handleTabClick("canceled")}
          />
        );
    }
  };

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
              selectedTaskFilter &&
              Object.keys(task[selectedTaskFilter]).map((key: string) => {
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
            height: "calc(100vh - 180px)",
            overflow: "auto",
            padding: " 0 1px",
            pl: 0.7,
          }}
        >
          <CustomStack
            gap={1.4}
            flexWrap="wrap"
            sx={{ scrollbarWidth: "8px", alignItems: "flex-start" }}
          >
            {task &&
              filteredTask &&
              filteredTask.map((localTask: ITask) => {
                if (typeof localTask === "undefined") {
                  return <></>;
                }
                return (
                  <TaskCard
                    key={localTask._id}
                    task={localTask}
                    selectedTaskId={selectedTask?._id}
                    handleClick={handleSelectedTask}
                    menuOption={filteredMenuOptions(
                      selectedTaskFilter,
                      selectedTab
                    )}
                    disableMenu={
                      selectedTab === "canceled"
                        ? localTask && localTask.creator._id !== userId
                        : false
                    }
                  />
                );
              })}
          </CustomStack>
        </Box>
      </Grid>
      <Grid item md={9}>
        {selectedTask !== null ? (
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
