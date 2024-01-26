import { Box } from "@mui/material";
import { Heading2 } from "components/CustomTags";
import { InputSearch } from "components/GenericComponents";
import { dataGroupById } from "components/Utills/Globals";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

interface IProps {
  allProjects: Project[];
  groups: Group[];
  allFloors: Floor[];
  windowActualHeight: number;
}
const ExpandableProjectList: React.FC<IProps> = (props) => {
  const { allProjects, groups, windowActualHeight, allFloors } = props;
  const [filteredAllProjects, setFilteredAllProjects] = useState<Project[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchText, setSearchText] = useState("");
  const [contHeight, setContHeight] = useState<number>(50);
  const contRef: any = useRef(null);

  const handleSearchTextChange = (newSearchText: string) => {
    const filteredGroups = groups.filter((group) =>
      group.groupName.toLowerCase().includes(newSearchText.toLocaleLowerCase())
    );
    const filteredProjects = allProjects.filter((project) => {
      let projectIdIsExist = filteredGroups.some(
        (filteredGroup) => filteredGroup.projectId === project._id
      );
      if (projectIdIsExist) return true;
      return project.title
        .toLowerCase()
        .includes(newSearchText.toLocaleLowerCase());
    });
    setFilteredAllProjects(filteredProjects);
    setFilteredGroups(filteredGroups);
    setSearchText(newSearchText);
  };

  useEffect(() => {
    allProjects && setFilteredAllProjects(allProjects);
    groups && setFilteredGroups(groups);
  }, [allProjects, groups]);

  useEffect(() => {
    if (contRef.current) {
      setContHeight(contRef.current.clientHeight + 25);
    }
  }, [windowActualHeight]);
  return (
    <>
      <Box
        ref={contRef}
        sx={{
          pt: 1.25,
        }}
      >
        <InputSearch value={searchText} onChange={handleSearchTextChange} />
        <Heading2 sx={{ py: 2 }}>Projects</Heading2>
      </Box>
      <Box
        sx={{
          height: `${windowActualHeight - contHeight}px`,
          overflow: "auto",
        }}
      >
        {filteredAllProjects
          .sort((a: any, b: any) => b.isFavoriteByMe - a.isFavoriteByMe)
          .map((project) => {
            const groupDictionary = dataGroupById(filteredGroups, "projectId");
            const projectGroups = groupDictionary[project._id] || [];
            const floorDictionary = dataGroupById(allFloors, "projectId");
            const projectFloors = floorDictionary[project._id] || [];
            return (
              <ProjectCard
                key={project._id}
                project={project}
                groups={projectGroups}
                projectFloors={projectFloors}
              />
            );
          })}
      </Box>
    </>
  );
};

export default ExpandableProjectList;
