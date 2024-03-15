import { Box, Button, Grid } from "@mui/material";
import assets from "assets";
import { CustomDivider, CustomStack, Heading2 } from "components/CustomTags";
import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import { countUnseenTasksForTabs } from "components/Utills/Globals";
import { ApprovalIcon, TaskIcon } from "components/material-ui/icons";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";
import { AllTasksAllEvents, ITask, TaskRootState } from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS, taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT, filterTasks, openFormInNewWindow } from "utills/common";
import TaskDetails from "../TaskDetails";
import DetailActions from "../TaskDetails/DetailActions";
import TabsViewTaskDetail from "../TaskDetails/TabsViewTaskDetail";
import TaskMain from "./TaskMain";
function Task() {
  const [size, ratio] = useWindowSize();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const [commentDiv, setCommentDiv] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [showHiddenTasks, setShowHiddenTasks] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const {
    containerRef: taskDetailContRef,
    dimensions: taskDetailContDimension,
  } = useDynamicDimensions();
  const {
    containerRef: detailHeaderRef,
    dimensions: detailHeaderRefDimension,
  } = useDynamicDimensions();

  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  const { allTasksAllEvents, RECENT_TASK_UPDATED_TIME_STAMP } = useSelector(
    (state: RootState) => state.task
  );
  const { allProjects } = useSelector((state: RootState) => state.project);
  const { userAllContacts } = useSelector((state: RootState) => state.user);
  const Topics = useSelector((state: RootState) => state.task.Topics);
  const { allTasks, allEvents }: AllTasksAllEvents = allTasksAllEvents;

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allTasksAllEvents.allTasks.length === 0 &&
        dispatch(taskActions.getAllTasksAllEvents());
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
      userAllContacts.length === 0 && dispatch(userApiAction.getUserContacts());
      Topics.allTopics.length === 0 && dispatch(taskActions.getAllTopic());
    }
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

  const ongoingClosedTasks = [
    {
      label: "Ongoing",
      icon: (
        <TaskIcon color={selectedTab === "Ongoing" ? "black" : "#0076C8"} />
      ),
      content: (
        <TaskMain
          allTaskList={filterTasks(
            allTasks,
            TaskRootState.Hidden,
            true,
            "ongoing"
          )}
          showHiddenTasks={showHiddenTasks}
          selectedRootTask={selectedTab}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Hidden, true, "ongoing"),
        userId
      ),
    },
    {
      label: "Closed",
      icon: (
        <assets.CheckOutlinedIcon
          sx={{ color: `${selectedTab === "Closed" ? "black" : "#0076C8"}` }}
        />
      ),
      content: (
        <TaskMain
          allTaskList={filterTasks(
            allTasks,
            TaskRootState.Hidden,
            true,
            "done"
          )}
          showHiddenTasks={showHiddenTasks}
          selectedRootTask={selectedTab}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Hidden, true, "done"),
        userId
      ),
    },
  ];

  const rootTaskFilter = [
    {
      label: "Ongoing",
      icon: (
        <TaskIcon
          color={`${selectedTab === "Ongoing" ? "black" : "#0076C8"}`}
        />
      ),
      content: (
        <TaskMain
          showHiddenTasks={showHiddenTasks}
          allTaskList={filterTasks(allTasks, TaskRootState.Ongoing)}
          setSelectedTask={setSelectedTask}
          selectedRootTask={selectedTab}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Ongoing),
        userId
      ),
    },
    {
      label: "Approval",
      icon: (
        <ApprovalIcon
          color={`${selectedTab === "Approval" ? "black" : "#0076C8"}`}
        />
      ),
      content: (
        <TaskMain
          selectedRootTask={selectedTab}
          showHiddenTasks={showHiddenTasks}
          allTaskList={filterTasks(allTasks, TaskRootState.Approval)}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Approval),
        userId
      ),
    },
    {
      label: "Closed",
      icon: (
        <assets.CheckOutlinedIcon
          sx={{ color: `${selectedTab === "Closed" ? "black" : "#0076C8"}` }}
        />
      ),
      content: (
        <TaskMain
          selectedRootTask={selectedTab}
          showHiddenTasks={showHiddenTasks}
          allTaskList={filterTasks(allTasks, TaskRootState.Closed)}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Closed),
        userId
      ),
    },
    {
      label: "Canceled",
      icon: (
        <assets.CloseIcon
          sx={{ color: `${selectedTab === "Canceled" ? "black" : "#0076C8"}` }}
        />
      ),
      content: (
        <TaskMain
          selectedRootTask={selectedTab}
          showHiddenTasks={showHiddenTasks}
          allTaskList={filterTasks(allTasks, TaskRootState.Canceled)}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Canceled),
        userId
      ),
    },
  ];

  const filterTaskEvents = allEvents.filter(
    (event) => event.taskId === selectedTask?._id
  );
  const selectedTaskandEvents: ITask | any = {
    ...selectedTask,
    events: filterTaskEvents || [],
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

  const ShowTaskHeader = () => {
    return (
      <>
        {showHiddenTasks ? (
          <CustomStack sx={{ justifyContent: "space-between", width: "100%" }}>
            <Heading2 sx={{ py: 2 }}>Hidden Tasks</Heading2>
            <Button
              disableRipple
              component="label"
              sx={{ padding: "5px 8px", textTransform: "unset" }}
              onClick={() => setShowHiddenTasks(false)}
              variant="contained"
            >
              Go Back
            </Button>
          </CustomStack>
        ) : (
          <CustomStack sx={{ justifyContent: "space-between", width: "100%" }}>
            <Heading2 sx={{ py: 2 }}>Tasks</Heading2>
            <Box>
              <Button
                disableRipple
                component="label"
                sx={{
                  padding: "5px 8px",
                  textTransform: "unset",
                  color: "#818181",
                }}
                onClick={() => setShowHiddenTasks(true)}
                variant="text"
              >
                Show hidden tasks
              </Button>
              <Button
                disableRipple
                component="label"
                sx={{ padding: "5px 8px", textTransform: "unset" }}
                onClick={() =>
                  openFormInNewWindow("/create-new-task", "Create New Task")
                }
                variant="contained"
              >
                <assets.AddIcon sx={{ color: "white", marginRight: "10px" }} />
                New
              </Button>
            </Box>
          </CustomStack>
        )}
      </>
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
        {ShowTaskHeader()}
        <BasicTabs
          setSelectedTab={setSelectedTab}
          tabsBgColor="#F4F4F4"
          tabsData={showHiddenTasks ? ongoingClosedTasks : rootTaskFilter}
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
            <>
              {" "}
              <DetailActions
                userId={userId}
                isLocationTaskDetail={false}
                taskDetailContDimension={taskDetailContDimension}
                selectedTask={selectedTask}
                DrawDetailCollapse={false}
              />
              <CustomDivider sx={{ my: 1 }} />
            </>
          )}
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
              selectedTask &&
              selectedTaskandEvents && (
                <TaskDetails
                  DrawDetailCollapse={false}
                  task={selectedTaskandEvents}
                  userSubStateLocal={selectedTaskandEvents.userSubState}
                  TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
                />
              )
            ) : (
              <>
                {selectedTask && selectedTaskandEvents && (
                  <TabsViewTaskDetail
                    taskDetailContDimension={taskDetailContDimension}
                    parentheight={
                      windowActualHeight - detailHeaderRefDimension.height - 20
                    }
                    selectedTask={selectedTaskandEvents}
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
                {selectedTask && selectedTaskandEvents && (
                  <TabsViewTaskDetail
                    parentheight={
                      windowActualHeight - detailHeaderRefDimension.height - 20
                    }
                    taskDetailContDimension={taskDetailContDimension}
                    RECENT_TASK_UPDATED_TIME_STAMP={
                      RECENT_TASK_UPDATED_TIME_STAMP
                    }
                    selectedTask={selectedTaskandEvents}
                    isCommentView={true}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Task;
