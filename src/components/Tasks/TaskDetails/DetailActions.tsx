import { Box, Chip, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DragableDrawer from "Drawer/DragableDrawer";
import { LoadingButton } from "components/Button";
import { ReplyIcon } from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { AssignedUserState, InvitedNumber } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { capitalize } from "lodash";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import Comment from "../Comment";
import ForwardTask from "../Forward-Task";

import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

interface IProps {
  taskId: string;
  userSubState: string;
  dueDate: string | null;
  taskUid: string;
  title: string;
  createdOn: Date | any;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  assignedToState: AssignedUserState[];
  invitedNumbers: InvitedNumber[];
  isExpanded: boolean;
  DrawDetailCollapse: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  taskDetailContDimension: DynamicDimensions | undefined;
  isLocationTaskDetail?: boolean;
}

enum statusColors {
  new = "#CFECFF",
  unread = "#CFECFF",
  ongoing = "#F1B740",
  done = "#55BCB3",
  canceled = "#FFE7E7",
}
type TaskAction = "comment" | "forward" | "done";

const DetailActions: React.FC<IProps> = (props) => {
  const { subtask, filterkey } = useParams<any>();
  const [hide, setHide] = useState(true);
  const [isPending, startTransition] = useTransition();
  const {
    userSubState,
    taskUid,
    taskId,
    title,
    doneImageRequired,
    doneCommentsRequired,
    assignedToState,
    invitedNumbers,
    isExpanded,
    DrawDetailCollapse,
    setIsExpanded,
    taskDetailContDimension,
    isLocationTaskDetail,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const [taskAction, setTaskAction] = useState<TaskAction>("comment");
  const [isloading, setIsLoading] = useState(false);
  const taskDragContHeight = useSelector(
    (store: RootState) => store.task.taskDragContHeight
  );
  const handleClick = (action: TaskAction) => {
    setTaskAction(action);
    dispatch({
      type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
      payload:
        taskDragContHeight === 0
          ? window.innerHeight < 768
            ? 140
            : 200
          : taskDragContHeight,
    });
    openModal();
  };

  const handleDoneClick = () => {
    setIsLoading(true);
    if (doneImageRequired === true || doneCommentsRequired === true) {
      setIsLoading(false);
      handleClick("done");
    } else {
      dispatch(
        taskActions.taskEventsWithFiles({
          other: {
            eventName: "doneTask",
            taskId: taskId,
            hasFiles: false,
          },
          success: (res: any) => {
            !isLocationTaskDetail &&
              history.push(`/tasks/${subtask}/${filterkey}`);
            setIsLoading(false);
            if (res) {
              dispatch({
                type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                payload: res.data.data,
              });
            }
          },
          onFailAction: () => {
            setIsLoading(false);
          },
        })
      );
    }
  };

  const theme = useTheme();
  const isTabletdown = useMediaQuery(theme.breakpoints.down(1400));
  const isMinitabdown = useMediaQuery(theme.breakpoints.down(1200));
  const isMiniScreen = useMediaQuery(theme.breakpoints.down(1100));
  const isXlscreendown = useMediaQuery(theme.breakpoints.down("xl"));

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const getModalContent = () => {
    if (taskAction === "forward")
      return (
        <ForwardTask
          taskDetailContDimension={taskDetailContDimension}
          invitedNumbers={invitedNumbers}
          assignedToState={assignedToState}
          taskId={taskId}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      );
    return (
      <Comment
        doneCommentsRequired={doneCommentsRequired}
        doneImageRequired={doneImageRequired}
        title={getTitle()}
        showHeader={true}
        taskId={taskId}
        closeModal={closeModal}
      />
    );
  };

  const titles = {
    comment: "New comment",
    forward: "Forward",
    done: "Task Done",
  };

  const justifyContent = {
    xs: "flex-start",
    md: "flex-end",
  };

  const handleFullView = () => {
    let showFullViewData;
    const data = localStorage.getItem("showFullView");
    if (data) {
      showFullViewData = JSON.parse(data);
    }
    localStorage.setItem(
      "showFullView",
      JSON.stringify({ ...showFullViewData, [taskUid]: !isExpanded })
    );
    startTransition(() => {
      setIsExpanded(!isExpanded);
    });
  };

  const getTitle = () => titles[taskAction] || "";

  const calculateWidth = () => {
    switch (true) {
      case DrawDetailCollapse && !isTabletdown:
        return "52%";
      case !DrawDetailCollapse && !isTabletdown:
        return "85%";
      case DrawDetailCollapse && isTabletdown:
      case !DrawDetailCollapse && isTabletdown:
        return "100%";
      default:
        return "initial";
    }
  };

  const DataforCondition = [
    { status: "pending", subStatus: null },
    // { status: "review", subStatus: null },
    // { status: "ongoing", subStatus: "hidden" },
    // { status: "ongoing", subStatus: "assignee" },
    // { status: "ongoing", subStatus: "creator" },
    // { status: "done", subStatus: null },
    // { status: "cancelled", subStatus: null },
  ];

  const OngoingStatus = (status: any, myCase: any) => {
    switch (status) {
      case "assignee":
        return GroupBtnFunc(ongoing, "assignee");
      case "creator":
        return GroupBtnFunc(ongoing, "creator");
      case "hidden":
        return GroupBtnFunc(ongoing, "hidden");
    }
  };

  const GroupBtnFunc = (Obj: any, myCase: any) => {
    console.log(myCase);
    return (
      <>
        <Box
          sx={{
            maxWidth: "100%",
            width: "max-content",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              marginRight: "10px",
              padding: "2px 2px",
              borderRadius: "4px",
              maxHeight: "38px",
              minHeight: "38px",
            }}
          >
            {!["done", "canceled", "new"].includes(userSubState) && (
              <>
                {Obj.map((items: any, index: any) => {
                  const { icon } = items;
                  return (
                    <React.Fragment key={index}>
                      {index !== 0 && (
                        <Box
                          sx={{
                            height: "20px",
                            width: "1.5px",
                            backgroundColor: "rgb(226,228,229)",
                          }}
                        ></Box>
                      )}
                      <LoadingButton
                        onClick={() => handleClick("comment")}
                        sx={{ maxWidth: "35px", minWidth: "35px" }}
                      >
                        {icon}
                      </LoadingButton>
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </Box>

          <Box sx={{ position: "relative" }}>
            {myCase === "assignee" ||
            myCase === "creator" ||
            myCase === "hidden" ? (
              <>
                <LoadingButton
                  variant="contained"
                  onClick={handleDoneClick}
                  sx={{
                    width: "75px",
                    borderRadius: "4px",
                    fontWeight: "700",
                  }}
                  disabled={isloading}
                >
                  Done
                </LoadingButton>

                {myCase === "creator" || myCase === "hidden" ? (
                  <LoadingButton
                    sx={{
                      width: "75px",
                      color: hide ? "white" : null,
                      marginRight: "10px",
                      backgroundColor: hide ? "#E85555" : "#F4F4F4",
                      "&:hover": {
                        border: "none",
                        backgroundColor: hide ? "#E85555" : "#F4F4F4",
                      },
                    }}
                    disabled={isloading}
                  >
                    {myCase === "hidden" ? "Hide" : "cancel"}
                  </LoadingButton>
                ) : (
                  ""
                )}
              </>
            ) : null}
          </Box>
        </Box>
      </>
    );
  };

  //////////////

  const pending = [
    { title: "arrowleft", icon: <ReplyIcon /> },
    { title: "check", icon: <AssignmentTurnedInOutlinedIcon /> },
    { title: "cancel", icon: <CancelPresentationOutlinedIcon /> },
  ];

  const review = [
    { title: "arrowleft", icon: <ReplyIcon /> },
    { title: "check", icon: <AssignmentTurnedInOutlinedIcon /> },
    { title: "cancel", icon: <CancelPresentationOutlinedIcon /> },
  ];

  const done = [
    { title: "arrowleft", icon: <ReplyIcon /> },
    { title: "personadd", icon: <PersonAddAlt1OutlinedIcon /> },
    { title: "revert", icon: <HistoryOutlinedIcon /> },
  ];

  const cancelled = [{ title: "arrowleft", icon: <ReplyIcon /> }];

  const ongoing = [
    { title: "arrowleft", icon: <ReplyIcon /> },
    { title: "personadd", icon: <PersonAddAlt1OutlinedIcon /> },
  ];

  //////////////

  const ShowBtns = DataforCondition?.map((item, index) => {
    const { status, subStatus } = item;

    switch (status) {
      case "pending":
        return GroupBtnFunc(pending, "pending");

      case "review":
        return GroupBtnFunc(review, "review");

      case "ongoing":
        return OngoingStatus(subStatus, "ongoing");

      case "done":
        return GroupBtnFunc(done, "done");

      case "cancelled":
        return GroupBtnFunc(cancelled, "cancelled");

      default:
        return null;
    }
  });

  const HeaderBtns = (
    <Box
      sx={{
        maxWidth: "100%",
        width: "max-content",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      {!["done", "canceled", "new"].includes(userSubState) && <>{ShowBtns}</>}
    </Box>
  );
  const userSUBState = (
    <Chip
      label={capitalize(userSubState)}
      size="small"
      sx={{
        borderColor: chipColor,
        backgroundColor: chipColor,
        borderRadius: "4px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 600,
        color: "#131516",
        padding: "2px 8px",
      }}
    />
  );

  const TaskUID = (
    <Chip
      label={taskUid}
      size="small"
      sx={{
        borderColor: "#818181",
        backgroundColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 600,
        color: "#131516",
        padding: "2px 8px",
        marginLeft:
          !isXlscreendown && isLocationTaskDetail && DrawDetailCollapse
            ? "-3.5px"
            : !isXlscreendown && isLocationTaskDetail && !DrawDetailCollapse
            ? "-4.5px"
            : "",
      }}
    />
  );

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        // rowGap={1.25}
        xs={12}
      >
        <Grid
          item
          container
          // xs={ isMiniScreen ? 4 : (!isTabletdown ? 7 : 5)}
          xl={isLocationTaskDetail && isLocationTaskDetail ? 12 : 7}
          lg={isLocationTaskDetail && isLocationTaskDetail ? 12 : 6}
          md={12}
          sm={12}
          xs={12}
          sx={{ width: "100%" }}
        >
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <Box
                sx={{
                  width: "max-content",
                  paddingRight: "8px",
                }}
              >
                {userSUBState}
              </Box>
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "10px", fontWeight: "600" }}>
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            recusandae totam autem quaerat illo */}
            {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          item
          xl={isLocationTaskDetail && isLocationTaskDetail ? 12 : 5}
          lg={isLocationTaskDetail && isLocationTaskDetail ? 12 : 6}
          md={12}
          sm={12}
          xs={12}
          // xs={!isTabletdown ? 5 : 7}
        >
          <>{HeaderBtns}</>
        </Grid>
      </Grid>
      <DragableDrawer
        title={getTitle()}
        children={getModalContent()}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default DetailActions;
