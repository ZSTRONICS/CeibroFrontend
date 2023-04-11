import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import SubTaskList from "../SubTasks/SubTaskList";
import SubTaskStatusDrawer from "./SubTaskStatusDrawer";
import { Grid, CircularProgress, Box } from "@mui/material";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const CreateTaskBody = ({ subtasks, task }: AllSubtasksOfTaskResult) => {
  const headerRef: any = useRef();
  const classes = useStyles();
  const [doOnce, setDoOnce] = useState(true);
  const { loadingSubTaskofTask } = useSelector(
    (state: RootState) => state.task
  );

  let isTimeOut: NodeJS.Timeout;
  const [headerHeight, setHeaderHeight] = useState<string>("");

  const handleScroll = () => {
    if (doOnce) {
      const subTaskContainer = document.getElementById("subTaskContainer");
      if (subTaskContainer) {
        console.log("subTaskContainer", subTaskContainer, subTaskContainer.scrollHeight, subTaskContainer.scrollTop);
        
        subTaskContainer.scrollTop = subTaskContainer.scrollHeight;
      }
      setDoOnce(false);
    }
  };

  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      getHeaderHeight();
    } else {
      windowResized();
    }
    window.addEventListener("resize", windowResized);
  });

  const windowResized = () => {
    setTimeout(() => {
      getHeaderHeight();
    }, 10);
  };

  const getHeaderHeight = () => {
    if (headerRef.current && headerRef.current.clientHeight) {
      let contentHeight =
        window.innerHeight - (headerRef.current.clientHeight + 70);
      const height = `${contentHeight}px`;
      setHeaderHeight(height);
      handleScroll();
      if (isTimeOut && isTimeOut.hasRef()) {
        isTimeOut.unref();
      }
    } else {
      if (!isTimeOut.hasRef()) {
        isTimeOut = setTimeout(() => {
          getHeaderHeight();
        }, 50);
      }else{
        isTimeOut.refresh();
      }
    }
  };

  return (
    <>
      <div className={classes.subtaskWrapper} ref={headerRef}>
        <SubTaskStatusDrawer task={task} subtasks={subtasks} />
      </div>

      <Grid
        id="subTaskContainer"
        container
        className={classes.body}
        maxHeight={headerHeight}
        sx={{ overflowY: "auto" }}
      >
        {loadingSubTaskofTask ? (
          <Grid item sx={{ flex: 1, textAlign: "center", mt: 6 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item sx={{ flex: 1 }}>
            {subtasks?.length > 0 ? (
              <SubTaskList results={subtasks} />
            ) : (
              <p
                style={{
                  width: "100%",
                  marginTop: "4rem",
                  textAlign: "center",
                }}
              >
                No subtask found
              </p>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CreateTaskBody;

const useStyles = makeStyles({
  statusWraper: {
    overflowX: "auto",
  },
  body: {
    background: "#F5F7F8",
    padding: "11px 8px",
  },
  subtaskWrapper: {
    marginBottom: "16px",
    // "@media (max-width:854)": {
    //   maxWidth: "319px",
    width: "100%",
    // },
  },
});
