import React, { useEffect } from "react";
// mui
import { Grid } from "@material-ui/core";
import TabsUnstyled from "@mui/base/TabsUnstyled";

// components
import { Tab, TabPanel, TabsList } from "components/TaskComponent/Tabs/Tabs";
import TaskMain from "./TaskMain";
import SubTaskMain from "../SubTasks/SubTaskMain";
import { useDispatch } from "react-redux";
import { getAllSubTaskList, getAllTask } from "redux/action/task.action";
import { getAllProjectsWithMembers } from "redux/action/project.action";

const Task = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectsWithMembers());
    dispatch(getAllTask());
    dispatch(getAllSubTaskList());
  }, []);

  //get all project with members and store in Redux

  return (
    <>
      <Grid item xs={12}>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>Task</Tab>
            <Tab>Subtasks</Tab>
          </TabsList>
          <TabPanel value={0}>
            <TaskMain />
          </TabPanel>
          <TabPanel value={1}>
            <SubTaskMain />
          </TabPanel>
        </TabsUnstyled>
      </Grid>
    </>
  );
};

export default Task;
