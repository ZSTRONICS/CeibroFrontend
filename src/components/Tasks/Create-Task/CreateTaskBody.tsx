import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
// import ProjectOverview from './ProjectOverview/ProjectOverview'
// import ProjectRoles from './ProjectRoles/ProjectRoles'
// import ProjectMembers from './ProjectMember/ProjectMembers'
// import ProjectGroups from './ProjectGroups/ProjectGroups'
// import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
// import TimeProfile from './TimeProfile/TimeProfile'
import SubTaskList from "../SubTasks/SubTaskList";
import SubTaskStatusDrawer from "./SubTaskStatusDrawer";

import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";

const CreateTaskBody = ({subtasks,task}:AllSubtasksOfTaskResult) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.subtaskWrapper}>
        <SubTaskStatusDrawer task={task} subtasks={subtasks}/>
      </div>
      <Grid container className={classes.body}>
        {subtasks?.length > 0 ? (
          <SubTaskList results={subtasks} />
        ) : (<p style={{width: '100%',
            textAlign: 'center'}}>There is no subtask</p>
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
  },
  subtaskWrapper: {
    marginBottom:'16px',
    "@media (max-width:854)": {
      maxWidth: "319px",
      width: "100%",
    },
  },
});
