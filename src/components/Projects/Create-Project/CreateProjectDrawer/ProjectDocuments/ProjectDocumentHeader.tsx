import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import ListItemIcon from "@material-ui/icons/List";
import { TramSharp } from "@material-ui/icons";
import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import colors from "../../../../../assets/colors";
import { useDispatch } from "react-redux";
import InputText from "../../../../Utills/Inputs/InputText";
import projectActions from "redux/action/project.action";
import DocumentDrawer from "./DocumentDrawer";
import { folderInterface } from "constants/interfaces/project.interface";

interface headerInterface {
  selectedFolder?: folderInterface | null;
  handleGoBack: () => any;
}

const ProjectDocumentHeader: React.FC<headerInterface> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedFolder, handleGoBack } = props;

  return (
    <Grid container>
      <Grid item xs={12} md={2} className={classes.actionWrapper}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ListItemIcon />}
          className={classes.actionButton}
        >
          Bulk edit
        </Button>
      </Grid>
      <Grid item xs={12} md={7} className={classes.actionWrapper}>
        <InputText placeholder="Find Document" />
      </Grid>
      <Grid item xs={12} md={3} className={classes.secondActionWrapper}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.actionButton}
          onClick={() => {
            dispatch(projectActions.openProjectDocuments());
          }}
        >
          Create a folder
        </Button>
        <DocumentDrawer />
        <div className={classes.viewIcons}>
          <BsGrid style={{ color: colors.primary }} />
          <AiOutlineUnorderedList />
        </div>
      </Grid>
      <Grid item xs={12} className={classes.breadCrums}>
        <Typography onClick={handleGoBack} className={classes.breadCrumsText}>
          Document /
        </Typography>
        {selectedFolder && (
          <Typography className={classes.breadCrumsFolder}>
            &nbsp;{selectedFolder?.name}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectDocumentHeader;

const useStyles = makeStyles({
  breadCrums: {
    paddingTop: 10,
    display: "flex",
  },
  breadCrumsText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textGrey,
    cursor: "pointer",
  },
  breadCrumsFolder: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    ["@media (max-width:960px)"]: {
      paddingBottom: 10,
    },
  },
  secondActionWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  viewIcons: {
    display: "flex",
    justifyContent: "space-between",
    width: "50px",
  },
});
