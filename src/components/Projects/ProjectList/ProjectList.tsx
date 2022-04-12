import { Grid } from "@material-ui/core";
import React from "react";
import ProjectCard from "../../Utills/ProjectCard/ProjectCard";
import CreateProject from "../../Utills/ProjectCard/CreateProjectCard";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ProjectInterface } from "constants/interfaces/project.interface";

const ProjectList = () => {
  const { projects } = useSelector((state: RootState) => state.project);

  console.log("projects listsss", projects);
  return (
    <Grid container>
      {/* <h1>testz</h1> */}
      {projects &&
        projects?.map((project: ProjectInterface, index: number) => {
          return <ProjectCard key={index} project={project} />;
        })}
      <CreateProject />
    </Grid>
  );
};

export default ProjectList;

const projects: ProjectInterface[] = [
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
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
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajeadfadf ajdlfjas ldv",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
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
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
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
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU",
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
  //   projectPhoto:
  //     "http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg",
  //   dueDate: "26-07-2021",
  //   owner: "IIljalajev",
  //   title: "New project Title 2",
  //   tasks: 40,
  //   docs: 10,
  //   users: 97,
  //   chat: 5,
  //   publishStatus: "Ongoing",
  //   statusDate: "22-05-2021",
  // },
  // {
  //   projectPhoto:
  //     "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607",
  //   dueDate: "26-07-2021",
  //   owner: "Bjlaksdolajev",
  //   title: "New project Title 3",
  //   tasks: 50,
  //   docs: 250,
  //   users: 47,
  //   chat: 0,
  //   publishStatus: "Completed",
  //   statusDate: "22-05-2021",
  // },
];
