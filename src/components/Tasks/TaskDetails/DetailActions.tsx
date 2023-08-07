// @ts-nocheck
import { Box, Chip, Grid, Typography } from "@mui/material";
import { LoadingButton } from "components/Button";
import CustomModal from "components/Modal";
import { AssignedUserState, InvitedNumber } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import capitalize from "lodash/capitalize";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import assets from "../../../assets/assets";
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
  console.log("userSubState", userSubState);
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

  const getTitle = () => titles[taskAction] || "";
  return (
    <>
      <Grid container alignItems="center" sx={{ margin: "16px 0px" }}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: "30px" }}>
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
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 500,
                color: "#818181",
                display: "flex",
                alignItems: "center",
              }}
            >
              {createdOn}
              {/* {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })} */}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 500,
                color: "#818181",
                display: "flex",
                alignItems: "center",
              }}
            >
              Due date: {dueDate === "" ? "N/A" : dueDate}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          container
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <LoadingButton
            startIcon={<img src={assets.CommentIcon} />}
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
            startIcon={<img src={assets.ForwardIcon} />}
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
