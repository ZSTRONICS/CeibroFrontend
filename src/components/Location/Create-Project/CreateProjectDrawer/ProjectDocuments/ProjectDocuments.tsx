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
  const [headerHeight, setHeaderHeight] = useState<string>("");
  let isTimeOut: NodeJS.Timeout;

  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      getHeaderHeight();
    } else {
      windowResized();
    }
    window.addEventListener("resize", windowResized);
  });

  const windowResized = () => {
    setTimeout(() => {
      getHeaderHeight();
    }, 10);
  };

  const getHeaderHeight = () => {
    if (headerRef.current && headerRef.current.clientHeight) {
      let contentHeight =
        window.innerHeight - (headerRef.current.clientHeight + 130);
      const height = `${contentHeight}px`;
      if (showDocumentList === false) {
        setShowDocumentList(true);
      }
      setHeaderHeight(height);
      if (isTimeOut && isTimeOut.hasRef()) {
        isTimeOut.unref();
      }
    } else {
      if (!isTimeOut || !isTimeOut.hasRef()) {
        isTimeOut = setTimeout(() => {
          getHeaderHeight();
        }, 50);
      }else{
        isTimeOut.refresh()
      }
    }
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
      <Grid container ref={headerRef} item xs={12} alignItems="flex-start">
        <ProjectDocumentHeader
          handleGoBack={handleGoBack}
          selectedFolder={folder}
          isFolder={!folder}
        />
      </Grid>
      {showDocumentList === true && (
        <Grid
          item
          xs={12}
          className={classes.groupsWrapper}
          maxHeight={headerHeight}
        >
          {!folder && (
            <ProjectDocumentList
              height={headerHeight}
              onFolderClick={handleFolderClick}
            />
          )}
          {folder && (
            <FolderFiles height={headerHeight} selectedFolderId={folder?._id} />
          )}
        </Grid>
      )}
    </>
  );
};

export default ProjectDocuments;

const useStyles = makeStyles({
  groupsWrapper: {
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
