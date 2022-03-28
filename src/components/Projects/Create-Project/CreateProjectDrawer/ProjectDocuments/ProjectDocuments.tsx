import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { folderInterface } from "constants/interfaces/project.interface";
import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import colors from "../../../../../assets/colors";
import InputText from "../../../../Utills/Inputs/InputText";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import ProjectDocumentHeader from "./ProjectDocumentHeader";
import ProjectDocumentList from "./ProjectDocumentList";

const ProjectDocuments = () => {
  const classes = useStyles();
  const [folder, setFolder] = useState<folderInterface | any>(null);

  const handleFolderClick = (folder: folderInterface) => {
    setFolder(folder);
  };

  const handleGoBack = () => {
    if (folder) {
      setFolder(null);
    }
  };

  return (
    <>
      <Grid item xs={12} alignItems="flex-start">
        <ProjectDocumentHeader
          handleGoBack={handleGoBack}
          selectedFolder={folder}
        />
        <Grid item xs={12} className={classes.groupsWrapper}>
          {!folder && <ProjectDocumentList onFolderClick={handleFolderClick} />}
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDocuments;

const useStyles = makeStyles({
  titleWrapper: {
    paddingTop: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  groupsWrapper: {},
});
