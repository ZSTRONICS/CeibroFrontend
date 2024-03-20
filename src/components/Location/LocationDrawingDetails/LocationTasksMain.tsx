import { Box } from "@mui/material";
import { getTaskCardHeight } from "components/Utills/Globals";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { TASK_CONFIG } from "config";
import { ITask, ITaskFilterInterace, TaskEvent } from "constants/interfaces";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VariableSizeList } from "react-window";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import LocationTaskCard from "./LocationTaskCard";
interface IProps {
  allTasks: ITask[];
  loadingAllTasksAllEvents: boolean;
  handleSelectedTask: (task: ITask) => void;
  taskListFilter: ITaskFilterInterace;
  selectedTaskId: string | undefined;
  windowActualHeight: number;
  setCardSelectedId: any;
  allEvents: TaskEvent[];
}

function LocationTasksMain(props: IProps) {
  const {
    allTasks,
    loadingAllTasksAllEvents,
    handleSelectedTask,
    selectedTaskId,
    taskListFilter,
    windowActualHeight,
    allEvents,
    setCardSelectedId,
  } = props;
  const taskCardListRef: any = useRef();
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const dispatch = useDispatch();
  const selectedLocalTask: ITask | null =
    allTasks?.find((task) => task?._id === selectedTaskId) || null;
  const clearTaskCardListCache = () => {
    if (taskCardListRef && taskCardListRef.current) {
      // Reset the list starting from the first index
      taskCardListRef.current.resetAfterIndex(0, true);
    } else {
      // If the taskCardListRef is not ready yet, wait for 5 milliseconds and try again
      setTimeout(() => {
        clearTaskCardListCache();
      }, 10);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      clearTaskCardListCache();
    }, 10);
  }, [taskListFilter, allTasks.length, allEvents.length]);
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
    if (loadingAllTasksAllEvents || !selectedLocalTask) {
      return;
    }
    let taskNeedToBeSeen =
      selectedLocalTask && !selectedLocalTask?.seenBy.includes(userId);
    if (taskNeedToBeSeen || selectedLocalTask?.userSubState === "new") {
      markTaskAsSeen(selectedLocalTask._id);
    }
    setTimeout(() => {
      clearTaskCardListCache();
    }, 10);
  }, [selectedLocalTask, selectedLocalTask?.events?.length]);

  const LocationTaskRow = ({ index, style }: any) => {
    const localTask = allTasks[index];
    if (!localTask) {
      return <></>;
    }
    return (
      <div style={{ ...style, width: "100%" }}>
        {localTask && (
          <LocationTaskCard
            isTaskFromMe={localTask.isCreator ? "To" : "From"}
            userId={userId}
            key={localTask._id}
            task={localTask}
            selectedTaskId={selectedTaskId}
            handleTaskClick={handleSelectedTask}
          />
        )}
      </div>
    );
  };
  return (
    <>
      {loadingAllTasksAllEvents ? (
        <Box
          style={{
            transition: "all 0.30s linear",
            height: `${windowActualHeight}px`,
            width: "100%",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </Box>
      ) : (
        <VariableSizeList
          ref={taskCardListRef}
          style={{ overflowY: "auto" }}
          height={windowActualHeight}
          itemCount={allTasks.length}
          overscanCount={20}
          layout="vertical"
          itemSize={(index) => getTaskCardHeight(allTasks[index]) + 10}
          width={"100%"}
        >
          {LocationTaskRow}
        </VariableSizeList>
      )}
    </>
  );
}

export default LocationTasksMain;
