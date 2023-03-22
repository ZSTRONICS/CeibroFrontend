import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Grid, Typography } from "@mui/material";
import StatusMenu from "../Utills/Others/StatusMenu";
import taskActions, { getAllTask } from "../../redux/action/task.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TaskList from "components/Tasks/TaskList/TaskList";
import { getAllProjectsWithMembers } from "redux/action/project.action";

const myStatus = [
  {
    title: "Ongoing",
    count: 8,
  },
  {
    title: "Approved",
    count: 1,
  },
  {
    title: "Done",
    count: 5,
  },
  {
    title: "Draft",
    count: 2,
  },
];

interface TaskSectionInt {}

const TaskSection: React.FC<TaskSectionInt> = () => {
  const allStatus = myStatus;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

  const handleClick = () => {
    history.push("/tasks");
  };

  return (
    <div>
      <Grid className={classes.outerWrapper} container alignItems="center">
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          className={classes.titleContainer}
          style={styles.titleContainer}
        >
          <Typography className={classes.myTask} component="h1" variant="h5">
            My Tasks
          </Typography>
          <Button
            onClick={openTaskModal}
            variant="contained"
            color="primary"
            size="small"
            style={styles.btn}
          >
            Create New
          </Button>
        </Grid>
        <Grid
          style={styles.menuWrapper}
          className={classes.menuWrapper}
          item
          xs={12}
          md={6}
          lg={8}
        >
          <StatusMenu options={allStatus} />
        </Grid>

        <Grid item xs={12} md={2} lg={1}>
          <Button
            onClick={handleClick}
            className={classes.viewAll}
            variant="outlined"
            color="primary"
            size="medium"
            style={styles.viewAll}
          >
            View All
          </Button>
        </Grid>
      </Grid>
      <Box
        className={classes.tasklistWrapper}
        sx={{
          overflowY: "auto",
          // height: "calc(100%)",
          height: "250px",
        }}
      >
        <TaskList />
      </Box>
    </div>
  );
};

export default TaskSection;

const useStyles = makeStyles({
  outerWrapper: {
    padding: "20px 0 12px 10px",
  },
  tasklistWrapper: {
    // // display:"grid",
    // overflowY: "auto",
    // maxHeight: "150px",
    // height: "100vh",
  },
  menuWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    ["@media (max-width:960px)"]: {
      justifyContent: "flex-start",
    },
  },
  titleContainer: {
    ["@media (max-width:960px)"]: {
      paddingTop: 14,
      paddingBottom: 14,
    },
  },
  myTask: {
    fontSize: 24,
    fontWeight: 500,
  },
  viewAll: {
    ["@media (max-width:960px)"]: {
      marginLeft: 10,
      marginTop: 10,
    },
  },
});

const styles = {
  menuWrapper: {
    display: "flex",
  },
  titleContainer: {
    display: "flex",
  },
  btn: {
    marginLeft: 10,
    // fontWeight: 500,
    // fontSize: 12,
  },
  viewAll: {
    fontSize: 10,
    padding: 7,
  },
};
