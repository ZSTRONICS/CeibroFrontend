import React,{useEffect} from "react";
import { Grid } from '@material-ui/core'
import ProjectSection from './ProjectSection'
import TaskSection from './TaskSection'
import SmartMenuBar from './SmartMenuBar'
import { getAllProjectsWithMembers } from 'redux/action/project.action'
import { getAllSubTaskList } from 'redux/action/task.action'
import { useDispatch } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllProjectsWithMembers());
        dispatch(getAllSubTaskList());
      },[])

    return (
        <Grid item xs={12}>
            <SmartMenuBar/>
            <TaskSection/>
            <ProjectSection/>
        </Grid>
    );
}

export default Dashboard;
