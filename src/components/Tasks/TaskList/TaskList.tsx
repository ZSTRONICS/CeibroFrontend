import React, { Fragment, useEffect, useState } from "react";

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
// import { getAllTask } from "redux/action/task.action";
import { RootState } from "redux/reducers";
import { TaskInterface } from "constants/interfaces/task.interface";

function TaskList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  let allTask: TaskInterface[] = useSelector(
    (state: RootState) => state.task.allTask
  );
  let getTaskSubTaskFilterByState = useSelector(
    (state: RootState) => state.task.getTaskSubTaskFilterByState
  );

  // let headerHeight = 10;
  // if(props.props.current){
  //   console.log(window.innerWidth, props.props.current.clientHeight);
  // }
  let filterTask = [...allTask];

  filterTask = filterTask.reduce((acc: any, curr: any) => {
    if (curr.state === getTaskSubTaskFilterByState) {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  if (getTaskSubTaskFilterByState === "all") {
    filterTask = [...allTask];
  }

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
          // sx={{ height: "270px", overflowY: "auto" }}
          className={classes.tasklistContainer}
          justifyContent={`${filterTask.length===0?'center':'flex-start'}`}
          container
          item
          rowGap={2.5}
          columnGap={1.905}
          xs={12}

          // overflow= {"auto"}
          // maxHeight={"500px"}
          // height={"calc(100vh - 30vh)"}
          // className={classes.cardListContainer}
        >
          {filterTask &&filterTask.length>0?
            filterTask.map((task: TaskInterface) => {
              if (task === undefined) {
                return <></>;
              }
              if (!task.access.includes(user._id)) {
                return;
              }
              return (
                <Fragment key={task._id}>
                  <TaskCard ColorByStatus={getColorByStatus} task={task} />
                </Fragment>
              );
            }):
            <NoData title="No data found!"/>
            }
        </Grid>
      )}
    </>
  );
}

export default TaskList;

const useStyles = makeStyles((theme) => ({
  cardListContainer: {
    overflow: "auto",
    height: "100%",
    //  maxHeight:"100vh",
    // paddingBottom: 20,
    // [theme.breakpoints.down("sm")]: {
    //   maxHeight: "calc(100vh - 350px)",
    // },

    // [theme.breakpoints.down(1024)]: {
    //   justifyContent: "center",
    // },
  },
  tasklistContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    "@media(max-width:1240px)": {
      justifyContent: "center",
    },
  },
  chatIcon: {
    fontSize: 50,
    color: colors.lightBlack,
  },
}));
