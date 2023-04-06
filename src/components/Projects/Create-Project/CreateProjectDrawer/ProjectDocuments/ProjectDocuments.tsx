import { makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { FolderInterface } from "constants/interfaces/project.interface";
import { useEffect, useRef, useState } from "react";
import colors from "../../../../../assets/colors";
import FolderFiles from "./FolderFiles";
import ProjectDocumentHeader from "./ProjectDocumentHeader";
import ProjectDocumentList from "./ProjectDocumentList";

const ProjectDocuments = () => {
  const classes = useStyles();
  const [folder, setFolder] = useState<FolderInterface | any>(null);
  const [showDocumentList, setShowDocumentList] = useState<boolean>(false);
  const headerRef: any = useRef();
  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowDocumentList(true);
      }, 100);
    }
    window.addEventListener("resize", getHeaderHeight);
  });
  const getHeaderHeight = () => {
    let contentHeight =
      window.innerHeight - (headerRef.current.clientHeight + 215);
    return `${contentHeight}px`;
  };
  const handleFolderClick = (folder: FolderInterface) => {
    setFolder(folder);
  };

  const handleGoBack = () => {
    if (folder) {
      setFolder(null);
    }
  };

  return (
    <>
      <Grid container item xs={12} alignItems="flex-start">
        <ProjectDocumentHeader
          handleGoBack={handleGoBack}
          selectedFolder={folder}
          isFolder={!folder}
        />

        <Grid
          item
          xs={12}
          className={classes.groupsWrapper}

          // maxHeight={getHeaderHeight}
        >
          {!folder && <ProjectDocumentList onFolderClick={handleFolderClick} />}
          {folder && <FolderFiles selectedFolderId={folder?._id} />}
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDocuments;

const useStyles = makeStyles({
  groupsWrapper: {
    height: "630px",
    overflow: "auto",
  },
  titleWrapper: {
    paddingTop: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingBottom: 10,
  },
});
