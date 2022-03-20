import { Grid } from "@material-ui/core";
import React from "react";
import ProjectCard from "../Utills/ProjectCard/ProjectCard";
import CreateProject from "../Utills/ProjectCard/CreateProjectCard";
import assets from "assets/assets";
import { ProjectInterface } from "constants/interfaces/project.interface";

const ProjectList = () => {
  return (
    <Grid container>
      {projects &&
        projects.map((project: ProjectInterface, index: number) => {
          return <ProjectCard key={index} project={project} />;
        })}
    </Grid>
  );
};

export default ProjectList;

const projects: ProjectInterface[] = [
  // {
  //   projectPhoto: assets.testProject1,
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto: assets.testProject2,
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajeadfadf ",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto: assets.testProject3,
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Done",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto: assets.testProject4,
  //   dueDate: "26-07-2021",
  //   owner: "Ilja Nikolajev",
  //   title: "New project Title 1",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Draft",
  //   statusDate: "22-05-2021",
  // },
];
