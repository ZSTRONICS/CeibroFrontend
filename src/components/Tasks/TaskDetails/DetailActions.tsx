// @ts-nocheck
import { Chip, Grid } from "@mui/material";
import assets from "assets/assets";
import { LoadingButton } from "components/Button";
import { SubLabelTag } from "components/CustomTags";
import CustomModal from "components/Modal";
import { AssignedUserState, InvitedNumber } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import capitalize from "lodash/capitalize";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import Comment from "../Comment";
import ForwardTask from "../Forward-Task";

interface IProps {
  taskId: string;
  userSubState: string;
  dueDate: string;
  taskUid: string;
  createdOn: Date | any;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  assignedToState: AssignedUserState[];
  invitedNumbers: InvitedNumber[];
}

enum statusColors {
  new = "#CFECFF",
  unread = "#CFECFF",
  ongoing = "#F1B740",
  done = "#55BCB3",
  canceled = "#FFE7E7",
}
const DetailActions: React.FC<IProps> = (props) => {
  const {
    userSubState,
    taskUid,
    dueDate,
    createdOn,
    taskId,
    doneImageRequired,
    doneCommentsRequired,
    assignedToState,
    invitedNumbers,
  } = props;

  const dispatch = useDispatch();
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const [taskAction, setTaskAction] = useState("");

  const handleClick = (action: string) => {
    setTaskAction(action);
    openModal();
  };

  const handleDoneClick = () => {
    if (doneImageRequired === true || doneCommentsRequired === true) {
      handleClick("done");
    } else {
      dispatch(
        taskActions.taskEventsWithFiles({
          other: {
            eventName: "doneTask",
            taskId: taskId,
            hasFiles: false,
          },
        })
      );
    }
  };

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const getModalContent = () => {
    if (taskAction === "forward")
      return (
        <ForwardTask
          invitedNumbers={invitedNumbers}
          assignedToState={assignedToState}
          taskId={taskId}
          closeModal={closeModal}
        />
      );
    return (
      <Comment
        title={getTitle()}
        showHeader={true}
        taskId={taskId}
        closeModal={closeModal}
      />
    );
  };

  const titles = {
    comment: "Task Comment",
    forward: "Task Forward",
    done: "Task Done",
  };
  const justifyContent = {
    xs: "flex-start",
    md: "flex-end",
  };
  const getTitle = () => titles[taskAction] || "";
  return (
    <>
      <Grid
        container
        mt={1.25}
        justifyContent="space-between"
        alignItems="flex-start"
        rowGap={2}
      >
        <Grid item container md={6} xs={12} gap={1.4}>
          <Chip
            label={capitalize(userSubState)}
            size="small"
            sx={{
              borderColor: chipColor,
              backgroundColor: chipColor,
              borderRadius: "20px",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              padding: "2px 8px",
            }}
          />
          <Chip
            label={taskUid}
            size="small"
            sx={{
              borderColor: "#818181",
              backgroundColor: "white",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "10px",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              padding: "2px 8px",
            }}
          />
          <SubLabelTag sx={{ color: "#818181" }}>{createdOn}</SubLabelTag>
          <SubLabelTag sx={{ color: "#818181" }}>
            Due date: {dueDate === "" ? "N/A" : dueDate}
          </SubLabelTag>
        </Grid>
        <Grid
          item
          container
          md={6}
          xs={12}
          gap={1.4}
          justifyContent={justifyContent}
          flexWrap="nowrap"
        >
          <LoadingButton
            startIcon={<img src={assets.CommentIcon} alt="Comment" />}
            onClick={() => handleClick("comment")}
            variant="text"
            sx={{
              height: "28px",
              // width: "103px",
              fontWeight: "700",
              padding: "8px 16px",
            }}
          >
            Comment
          </LoadingButton>
          <LoadingButton
            startIcon={<img src={assets.ForwardIcon} alt="Forward" />}
            onClick={() => handleClick("forward")}
            variant="text"
            disabled={
              userSubState === "done" ||
              userSubState === "canceled" ||
              userSubState === "new"
            }
            sx={{
              height: "28px",
              // width: "103px",
              fontWeight: "700",
              padding: "8px 22px",
            }}
          >
            Forward
          </LoadingButton>
          <LoadingButton
            variant="contained"
            onClick={handleDoneClick}
            sx={{
              height: "28px",
              // width: "103px",
              fontWeight: "700",
              padding: "16px 30px",
            }}
            disabled={
              userSubState === "done" ||
              userSubState === "canceled" ||
              userSubState === "new"
            }
          >
            Done
          </LoadingButton>
        </Grid>
      </Grid>
      {isOpen === true && (
        <CustomModal
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={true}
          title={getTitle()}
          isOpen={isOpen}
          handleClose={closeModal}
          children={getModalContent()}
        />
      )}
    </>
  );
};

export default DetailActions;
