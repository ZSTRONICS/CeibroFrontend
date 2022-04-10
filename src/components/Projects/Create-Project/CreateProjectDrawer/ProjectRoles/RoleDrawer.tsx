import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import colors from "assets/colors";
import Input from "components/Utills/Inputs/Input";
import InputCheckbox from "components/Utills/Inputs/InputCheckbox";
import InputSwitch from "components/Utills/Inputs/InputSwitch";
import SelectDropdown from "components/Utills/Inputs/SelectDropdown";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  createRole,
  getRoles,
  getRolesById,
  updateRole,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { toast } from "react-toastify";
// import permissionContext from "../../../../context/PermissionContext";
interface AddRoleProps {}

const AddRole: React.FC<AddRoleProps> = (props: any) => {
  console.log("role props", props);

  const classes = useStyles();
  const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isDiabled = !loading ? false : true;

  const { roleDrawer, role, selectedProject, selectedRole, userPermissions } =
    useSelector((state: RootState) => state.project);
  // const permissions = useContext(permissionContext);
  // console.log("permission", permissions);

  console.log("selected rolee", selectedRole);
  console.log("userPermissions", userPermissions?.roles);

  // console.log("permissions available", permissionsAvailable);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectRole());
  };

  // function checkRolePermission(permissions: any, permissionToCheck: any) {
  //   return permissions.includes(permissionToCheck);
  // }
  // const havePermission = checkRolePermission(userPermissions?.roles, "create");
  // console.log("havePermission", havePermission);

  const handleOk = () => {
    const payload = {
      body: role,
      success: () => {
        toast.success("Role created successfully");
        dispatch(projectActions.closeProjectRole());
        dispatch(getRoles({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createRole(payload));
  };

  const handleUpdate = () => {
    const payload = {
      body: {
        // const {name,admin,roles, member,timeProfile} =role
        name: role.name,
        admin: role.admin,
        roles: role.roles,
        member: role.member,
        timeProfile: role.timeProfile,
      },
      success: () => {
        toast.success("Role Updated successfully");
        dispatch(projectActions.closeProjectRole());
        dispatch(getRoles({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedRole,
    };
    setLoading(true);

    dispatch(updateRole(payload));
  };

  const handleSubmit = () => {
    if (selectedRole) {
      handleUpdate();
    } else {
      handleOk();
    }
  };

  const handleChangeRole = (e: any) => {
    setIsRole(e.target?.checked);
  };

  const handleChangeMember = (e: any) => {
    setIsMember(e.target?.checked);
  };

  const handleChangeTimeProfile = (e: any) => {
    setIsTimeProfile(e.target?.checked);
  };

  const handleAdminChange = (e: any) => {
    dispatch(
      projectActions.setRole({
        ...role,
        admin: e.target?.checked,
      })
    );
  };

  const handleAccessChange = (
    checked: boolean,
    access: string,
    fieldName: "roles" | "member" | "timeProfile"
  ) => {
    let existingField = role[fieldName];
    console.log("existingField: ", existingField);
    if (existingField) {
      if (checked) {
        existingField?.push?.(access);
      } else {
        existingField = existingField?.filter?.(
          (old: string) => old !== access
        );
      }

      dispatch(
        projectActions.setRole({
          ...role,
          [fieldName]: existingField,
        })
      );
    } else {
      if (checked) {
        dispatch(
          projectActions.setRole({
            ...role,
            [fieldName]: [access],
          })
        );
      }
    }
  };
  const handleNameChange = (e: any) => {
    dispatch(
      projectActions.setRole({
        ...role,
        name: e?.target?.value,
      })
    );
  };
  useEffect(() => {
    if (selectedRole && roleDrawer) {
      dispatch(
        getRolesById({
          other: selectedRole,
          success: (res) => {
            console.log("res is ", res.data.timeProfile);
            if (res.data.roles.length > 0) {
              setIsRole(true);
            }
            if (res.data.member.length > 0) {
              setIsMember(true);
            }
            if (res.data.timeProfile.length > 0) {
              setIsTimeProfile(true);
            }
          },
        })
      );
    }
  }, [roleDrawer, selectedRole]);
  return (
    <Dialog open={roleDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            value={role.name}
            title="Role"
            placeholder="Enter role name"
            onChange={handleNameChange}
          />
          <br />
          <SelectDropdown
            title="Member"
            placeholder="Please select"
            data={[]}
            value={[]}
            // handleChange={(e: any) => setSelectedUser(e)}
          />
          <br />
          <HorizontalBreak color={colors.grey} />
          <div className={classes.optionsWrapper}>
            <div className={classes.option}>
              <Typography className={classes.optionTitle}>
                Project admin
              </Typography>
              <InputSwitch
                value={role.admin}
                onChange={handleAdminChange}
                label=""
              />
            </div>

            {!role.admin && (
              <>
                <div className={classes.option}>
                  <Typography className={classes.optionTitle}>Role</Typography>
                  <InputSwitch
                    value={isRole}
                    label=""
                    onChange={handleChangeRole}
                  />
                </div>
                {isRole && (
                  <div
                    className={classes.option}
                    style={{ paddingLeft: 7, paddingBottom: 5 }}
                  >
                    {roles?.map((myRole: string) => {
                      return (
                        <InputCheckbox
                          label={myRole}
                          checked={role?.roles?.includes(myRole) || false}
                          onChange={(checked) =>
                            handleAccessChange(checked, myRole, "roles")
                          }
                        />
                      );
                    })}
                  </div>
                )}

                <div className={classes.option}>
                  <Typography className={classes.optionTitle}>
                    Member
                  </Typography>
                  <InputSwitch
                    value={isMember}
                    label=""
                    onChange={handleChangeMember}
                  />
                </div>
                {isMember && (
                  <div
                    className={classes.option}
                    style={{ paddingLeft: 7, paddingBottom: 5 }}
                  >
                    {roles?.map((myRole: string) => {
                      return (
                        <InputCheckbox
                          label={myRole}
                          checked={role?.member?.includes?.(myRole) || false}
                          onChange={(checked) =>
                            handleAccessChange(checked, myRole, "member")
                          }
                        />
                      );
                    })}
                  </div>
                )}
                <div className={classes.option}>
                  <Typography className={classes.optionTitle}>
                    Time profile
                  </Typography>
                  <InputSwitch
                    value={isTimeProfile}
                    label=""
                    onChange={handleChangeTimeProfile}
                  />
                </div>
                {isTimeProfile && (
                  <div
                    className={classes.option}
                    style={{ paddingLeft: 7, paddingBottom: 5 }}
                  >
                    {roles?.map((myRole: string) => {
                      return (
                        <InputCheckbox
                          label={myRole}
                          checked={
                            role?.timeProfile?.includes?.(myRole) || false
                          }
                          onChange={(checked) =>
                            handleAccessChange(checked, myRole, "timeProfile")
                          }
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
            <HorizontalBreak />
          </div>
        </div>
      </DialogContent>
      <DialogActions style={{ paddingRight: 22, paddingTop: 0 }}>
        <Button
          className={classes.cancel}
          onClick={handleClose}
          color="secondary"
          autoFocus
        >
          cancel
        </Button>
        <Button
          className={classes.ok}
          color="primary"
          variant="contained"
          disabled={isDiabled}
          onClick={handleSubmit}
        >
          {selectedRole ? "update" : "ok"}
          {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRole;

const useStyles = makeStyles({
  menuWrapper: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },
  dropdownWrapper: {
    maxWidth: 370,
    width: 370,
    height: 300,
  },
  optionsWrapper: {
    width: "100%",
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  cancel: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.textGrey,
  },
  ok: {
    fontSize: 12,
    fontWeight: 700,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    // marginTop: "50px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
