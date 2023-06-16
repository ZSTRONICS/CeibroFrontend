import React, { Fragment, useState } from "react";
import SubTaskCard from "components/TaskComponent/SubTaskContainer/SubTaskCard";
import { AllSubtasksForUserRoot } from "constants/interfaces/AllSubTasks.interface";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { Box } from "@mui/material";
import NoData from "components/Chat/NoData";
import { CBox } from "components/material-ui";
import { makeStyles } from "@material-ui/core";
import TaskDetailDrawer from "./TaskDetailDrawer";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import { otpVerify } from "redux/action/auth.action";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {
  const classes = useStyles();
  const { user } = useSelector((store: RootState) => store.auth);

  const [components, setComponents] = useState<any>([]);
  


  let getTaskSubTaskFilterByState = useSelector(
    (state: RootState) => state.task.getTaskSubTaskFilterByState
  );

  let filterSubTask: SubtaskInterface | any = [];
  results.forEach((subtask: any) => {
    subtask.state.every((state: any) => {
      if (
        state.userId === user._id &&
        state.userState === getTaskSubTaskFilterByState
      ) {
        filterSubTask.push(subtask);
        return false;
      }
      return true;
    });
  });

  if (getTaskSubTaskFilterByState === "all") {
    filterSubTask = [...results];
  }

  return (
    <>
      {filterSubTask.length > 0 ? (
        <CBox className={classes.cardListContainer}>
          {filterSubTask &&
            filterSubTask.map((subTaskDetail: SubtaskInterface, index: any) => {
              if (subTaskDetail === undefined) {
                return <></>;
              }
              if (!subTaskDetail.access.includes(user._id)) {
                return <></>;
              }
              return (
                <Fragment key={subTaskDetail._id}>
                  <SubTaskCard subTaskDetail={subTaskDetail} />
                </Fragment>
              );
            })}
        </CBox>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NoData title="No subtask found" />
        </Box>
      )}
      <TaskDetailDrawer />
    </>
  );
};

export default SubTaskList;

const useStyles = makeStyles((theme) => ({
  cardListContainer: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh-200px)",
  },
}));
