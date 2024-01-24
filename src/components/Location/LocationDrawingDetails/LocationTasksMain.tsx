import { Box, Grid } from "@mui/material";
import { getTaskCardHeight } from "components/Utills/Globals";
import { TaskCardSkeleton } from "components/material-ui/skeleton";
import { ITask, ITaskFilterInterace } from "constants/interfaces";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { VariableSizeList } from "react-window";
import { RootState } from "redux/reducers";
import LocationTaskCard from "./LocationTaskCard";
interface IProps {
  allTasks: ITask[];
  loadingAllTasksAllEvents: boolean;
  handleSelectedTask: (task: ITask) => void;
  taskListFilter: ITaskFilterInterace;
  selectedTaskId: string | undefined;
}

function LocationTasksMain(props: IProps) {
  const {
    allTasks,
    loadingAllTasksAllEvents,
    handleSelectedTask,
    selectedTaskId,
    taskListFilter,
  } = props;
  const taskCardListRef: any = useRef();
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);

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
  useEffect(() => {
    setTimeout(() => {
      clearTaskCardListCache();
    }, 10);
  }, [allTasks.length]);

  const LocationTaskRow = ({ index, style }: any) => {
    const localTask = allTasks[index];
    if (!localTask) {
      return <></>;
    }
    return (
      <div style={{ ...style, width: "100%" }}>
        {localTask && (
          <LocationTaskCard
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
      <Grid
        item
        height={"700px"}
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
            mt: 3,
            pb: 1,
          }}
        >
          {loadingAllTasksAllEvents ? (
            <Box style={{ height: "700px" }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <TaskCardSkeleton key={index} />
              ))}
            </Box>
          ) : (
            <VariableSizeList
              ref={taskCardListRef}
              style={{ overflowY: "auto" }}
              height={700}
              itemCount={allTasks.length}
              overscanCount={20}
              layout="vertical"
              onScroll={() => { }}
              itemSize={(index) => getTaskCardHeight(allTasks[index]) + 14}
              width={"100%"}
            >
              {LocationTaskRow}
            </VariableSizeList>
          )}
        </Box>
      </Grid>
    </>
  );
}

export default LocationTasksMain;
