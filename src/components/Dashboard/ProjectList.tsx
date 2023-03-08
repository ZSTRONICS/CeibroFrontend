import { Grid } from "@material-ui/core";
import NoData from "components/Chat/NoData";
import { ProjectInterface } from "constants/interfaces/project.interface";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsWithPagination } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import ProjectCard from "../Utills/ProjectCard/ProjectCard";

const ProjectList = () => {
  const { projects } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectsWithPagination());
  }, []);

  return (
    <Grid container>
      {projects && projects.length > 0 ? (
        projects.map((project: ProjectInterface, index: number) => {
          if(project === undefined){
            return<></>
          }
          return <ProjectCard key={index} project={project} />;
        })
      ) : (
        <NoData title="No data found!" />
      )}
    </Grid>
  );
};

export default ProjectList;
