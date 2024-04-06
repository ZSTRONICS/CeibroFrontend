import { Box, Chip, Grid, Typography } from "@mui/material";
import { LoadingButton } from "components/Button";
import {
  AcceptIcon,
  RejectAndCloseIcon,
  ReplyIcon,
} from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { capitalize } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { GenericMenu } from "components/GenericComponents";
import { useOpenCloseModal } from "hooks";
import { statusColors } from "utills/common";
import DoneComment from "../Comment/DoneComment";
import ForwardTask from "../Forward-Task";
import ApprovalOverlays from "./ApprovalOverlays";
import TaskHeaderModals from "./TaskHeaderModals";

interface IProps {
  DrawDetailCollapse: boolean;
  isLocationTaskDetail?: boolean;
  selectedTask: ITask;
  userId: string;
  handleReply: () => void;
}

const DetailActions: React.FC<IProps> = (props) => {
  const { subtask, filterkey } = useParams<any>();
  const { selectedTask, isLocationTaskDetail, userId, handleReply } = props;
  const {
    _id: taskId,
    userSubState,
    doneCommentsRequired,
    doneImageRequired,
    title,
    isCreator,
    isTaskConfirmer,
    confirmer,
    viewer,
    isCanceled,
    isAssignedToMe,
    taskRootState,
    isTaskViewer,
    invitedNumbers,
  } = selectedTask;

  const history = useHistory();
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const modalsActions = {
    local: useOpenCloseModal(),
    approval: useOpenCloseModal(),
    rejectReOpen: useOpenCloseModal(),
    rejectClose: useOpenCloseModal(),
    done: useOpenCloseModal(),
  };
  const {
    isOpen: isOpenLocal,
    openModal: openModalLocal,
    closeModal: closeModalLocal,
  } = modalsActions.local;
  const {
    isOpen: isApprovalModalOpen,
    openModal: openApprovalModal,
    closeModal: closeApprovalModal,
  } = modalsActions.approval;
  const {
    isOpen: isRejectReOpenModalOpen,
    openModal: openRejectReOpenModal,
    closeModal: closeRejectReOpenModal,
  } = modalsActions.rejectReOpen;
  const {
    isOpen: isRejectCloseModalOpen,
    openModal: openRejectCloseModal,
    closeModal: closeRejectCloseModal,
  } = modalsActions.rejectClose;

  const {
    isOpen: isDoneModalOpen,
    openModal: openDoneModal,
    closeModal: closeDoneModal,
  } = modalsActions.done;

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const checkIsStateMatch = (states: string[]) => states.includes(userSubState);

  const isOngoingUnread = ["ongoing", "unread"];
  const inReviewToReview = ["in-review", "to-review"];
  const showPendingReviewBtn = checkIsStateMatch([...inReviewToReview]);
  const showDoneBtn =
    checkIsStateMatch([...isOngoingUnread, "new"]) && !isTaskViewer;
  const showCancelBtn = checkIsStateMatch([...isOngoingUnread, "canceled"]);
  const pendingReviewCancel = checkIsStateMatch([
    ...inReviewToReview,
    "canceled",
    "done",
  ]);
  const doneHideBtnVisible: boolean =
    (isAssignedToMe || isCreator || isTaskConfirmer || isTaskViewer) &&
    taskRootState !== "Canceled" &&
    taskRootState !== "Approval";
  const doneHideBtnLabel: string =
    taskRootState === "Hidden" ? "Un hide" : "Hide";

  const handleRejectClose = () => {
    // console.log("reject close");
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

  const handleReplyClick = () => {
    handleReply();
  };
  const handleDoneClick = () => {
    setIsLoading(true);
    if (doneImageRequired === true || doneCommentsRequired === true) {
      openDoneModal();
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
          // marginRight: "10px",
          backgroundColor: "#E85555",
          textTransform: "unset",
          height: "36px",
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
          height: "36px",
          ml: 0.7,
          backgroundColor: isHide ? "#F4F4F4" : "#0076C8",
          color: isHide ? "#818181" : "white",
          width: "90px",
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
              marginRight: "5px",
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
                    sx={{
                      maxWidth: "35px",
                      minWidth: "35px",
                      height: "36px",
                      // border: "solid 1px red",
                    }}
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
      callback: openModalLocal,
    },
  ];

  const showReplyForwad = [
    ...replyBtn,
    ...(!pendingReviewCancel && !isTaskViewer ? forWardBtn : []),
  ];

  const pendingReview = [
    ...replyBtn,
    { title: "pending", icon: <AcceptIcon />, callback: openApprovalModal },
    {
      title: "review",
      icon: (
        <GenericMenu
          icon={<RejectAndCloseIcon />}
          options={[
            {
              menuName: "Reject-reopen",
              callBackHandler: openRejectReOpenModal,
            },
            {
              menuName: "Reject-Close",
              callBackHandler: openRejectCloseModal,
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

  const isCreatorOrConfirmer = isCreator || isTaskConfirmer;
  const showBtns = showPendingReviewBtn
    ? isCreatorOrConfirmer
      ? pendingReview
      : replyBtn
    : showReplyForwad;

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
        color: userSubState === "reject-closed" ? "white" : "#131516",
        borderRadius: "4px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 500,
        padding: "2px 8px",
      }}
    />
  );
  const modals = [
    {
      title: "Add user",
      isOpen: isOpenLocal,
      handleClose: closeModalLocal,
      content: (
        <ForwardTask
          invitedNumbers={invitedNumbers}
          assignedToState={[
            ...(confirmer ? [confirmer] : []),
            ...(viewer.length > 0 ? viewer : []),
          ]}
          taskId={taskId}
          closeModal={closeModalLocal}
          isOpen={false}
        />
      ),
    },
    {
      title: title,
      isOpen: isApprovalModalOpen,
      handleClose: closeApprovalModal,
      content: (
        <ApprovalOverlays
          taskId={taskId}
          title="Approve"
          handleClose={closeApprovalModal}
        />
      ),
    },
    {
      title: "Task Done",
      isOpen: isDoneModalOpen,
      handleClose: closeDoneModal,
      content: (
        <DoneComment
          title="Task Done"
          doneCommentsRequired={doneCommentsRequired}
          doneImageRequired={doneImageRequired}
          showHeader={true}
          taskId={taskId}
          closeModal={closeDoneModal}
        />
      ),
    },
    {
      title: title,
      isOpen: isRejectReOpenModalOpen,
      handleClose: closeRejectReOpenModal,
      content: (
        <ApprovalOverlays
          taskId={taskId}
          title="Reject-Reopen"
          handleClose={closeRejectReOpenModal}
        />
      ),
    },
    {
      title: title,
      isOpen: isRejectCloseModalOpen,
      handleClose: closeRejectCloseModal,
      content: (
        <ApprovalOverlays
          taskId={taskId}
          title="Reject-Close"
          handleClose={closeRejectCloseModal}
        />
      ),
    },
  ];

  return (
    <>
      <Grid pb={0.6} container justifyContent="space-between">
        <Grid
          item
          container
          xl={isLocationTaskDetail && isLocationTaskDetail ? 12 : 7}
          lg={isLocationTaskDetail && isLocationTaskDetail ? 12 : 6}
          md={isLocationTaskDetail ? 12 : 3}
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

          <Grid xs={12} item sx={{ marginTop: "10px" }}>
            <Typography
              sx={{
                fontWeight: "600",
                // fontSize: "0.875rem",
                fontSize: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
            </Typography>
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
          md={isLocationTaskDetail ? 12 : 9}
          sm={12}
          xs={12}
        >
          <>{HeaderBtns}</>
        </Grid>
      </Grid>

      <TaskHeaderModals modals={modals} />
    </>
  );
};

export default DetailActions;
