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

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "redux/action/task.action";
import { RootState } from "redux/reducers";
import { TaskInterface } from "constants/interfaces/task.interface";

function TaskList() {

  const classes = useStyles();
  const dispatch = useDispatch();
  
  let allTask: TaskInterface[] = useSelector((state: RootState) => state.task.allTask);

  useEffect(() => {
    dispatch(getAllTask());
    // cleanup effect
    // return (): void => {}
  }, []);

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
          item
          rowGap={2.5}
          columnGap={4.38}
          xs={12}
          className={classes.cardListContainer}
        >
          {allTask &&
            allTask.map((task: TaskInterface, index: number) => {
              return <TaskCard ColorByStatus={getColorByStatus} task={task} taskKey={task._id}/>;
            })}
        </Grid>
      )}
    </>
  );
}

export default TaskList;

const useStyles = makeStyles((theme) => ({
  cardListContainer: {
    maxHeight: 'calc(100vh - 250px)',
    overflow: 'auto',
    height: '100%',
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(100vh - 350px)',
    },
    
    [theme.breakpoints.down(1024)]: {
      justifyContent: "center",
    },
  },
  chatIcon: {
    fontSize: 50,
    color: colors.lightBlack,
  },
}));
