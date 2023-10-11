import { makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import NoData from "components/NotFound/NoData";
import { ProjectInterface } from "constants/interfaces/project.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import ProjectCard from "../Utills/ProjectCard/ProjectCard";

const ProjectList = () => {
  const { allProjects } = useSelector((state: RootState) => state.project);
  const classes = useStyles();

  return (
    <Grid
      container
      // className={classes.ProjectListMain}
      // style={{
      //   height: "600px",
      //   overflowY: "auto",
      // }}
    >
      {allProjects && allProjects.length > 0 ? (
        allProjects.map((project: ProjectInterface, index: number) => {
          // if(project === undefined){
          //   return<></>
          // }
          return <ProjectCard key={index} project={project} />;
        })
      ) : (
        <NoData title="No data found!" />
      )}
    </Grid>
  );
};

export default ProjectList;

const useStyles = makeStyles({
  ProjectListMain: {
    // "& .MuiGrid-root MuiGrid-container": {
    //   height: "600px",
    //   overflow: "auto",
    // },
    // "@media(max-width:1323px)": {
    //   height: "660px",
    //   overflow: "auto",
    //   // scrollBehaviour: "smooth",
    // },
    // "@media(min-width:1323px)": {
    //   height: "660px",
    //   overflowY: "auto",
    //   scrollBehaviour: "smooth",
    // },
  },
});
