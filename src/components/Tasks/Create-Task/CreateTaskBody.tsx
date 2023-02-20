import React from "react";
import { makeStyles } from "@material-ui/core";
// import ProjectOverview from './ProjectOverview/ProjectOverview'
// import ProjectRoles from './ProjectRoles/ProjectRoles'
// import ProjectMembers from './ProjectMember/ProjectMembers'
// import ProjectGroups from './ProjectGroups/ProjectGroups'
// import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
// import TimeProfile from './TimeProfile/TimeProfile'
import SubTaskList from "../SubTasks/SubTaskList";
import SubTaskStatusDrawer from "./SubTaskStatusDrawer";
 import { Grid,CircularProgress } from "@mui/material";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const CreateTaskBody = ({subtasks,task}:AllSubtasksOfTaskResult) => {
  const classes = useStyles();
  const {loadingSubTaskofTask} = useSelector((state: RootState) => state.task);
  
  return (<>
      <div className={classes.subtaskWrapper}>
        <SubTaskStatusDrawer task={task} subtasks={subtasks}/>
      </div>
      <Grid container className={classes.body}>
        {loadingSubTaskofTask? <Grid sx={{flex:1, textAlign:'center', mt:6}}> <CircularProgress/> </Grid> :
        <>
        {subtasks?.length > 0 ? (
          <SubTaskList results={subtasks} />
        ) : (<p style={{width: '100%',marginTop:'4rem',
            textAlign: 'center'}}> No subtask found</p>
        )}
        </>}
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
    marginBottom:'16px',
    "@media (max-width:854)": {
      maxWidth: "319px",
      width: "100%",
    },
  },
});
