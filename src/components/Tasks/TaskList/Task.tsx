import { Box, Grid } from "@mui/material";
import assets from "assets";
import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import { countUnseenTasksForTabs } from "components/Utills/Globals";
import { ApprovalIcon, TaskIcon } from "components/material-ui/icons";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";
import { AllTasksAllEvents, ITask, TaskRootState } from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS, taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT, filterTasks } from "utills/common";
import TaskDetails from "../TaskDetails";
import DetailActions from "../TaskDetails/DetailActions";
import TabsViewTaskDetail from "../TaskDetails/TabsViewTaskDetail";
import MainTaskHeader from "./MainTaskHeader";
import TaskMain from "./TaskMain";
interface RouteParams {
  subtask: TaskRootState;
  taskuid: string;
}
function Task() {
  const { subtask, taskuid } = useParams<RouteParams>();
  const history = useHistory();
  const [size, ratio] = useWindowSize();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  const [windowWidth, windowHeight] = size;
  const isRenderEffect = useRef<boolean>(true);
  const [commentDiv, setCommentDiv] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("Ongoing");
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [showHiddenTasks, setShowHiddenTasks] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [commentTab, setCommentTab] = useState<string>("");
  const { allTasksAllEvents, RECENT_TASK_UPDATED_TIME_STAMP } = useSelector(
    (state: RootState) => state.task
  );

  const { allProjects } = useSelector((state: RootState) => state.project);
  const { userAllContacts } = useSelector((state: RootState) => state.user);
  const Topics = useSelector((state: RootState) => state.task.Topics);
  const { allTasks, allEvents }: AllTasksAllEvents = allTasksAllEvents;

  const {
    containerRef: taskDetailContRef,
    dimensions: taskDetailContDimension,
  } = useDynamicDimensions();
  const {
    containerRef: detailHeaderRef,
    dimensions: detailHeaderRefDimension,
  } = useDynamicDimensions();

  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);

  const ongoingClosedTasks = [
    {
      label: "Ongoing",
      icon: (
        <Box
          sx={{
            transform: "translateX(18px) translateY(5px) ",
          }}
        >
          <TaskIcon
            isTabs={true}
            color={selectedTab === "Ongoing" ? "black" : "#0076C8"}
          />
        </Box>
      ),
      content: (
        <></>
        // <TaskMain
        //   allTaskList={filterTasks(
        //     allTasks,
        //     TaskRootState.Hidden,
        //     true,
        //     "ongoing"
        //   )}
        //   showHiddenTasks={showHiddenTasks}
        //   selectedRootTask={selectedTab}
        //   setSelectedTask={setSelectedTask}
        //   selectedTask={selectedTask}
        // />
      ),
      count: countUnseenTasksForTabs(
        filterTasks(allTasks, TaskRootState.Hidden, true, "ongoing"),
        userId
      ),
    },
    {
      label: "Closed",
      icon: (
        <Box
          sx={{
            transform: "translateX(10px) translateY(2px) ",
          }}
        >
          <assets.CheckOutlinedIcon
            sx={{ color: `${selectedTab === "Closed" ? "black" : "#0076C8"}` }}
          />
        </Box>
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
        <Box sx={{ transform: "translateX(18px) translateY(5px)" }}>
          <TaskIcon
            isTabs={true}
            color={`${selectedTab === "Ongoing" ? "black" : "#0076C8"}`}
          />
        </Box>
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
        <Box
          sx={{
            transform: "translateX(12px) translateY(3px)",
          }}
        >
          <assets.CheckOutlinedIcon
            sx={{ color: `${selectedTab === "Closed" ? "black" : "#0076C8"}` }}
          />
        </Box>
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
        <Box sx={{ transform: "translateX(13px) translateY(3px) " }}>
          <assets.CloseIcon
            sx={{
              color: `${selectedTab === "Canceled" ? "black" : "#0076C8"}`,
            }}
          />
        </Box>
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

  const TabsDataLocal = showHiddenTasks ? ongoingClosedTasks : rootTaskFilter;
  const findTabIndex = TabsDataLocal.findIndex((tab) => tab.label === subtask);

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allTasksAllEvents.allTasks.length === 0 &&
        dispatch(taskActions.getAllTasksAllEvents());
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
      userAllContacts.length === 0 && dispatch(userApiAction.getUserContacts());
      Topics.allTopics.length === 0 && dispatch(taskActions.getAllTopic());
      if (subtask && findTabIndex > -1) {
        setSelectedTabIndex(findTabIndex);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedTab) {
      history.push(`/tasks/${selectedTab}`);
      setSelectedTask(null);
    }
  }, [selectedTab, subtask]);

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
    if (selectedTask) {
      setCommentDiv((prev) => !prev);
      if (!commentDiv) setCommentTab("Details");
      setSelectedTabIndex(0);
    }
  };

  const filterTaskEvents = allEvents.filter(
    (event) => event.taskId === selectedTask?._id
  );
  const selectedTaskandEvents: ITask | any = {
    ...selectedTask,
    events: filterTaskEvents || [],
  };
  const handleCommentView = () => {
    setCommentTab("Comments");
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
          cursor: !selectedTask ? "not-allowed" : "pointer",
          padding: "6px 7px",
          transform: `${commentDiv ? "rotate(180deg)" : ""}`,
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
      sx={{
        width: "99%",
        margin: "auto",
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        sx={{
          maxWidth: {
            lg: "30%",
            md: "40%",
            sm: "40%",
          },
          width: "100%",
          ...gridStyle,
          py: 1.5,
          overflow: "hidden",
        }}
      >
        <MainTaskHeader
          setShowHiddenTasks={setShowHiddenTasks}
          showHiddenTasks={showHiddenTasks}
        />
        <BasicTabs
          setSelectedTab={setSelectedTab}
          selectedTabIndex={selectedTabIndex}
          tabsBgColor="#F4F4F4"
          tabsData={TabsDataLocal}
        />
      </Grid>

      {/* task detail view start */}
      <Grid
        item
        sx={{
          maxWidth: { lg: "70%", md: "60%", sm: "60%" },
          width: "100%",
          ...gridStyle,
          px: 2,
          py: 0.4,
          overflow: "auto",
        }}
      >
        {selectedTask && (
          <Box
            ref={detailHeaderRef}
            sx={{
              borderBottom: commentDiv ? "1px solid #E2E4E5" : "",
              pb: 0.5,
            }}
          >
            <DetailActions
              handleReply={handleCommentView}
              userId={userId}
              isLocationTaskDetail={false}
              selectedTask={selectedTask}
              DrawDetailCollapse={false}
            />
          </Box>
        )}
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ width: "100%", height: !selectedTask ? "100%" : "auto" }}
        >
          <Grid
            item
            sx={{
              maxWidth: `${commentDiv ? "49%" : "99.5%"}`,
              width: "100%",
              height: "100%",
              borderRight: "2px solid #F4F4F4",
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
                {selectedTask && selectedTaskandEvents ? (
                  <TabsViewTaskDetail
                    handleSelectedDetailTab={(tab) => setCommentTab(tab)}
                    openCommentTab={commentTab}
                    headerHeight={detailHeaderRefDimension.height}
                    selectedTask={selectedTaskandEvents}
                    RECENT_TASK_UPDATED_TIME_STAMP={
                      RECENT_TASK_UPDATED_TIME_STAMP
                    }
                    isSplitView={false}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Selected any task
                  </Box>
                )}
              </>
            )}
          </Grid>
          <Grid
            item
            sx={{
              maxWidth: `${commentDiv ? "51%" : ".5%"}`,
              width: "100%",
              display: { lg: "block", sm: "none" },
            }}
          >
            {arrowBtn()}
            {commentDiv ? (
              <>
                {selectedTask && selectedTaskandEvents && (
                  <TabsViewTaskDetail
                    handleSelectedDetailTab={(tab) => setCommentTab(tab)}
                    openCommentTab={commentTab}
                    headerHeight={detailHeaderRefDimension.height}
                    RECENT_TASK_UPDATED_TIME_STAMP={
                      RECENT_TASK_UPDATED_TIME_STAMP
                    }
                    selectedTask={selectedTaskandEvents}
                    isSplitView={true}
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
