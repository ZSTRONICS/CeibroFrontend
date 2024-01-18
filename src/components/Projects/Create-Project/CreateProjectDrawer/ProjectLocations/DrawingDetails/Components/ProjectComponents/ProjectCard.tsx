import { Box } from "@mui/material";
import assets from "assets";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { DeleteIcon, FavIcon, UnFavIcon } from "components/material-ui/icons";
import { useRef } from "react";
import GroupCard from "./GroupCard";

interface Props {
  project: Project;
  groups: Group[];
}
function ProjectCard({ project, groups }: Props) {
  const titleRef: any = useRef(null);
  const { creator, title, isFavoriteByMe } = project;
  const fullName = `${creator.firstName} ${creator.surName}`;
  const groupMenu: MenuOption[] = [
    {
      menuName: "Mark as private",
      callBackHandler: () => {
        console.log("Mark as private");
      },
    },
    {
      menuName: "Mark as public",
      callBackHandler: () => {
        console.log("Mark as public");
      },
    },
  ];

  return (
    <Box sx={{ my: 1 }}>
      <CollapseComponent.Accordion sx={{ width: "285px" }}>
        <CollapseComponent.AccordionSummary
          sx={{
            "&.MuiAccordionSummary-root": { py: 1.5 },
            border: "1px solid #818181",
            borderRadius: "8px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CustomStack sx={{ gap: 1 }}>
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
                <DeleteIcon />
                <assets.AddIcon sx={{ color: "#0076C8" }} />
              </CustomStack>
            </CustomStack>
            <Box>
              {[1, 2, 3].map((group) => (
                <>
                  <LabelTag sx={{ pl: 1.3 }}>Favorites</LabelTag>
                  <GroupCard key={group} groups={[]} menuOption={groupMenu} />
                </>
              ))}
            </Box>
          </Box>
        </CollapseComponent.AccordionDetails>
      </CollapseComponent.Accordion>
    </Box>
  );
}

export default ProjectCard;
