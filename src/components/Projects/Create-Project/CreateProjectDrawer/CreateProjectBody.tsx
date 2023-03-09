import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import ProjectDocuments from "./ProjectDocuments/ProjectDocuments";
import ProjectGroups from "./ProjectGroups/ProjectGroups";
import ProjectMembers from "./ProjectMember/ProjectMembers";
import ProjectOverview from "./ProjectOverview/ProjectOverview";
import ProjectRoles from "./ProjectRoles/ProjectRoles";

const CreateProjectBody = () => {
  const classes = useStyles();
  const {
    menue: selectedMenue,
  } = useSelector((state: RootState) => state.project);

  return (
    <Grid container className={classes.body}>
      {selectedMenue === 1 && <ProjectOverview />}
      {selectedMenue === 2 && <ProjectRoles />}
      {selectedMenue === 3 && <ProjectGroups />}
      {selectedMenue === 4 && <ProjectMembers />}
      {selectedMenue === 5 && <ProjectDocuments />}
      {/* {selectedMenue === 6 && <TimeProfile />} */}
    </Grid>
  );
};

export default CreateProjectBody;

const useStyles = makeStyles({
  body: {
    padding: 20,
    overflowY: "scroll",
    height: "calc(100vh - 190px)",
    "@media (max-width:960px)": {
      paddingTop: 10,
    },
  },
});
