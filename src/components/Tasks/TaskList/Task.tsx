import React, { useEffect } from 'react'

// mui
import { Grid } from "@material-ui/core";
import TabsUnstyled from "@mui/base/TabsUnstyled";

// components
import { Tab, TabPanel, TabsList } from "components/TaskComponent/Tabs/Tabs";
import TaskMain from "./TaskMain";
import { getAllTask } from 'redux/action/task.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';

const Task = () => {
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTask()) 
},[])

let { TaskCards }= useSelector((state: RootState) => state.task);
console.log('TaskCards', TaskCards)
  return (
    <Grid item xs={12}>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>Task</Tab>
            <Tab>Subtasks</Tab>
          </TabsList>

          <TabPanel value={0}>
            <TaskMain/>
          </TabPanel>
          <TabPanel value={1}>SubTasks</TabPanel>
        </TabsUnstyled>
    </Grid>
  );
};

export default Task;

