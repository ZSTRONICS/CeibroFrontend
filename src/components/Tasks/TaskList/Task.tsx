import { Box, Grid } from "@mui/material";
import { CustomDivider } from "components/CustomTags";
import { momentLocalDateTime } from "components/Utills/Globals";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";
import { ITask } from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
import TaskDetails from "../TaskDetails";
import DetailActions from "../TaskDetails/DetailActions";
import TabsViewTaskDetail from "../TaskDetails/TabsViewTaskDetail";
import TaskMainView from "./TaskMain";
function Task() {
  const [size, ratio] = useWindowSize();
  const dispatch = useDispatch();
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(false);
  const [commentDiv, setCommentDiv] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const {
    containerRef: taskDetailContRef,
    dimensions: taskDetailContDimension,
  } = useDynamicDimensions();
  const {
    containerRef: detailHeaderRef,
    dimensions: detailHeaderRefDimension,
  } = useDynamicDimensions();
  const task: any = useSelector((state: RootState) => state.task);
  console.log(task, "taks");

  const {
    allTaskToMe,
    allTaskFromMe,
    loadingAllTasks,
    RECENT_TASK_UPDATED_TIME_STAMP,
    drawingTaskFilters,
  } = task;
  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  useEffect(() => {
    if (!isRenderEffect.current) {
      dispatch(
        taskActions.syncAllTasks({
          other: {
            syncTime: RECENT_TASK_UPDATED_TIME_STAMP,
          },
        })
      );
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1199) {
      setCommentDiv(false);
    }
  }, [windowWidth, windowHeight]);

  const gridStyle = {
    borderRadius: "4px",
    background: "#FFF",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    height: `${windowActualHeight}px`,
  };

  const handleCollapseComment = () => {
    setCommentDiv((prev) => !prev);
  };

  const arrowBtn = () => {
    return (
      <Box
        onClick={handleCollapseComment}
        sx={{
          position: "absolute",
          top: "50%",
          backgroundColor: "#EBF5FB",
          zIndex: "20",
          borderRadius: "50%",
          cursor: "pointer",
          padding: "6px 7px",
          transform: `${commentDiv ? "rotate(180deg)" : ""}`,
          transition: "all linear 0.30s",
        }}
      >
        <Locationarrow />
      </Box>
    );
  };

  return (
    <Grid
      container
      gap={1.8}
      sx={{ width: "99%", margin: "auto", flexWrap: "nowrap" }}
    >
      <Grid
        item
        sx={{
          maxWidth: { lg: "30%", md: "40%", sm: "40%" },
          width: "100%",
          ...gridStyle,
          px: 2,
          py: 1.5,
        }}
      >
        <TaskMainView
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      </Grid>
      <Grid
        item
        sx={{
          maxWidth: { lg: "70%", md: "60%", sm: "60%" },
          width: "100%",
          ...gridStyle,
          px: 2,
          py: 1.5,
        }}
      >
        <Box ref={detailHeaderRef}>
          {selectedTask && (
            <DetailActions
              isLocationTaskDetail={false}
              taskDetailContDimension={taskDetailContDimension}
              doneImageRequired={false}
              doneCommentsRequired={false}
              taskId={selectedTask._id}
              userSubState={"ongoing"}
              dueDate={"12.1.2024"}
              title={selectedTask.title}
              taskUid={selectedTask.taskUID}
              createdOn={momentLocalDateTime(selectedTask.createdAt)}
              assignedToState={selectedTask.assignedToState}
              invitedNumbers={selectedTask.invitedNumbers}
              isExpanded={false}
              setIsExpanded={() => {}}
              DrawDetailCollapse={false}
            />
          )}
          <CustomDivider sx={{ my: 1 }} />
        </Box>
        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            height: `${
              windowActualHeight - detailHeaderRefDimension.height - 20
            }px`,
          }}
        >
          <Grid
            item
            sx={{
              maxWidth: `${commentDiv ? "49%" : "99.5%"}`,
              width: "100%",
              height: "100%",
              transition: "all 0.30s linear",
            }}
            ref={taskDetailContRef}
          >
            {commentDiv ? (
              selectedTask && (
                <TaskDetails
                  DrawDetailCollapse={false}
                  task={selectedTask}
                  userSubStateLocal={selectedTask.userSubState}
                  TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
                />
              )
            ) : (
              <>
                {selectedTask && (
                  <TabsViewTaskDetail
                    taskDetailContDimension={taskDetailContDimension}
                    selectedTask={selectedTask}
                    RECENT_TASK_UPDATED_TIME_STAMP={
                      RECENT_TASK_UPDATED_TIME_STAMP
                    }
                    isCommentView={false}
                  />
                )}
              </>
            )}
          </Grid>
          <Grid
            item
            sx={{
              maxWidth: `${commentDiv ? "51%" : ".5%"}`,
              width: "100%",
              transition: "all 0.30s linear",
              display: { lg: "block", sm: "none" },
            }}
          >
            {arrowBtn()}
            {commentDiv ? (
              <>
                {selectedTask && (
                  <TabsViewTaskDetail
                    taskDetailContDimension={taskDetailContDimension}
                    RECENT_TASK_UPDATED_TIME_STAMP={
                      RECENT_TASK_UPDATED_TIME_STAMP
                    }
                    selectedTask={selectedTask}
                    isCommentView={true}
                  />
                )}
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Task;
