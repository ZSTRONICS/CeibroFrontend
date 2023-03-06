import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Button, Grid, Typography } from "@mui/material";
import StatusMenu from "../Utills/Others/StatusMenu";
import { getAllStatus } from "../../config/project.config";
import ProjectList from "./ProjectList";
import projectActions from "../../redux/action/project.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

interface ProjectSectionInt {}

const myStatus = [
  {
    title: "Ongoing",
    count: 1,
  },
  {
    title: "Approved",
    count: 2,
  },
  {
    title: "Done",
    count: 1,
  },
  {
    title: "Draft",
    count: 1,
  },
];

const ProjectSection: React.FC<ProjectSectionInt> = () => {
  const allStatus = myStatus;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const openProjectDrawer = () => {
    dispatch(projectActions.openDrawer());
  };

  const handleClick = () => {
    history.push("/projects");
  };

  return (
    <div>
      <Grid container alignItems="center" className={classes.outerWrapper}>
        <Grid
          item
          xs={12}
          md={5}
          className={classes.titleContainer}
          style={styles.titleContainer}
        >
          <Typography className={classes.title} component="h1" variant="h5">
            My Project
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={styles.btn}
            onClick={openProjectDrawer}
          >
            Create New
          </Button>
        </Grid>
        <Grid
          style={styles.menuWrapper}
          className={classes.menuWrapper}
          item
          xs={12}
          md={5}
          lg={6}
        >
          <StatusMenu options={allStatus} />
        </Grid>
        <Grid item xs={12} md={2} lg={1}>
          <Button
            onClick={handleClick}
            variant="outlined"
            color="primary"
            size="medium"
            style={styles.viewAll}
            className={classes.viewAll}
          >
            View All
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          // height: "100%",
          height: "300px",
          overflowY: "auto",
        }}
      >
        <ProjectList />
      </Box>
    </div>
  );
};

export default ProjectSection;

const useStyles = makeStyles({
  outerWrapper: {
    padding: "30px 0 12px 10px",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
  },
  menuWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    ["@media (max-width:960px)"]: {
      justifyContent: "flex-start",
    },
  },
  titleContainer: {
    ["@media (max-width:960px)"]: {
      paddingTop: 14,
      paddingBottom: 14,
    },
  },
  viewAll: {
    ["@media (max-width:960px)"]: {
      marginLeft: 10,
      marginTop: 10,
    },
  },
});

const styles = {
  menuWrapper: {
    display: "flex",
  },
  titleContainer: {
    display: "flex",
  },
  btn: {
    marginLeft: 10,
  },
  viewAll: {
    fontSize: 10,
    padding: 7,
  },
};
