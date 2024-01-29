import { Box, Grid } from "@mui/material";
import TaskDetails from "components/Tasks/TaskDetails";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import {
  AllTasksAllEvents,
  ITask,
  ITaskFilterInterace,
} from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  selectedDrawing: any;
  allDrawingTaskList: ITask[];
  setHeadersize: (value: boolean) => void;
  allTasksAllEvents: AllTasksAllEvents;
  loadingAllTasksAllEvents: boolean;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
}

const propertiesToSearch = ["taskUID", "topic.topic", "description", "creator"];

const LocatoinDrawingList = ({
  setHeadersize,
  allTasksAllEvents,
  loadingAllTasksAllEvents,
  RECENT_TASK_UPDATED_TIME_STAMP,
  allDrawingTaskList,
}: LocationDrawingListProps) => {
  const { allEvents, allTasks, allPins } = allTasksAllEvents;
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { drawingId } = useParams<any>();
  const [taskHeaderHeight, setTaskHeaderHeight] = useState<number>(0);
  const [s1, setS1] = useState<boolean>(true);
  const [s2, setS2] = useState<boolean>(false);
  const [s3, setS3] = useState<boolean>(false);
  const [btnRotate, setBtnRotate] = useState<boolean>(true);
  const [btnRightRotate, setBtnRightRotate] = useState<boolean>(true);
  const [isfullcard, setIsfullcard] = useState(true);
  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );

  const {
    containerRef: taskContainerRef,
    dimensions: taskConDimension,
    updateDimensions,
  } = useDynamicDimensions();
  const {
    containerRef: taskDetailContRef,
    dimensions: taskDetailContDimension,
    updateDimensions: updateTaskDetailContDimensions,
  } = useDynamicDimensions();
  const [taskSearchText, setTaskSearchText] = useState("");
  const updateDimensionsAndFullCard = () => {
    updateDimensions();
    setTimeout(() => {
      setIsfullcard(true);
      updateTaskDetailContDimensions();
    }, 1000);
  };

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
      setTimeout(() => {
        setIsfullcard(true);
      }, 350);
      updateDimensionsAndFullCard();
    } else if (s1 === false && s2 === false && s3 === true) {
      setBtnRotate(true);
      setBtnRightRotate(false);
      setS1(true);
      setS2(false);
      setS3(false);
      setHeadersize(true);
      updateDimensionsAndFullCard();
    } else {
      setBtnRightRotate(true);
      setBtnRotate(false);
      setS1(false);
      setS2(true);
      setS3(false);
      updateDimensionsAndFullCard();
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
      setBtnRotate(false);
      setS1(false);
      setS2(false);
      setS3(true);
      setHeadersize(false);
    }
    setTimeout(() => {
      updateTaskDetailContDimensions();
    }, 1100);
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
  const containerHeight = taskConDimension.height - taskHeaderHeight;

  const handleTaskSearch = (searchValue: string) => {
    setTaskSearchText(searchValue);
  };

  const taskFiltering = (
    data: ITask[],
    filterList: ITaskFilterInterace,
    searchText: string
  ) => {
    let filteredTask = getfilteredTasks(allDrawingTaskList, taskListFilter);
    if (searchText === "") {
      return filteredTask;
    } else {
      return searchInData(filteredTask, searchText, propertiesToSearch);
    }
  };

  const allTask = taskFiltering(
    allDrawingTaskList,
    taskListFilter,
    taskSearchText
  );

  return (
    <>
      <Grid container gap={1.8}>
        <Grid
          ref={taskContainerRef}
          item
          container
          md={s1 ? 3 : 1.5}
          lg={s1 ? 3 : 1.1}
          xl={s1 ? 3 : 0.9}
          xs={s1 ? 3.1 : 0.7}
          sx={{
            ...sideBarStyle,
            position: "relative",
            mt: 2,
            px: 1,
            transition: "all 0.30s linear",
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <LocationTaskHead
              isSmallView={!s1}
              setTaskHeaderHeiht={setTaskHeaderHeight}
              handleSearch={handleTaskSearch}
              searchText={taskSearchText}
            />
            {allTask.length === 0 ? (
              <Heading2
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  position: "absolute",
                  top: "50%",
                  left: "30%",
                }}
              >
                No task found!
              </Heading2>
            ) : (
              <>
                {!s1 ? (
                  <Box
                    sx={{
                      height: `${containerHeight}px`,
                      overflowY: "auto",
                      padding: "6px 6px",
                      transition: "all 0.30s linear",
                    }}
                  >
                    <MiniTaskCardList
                      windowActualHeight={windowActualHeight}
                      allTasks={allTask}
                      taskListFilter={taskListFilter}
                      loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                      handleSelectedTask={(task) => setSelectedTask(task)}
                    />
                  </Box>
                ) : (
                  isfullcard && (
                    <Box
                      sx={{
                        transition: "all 0.30s linear",
                      }}
                    >
                      <LocationTasksMain
                        windowActualHeight={containerHeight}
                        allTasks={allTask}
                        selectedTaskId={selectedTask?._id}
                        taskListFilter={taskListFilter}
                        loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                        handleSelectedTask={(task) => setSelectedTask(task)}
                      />
                    </Box>
                  )
                )}
              </>
            )}
          </Box>
          <CollapsesBtn btnRotate={btnRotate} collapseDiv={collapseDiv1} />
        </Grid>
        <Grid
          item
          ref={taskDetailContRef}
          md={s2 ? 4.5 : 3.1}
          lg={s2 ? 5 : 3.1}
          xl={s2 ? 5.1 : 3}
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
          id="taskDetailContainer"
        >
          <Box sx={{ overflow: "auto" }}>
            {selectedTask ? (
              <TaskDetails
                isSmallView={!s2}
                taskDetailContDimension={taskDetailContDimension}
                task={selectedTaskandEvents}
                userSubStateLocal={userSubStateLocal}
                TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
              />
            ) : (
              <Heading2 sx={{ fontWeight: 600, textAlign: "center", pt: 2 }}>
                No task selected!
              </Heading2>
            )}
          </Box>
          <CollapsesRightBtn
            btnRightRotate={btnRightRotate}
            collapseDiv={collapseDiv2}
          />
        </Grid>
        <Grid
          item
          md={s3 ? 7.1 : 5.5}
          lg={s3 ? 7.5 : 5.6}
          xl={s3 ? 7.8 : 5.7}
          sx={{
            position: "relative",
            backgroundColor: "white",
            height: `${windowActualHeight - 68}px`,
            marginTop: "16px",
            borderRadius: "4px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            transition: "all 0.30s linear",
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
