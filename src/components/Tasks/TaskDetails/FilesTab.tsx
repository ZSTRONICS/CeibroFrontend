import { Box } from "@mui/material";
import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import FilesContentList from "./FilesContentList";

function FilesTab() {
  const FilesTabs = [
    { label: "All", content: <FilesContentList /> },
    { label: "Photos", content: <FilesContentList /> },
    // { label: "Links", content: "All Links" },
    { label: "Documents", content: <FilesContentList /> },
  ];
  return (
    <Box sx={{ mt: 1 }}>
      <BasicTabs isFileTabs={true} tabsBgColor={"white"} tabsData={FilesTabs} />
    </Box>
  );
}

export default FilesTab;
