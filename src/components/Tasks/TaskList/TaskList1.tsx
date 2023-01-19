import React, { useEffect } from "react";

// mui-imports
import { makeStyles } from "@material-ui/core";
import { AssignmentIndOutlined } from "@material-ui/icons";
import { Box, Grid } from "@mui/material";

// components
import colors from "assets/colors";
import NoData from "components/Chat/NoData";
import TaskCard from "components/TaskComponent/Tabs/TaskCard";
import { getColorByStatus } from "config/project.config";
import {  Result } from "constants/interfaces/Tasks.interface";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "redux/action/task.action";
import { RootState } from "redux/reducers";

function TaskList1() {

  const classes = useStyles();
  const dispatch = useDispatch();
  
  let allTask: Result[] = useSelector((state: RootState) => state.task.allTask);

  useEffect(() => {
    dispatch(getAllTask());
    // cleanup effect
    // return (): void => {}
  }, [allTask.length]);

  return (
    <>
      {!allTask ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NoData
            title="There is no task"
            icon={<AssignmentIndOutlined className={classes.chatIcon} />}
          />
        </Box>
      ) : (
        <Grid
          container
          rowGap={2.5}
          columnGap={4.38}
          xs={12}
          className={classes.cardListContainer}
        >
          {allTask &&
            allTask.map((task: Result, index: number) => {
              return <TaskCard ColorByStatus={getColorByStatus} task={task} key={task._id}/>;
            })}
        </Grid>
      )}
    </>
  );
}

export default TaskList1;

const useStyles = makeStyles((theme) => ({
  cardListContainer: {
    [theme.breakpoints.down(1024)]: {
      justifyContent: "center",
    },
  },
  chatIcon: {
    fontSize: 50,
    color: colors.lightBlack,
  },
}));
