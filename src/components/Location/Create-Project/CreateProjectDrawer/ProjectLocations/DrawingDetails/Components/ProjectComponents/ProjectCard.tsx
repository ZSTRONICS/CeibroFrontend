import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "assets";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import CustomModal from "components/Modal";
import { categorizeGroups } from "components/Utills/Globals";
import { FavIcon, UnFavIcon } from "components/material-ui/icons";
import { PROJECT_CONFIG } from "config";
import { useOpenCloseModal } from "hooks";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";
import CreateGroup from "./CreateGroup";
import GroupCard from "./GroupCard";
interface Props {
  project: Project;
  groups: Group[];
  projectFloors: Floor[];
}

function ProjectCard({ project, groups, projectFloors }: Props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const titleRef: any = useRef(null);
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const { projectId } = useParams<any>();
  const [expanded, setExpanded] = React.useState<string | false>(projectId);
  const { _id, creator, title: projectTitle, isFavoriteByMe } = project;
  const fullName = `${creator.firstName} ${creator.surName}`;

  const categorizedGroups =
    groups &&
    categorizeGroups(groups, (group: Group) => {
      if (group.isFavoriteByMe) return "Favorites";
      if (group.isCreator) return "Self added groups";
      return null; // Return null for 'otherGroups'
    });

  const groupsWithLabel =
    categorizedGroups &&
    Object.entries(categorizedGroups)
      .sort(([labelA], [labelB]) => {
        const order = ["Favorites", "Recently used", "Self added groups"];
        const indexA =
          order.indexOf(labelA) !== -1 ? order.indexOf(labelA) : order.length;
        const indexB =
          order.indexOf(labelB) !== -1 ? order.indexOf(labelB) : order.length;
        if (indexA !== indexB) {
          return indexA - indexB;
        }
        return labelA.localeCompare(labelB);
      })
      .map(([label, data]: [string, Group[]]) => {
        if (label === "otherGroups") {
          const creatorName =
            data.length > 0
              ? `${data[0].creator.firstName} ${data[0].creator.surName}`
              : "Unknown Creator";
          return {
            label: `${creatorName}`,
            data,
          };
        }
        return {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          data,
        };
      });

  const [projectcardbg, setProjectcardbg] = useState(false);
  const [projectcardId, setProjectcardId] = useState<any>(null);
  const changebg = (id: string) => {
    if (projectcardId === id) {
      setProjectcardId(null);
    } else {
      setProjectcardId(id);
    }
  };

  const handleProjFavUnFav = (project: Project) => {
    dispatch(
      PROJECT_APIS.projectFavUnFav({
        other: {
          isProjFav: !project.isFavoriteByMe,
          projectId: project._id,
        },
        success(res: any) {
          dispatch({
            type: PROJECT_CONFIG.PROJECT_UPDATED,
            payload: res.data.updatedProject,
          });
        },
      })
    );
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      history.push(`/location/${panel}`);
      setExpanded(newExpanded ? panel : false);
      if (expanded) {
        changebg(panel);
      }
    };

  return (
    <Box sx={{ my: 1 }} key={_id}>
      <CollapseComponent.Accordion
        expanded={expanded === _id}
        onChange={handleChange(_id)}
        sx={{ width: "98%" }}
      >
        <CollapseComponent.AccordionSummary
          sx={{
            "&.MuiAccordionSummary-root": {
              padding: "8px 16px 8px 8px",
            },
            border: "1px solid #818181",
            borderRadius: "8px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            backgroundColor: `${projectId === _id ? "#EBF5FB" : ""}`,
          }}
        >
          <CustomStack sx={{ gap: 1 }}>
            <Box sx={{ width: "28px" }}>
              <IconButton
                onClick={(e: any) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleProjFavUnFav(project);
                }}
              >
                {isFavoriteByMe ? <FavIcon /> : <UnFavIcon />}
              </IconButton>
            </Box>
            <Box>
              <Heading2
                ref={titleRef}
                className="textOverflowRow"
                sx={{ width: "180px" }}
              >
                {projectTitle}
              </Heading2>
              <LabelTag>{fullName}</LabelTag>
            </Box>
          </CustomStack>
        </CollapseComponent.AccordionSummary>
        <CollapseComponent.AccordionDetails>
          <Box>
            <CustomStack
              sx={{
                gap: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", pr: "5px", display: "flex" }}>
                <Heading2
                  sx={{
                    width: "30%",
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Groups
                </Heading2>
                <CustomStack sx={{ width: "70%" }}>
                  <LabelTag
                    sx={{
                      width: "72%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    Recyclebin
                  </LabelTag>
                  <Box sx={{ width: "28%", display: "flex" }}>
                    <IconButton sx={{ width: "50%" }}>
                      <assets.DeleteOutlinedIcon sx={{ color: "#0076C8" }} />
                    </IconButton>
                    <IconButton
                      sx={{ width: "50%" }}
                      onClick={() => openModal()}
                    >
                      <assets.AddIcon sx={{ color: "#0076C8" }} />
                    </IconButton>
                  </Box>
                </CustomStack>
              </Box>
            </CustomStack>
            {/* ////////////////// */}
            <Box sx={{ pl: 1.8 }}>
              {groupsWithLabel &&
                groupsWithLabel.map((group, index) => {
                  return (
                    <React.Fragment key={index}>
                      {group.data.length > 0 ? (
                        <>
                          <LabelTag sx={{ pl: 1.8 }}>{group.label}</LabelTag>
                          <GroupCard
                            projectFloors={projectFloors}
                            groups={group.data}
                            projectName={project.title}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  );
                })}
            </Box>
          </Box>
        </CollapseComponent.AccordionDetails>
      </CollapseComponent.Accordion>
      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title={projectTitle}
          isOpen={isOpen}
          handleClose={closeModal}
          children={<CreateGroup projectId={_id} closeModal={closeModal} />}
        />
      )}
    </Box>
  );
}

export default ProjectCard;
