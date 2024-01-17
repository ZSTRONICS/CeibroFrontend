import ProjectCard from "./ProjectCard";

interface IProps {
  allProjects: Project[];
}
const ExpandableProjectList: React.FC<IProps> = (props) => {
  const { allProjects } = props;

  return (
    <>
      {allProjects.map((project) => {
        return <ProjectCard key={project._id} project={project} />;
      })}
    </>
  );
};

export default ExpandableProjectList;
