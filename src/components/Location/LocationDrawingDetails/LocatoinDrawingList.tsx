
import { Box, Grid } from "@mui/material";
import TaskDetails from "components/Tasks/TaskDetails";
import CollapsesBtn from './CollapsesBtn';
// import { DrawingMenu, StickyHeader } from "./Components";
import { Heading2 } from "components/CustomTags";
import { AllTasksAllEvents, ITask } from "constants/interfaces";
import useWindowSize from "hooks/useWindowSize";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
import LocationTasksMain from "./LocationTasksMain";
import MiniTaskCardList from "./MiniTaskCardList";
import MiniTaskImageNavi from "./MiniTaskHead";
import { getfilteredTasks } from "./taskFiltered";

interface LocationDrawingListProps {
  headersize: boolean;
  setHeadersize: (value: boolean) => void;
  allTasksAllEvents: AllTasksAllEvents;
  loadingAllTasksAllEvents: boolean;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
}

const LocatoinDrawingList = ({
  headersize,
  setHeadersize,
  allTasksAllEvents,
  loadingAllTasksAllEvents,
  RECENT_TASK_UPDATED_TIME_STAMP,
}: LocationDrawingListProps) => {
  const { allEvents, allTasks, allPins } = allTasksAllEvents;
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
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

  const [s1, setS1] = useState<boolean>(true);
  const [s2, setS2] = useState<boolean>(false);
  const [s3, setS3] = useState<boolean>(false);
  const collapseDiv1 = () => {
    if (s1 === false && s2 === true) {
      setS1(true);
      setS2(false);
    } else if (s1 === false && s2 === false && s3 === true) {
      setS1(true);
      setS2(false);
      setS3(false);
      setHeadersize(true);
    } else {
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
      setHeadersize(true);
    } else {
      setS1(false);
      setS2(false);
      setS3(true);
      setHeadersize(false);
    }
  };

  return (
    <>
      <Grid container alignItems={"start"} gap={1.5}>
        <Grid item
          md={s1 ? 3 : 1.3} lg={s1 ? 3.1 : 1} xl={s1 ? 3 : 0.7}
          sx={{
            position: 'relative',
            height: '82vh',
            transition: 'all 0.30s linear',
            marginTop: '16px',
            borderRadius: '4px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}>
          <Box sx={{ width: '100%', backgroundColor: 'white', }} >
            <Box>
              <MiniTaskImageNavi isSmallView={!s1} />
              {
                !s1 ?
                  <MiniTaskCardList
                    allTask={getfilteredTasks(
                      allTasksAllEvents.allTasks,
                      taskListFilter
                    )}
                    taskListFilter={taskListFilter}
                    loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                    handleSelectedTask={(task) => setSelectedTask(task)}
                  />
                  : <>
                    <LocationTasksMain
                      allTasks={getfilteredTasks(
                        allTasksAllEvents.allTasks,
                        taskListFilter
                      )}
                      selectedTaskId={selectedTask?._id}
                      taskListFilter={taskListFilter}
                      loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                      handleSelectedTask={(task) => setSelectedTask(task)}
                    />
                  </>
              }
            </Box>
          </Box>
          <CollapsesBtn collapseDiv={collapseDiv1} />
        </Grid>
        <Grid item
          md={s2 ? 4.8 : 3} lg={s2 ? 5.2 : 3.1} xl={s2 ? 5.3 : 3}
          sx={{
            position: 'relative',
            height: '82vh',
            transition: 'all 0.30s linear',
            backgroundColor: 'white',
            marginTop: '16px',
            borderRadius: '4px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          {selectedTask ? (
            <TaskDetails
              task={selectedTaskandEvents}
              userSubStateLocal={userSubStateLocal}
              TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
            />
          ) : (
            <Heading2 sx={{ fontWeight: 600 }}>No Task Selected!</Heading2>
          )}
          <CollapsesBtn collapseDiv={collapseDiv2} />
        </Grid>
        <Grid
          item md={s3 ? 7.3 : 5.5} lg={s3 ? 7.6 : 5.5} xl={s3 ? 8.1 : 5.8}
          sx={{
            position: 'relative',
            height: '82vh',
            backgroundColor: 'white',
            marginTop: '16px',
            borderRadius: '4px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          File previews
        </Grid>
      </Grid >
    </>
  );
};

export default LocatoinDrawingList;
