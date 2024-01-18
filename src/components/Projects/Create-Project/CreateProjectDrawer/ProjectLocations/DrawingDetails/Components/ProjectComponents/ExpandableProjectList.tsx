import { Box, InputBase } from "@mui/material";
import assets from "assets";
import { Heading2 } from "components/CustomTags";
import { useSearchText } from "hooks";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

interface IProps {
  allProjects: Project[];
  groups: Group[];
}
const ExpandableProjectList: React.FC<IProps> = (props) => {
  const { allProjects } = props;
  const { searchText, handleSearchTextChange, clearSearchText } =
    useSearchText();
  const [filteredPorject, setFilteredProject] = useState<Project[]>([]);
  const sortedProjects = allProjects.sort(
    (a: any, b: any) => b.isFavoriteByMe - a.isFavoriteByMe
  );
  // console.log("searchText", searchText);
  return (
    <Box sx={{}}>
      <Box
        sx={{
          pt: 1.25,
        }}
      >
        <InputBase
          type="search"
          value={searchText}
          placeholder="Start typing to search"
          sx={{
            pl: 4,
            height: "40px",
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#818181",
            borderStyle: "solid",
            width: "100%",
            background: `url(${assets.searchSvgIcon})no-repeat`,
            backgroundPosition: "5px center",
          }}
          onChange={handleSearchTextChange}
        />
        <Heading2 sx={{ py: 2 }}>Projects</Heading2>
      </Box>
      {allProjects
        .sort((a: any, b: any) => b.isFavoriteByMe - a.isFavoriteByMe)
        .map((project) => {
          return (
            <ProjectCard key={project._id} project={project} groups={[]} />
          );
        })}
    </Box>
  );
};

export default ExpandableProjectList;
