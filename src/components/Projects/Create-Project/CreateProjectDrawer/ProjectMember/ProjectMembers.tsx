import { Button, Grid, makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import MembersTable from "./MembersTable";
import CreateMember from "./CreateMember";
import { ProjectSubHeadingTag } from "components/CustomTags";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import {
  Member,
  ProjectRolesInterface,
  roleTemplate,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";

const ProjectMembers = () => {
  const classes = useStyles();
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
        .find((item: any) => item?.rolePermission);
    return rolePermissionLocal || roleTemplate;
  };
  const myRole: ProjectRolesInterface = getMyRole();

  return (
    <>
      <Grid item xs={12}>
        {myRole.memberPermission.create === true && (
          <Grid item xs={12} className={classes.actionWrapper}>
            {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<ListIcon />}
            className={classes.actionButton}
          >
            Bulk edit
          </Button> */}
            <ProjectSubHeadingTag>Add New Members</ProjectSubHeadingTag>
            <CreateMember />
          </Grid>
        )}

        <Grid item xs={12} className={classes.membersTable}>
          <MembersTable />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectMembers;

const useStyles = makeStyles({
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  membersTable: {
    height: "720px",
    overflowY: "auto",
    // backgroundColor: "red",
  },
});
