import { Grid } from "@mui/material";
import NoData from "components/NotFound/NoData";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import ProjectCard from "../Utills/ProjectCard/ProjectCard";

const ProjectList = () => {
  const { allProjects } = useSelector((state: RootState) => state.project);

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
        allProjects.map((project: Project, index: number) => {
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
