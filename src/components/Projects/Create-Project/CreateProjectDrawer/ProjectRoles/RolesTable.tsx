import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { Divider, Grid, Tooltip } from "@mui/material";
import colors from "assets/colors";
import NoData from "components/Chat/NoData";
import { SubHeadingTag, SubLabelTag } from "components/CustomTags";
import {
  CustomBadge,
  CustomStack,
} from "components/TaskComponent/Tabs/TaskCard";
import { avaialablePermissions } from "config/project.config";
import {
  Member,
  ProjectRolesInterface,
  roleTemplate,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { checkRolePermission } from "helpers/project.helper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  deleteRole,
  PROJECT_APIS,
} from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";
import RoleMenu from "./RoleMenu";
import "./roles-table.css";

// store?: RootState
const RolesTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedProject, getAllProjectRoles } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.auth);
  // const isDiabled = !loading ? false : true;

  useEffect(() => {
    if (selectedProject) {
      // const payload = {
      //   finallyAction: () => {
      //     setLoading(false);
      //   },
      //   other: selectedProject,
      // };
      // setLoading(true);
      dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
    }
  }, [selectedProject]);

  const handleEditRoles = (editRole: ProjectRolesInterface) => {
    dispatch(projectActions.setSelectedRole(editRole));
    dispatch(projectActions.openProjectRole());
  };

  const handleDeleteRoles = (id: any) => {
    setLoading(true);
    dispatch(
      deleteRole({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(
            PROJECT_APIS.getProjectRolesById({ other: selectedProject })
          );
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
              >{`${item.firstName} ${item.surName}`}
              <br />
              </span>
            );
          }
        })}
      </>
    );
  };

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
  const myRole = getMyRole();
  const myRolePermissions = myRole.rolePermission;
  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.name}>Role name</Typography>
      </Grid>

      <Grid item xs={12} className={classes.dataContainer}>
        {loading && <CircularProgress size={20} className={classes.progress} />}
        {getAllProjectRoles.length > 0 ? (
          getAllProjectRoles.map((role: ProjectRolesInterface) => {
            const { rolePermission, memberPermission } = role;
            const haveAnyRolePermission = Object.values(rolePermission).some(
              (p) => p
            );
            const haveAnyMemberPermission = Object.values(
              memberPermission
            ).some((p) => p);
            return (
              <div className={classes.roleChip} key={role._id}>
                <div className={classes.roleInner}>
                  <CustomStack>
                    <SubHeadingTag sx={{textTransform: 'capitalize'}}>{role.name}</SubHeadingTag>
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
                  {role.admin === true && (
                    <SubHeadingTag
                      sx={{
                        fontWeight: "500",
                        fontSize: 14,
                      }}
                    >
                      Project admin
                    </SubHeadingTag>
                  )}
                  {role.admin !== true && (
                    <Grid container gap={3}>
                      {rolePermission && (
                        <>
                          {haveAnyRolePermission === true && (
                            <Grid item width="250px">
                              <CustomStack
                                gap={1}
                                divider={
                                  <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ borderWidth: "1px" }}
                                  />
                                }
                              >
                                <SubHeadingTag>
                                  Role &nbsp;
                                </SubHeadingTag>
                                {rolePermission.create === true && (
                                  <SubLabelTag>Create</SubLabelTag>
                                )}
                                {rolePermission.edit === true && (
                                  <SubLabelTag>Edit</SubLabelTag>
                                )}
                                {rolePermission.delete === true && (
                                  <SubLabelTag>Delete</SubLabelTag>
                                )}
                              </CustomStack>
                            </Grid>
                          )}
                        </>
                      )}
                      {memberPermission && (
                        <Grid item width="250px">
                          {haveAnyMemberPermission === true && (
                            <CustomStack
                              gap={1}
                              divider={
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{ borderWidth: "2px" }}
                                />
                              }
                            >
                              <SubHeadingTag>
                                Member &nbsp;
                              </SubHeadingTag>
                              {memberPermission.create === true && (
                                <SubLabelTag>Create</SubLabelTag>
                              )}
                              {memberPermission.edit === true && (
                                <SubLabelTag>Edit</SubLabelTag>
                              )}
                              {memberPermission.delete === true && (
                                <SubLabelTag>Delete</SubLabelTag>
                              )}
                            </CustomStack>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  )}
                </div>
                <div className={classes.roleMenu}>
                  {/* <img src={assets.moreIcon} className={`width-16`} /> */}
                  {(myRolePermissions.edit === true ||
                    myRolePermissions.delete === true) && (
                    <RoleMenu
                      role={role}
                      userRole={myRole}
                      onEdit={() => handleEditRoles(role)}
                      onDelete={() => handleDeleteRoles(role?._id)}
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NoData title="No data found!" />
        )}
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
    borderBottom: "1px solid #D3D4D9",
  },
  name: {
    fontSize: 12,
    color: colors.textGrey,
    fontWeight: 500,
  },
  dataContainer: {
    paddingBottom: "100px",
    height: "680px",
    overflowY: "auto",
  },
  roleChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
    borderBottom: "1px solid #E0E0E0",
  },
  roleInner: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
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
