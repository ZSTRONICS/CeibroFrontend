import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
// import { Box, Button, Grid, makeStyles, Typography } from "@mui/material";
import ListIcon from "@material-ui/icons/List";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import RolesTable from "./RolesTable";
import RoleDrawer from "./RoleDrawer";
import { rolesTemplate } from "constants/interfaces/project.interface";
import { RootState } from "redux/reducers";
import { checkRolePermission } from "helpers/project.helper";
import { avaialablePermissions } from "config/project.config";
import { ProjectSubHeadingTag } from "components/CustomTags";
import CButton from "components/Button/Button";

const ProjectRoles = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roleDrawer, userPermissions } = useSelector((state: RootState) => state.project);

  const havePermission = checkRolePermission(
    userPermissions,
    avaialablePermissions.create_permission
  );

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.actionWrapper}>
          {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<ListIcon />}
            className={classes.actionButton}
          >
            Bulk edit
          </Button> */}
          <ProjectSubHeadingTag>
            New Role
          </ProjectSubHeadingTag>

          <CButton
            label="Add"
            variant="outlined"
            color="primary"
            sx={{fontWeight:'700'}}
            className={classes.actionButton}
            // disabled={!havePermission ? true : false}
            onClick={() => {
              dispatch(projectActions.setRole(rolesTemplate));
              dispatch(projectActions.setSelectedRole(null));
              dispatch(projectActions.openProjectRole());
            }}
          />
          {roleDrawer && <RoleDrawer />}
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
    alignItems: "flex-start",
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
