import { Box, Grid } from "@mui/material";
import TaskDetails from "components/Tasks/TaskDetails";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import {
  AllTasksAllEvents,
  ITask,
  ITaskFilterInterace,
} from "constants/interfaces";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT, searchInData } from "utills/common";
import CollapsesBtn from "./CollapsesLeftBtn";
import CollapsesRightBtn from "./CollapsesRightBtn";
import LocationTaskHead from "./LocationTaskHead";
import LocationTasksMain from "./LocationTasksMain";
import MiniTaskCardList from "./MiniTaskCardList";
import { getfilteredTasks } from "./taskFiltered";

interface LocationDrawingListProps {
  headersize: boolean;
  setHeadersize: (value: boolean) => void;
  allTasksAllEvents: AllTasksAllEvents;
  loadingAllTasksAllEvents: boolean;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
}

const propertiesToSearch = ["taskUID", "topic.topic", "description", "creator"];

const LocatoinDrawingList = ({
  headersize,
  setHeadersize,
  allTasksAllEvents,
  loadingAllTasksAllEvents,
  RECENT_TASK_UPDATED_TIME_STAMP,
}: LocationDrawingListProps) => {
  const { allEvents, allTasks, allPins } = allTasksAllEvents;
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskHeaderHeight, setTaskHeaderHeight] = useState<number>(0);
  const [taskContainerHeight, setTaskContainerHeight] = useState<number>(0);
  const [taskDetailContHeight, setTaskDetailContHeight] = useState<number>(0);
  const [s1, setS1] = useState<boolean>(true);
  const [s2, setS2] = useState<boolean>(false);
  const [s3, setS3] = useState<boolean>(false);
  const [btnRotate, setBtnRotate] = useState<boolean>(true);
  const [btnRightRotate, setBtnRightRotate] = useState<boolean>(true);

  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );
  const taskContainerRef: any = useRef(null);
  const taskDetailContainerRef: any = useRef(null);
  const [taskSearchText, setTaskSearchText] = useState("");
  useEffect(() => {
    if (taskContainerRef.current) {
      setTaskContainerHeight(taskContainerRef.current.clientHeight);
    }
    if (taskDetailContainerRef.current) {
      setTaskDetailContHeight(taskDetailContainerRef.current.clientHeight);
    }
  }, [taskContainerRef, taskDetailContainerRef, windowHeight, s1, s2, s3]);

  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  const userSubStateLocal: string =
    selectedTask === null
      ? "N/A"
      : selectedTask.isCreator
      ? selectedTask.creatorState
      : selectedTask.userSubState;

  const filteTaskEvents = allEvents.filter(
    (event) => event.taskId === selectedTask?._id
  );
  const selectedTaskandEvents: ITask | any = {
    ...selectedTask,
    events: filteTaskEvents || [],
  };

  const collapseDiv1 = () => {
    if (s1 === false && s2 === true) {
      setBtnRotate(true);
      setBtnRightRotate(true);
      setS1(true);
      setS2(false);
    } else if (s1 === false && s2 === false && s3 === true) {
      setBtnRotate(true);
      setBtnRightRotate(false);
      setS1(true);
      setS2(false);
      setS3(false);
      setHeadersize(true);
    } else {
      setBtnRightRotate(true);
      setBtnRotate(false);
      setS1(false);
      setS2(true);
      setS3(false);
    }
  };

  const collapseDiv2 = () => {
    if (s1 === false && s2 === false) {
      setS1(false);
      setS2(true);
      setS3(false);
      setBtnRightRotate(true);
      setHeadersize(true);
    } else {
      setBtnRightRotate(false);
      setS1(false);
      setS2(false);
      setS3(true);
      setHeadersize(false);
    }
  };
  const sideBarStyle = {
    borderRadius: "4px",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    height: `${windowActualHeight - 68}px`,
  };
  const noTaskSelectedStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const containerHeight = taskContainerHeight - taskHeaderHeight;
  console.log("taskDetailContHeight", taskDetailContHeight);

  const handleTaskSearch = (searchValue: string) => {
    setTaskSearchText(searchValue);
  };

  const taskFiltering = (
    data: ITask[],
    filterList: ITaskFilterInterace,
    searchText: string
  ) => {
    let filteredTask = getfilteredTasks(
      allTasksAllEvents.allTasks,
      taskListFilter
    );
    if (searchText === "") {
      return filteredTask;
    } else {
      return searchInData(filteredTask, searchText, propertiesToSearch);
    }
  };

  return (
    <>
      <Grid container gap={1.8}>
        <Grid
          ref={taskContainerRef}
          item
          md={s1 ? 3 : 1.5}
          lg={s1 ? 3 : 1}
          xl={s1 ? 3 : 0.7}
          xs={s1 ? 3.1 : 0.8}
          sx={{
            ...sideBarStyle,
            position: "relative",
            mt: 2,
            px: 1,
            transition: "all 0.30s linear",
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "white" }}>
            <LocationTaskHead
              isSmallView={!s1}
              setTaskHeaderHeiht={(headerHeight) =>
                setTaskHeaderHeight(headerHeight)
              }
              handleSearch={handleTaskSearch}
              searchText={taskSearchText}
            />
            {!s1 ? (
              <Box
                sx={{
                  height: `${containerHeight}px`,
                  overflowY: "auto",
                  padding: "6px 6px",
                }}
              >
                <MiniTaskCardList
                  windowActualHeight={windowActualHeight}
                  allTasks={taskFiltering(
                    allTasksAllEvents.allTasks,
                    taskListFilter,
                    taskSearchText
                  )}
                  taskListFilter={taskListFilter}
                  loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                  handleSelectedTask={(task) => setSelectedTask(task)}
                />
              </Box>
            ) : (
              <Box>
                <LocationTasksMain
                  windowActualHeight={containerHeight}
                  allTasks={taskFiltering(
                    allTasksAllEvents.allTasks,
                    taskListFilter,
                    taskSearchText
                  )}
                  selectedTaskId={selectedTask?._id}
                  taskListFilter={taskListFilter}
                  loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                  handleSelectedTask={(task) => setSelectedTask(task)}
                />
              </Box>
            )}
          </Box>
          <CollapsesBtn btnRotate={btnRotate} collapseDiv={collapseDiv1} />
        </Grid>
        <Grid
          item
          ref={taskDetailContainerRef}
          md={s2 ? 4.5 : 3}
          lg={s2 ? 5 : 3}
          xl={s2 ? 5.4 : 3.1}
          sx={{
            position: "relative",
            height: `${windowActualHeight - 68}px`,
            transition: "all 0.30s linear",
            backgroundColor: "white",
            marginTop: "16px",
            borderRadius: "4px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            ...(selectedTask ? {} : noTaskSelectedStyle),
          }}
        >
          {selectedTask ? (
            <TaskDetails
              taskDetailContHeight={taskDetailContHeight}
              task={selectedTaskandEvents}
              userSubStateLocal={userSubStateLocal}
              TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
            />
          ) : (
            <Heading2 sx={{ fontWeight: 600 }}>No Task Selected!</Heading2>
          )}
          <CollapsesRightBtn
            btnRightRotate={btnRightRotate}
            collapseDiv={collapseDiv2}
          />
        </Grid>
        <Grid
          item
          md={s3 ? 7.1 : 5.5}
          lg={s3 ? 7.7 : 5.7}
          xl={s3 ? 7.9 : 5.6}
          sx={{
            position: "relative",
            backgroundColor: "white",
            height: `${windowActualHeight - 68}px`,
            marginTop: "16px",
            borderRadius: "4px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            ...noTaskSelectedStyle,
          }}
        >
          {/* <DocumentReader /> */}
          <Heading2 sx={{ fontWeight: 600 }}>File previews!</Heading2>
        </Grid>
      </Grid>
    </>
  );
};

export default LocatoinDrawingList;
