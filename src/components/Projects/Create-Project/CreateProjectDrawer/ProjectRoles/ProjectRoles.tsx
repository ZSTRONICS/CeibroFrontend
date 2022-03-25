import { Button, Grid, makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";
import RolesTable from "./RolesTable";
import RoleDrawer from "./RoleDrawer";

const ProjectRoles = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.actionWrapper}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ListIcon />}
            className={classes.actionButton}
          >
            Bulk edit
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className={classes.actionButton}
            onClick={() => {
              dispatch(projectActions.openProjectRole());
            }}
          >
            Add a roled
          </Button>
          <RoleDrawer />
        </Grid>

        <Grid item xs={12}>
          <RolesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectRoles;

const useStyles = makeStyles({
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width:960px)"]: {
      alignItems: "flex-start",
      paddingBottom: 20,
    },
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
});
