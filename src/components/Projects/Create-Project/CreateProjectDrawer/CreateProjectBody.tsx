import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import ProjectDocuments from "./ProjectDocuments/ProjectDocuments";
// import ProjectGroups from "./ProjectGroups/ProjectGroups";
// import ProjectMembers from "./ProjectMember/ProjectMembers";
import ProjectOverview from "./ProjectOverview/ProjectOverview";
import ProjectRoles from "./ProjectRoles/ProjectRoles";

interface MenuComponents {
  [key: number]: React.ReactNode;
}

const projectMenus: MenuComponents = {
  1: <ProjectOverview />,
  // 2:<ProjectLocations/>,
  2: <ProjectRoles />,
  // 3: <ProjectGroups />,
  // 4: <ProjectMembers />,
  6: <ProjectDocuments />,
  // 6: <TimeProfile />,
};

const CreateProjectBody = () => {
  const { menue: selectedMenue } = useSelector(
    (state: RootState) => state.project
  );

  return (
    <Grid container sx={{ padding: 20,  height: "calc(100vh - 175px)", }} >
      {projectMenus[selectedMenue]}
    </Grid>
  )};

export default CreateProjectBody;