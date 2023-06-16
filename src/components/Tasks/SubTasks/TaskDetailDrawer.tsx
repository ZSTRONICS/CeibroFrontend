import React from "react";
import { Backdrop, Drawer } from "@material-ui/core";
import colors from "../../../assets/colors";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import taskActions from "redux/action/task.action";
import DrawerHeader from "components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader";
import { Grid } from "@mui/material";
import TaskDetail from "./TaskDetail";
import { TASK_CONFIG } from "config/task.config";
import { RootState } from "redux/reducers/appReducer";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import RecentCommentInput from "./RecentCommentInput";

function TaskDetailDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let subTaskOfTask: AllSubtasksOfTaskResult = useSelector(
    (state: RootState) => state.task.allSubTaskOfTask
  );
  let taskAdmin: any = useSelector(
    (state: RootState) => state.task.selectedTaskAdmins
  );
  const subTaskDetailDrawer = useSelector(
    (store: RootState) => store.task.subTaskDetailDrawer
  );

  const { selectedSubtaskFroDetailView } = useSelector(
    (store: RootState) => store.task
  );

  const handleClose = () => {
    dispatch({
      type: TASK_CONFIG.SET_SUBTASK,
      payload: null,
    });
    dispatch({
      type: TASK_CONFIG.CLEAR_SUBTASK_COMMENTS_IN_STORE,
      payload: [],
    });

    dispatch({
      type: TASK_CONFIG.GET_TASK_SUBTASK_FILTER_BY_STATE,
      payload: 'all',
    });

    dispatch(taskActions.closeSubtaskDetailDrawer());
  };

  const handleMouseDown = (e: any) => {
    if (!e.target.closest(".MuiDrawer-root")) {
      e.stopPropagation();
    }
  };

  return (
    <div>
      <Backdrop open={subTaskDetailDrawer} onClick={handleClose} />
      <Drawer
        onClose={handleClose}
        onMouseDown={handleMouseDown}
        open={subTaskDetailDrawer}
        anchor="right"
        className={classes.subTaskDrawer}
        disableAutoFocus
        disablePortal
        disableEnforceFocus={true}
        keepMounted={false}
      >
        <div className={classes.outerWrapper}>
          <DrawerHeader
            title={subTaskOfTask?.task?.title}
            handleClose={handleClose}
          />
    
          <Grid container sx={{height:"100%" , overflow:'auto',backgroundColor: '#F5F7F8',}}>
            {selectedSubtaskFroDetailView && selectedSubtaskFroDetailView ? (
              <Grid item md={12} sx={{ background: "white" }}>
                <TaskDetail
                  subtaskDetail={selectedSubtaskFroDetailView}
                  taskAdmin={taskAdmin}
                />
              </Grid>
            ) : (
              <>OOPS! there is no detail available</>
            )}
          </Grid>
        </div>
          <div className={classes.inputCommentWraper}>
            {selectedSubtaskFroDetailView && selectedSubtaskFroDetailView ? (
              <RecentCommentInput
                subtaskDetail={selectedSubtaskFroDetailView}
              />
            ) : (
              <></>
            )}
          </div>
      </Drawer>
    </div>
  );
}

export default TaskDetailDrawer;

const useStyles = makeStyles({
  // drawerContainer:{
  //     background:'#F5F7F8'
  // },
  subTaskDrawer: {
    "& .MuiDrawer-paper": {
      width: "65%",
    backgroundColor: colors.lightGrey,

      "@media(max-width:700px)": {
        width: "100%",
      }
    },
  },
  bodyWrapper: {
    maxWidth: "878px",
    width: "100%",
    "@media(max-width:769)": {
      maxWidth: "767px",
      width: "100%",
    },
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },

  inputCommentWraper:{
    backgroundColor: colors.lightGrey,
    padding:'10px 20px 13px 11px',
  },
  outerWrapper: {
    "& .MuiGrid-root":{
      backgroundColor: colors.lightGrey,
    },
    width: "100%",
    backgroundColor: colors.lightGrey,
    // height: "calc(100vh - 215px)",
    overflow:"hidden",
  },
});
