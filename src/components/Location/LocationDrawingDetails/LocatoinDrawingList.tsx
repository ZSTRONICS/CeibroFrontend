import { Box, Grid, useMediaQuery } from "@mui/material";
import TaskDetails from "components/Tasks/TaskDetails";
// import { DrawingMenu, StickyHeader } from "./Components";
import { useTheme } from '@mui/material/styles';
import { Heading2 } from "components/CustomTags";
import DocumentReader from "components/pdfviewer";
import {
  AllTasksAllEvents,
  ITask,
  ITaskFilterInterace,
} from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { useState } from "react";
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
  selectedDrawing,
}: LocationDrawingListProps) => {
  const { allEvents, allTasks, allPins } = allTasksAllEvents;
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskHeaderHeight, setTaskHeaderHeight] = useState<number>(0);
  const [s1, setS1] = useState<boolean>(true);
  const [s2, setS2] = useState<boolean>(false);
  const [s3, setS3] = useState<boolean>(false);
  const [btnRotate, setBtnRotate] = useState<boolean>(true);
  const [btnRightRotate, setBtnRightRotate] = useState<boolean>(true);
  const [isfullcard, setIsfullcard] = useState(true);
  const [isfullcardMini, setIsfullcardMini] = useState(false);
  const [Taskbtn, setTaskbtn] = useState(true);
  const [DrawDetailCollapse, setDrawDetailCollapse] = useState(false);
  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );

  const {
    containerRef: taskContainerRef,
    dimensions: taskConDimension,
    updateDimensions,
  } = useDynamicDimensions();
  const {
    containerRef: loctaskDetailContRef,
    dimensions: taskDetailContDimension,
    updateDimensions: updateTaskDetailContDimensions,
  } = useDynamicDimensions();
  const [taskSearchText, setTaskSearchText] = useState("");
  const updateDimensionsAndFullCard = () => {
    updateDimensions();
  };

  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  const userSubStateLocal: string =
    selectedTask === null
      ? "N/A"
      : selectedTask.isCreator
      ? selectedTask.creatorState
      : selectedTask.userSubState;

  const filterTaskEvents = allEvents.filter(
    (event) => event.taskId === selectedTask?._id
  );
  const selectedTaskandEvents: ITask | any = {
    ...selectedTask,
    events: filterTaskEvents || [],
  };

  const collapseDiv1 = () => {
    if (s1 === false && s2 === true) {
      setBtnRotate(true);
      setBtnRightRotate(true);
      setS1(true);
      setS2(false);
      setTaskbtn(true);
      setIsfullcardMini(false);
      setDrawDetailCollapse(false);
      setTimeout(() => {
        setIsfullcard(true);
      }, 350);
      updateDimensionsAndFullCard();
    } else if (s1 === false && s2 === false && s3 === true) {
      setBtnRotate(true);
      setBtnRightRotate(true);
      setS1(true);
      setS2(false);
      setS3(false);
      setHeadersize(true);
      setTaskbtn(true);
      setIsfullcardMini(false);
      setDrawDetailCollapse(false);
      setTimeout(() => {
        setIsfullcard(true);
      }, 350);
      updateDimensionsAndFullCard();
    } else {
      setBtnRightRotate(true);
      setBtnRotate(false);
      setS1(false);
      setS2(true);
      setS3(false);
      setTaskbtn(false);
      setDrawDetailCollapse(true);
      setIsfullcard(false);
      setTimeout(() => {
        setIsfullcardMini(true);
      }, 350);
      updateDimensionsAndFullCard();
    }
  };

  const collapseDiv2 = () => {
    if (s1 === false && s2 === false) {
      setS1(false);
      setS2(true);
      setS3(false);
      setDrawDetailCollapse(true);
      setBtnRightRotate(true);
      setHeadersize(true);
    } else {
      setTaskbtn(false);
      setBtnRightRotate(false);
      setBtnRotate(false);
      setS1(false);
      setS2(false);
      setS3(true);
      setDrawDetailCollapse(false);
      setHeadersize(false);
      setIsfullcard(false);
      setTimeout(() => {
        setIsfullcardMini(true);
      }, 350);
    }
  };

  const theme = useTheme();
  const islgScreenUP = useMediaQuery(theme.breakpoints.up('lg'));  

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
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid
          ref={taskContainerRef}
          item
          container
          sx={{
            ...sideBarStyle,
            position: "relative",
            mt: 2,
            px: 1,
            maxWidth: `${s1 ? ( !islgScreenUP ? "21.9%" : '19.9%' ) : (!islgScreenUP ? "9.9%" : '7.9%')}`,
            transition: "all 0.30s linear",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "white" }}>
            <LocationTaskHead
              Taskbtn={Taskbtn}
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
                  left: "0%",
                  right: "0%",
                }}
              >
                No task found!
              </Heading2>
            ) : (
              <>
                {!s1
                  ? isfullcardMini && (
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
                          selectedTaskId={selectedTask?._id}
                        />
                      </Box>
                    )
                  : isfullcard && (
                      <Box
                        sx={{
                          transition: "all 0.30s linear",
                          width: "100%",
                        }}
                      >
                        <LocationTasksMain
                          allEvents={allEvents}
                          windowActualHeight={containerHeight}
                          allTasks={allTask}
                          selectedTaskId={selectedTask?._id}
                          taskListFilter={taskListFilter}
                          loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                          handleSelectedTask={(task) => setSelectedTask(task)}
                          setCardSelectedId={undefined}
                        />
                      </Box>
                    )}
              </>
            )}
          </Box>
          <CollapsesBtn btnRotate={btnRotate} collapseDiv={collapseDiv1} />
        </Grid>
        <Grid
          item
          ref={loctaskDetailContRef}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: `${s2 ? (islgScreenUP ? '45%' : '43%') : (islgScreenUP ? '33%':'31%' )}`,
            height: `${windowActualHeight - 68}px`,
            transition: "all 0.30s linear",
            backgroundColor: "white",
            marginTop: "16px",
            borderRadius: "4px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            ...(allTask.length > 0 && selectedTask ? {} : noTaskSelectedStyle),
          }}
          id="taskDetailContainer"
        >
          <Box sx={{ width: "100%", overflow: "auto" }}>
            {allTask.length > 0 && selectedTask ? (
              <TaskDetails
                isLocationTaskDetail={true}
                isSmallView={!s2}
                taskDetailContDimension={taskDetailContDimension}
                task={selectedTaskandEvents}
                userSubStateLocal={userSubStateLocal}
                DrawDetailCollapse={DrawDetailCollapse}
                TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
              />
            ) : (
              <Heading2
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  position: "absolute",
                  top: "50%",
                  bottom: "0%",
                  left: "0%",
                  right: "0%",
                  margin: "auto",
                }}
              >
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
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: `${s3 ? "57.2%" : "45.2%"}`,
            backgroundColor: "white",
            height: `${windowActualHeight - 68}px`,
            marginTop: "16px",
            borderRadius: "4px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            transition: "all 0.30s linear",
            ...(selectedDrawing.fileUrl ? {} : noTaskSelectedStyle),
          }}
        >
          {selectedDrawing.fileUrl ? (
            <DocumentReader selectedDrawingUrl={selectedDrawing.fileUrl} />
          ) : (
            <Heading2
              sx={{
                fontWeight: 600,
                textAlign: "center",
                position: "absolute",
                top: "50%",
                bottom: "0%",
                left: "0%",
                right: "0%",
                margin: "auto",
              }}
            >
              Drawing file not found!
            </Heading2>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LocatoinDrawingList;
