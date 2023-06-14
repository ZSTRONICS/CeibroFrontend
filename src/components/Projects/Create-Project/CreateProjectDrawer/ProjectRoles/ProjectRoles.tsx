import { Grid, makeStyles } from "@material-ui/core";
// import { Box, Button, Grid, makeStyles, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import projectActions, { PROJECT_APIS } from "redux/action/project.action";
import RolesTable from "./RolesTable";
import RoleDrawer from "./RoleDrawer";
import {
  Member,
  roleTemplate,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { RootState } from "redux/reducers/appReducer";
import { ProjectAdminRoleTag } from "components/CustomTags";
import { CButton } from "components/Button";
import { useEffect } from "react";

const ProjectRoles = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const { getAllProjectRoles } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const getMyRole = () => {
    let rolePermissionLocal =
      getAllProjectRoles &&
      getAllProjectRoles
        .filter((permission: any) =>
          permission.members.some(
            (member: Member) => String(member._id) === String(user._id)
          )
        )
        .find((item: any) => item?.rolePermission)?.rolePermission;
    return (
      rolePermissionLocal || {
        create: false,
        edit: false,
        delete: false,
      }
    );
  };
  const myRole = getMyRole();

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.actionWrapper}>
          {
            myRole.create === true && <>
              <ProjectAdminRoleTag>New Role</ProjectAdminRoleTag>

              <CButton
                label="Add"
                variant="outlined"
                color="primary"
                sx={{ fontWeight: "700" }}
                className={classes.actionButton}
                // disabled={!havePermission ? true : false}
                onClick={() => {
                  dispatch(projectActions.setRole(roleTemplate));
                  dispatch(projectActions.setSelectedRole(roleTemplate));
                  dispatch(projectActions.openProjectRole());
                }}
              />
            </>
          }

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
    alignItems: "flex-start",
    "@media (max-width:960px)": {
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
