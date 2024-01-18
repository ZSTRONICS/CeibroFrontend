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
  const { allProjects, groups, windowActualHeight } = props;
  const [searchText, setSearchText] = useState("");
  const [contHeight, setContHeight] = useState<number>(50);
  const contRef: any = useRef(null);
  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  useEffect(() => {
    if (contRef.current) {
      setContHeight(contRef.current.clientHeight + 25);
    }
  }, [windowActualHeight]);
  return (
    <Box sx={{}}>
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
        {allProjects
          .sort((a: any, b: any) => b.isFavoriteByMe - a.isFavoriteByMe)
          .map((project) => {
            const groupDictionary = dataGroupById(groups, "projectId");
            const projectGroups = groupDictionary[project._id];
            // const floorDictionary = dataGroupById(allFloors, "projectId")
            return (
              <ProjectCard
                key={project._id}
                project={project}
                groups={projectGroups}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default ExpandableProjectList;
