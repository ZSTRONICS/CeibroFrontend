import React, { Fragment } from "react";
import SubTaskCard from 'components/TaskComponent/SubTaskContainer/SubTaskCard'
import { AllSubtasksForUserRoot } from 'constants/interfaces/AllSubTasks.interface'
import { SubtaskInterface } from 'constants/interfaces/subtask.interface'
import { Box } from "@mui/material";
import NoData from "components/Chat/NoData";
import { CBox } from "components/material-ui";
import { makeStyles } from "@material-ui/core";
import TaskDetailDrawer from "./TaskDetailDrawer";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {
  const classes = useStyles();
  return (
    <>
      {results.length > 0 ? (
        <CBox className={classes.cardListContainer}>
          {results &&
            results.map((subTaskDetail: SubtaskInterface) => {
              return (
                <Fragment key={subTaskDetail._id}>
                  <SubTaskCard subTaskDetail={subTaskDetail} />
                </Fragment>
              );
            })}
        </CBox>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NoData
            title="There is no sub task"
          />
        </Box>
      )}
      <TaskDetailDrawer />
    </>
  );
};

export default SubTaskList;



const useStyles = makeStyles((theme) => ({
  cardListContainer: {
    width: '100%',
    overflow: 'auto',
    height: '100%',
    // [theme.breakpoints.down('lg')]: {
    //   maxHeight: 'calc(100vh - 350px)',
    // },

    // [theme.breakpoints.down('md')]: {
    //   maxHeight: 'calc(100vh - 50vh)'
    // },

    [theme.breakpoints.between(900, 1024)]: {
      maxHeight: 'calc(100vh - 40vh)'
    },

    [theme.breakpoints.down('xl')]: {
      maxHeight: 'calc(100vh - 23vh)'
    },
  }
}));