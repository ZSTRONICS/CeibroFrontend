import { Box, Chip, Grid } from "@mui/material";
import { LoadingButton } from "components/Button";
import {
  AcceptIcon,
  RejectAndCloseIcon,
  ReplyIcon,
} from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { capitalize } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GenericMenu } from "components/GenericComponents";

interface IProps {
  DrawDetailCollapse: boolean;
  taskDetailContDimension: DynamicDimensions | undefined;
  isLocationTaskDetail?: boolean;
  selectedTask: ITask;
  userId: string;
}

enum statusColors {
  new = "#CFECFF",
  unread = "#CFECFF",
  ongoing = "#F1B740",
  done = "#55BCB3",
  canceled = "#E85555",
  "to-review" = "#CFECFF",
  "in-review" = "#E2E4E5",
}
type TaskAction = "comment" | "forward" | "done";

const DetailActions: React.FC<IProps> = (props) => {
  const { subtask, filterkey } = useParams<any>();
  const { selectedTask, isLocationTaskDetail, userId } = props;
  const {
    _id: taskId,
    userSubState,
    doneCommentsRequired,
    doneImageRequired,
    title,
    isCreator,
    isCanceled,
    isAssignedToMe,
    taskRootState,
  } = selectedTask;

  const history = useHistory();
  const dispatch = useDispatch();
  console.log("selectedTask", selectedTask);
  const [isloading, setIsLoading] = useState(false);

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const checkIsStateMatch = (states: string[]) => states.includes(userSubState);

  const isOngoingUnread = ["ongoing", "unread"];
  const inReviewToReview = ["in-review", "to-review"];
  const showPendingReviewBtn = checkIsStateMatch([...inReviewToReview]);
  const showDoneBtn = checkIsStateMatch([...isOngoingUnread, "new"]);
  const showCancelBtn = checkIsStateMatch([...isOngoingUnread, "canceled"]);
  const pendingReviewCancel = checkIsStateMatch([
    ...inReviewToReview,
    "canceled",
    "done",
  ]);
  const doneHideBtnVisible: boolean =
    (isAssignedToMe || isCreator) &&
    taskRootState !== "Canceled" &&
    taskRootState !== "Approval";
  const doneHideBtnLabel: string =
    taskRootState === "Hidden" ? "Un hide" : "Hide";

  const handleAcceptance = () => {};
  const handleRejectClose = () => {
    console.log("reject close");
  };
  const handleHideUnHide = (label: string) => {
    if (label === "Hide") {
      handleTaskAction(taskActions.taskHide, {
        eventType: TASK_CONFIG.TASK_HIDDEN,
      });
    } else {
      handleTaskAction(taskActions.taskShow, {
        eventType: TASK_CONFIG.TASK_SHOW,
      });
    }
  };
  const handleCancelUnCancel = (label: string) => {
    if (label === "Cancel") {
      handleTaskAction(taskActions.taskCaneled, {
        eventType: TASK_CONFIG.TASK_CANCELED,
      });
    } else {
      handleTaskAction(taskActions.taskUnCanel, {
        eventType: TASK_CONFIG.TASK_UN_CANCEL,
      });
    }
  };

  const handleReplyClick = () => {};
  const handleForwardClick = () => {};
  const handleDoneClick = () => {
    setIsLoading(true);
    if (doneImageRequired === true || doneCommentsRequired === true) {
      setIsLoading(false);
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

  const handleTaskAction = (
    actionType: (arg: {
      other: { taskId: string };
      success: (res: any) => void;
    }) => any,
    actionConfig: { eventType: any }
  ) => {
    if (selectedTask) {
      dispatch(
        actionType({
          other: { taskId: selectedTask._id },
          success: (res: any) => {
            if (res) {
              dispatch({
                type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                payload: {
                  ...res.data,
                  userId,
                  eventType: actionConfig.eventType,
                },
              });
            }
          },
        })
      );
    }
  };

  const CancelBtn = () => {
    const cancelText = isCanceled ? "Un cancel" : "Cancel";
    return (
      <LoadingButton
        sx={{
          width: "107px",
          color: "white",
          marginRight: "10px",
          backgroundColor: "#E85555",
          textTransform: "unset",
          "&:hover": {
            border: "none",
            backgroundColor: "#E85555",
          },
        }}
        onClick={() => handleCancelUnCancel(cancelText)}
        disabled={isloading}
      >
        {cancelText}
      </LoadingButton>
    );
  };
  const DoneHideBtn = (label: string) => {
    const isHide = label === "Hide" || label === "Un hide";
    return (
      <LoadingButton
        variant="contained"
        onClick={() => (isHide ? handleHideUnHide(label) : handleDoneClick())}
        sx={{
          ml: 0.7,
          backgroundColor: isHide ? "#F4F4F4" : "#0076C8",
          color: isHide ? "#818181" : "white",
          width: "89px",
          borderRadius: "4px",
          fontWeight: "500",
          "&:hover": {
            border: "none",
            backgroundColor: isHide ? "#F4F4F4" : "#0076C8",
          },
        }}
        disabled={isloading}
      >
        {label}
      </LoadingButton>
    );
  };

  const GroupBtnFunc = (buttons: any) => {
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
            {buttons.map((items: any, index: any) => {
              const { icon, callback } = items;

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
                    onClick={callback}
                    sx={{ maxWidth: "35px", minWidth: "35px" }}
                  >
                    {icon}
                  </LoadingButton>
                </React.Fragment>
              );
            })}
          </Box>

          <Box sx={{ position: "relative" }}>
            {isCreator && showCancelBtn && CancelBtn()}
            {doneHideBtnVisible && DoneHideBtn(doneHideBtnLabel)}
            {showDoneBtn && DoneHideBtn("Done")}
          </Box>
        </Box>
      </>
    );
  };

  const replyBtn = [
    { title: "reply", icon: <ReplyIcon />, callback: handleReplyClick },
  ];

  const forWardBtn = [
    {
      title: "forward",
      icon: <PersonAddAlt1OutlinedIcon />,
      callback: handleForwardClick,
    },
  ];

  const showReplyForwad = [
    ...replyBtn,
    ...(!pendingReviewCancel ? forWardBtn : []),
  ];

  const pendingReview = [
    ...replyBtn,
    { title: "pending", icon: <AcceptIcon />, callback: handleAcceptance },
    {
      title: "review",
      icon: (
        <GenericMenu
          icon={<RejectAndCloseIcon />}
          isProjectGroup={true}
          options={[
            {
              menuName: "Reject-reopen",
              callBackHandler: () => {},
            },
            {
              menuName: "Reject-Close",
              callBackHandler: () => {},
            },
          ]}
          key={1}
          paddingTop={0}
          disableMenu={false}
        />
      ),
      callback: handleRejectClose,
    },
  ];

  const showBtns = showPendingReviewBtn ? pendingReview : showReplyForwad;
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
      {GroupBtnFunc(showBtns)}
    </Box>
  );

  const userSUBState = (
    <Chip
      label={capitalize(
        userSubState === "in-review"
          ? "Pending"
          : userSubState.replace(/-/g, " ")
      )}
      size="small"
      sx={{
        borderColor: chipColor,
        backgroundColor: chipColor,
        color: userSubState === "canceled" ? "white" : "#131516",
        borderRadius: "4px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 600,
        padding: "2px 8px",
      }}
    />
  );

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid
          item
          container
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
        >
          <>{HeaderBtns}</>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailActions;
