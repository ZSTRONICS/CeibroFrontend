import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";
import CreateProject from "../../Utills/ProjectCard/CreateProjectCard";
import ProjectCard from "../../Utills/ProjectCard/ProjectCard";

const ProjectList = (props: any) => {
  // const { allProjects } = useSelector((state: RootState) => state.project);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { user } = useSelector((state: RootState) => state.auth);

  const openCreateProject = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
    dispatch(projectActions.openDrawer());
  };

  return (
    <Grid container>
      {props.allProjects && props.allProjects.length > 0 ? (
        <>
          {props.allProjects?.map((project: Project, index: number) => {
            return <ProjectCard key={index} project={project} />;
          })}
          <CreateProject />
        </>
      ) : (
        <>
          {
            <Grid container style={{ height: 400 }}>
              <Grid item xs={12} className={classes.noProject}>
                <Typography className={classes.noProjectText}>
                  No data found
                </Typography>
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={openCreateProject}
                >
                  Create new
                </Button>
              </Grid>
            </Grid>
          }
        </>
      )}
    </Grid>
  );
};

export default ProjectList;

const useStyles = makeStyles({
  noProject: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    marginBottom: 40,
  },
  noProjectText: {
    fontSize: 14,
    fontWeight: 500,
    gap: 20,
  },
});
