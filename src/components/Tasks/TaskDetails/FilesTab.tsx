import { Box } from "@mui/material";
import ImagePhotoViewer from "components/ImgLazyLoad/ImagePhotoViewer";
import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
} from "components/Utills/Globals";
import { TaskFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useState } from "react";
import FilesContentList from "./FilesContentList";

interface IFilesTab {
  allTaskFiles: TaskFile[];
}
function FilesTab(props: IFilesTab) {
  const { allTaskFiles } = props;
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allMediaFiles = FILTER_DATA_BY_EXT(MEDIA_EXT, allTaskFiles);

  const handleClick = (file: any, index: number) => {
    const findFileIndex = allMediaFiles.findIndex(
      (localFile: any) => localFile.fileId === file.fileId
    );
    if (findFileIndex > -1) {
      setCurrentImageIndex(findFileIndex);
    } else {
      setCurrentImageIndex(0);
    }
    openModal();
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    closeModal();
  };

  const allDocsFiles = FILTER_DATA_BY_EXT(DOC_EXT, allTaskFiles);
  const FilesTabs = [
    {
      label: "All",
      content: (
        <FilesContentList
          handleFileClick={handleClick}
          allFiles={allTaskFiles}
        />
      ),
    },
    {
      label: "Photos",
      content: (
        <FilesContentList
          handleFileClick={handleClick}
          allFiles={allMediaFiles}
        />
      ),
    },
    {
      label: "Documents",
      content: (
        <FilesContentList handleFileClick={() => {}} allFiles={allDocsFiles} />
      ),
    },
    // { label: "Links", content: "All Links" },
  ];
  return (
    <>
      <Box sx={{ mt: 1, marginLeft: "9px" }}>
        <BasicTabs
          selectedTabIndex={0}
          isFileTabs={true}
          tabsBgColor={"white"}
          tabsData={FilesTabs}
        />
      </Box>

      {isOpen && allMediaFiles.length > 0 && (
        <ImagePhotoViewer
          imgs={allMediaFiles.map((image: any) => image.fileUrl)}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default FilesTab;
