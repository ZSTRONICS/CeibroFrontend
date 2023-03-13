import {
  CircularProgress,
  makeStyles, Typography
} from "@material-ui/core";
import { Divider, Grid, Tooltip } from "@mui/material";
import colors from "assets/colors";
import NoData from "components/Chat/NoData";
import { ProjectSubHeadingTag, RoleSubLabelTag } from "components/CustomTags";
import { CustomBadge, CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { avaialablePermissions } from "config/project.config";
import { Member, ProjectRolesInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { checkRolePermission } from "helpers/project.helper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  deleteRole,
  PROJECT_APIS
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import RoleMenu from "./RoleMenu";
import "./roles-table.css";

// store?: RootState
const RolesTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedProject, getAllProjectRoles, selectedRole, userPermissions } =
    useSelector((state: RootState) => state.project);
  const isDiabled = !loading ? false : true;
  useEffect(() => {
    if (selectedProject) {
      // const payload = {
      //   finallyAction: () => {
      //     setLoading(false);
      //   },
      //   other: selectedProject,
      // };
      // setLoading(true);
      dispatch(PROJECT_APIS.getProjectRolesById({other:selectedProject}));
    }
  }, [selectedProject]);

  const havePermission = checkRolePermission(
    userPermissions,
    avaialablePermissions.edit_permission
  );

  const handleEditRoles = (editRole: ProjectRolesInterface) => {
    // if (havePermission) {
      dispatch(projectActions.setSelectedRole(editRole));
      // dispatch(projectActions.setRole(editRole));
      dispatch(projectActions.openProjectRole());
    // }
  };

  const handleDeleteRoles = (id: any) => {
    setLoading(true);
    dispatch(
      deleteRole({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };

  const showProjectMembers = (member: Member[]) => {
    return (
      <>
        {member.length === 0 && (
          <CustomBadge
            showZero={true}
            overlap="circular"
            color="primary"
            badgeContent={0}
          ></CustomBadge>
        )}
      </>
    );
  };

  const memberToolTipNames = (membersList: Member[]) => {
    return (
      <>
        {membersList.map((item: Member, index) => {
          if (item === undefined) {
            return <></>;
          }
          if (index === membersList.length - 1) {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName}`}</span>
            );
          } else {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName}, `}</span>
            );
          }
        })}
      </>
    );
  };
  return (
    <Grid container >
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.name}>Role name</Typography>
      </Grid>

      <Grid item xs={12} className={classes.dataContainer}>
        {loading && <CircularProgress size={20} className={classes.progress} />}
        {getAllProjectRoles.length>0? getAllProjectRoles.map((role: ProjectRolesInterface) => {
            const {rolePermission,memberPermission} =role
          return (
            <div className={classes.roleChip} key={role._id}>
              <div className={classes.roleInner}>
                <CustomStack>
                <ProjectSubHeadingTag>
                  {role.name}
                </ProjectSubHeadingTag>
                {role.members.length > 0 ? (
              <CustomBadge
                showZero={true}
                overlap="circular"
                color="primary"
                badgeContent={
                  <Tooltip title={memberToolTipNames(role.members)}>
                    <span>{role.members.length}</span>
                  </Tooltip>
                }
              ></CustomBadge>
            ) : (
              showProjectMembers(role.members)
            )}
			
                </CustomStack>
                  {role.admin ===true&& (
                    <ProjectSubHeadingTag sx={{fontWeight:'500', fontSize:14}}>Project admin</ProjectSubHeadingTag>
                  )}
               {role.admin !==true &&<Grid container gap={2}>
            <Grid item>
              {rolePermission&& (
                    <CustomStack gap={1} divider={<Divider orientation="vertical" flexItem />}>
                        <ProjectSubHeadingTag>
                          Role &nbsp;
                        </ProjectSubHeadingTag>
                          {rolePermission.create===true&& <RoleSubLabelTag>Create</RoleSubLabelTag>}
                          {rolePermission.edit===true&& <RoleSubLabelTag>Edit</RoleSubLabelTag>}
                          {rolePermission.delete===true&& <RoleSubLabelTag>Delete</RoleSubLabelTag>}
                      </CustomStack>)
                    }
            </Grid>
          <Grid item>
          {memberPermission&& (
                  <CustomStack gap={1} divider={<Divider orientation="vertical" flexItem />}>
                      <ProjectSubHeadingTag>
                      Member &nbsp;
                      </ProjectSubHeadingTag>
                        {memberPermission.create===true&& <RoleSubLabelTag>Create</RoleSubLabelTag>}
                        {memberPermission.edit===true&& <RoleSubLabelTag>Edit</RoleSubLabelTag>}
                        {memberPermission.delete===true&& <RoleSubLabelTag>Delete</RoleSubLabelTag>}
                     </CustomStack>)
                   }
          </Grid>
                  
                 
                </Grid>}
              </div>

              <div
                className={classes.roleMenu}
                // style={{
                //   border: "2px solid",
                // }}
              >
                {/* <img src={assets.moreIcon} className={`width-16`} /> */}
                <RoleMenu
                  // permissoin={havePermission}
                  onEdit={()=>handleEditRoles(role)}
                  onDelete={() => handleDeleteRoles(role?._id)}
                />
              </div>
            </div>
          );
        }):<NoData title="No data found!"/>}
      </Grid>
    </Grid>
  );
};

export default RolesTable;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  typoHeader: {
    fontWeight: 800,
    fontSize: "12px",
  },
  roleItems: {
    "@media(max-width:620px)": {
      display: "flex",
      marginLeft: "0px",
      // flexDirection: "row",
      flexWrap: "wrap",
      // justifyContent: "flex-start",
    },
  },
  memberItem: {},
  Content: {
    fontWeight: 500,
    fontSize: "12px",
  },
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  titleContainer: {
    padding: "15px 1px",
    borderBottom: `1px solid ${colors.ternaryGrey}`,
  },
  name: {
    fontSize: 12,
    color: colors.textGrey,
    fontWeight: 500,
  },
  dataContainer: {},
  roleChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
    borderBottom: `1px solid ${colors.grey}`,
  },
  roleInner: {
    display: "flex",
    flexDirection: "column",
  },
  roleName: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  roleDetail: {
    display: "flex",
    textTransform: "capitalize",
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.textGrey,
  },
  detail: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  roleMenu: {},
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
