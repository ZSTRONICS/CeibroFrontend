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
import { RootState } from "redux/reducers";
import { otpVerify } from "redux/action/auth.action";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {
  const classes = useStyles();
  const { user } = useSelector((store: RootState) => store.auth);
  const [doOnce, setDoOnce] = useState(true);
  const [components ,setComponents] = useState<any>([]);
  const handleScroll = (e: any) => {
    if (doOnce) {
      let subtaskBox = e.target;
      subtaskBox.scrollTop = 0;
      setDoOnce(false);
    }
  };
  return (
    <>
      {results.length > 0 ? (
        <CBox className={classes.cardListContainer}>
          {results &&
            results.map((subTaskDetail: SubtaskInterface, index:any) => {
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
    overflowX: "hidden",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      maxHeight: "calc(100vh-100px)",
      // [theme.breakpoint.down('lg')]:{

      // }
    },

    [theme.breakpoints.down("md")]: {
      maxHeight: "calc(100vh - 40vh)",
    },

    [theme.breakpoints.between(900, 1024)]: {
      maxHeight: "calc(100vh-50vh)",
    },

    [theme.breakpoints.down("xl")]: {
      maxHeight: "calc(100vh - 30vh)",
    },
    "@media (max-width:1440)": {
      maxHeight: "calc(100vh-30vh)",
      height: "100%",
    },
  },
}));
