import { Box, Chip, Grid } from "@mui/material";
import { LoadingButton } from "components/Button";
import { ReplyIcon } from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { capitalize } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";

import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

interface IProps {
  DrawDetailCollapse: boolean;
  taskDetailContDimension: DynamicDimensions | undefined;
  isLocationTaskDetail?: boolean;
  selectedTask: ITask;
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
  const [hide, setHide] = useState(true);
  const { selectedTask, isLocationTaskDetail } = props;
  const {
    _id: taskId,
    userSubState,
    doneCommentsRequired,
    doneImageRequired,
    title,
  } = selectedTask;

  const history = useHistory();
  const dispatch = useDispatch();
  console.log("userSubState", userSubState);
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

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const DataforCondition = [
    { status: "pending", subStatus: null },
    { status: "review", subStatus: null },
    { status: "ongoing", subStatus: "hidden" },
    { status: "ongoing", subStatus: "assignee" },
    { status: "ongoing", subStatus: "creator" },
    { status: "done", subStatus: null },
    { status: "cancelled", subStatus: null },
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
                    // onClick={() => handleClick("comment")}
                    sx={{ maxWidth: "35px", minWidth: "35px" }}
                  >
                    {icon}
                  </LoadingButton>
                </React.Fragment>
              );
            })}
          </Box>

          <Box sx={{ position: "relative" }}>
            {myCase === "assignee" ||
            myCase === "creator" ||
            myCase === "hidden" ? (
              <>
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
              </>
            ) : null}
          </Box>
        </Box>
      </>
    );
  };

  const replyBtn = [
    { title: "reply", icon: <ReplyIcon />, callback: handleDoneClick },
  ];
  const dontBtn = [
    { title: "reply", icon: <ReplyIcon />, callback: handleDoneClick },
  ];

  const pending = [
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

  const ShowBtns = DataforCondition?.map((item, index) => {
    const { status, subStatus } = item;

    switch (userSubState) {
      case "in-review":
        return GroupBtnFunc(pending, "pending");
      case "unread":
        return GroupBtnFunc(pending, "unread");
      case "to-review":
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
      {ShowBtns}
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
