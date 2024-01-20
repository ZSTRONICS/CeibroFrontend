import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "assets";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import CustomModal from "components/Modal";
import { categorizeGroups } from "components/Utills/Globals";
import { DeleteIcon, FavIcon, UnFavIcon } from "components/material-ui/icons";
import { useOpenCloseModal } from "hooks";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import GroupCard from "./GroupCard";
interface Props {
  project: Project;
  groups: Group[];
}

function ProjectCard({ project, groups }: Props) {
  const history = useHistory();
  const titleRef: any = useRef(null);
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const { _id, creator, title, isFavoriteByMe } = project;
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
    Object.entries(categorizedGroups).map(
      ([label, data]: [string, Group[]]) => {
        if (label === "otherGroups") {
          // Customize label for 'otherGroups'
          const creatorName =
            data.length > 0
              ? `${data[0].creator.firstName} ${data[0].creator.surName}`
              : "Unknown Creator";
          return {
            label: `From: ${creatorName}`,
            data,
          };
        }
        return {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          data,
        };
      }
    );

  return (
    <>
      <Box sx={{ my: 1 }} key={_id}>
        <CollapseComponent.Accordion sx={{ width: "285px" }}>
          <CollapseComponent.AccordionSummary
            sx={{
              "&.MuiAccordionSummary-root": { py: 1.5 },
              border: "1px solid #818181",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <CustomStack
              sx={{ gap: 1 }}
              onClick={(e) => {
                e.preventDefault();
                history.push(`/location/${_id}`);
              }}
            >
              <Box sx={{ width: "28px" }}>
                {isFavoriteByMe ? <FavIcon /> : <UnFavIcon />}
              </Box>
              <Box>
                <Heading2
                  ref={titleRef}
                  className="textOverflowRow"
                  sx={{ width: "180px" }}
                >
                  {title}
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
                  py: 1.3,
                }}
              >
                <Heading2>Groups</Heading2>
                <CustomStack sx={{ gap: 0.5 }}>
                  <LabelTag>Recyclebin</LabelTag>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => openModal()}>
                    <assets.AddIcon sx={{ color: "#0076C8" }} />
                  </IconButton>
                </CustomStack>
              </CustomStack>
              <Box>
                {groupsWithLabel &&
                  groupsWithLabel.map((group, index) => {
                    return (
                      <React.Fragment key={index}>
                        {group.data.length > 0 ? (
                          <>
                            <LabelTag sx={{ pl: 1.3 }}>{group.label}</LabelTag>
                            <GroupCard groups={group.data} />
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
      </Box>
      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title={title}
          isOpen={isOpen}
          handleClose={closeModal}
          children={<CreateGroup projectId={_id} closeModal={closeModal} />}
        />
      )}
    </>
  );
}

export default ProjectCard;
