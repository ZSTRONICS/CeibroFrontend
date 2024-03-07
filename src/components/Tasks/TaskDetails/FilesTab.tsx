import { Box } from "@mui/material";
import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
} from "components/Utills/Globals";
import { TaskFile } from "constants/interfaces";
import FilesContentList from "./FilesContentList";

interface IFilesTab {
  allTaskFiles: TaskFile[];
}
function FilesTab(props: IFilesTab) {
  const { allTaskFiles } = props;
  const allMediaFiles = FILTER_DATA_BY_EXT(MEDIA_EXT, allTaskFiles);
  const allDocsFiles = FILTER_DATA_BY_EXT(DOC_EXT, allTaskFiles);
  const FilesTabs = [
    { label: "All", content: <FilesContentList allFiles={allTaskFiles} /> },
    {
      label: "Photos",
      content: <FilesContentList allFiles={allMediaFiles} />,
    },
    {
      label: "Documents",
      content: <FilesContentList allFiles={allDocsFiles} />,
    },
    // { label: "Links", content: "All Links" },
  ];
  return (
    <Box sx={{ mt: 1 }}>
      <BasicTabs isFileTabs={true} tabsBgColor={"white"} tabsData={FilesTabs} />
    </Box>
  );
}

export default FilesTab;
