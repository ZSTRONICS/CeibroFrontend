import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import "./roles-table.css";
import colors from "assets/colors";
import React, { useEffect, useState } from "react";
import InputCheckbox from "../../../../Utills/Inputs/InputCheckbox";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import projectActions, {
  deleteRole,
  getRoles,
  getRolesById,
} from "redux/action/project.action";
import assets from "assets/assets";
import { RoleInterface } from "constants/interfaces/project.interface";
import { checkRolePermission } from "helpers/project.helper";
import { avaialablePermissions } from "config/project.config";
import RoleMenu from "./RoleMenu";
import { toast } from "react-toastify";
import {
  CustomBadge,
  CustomStack,
} from "components/TaskComponent/Tabs/TaskCard";
import { fontSize } from "@material-ui/system";

// store?: RootState
const RolesTable = () => {
  const { selectedProject, rolesList, selectedRole, userPermissions } =
    useSelector((state: RootState) => state?.project);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);

  const isDiabled = !loading ? false : true;
  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      dispatch(getRoles(payload));
    }
  }, [selectedProject]);

  const havePermission = checkRolePermission(
    userPermissions,
    avaialablePermissions.edit_permission
  );
  const handleRoleClick = (id: any) => {
    if (havePermission) {
      dispatch(projectActions.setSelectedRole(id));
      dispatch(projectActions.openProjectRole());
    }
  };

  const handleDelete = (id: any) => {
    setLoading(true);
    dispatch(
      deleteRole({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(getRoles({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.name}>Role name</Typography>
      </Grid>

      <Grid item xs={12} className={classes.dataContainer}>
        {loading && <CircularProgress size={20} className={classes.progress} />}
        {rolesList?.map((role: RoleInterface) => {
          return (
            <div
              className={classes.roleChip}
              onClick={() => handleRoleClick(role?._id)}
            >
              <div className={classes.roleInner}>
                <Typography className={classes.roleName}>
                  {role.name}

                  <CustomBadge
                    overlap="circular"
                    color="primary"
                    badgeContent={
                      <Tooltip title={"name"}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          5
                        </span>
                      </Tooltip>
                    }
                  ></CustomBadge>
                </Typography>
                <div className={classes.roleDetail}>
                  {role.admin && (
                    <Grid
                      container
                      // xs={12}
                      // md={3}
                      // sm={4}
                      className={classes.roleItems}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      <CustomStack
                        mt={1}
                        divider={
                          <Divider
                            orientation="vertical"
                            flexItem
                            style={{
                              padding: "0 1px",
                            }}
                          />
                        }
                        gap={1}
                      >
                        <Typography className={classes.typoHeader}>
                          Role
                        </Typography>
                        <Typography className={classes.Content}>
                          Create
                        </Typography>
                        <Typography className={classes.Content}>
                          Edit
                        </Typography>
                        <Typography className={classes.Content}>
                          Delete
                        </Typography>
                      </CustomStack>

                      <CustomStack
                        // ml={20}
                        className={classes.memberMenu}
                        mt={1}
                        divider={
                          <Divider
                            orientation="vertical"
                            flexItem
                            style={{
                              padding: "0 1px",
                            }}
                          />
                        }
                        gap={1}
                      >
                        <Typography
                          style={{
                            // marginLeft: "150px",
                            fontSize: "12px",
                            fontWeight: 800,
                          }}
                        >
                          Member
                        </Typography>
                        <Typography className={classes.Content}>
                          Create
                        </Typography>
                        <Typography className={classes.Content}>
                          Edit
                        </Typography>
                        <Typography className={classes.Content}>
                          Delete
                        </Typography>
                      </CustomStack>
                    </Grid>
                  )}
                  {(role?.roles?.length || 0) > 0 && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Role: &nbsp;
                      </Typography>
                      {role?.roles?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                  {(role?.member?.length || 0) > 0 && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Member: &nbsp;
                      </Typography>
                      {role?.member?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div
                className={classes.roleMenu}
                // style={{
                //   border: "2px solid",
                // }}
              >
                {/* <img src={assets.moreIcon} className={`width-16`} /> */}
                <RoleMenu
                  permissoin={havePermission}
                  onEdit={handleRoleClick}
                  onDelete={() => handleDelete(role?._id)}
                  name={role?.name}
                />
              </div>
            </div>
          );
        })}
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
