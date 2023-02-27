import React from "react";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";
import DrawerHeader from "components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import colors from "../../../assets/colors";
import taskActions from "../../../redux/action/task.action";
import CreateTaskBody from "./CreateTaskBody";
import TaskDrawerMenu from "./TaskDrawerMenu";

const CreateTaskDrawer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const drawerOpen = useSelector(
    (state: RootState) => state.task.taskDrawerOpen
  );

  let subTaskOfTask: AllSubtasksOfTaskResult = useSelector(
    (state: RootState) => state.task.allSubTaskOfTask
  );
  const handleClose = () => {
    dispatch(taskActions.closeTaskDrawer());
    subTaskOfTask.subtasks = [];
  };

  return (
    <>
      <Drawer
        onClose={handleClose}
        open={drawerOpen}
        anchor="right"
        disableAutoFocus
        disablePortal
        disableEnforceFocus={true}
        keepMounted={false}
        className={classes.drawerMain}
      >
        <div className={classes.outerWrapper}>
          <DrawerHeader
            title={subTaskOfTask?.task?.title}
            handleClose={handleClose}
          />
          <Grid container sx={{ height: "100vh" }}>
            <Grid
              item
              // className={classes.taskDrawerMenu}
              md={3.5}
              sx={{
                background: "white",
                "@media screen and (max-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <TaskDrawerMenu
                taskMenue={subTaskOfTask.task}
                subtasks={subTaskOfTask.subtasks}
              />
            </Grid>
            <Grid item md={8.5} className={classes.bodyWrapper}>
              <CreateTaskBody
                subtasks={subTaskOfTask.subtasks}
                task={subTaskOfTask.task}
              />
            </Grid>
          </Grid>
          {/* <CreateTaskFooter/>  */}
        </div>
      </Drawer>
    </>
  );
};

export default CreateTaskDrawer;

const useStyles = makeStyles({
  // drawerContainer:{
  //     background:'#F5F7F8'
  // },
  drawerMain: {
    overflow: "auto",
  },
  bodyWrapper: {
    maxWidth: "878px",
    width: "100%",
    "@media(max-width:769)": {
      maxWidth: "767px",
      width: "100%",
    },
  },
  // taskDrawerMenu: {
  //   "@media(max-width:769)": {
  //     display: "none",
  //     visibility: "hidden",
  //     maxHeight: "0",
  //     height: "100%",
  //   },
  // },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  drawerStatusContainer: {
    padding: "11px 18px",
  },
  statusWrapper: {
    "@media(max-width:1340px)": {
      overflowX: "scroll",
    },
  },
  outerWrapper: {
    width: "calc(100vw - 200px)",
    backgroundColor: colors.lightGrey,
    // height: "100vh",
    overflow: "hidden",
    "@media (max-width:960px)": {
      width: "100vw",
    },
  },
});
