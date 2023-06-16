import { useState } from "react";

// mui
import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CBox } from "components/material-ui";

// components
import {
  AssignedTag,
  CustomStack,
  LabelTag,
  TaskStatus,
} from "components/TaskComponent/Tabs/TaskCard";
import { AssignedTo, Member } from "constants/interfaces/subtask.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import { getColorByStatus } from "config/project.config";
import { Grid } from "@mui/material";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";

export default function TaskDetailHeader(props: any) {
  const classes = useStyles();
  const [showMore, setShowMore] = useState<boolean>(false);
  const { user } = useSelector((store: RootState) => store.auth);
  // let subTaskOfTask: AllSubtasksOfTaskResult = useSelector(
  //   (state: RootState) => state.task.allSubTaskOfTask
  // );
  let membersList, myState, subtaskCreatedAt;
  try {
    membersList = props?.subtaskDetail?.assignedTo
      .map((member: AssignedTo) => member.members)
      .flat(1);
    myState = props?.subtaskDetail.state.find(
      (localState: any) => String(localState.userId) === String(user._id)
    );
    subtaskCreatedAt = new Date(String(props?.subtaskDetail?.createdAt))
      .toLocaleString("de")
      .slice(0, 10)
      .replaceAll(",", "");
  } catch (e: any) {
    console.error(e);
  }

  return (
    <>
      <CBox display="flex" alignItems="center" justifyContent="space-between">
        <CustomStack gap={1.25}>
          <TaskStatus
            sx={{
              background: `${getColorByStatus(
                myState ? myState.userState : ""
              )}`,
              color: "white",
              fontWeight: "500",
              fontSize: "10px",
            }}
          >
            {myState?.userState}
          </TaskStatus>
          <LabelTag sx={{ fontSize: "12px" }}>Due date</LabelTag>
          <AssignedTag sx={{ fontSize: "12px" }}>
            {props?.subtaskDetail?.dueDate
              ?.replaceAll("-", ".")
              .replace(",", "")}
          </AssignedTag>
          <Divider orientation="vertical" style={{ height: 10, width: 2 }} />
          <CustomStack gap={0.8}>
            <LabelTag sx={{ fontSize: "12px" }}>Created on</LabelTag>
            <AssignedTag sx={{ fontSize: "12px" }}>
              {subtaskCreatedAt}
            </AssignedTag>
          </CustomStack>
        </CustomStack>
      </CBox>
      <CBox mt={1.5}>
        <LabelTag sx={{ fontSize: "12px", fontWeight: 600 }}>Title</LabelTag>
        <Typography className={classes.description}>
          {props?.subtaskDetail?.title}
        </Typography>
        <Divider />
      </CBox>
      <Grid container mt={1.5} gap={8}>
        <Grid item md={4}>
          <LabelTag sx={{ fontSize: "12px", fontWeight: 600 }}>Creator</LabelTag>
          <Typography
            className={classes.description}
          >{`${props.subtaskDetail.creator.firstName} ${props.subtaskDetail.creator.surName}`}</Typography>
          <Divider />
        </Grid>
        <Grid item md={4}>
          <LabelTag sx={{ fontSize: "12px", fontWeight: 600 }}>Project</LabelTag>
          <Typography className={classes.description}>
            {props.subtaskDetail.taskData && props.subtaskDetail.taskData.project.title}
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <CBox mt={1.5}>
        <LabelTag sx={{ fontSize: "12px", fontWeight: 600 }}>Assign to</LabelTag>
        <CBox className={classes.description}>
          {membersList && membersList.length > 0 ? membersList.map((member: Member, i: any) => {
            if (member === undefined) {
              return <></>;
            }
            if (i === membersList.length - 1) {
              return (
                <AssignedTag
                  key={member._id}
                >{`${member.firstName} ${member.surName}`}</AssignedTag>
              );
            } else {
              return (
                <AssignedTag key={member._id}>
                  {`${member.firstName} ${member.surName}, `} &nbsp;
                </AssignedTag>
              );
            }
          }) : <Typography className={classes.description}> N/A </Typography>}
        </CBox>
        <Divider />
      </CBox>
      <CBox mt={1.5}>
        <LabelTag sx={{ fontSize: "12px", fontWeight: 600 }}>Description</LabelTag>
        <>{
          props.subtaskDetail.description.length === 0 ? <Typography className={classes.description}> N/A </Typography> :
            <Typography className={classes.description}>
              {showMore
                ? props.subtaskDetail.description
                : `${props.subtaskDetail.description.substring(0, 550)}`}

            </Typography>
        }

        </>
        {props.subtaskDetail.description.length >= 549 ? (
          <Typography
            className={classes.showHideBtn}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "show less" : "show more"}
          </Typography>
        ) : (
          ""
        )}
        <Divider />
      </CBox>
    </>
  );
}

const useStyles = makeStyles({
  // wrapper: {
  //   // padding: "25px 20px",
  //   backgroundColor: "#F5F7F8",
  // },
  heading: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#7D7E80",
  },
  description: {
    display: "flex",
    fontSize: "14px",
    fontWeight: 500,
    color: "#000000",
    marginBottom: 5,
  },

  status: {
    fontSize: 10,
    color: "#fff !important",
    backgroundColor: "#F1B740",
    borderRadius: "3px !important",
    width: "100%",
    maxWidth: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 19,
    marginRight: "5px !important",
  },
  showHideBtn: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Intel",
    color: "#5ba6da",
    "&:hover": {
      cursor: "pointer",
    },
  },
});
