import { Box } from "@mui/material";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { FavIcon } from "components/material-ui/icons";

interface Props {
  project: Project;
}
function ProjectCard({ project }: Props) {
  const { creator, title } = project;
  const fullName = `${creator.firstName} ${creator.surName}`;
  return (
    <Box
      sx={{
        maxWidth: "285px",
        width: "100%",
        p: 1,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <CollapseComponent.Accordion>
        <CollapseComponent.AccordionSummary
          sx={{ "&.MuiAccordionSummary-root": { p: 0 } }}
        >
          <CustomStack sx={{ gap: 1 }}>
            <Box sx={{ width: "24px" }}>
              <FavIcon />
            </Box>
            <Box>
              <Heading2>{title}</Heading2>
              <LabelTag>{fullName}</LabelTag>
            </Box>
          </CustomStack>
        </CollapseComponent.AccordionSummary>
        <CollapseComponent.AccordionDetails>
          Groups
        </CollapseComponent.AccordionDetails>
      </CollapseComponent.Accordion>
    </Box>
  );
}

export default ProjectCard;
