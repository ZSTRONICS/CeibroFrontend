import { Box } from "@mui/material";
// import { Locationarrow } from 'components/material-ui/icons/arrow/Locationarrow';

import { Heading2 } from "components/CustomTags";
import TaskDetails from "components/Tasks/TaskDetails";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";
import DocumentReader from "components/pdfviewer/index.js";
import { AllTasksAllEvents, ITask } from "constants/interfaces";
import useWindowSize from "hooks/useWindowSize";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
import { styles } from "./DrawingDetailsStyle";
import LocationTasksMain from "./LocationTasksMain";
import MiniTaskCardList from "./MiniTaskCardList";
import MiniTaskHead from "./MiniTaskHead";
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
      <Box style={styles.locatoin_main}>
        <Box style={styles.location_Parent}>
          <Box style={!s1 ? styles.location_task_min : styles.location_task}>
            <Box style={styles.location_all_taks}>
              <Box style={styles.locatoin_task_header}>
                <MiniTaskHead isSmallView={!s1} />
              </Box>
              <Box style={styles.location_task_bottom}>
                {!s1 ? (
                  <MiniTaskCardList
                    allTask={getfilteredTasks(
                      allTasksAllEvents.allTasks,
                      taskListFilter
                    )}
                    taskListFilter={taskListFilter}
                    loadingAllTasksAllEvents={loadingAllTasksAllEvents}
                    handleSelectedTask={(task) => setSelectedTask(task)}
                  />
                ) : (
                  <>
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
                )}
              </Box>
            </Box>
            <Box>
              <button
                onClick={collapseDiv1}
                style={!s1 ? styles.location_btn_change : styles.location_btn}
              >
                <Locationarrow />
              </button>
            </Box>
          </Box>
          <Box
            style={
              !s2
                ? styles.location_description
                : styles.location_description_max
            }
          >
            <Box style={styles.location_all_taks}>
              {selectedTask ? (
                <TaskDetails
                  task={selectedTaskandEvents}
                  userSubStateLocal={userSubStateLocal}
                  TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
                />
              ) : (
                <Heading2 sx={{ fontWeight: 600 }}>No Task Selected!</Heading2>
              )}
            </Box>
            <Box>
              <button
                onClick={collapseDiv2}
                style={!s3 ? styles.location_btn : styles.location_btn_change}
              >
                <Locationarrow />
              </button>
            </Box>
          </Box>
          <Box
            style={!s3 ? styles.location_drawing : styles.location_drawing_max}
          >
            <DocumentReader />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LocatoinDrawingList;
