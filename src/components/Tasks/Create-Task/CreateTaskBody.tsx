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

import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTask";

const CreateTaskBody = ({subtasks,task}:AllSubtasksOfTaskResult) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.subtaskWrapper}>
        <SubTaskStatusDrawer />
      </div>
      <Grid container className={classes.body}>
        {/* <DrawerSubTask/> */}
        {subtasks?.length > 0 ? (
          <SubTaskList results={subtasks} />
        ) : (<p style={{width: '100%',
            textAlign: 'center'}}>There is no SubTask</p>
        )}
      </Grid>
    </>
  );
};

export default CreateTaskBody;

const useStyles = makeStyles({
  statusWraper: {
    overflowX: "scroll",
  },
  body: {
    padding: 20,
    overflow: "scroll",
    height: "calc(100vh - 80px)",
    background: "#F5F7F8",
  },
  subtaskWrapper: {
    "@media (max-width:854)": {
      maxWidth: "319px",
      width: "100%",
    },
  },
});
