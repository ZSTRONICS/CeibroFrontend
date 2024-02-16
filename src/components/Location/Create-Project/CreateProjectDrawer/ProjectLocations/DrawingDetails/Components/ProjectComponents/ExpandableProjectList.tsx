import { Box, Button } from "@mui/material";
import assets from "assets";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { InputSearch } from "components/GenericComponents";
import CustomModal from "components/Modal";
import { categorizeProjects, dataGroupById } from "components/Utills/Globals";
import { useOpenCloseModal } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import CreateProject from "./CreateProject";
import ProjectCard from "./ProjectCard";

interface IProps {
  allProjects: Project[];
  groups: Group[];
  allFloors: Floor[];
  windowActualHeight: number;
  isProjectsLoading: boolean;
}
const ExpandableProjectList: React.FC<IProps> = (props) => {
  const {
    allProjects,
    groups,
    windowActualHeight,
    allFloors,
    isProjectsLoading,
  } = props;
  // const [filteredAllProjects, setFilteredAllProjects] = useState<Project[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [contHeight, setContHeight] = useState<number>(50);
  const contRef: any = useRef(null);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
    //  const filteredGroups = groups.filter((group) =>
    //     group.groupName.toLowerCase().includes(newSearchText.toLocaleLowerCase())
    //   );
    //   const filteredProjects = allProjects.filter((project) => {
    //     let projectIdIsExist = filteredGroups.some(
    //       (filteredGroup) => filteredGroup.projectId === project._id
    //     );
    //     if (projectIdIsExist) return true;
    //     return project.title
    //       .toLowerCase()
    //       .includes(newSearchText.toLocaleLowerCase());
    //   });
    //   setFilteredAllProjects(filteredProjects);
    //   setFilteredGroups(filteredGroups);
  };
  const categorizedProject =
    allProjects &&
    categorizeProjects(allProjects, searchText, (project: Project) => {
      if (project.isFavoriteByMe) return "Favorites";
      if (project.isRecentlyUsedByMe) return "Recently Used Projects";
      if (!project.isFavoriteByMe && !project.isRecentlyUsedByMe)
        return "All Projects";
      return null;
    });
  const projectsWithLabel =
    categorizedProject &&
    Object.entries(categorizedProject).sort(([labelA], [labelB]) => {
      const order = ["Favorites", "Recently Used Projects", "All Projects"];
      const indexA =
        order.indexOf(labelA) !== -1 ? order.indexOf(labelA) : order.length;
      const indexB =
        order.indexOf(labelB) !== -1 ? order.indexOf(labelB) : order.length;
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      return labelA.localeCompare(labelB);
    });
  console.log(projectsWithLabel, "projectsWithLabel....");
  useEffect(() => {
    groups && setFilteredGroups(groups);
  }, [allProjects, groups]);

  useEffect(() => {
    if (contRef.current) {
      setContHeight(contRef.current.clientHeight + 25);
    }
  }, [windowActualHeight]);
  const allProjectsLocal = [Object.values(categorizedProject)].flat(3);
  return (
    <>
      <Box
        ref={contRef}
        sx={{
          pt: 1.25,
        }}
      >
        <InputSearch
          value={searchText || ""}
          onChange={handleSearchTextChange}
        />
        <CustomStack sx={{ justifyContent: "space-between", pr: 1 }}>
          <Heading2 sx={{ py: 2 }}>Projects</Heading2>
          <Button
            disableRipple
            component="label"
            sx={{ padding: "5px 5px" }}
            onClick={() => openModal()}
            variant="contained"
          >
            <assets.AddIcon sx={{ color: "white" }} />
            new
          </Button>
        </CustomStack>
      </Box>
      <Box
        sx={{
          height: `${windowActualHeight - contHeight}px`,
          overflow: "auto",
        }}
      >
        {allProjectsLocal.length === 0 && (
          <Heading2 sx={{ textAlign: "center", fontWeight: 600 }}>
            No Project Found!
          </Heading2>
        )}
        {projectsWithLabel &&
          projectsWithLabel.map(([label, projects], index) => {
            return (
              <React.Fragment key={index}>
                {projects.length > 0 ? (
                  <>
                    <LabelTag>{label}</LabelTag>
                    {projects.map((project, index) => {
                      const groupDictionary = dataGroupById(
                        filteredGroups,
                        "projectId"
                      );
                      const projectGroups = groupDictionary[project._id] || [];
                      const floorDictionary = dataGroupById(
                        allFloors,
                        "projectId"
                      );
                      const projectFloors = floorDictionary[project._id] || [];
                      return (
                        <React.Fragment key={index}>
                          <ProjectCard
                            key={project._id}
                            project={project}
                            groups={projectGroups}
                            projectFloors={projectFloors}
                          />
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </React.Fragment>
            );
          })}
      </Box>
      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title="New project"
          isOpen={isOpen}
          handleClose={closeModal}
          children={<CreateProject onClose={closeModal} />}
        />
      )}
    </>
  );
};

export default ExpandableProjectList;
