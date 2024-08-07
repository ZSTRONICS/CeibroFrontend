import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Clear from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import colors from "assets/colors";
import { CButton } from "components/Button";
import { CustomStack } from "components/CustomTags";
import { getUniqueObjectsFromArr } from "components/Utills/Globals/Common";
import Input from "components/Utills/Inputs/Input";
import InputHOC from "components/Utills/Inputs/InputHOC";
import InputSwitch from "components/Utills/Inputs/InputSwitch";
import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createRole,
  getAvailableProjectMembers,
  PROJECT_APIS,
  updateRole,
} from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";
interface AddRoleProps {}

const RoleDrawer: React.FC<AddRoleProps> = (props: any) => {
  const classes = useStyles();
  // const roles = ["create", "edit", "delete"];

  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { roleDrawer, selectedProject, selectedRole } = useSelector(
    (state: RootState) => state.project
  );

  const [availableUsers, setAvailableUsers] = useState<dataInterface[]>([]);
  const [selectedRolMember, setSelectedRoleMember] = useState<dataInterface[]>(
    []
  );

  const [rolePermissionLocal, setRolePermissionLocal] = useState(
    selectedRole.rolePermission
  );
  const [memberPermissionLocal, setmemberPermissionLocal] = useState(
    selectedRole.memberPermission
  );
  const dispatch = useDispatch();

  const isAnyPermissionTrue =
    Object.values(rolePermissionLocal).some((p) => p) ||
    Object.values(memberPermissionLocal).some((p) => p);

  const handleClose = () => {
    setmemberPermissionLocal({
      create: false,
      edit: false,
      delete: false,
    });

    setRolePermissionLocal({
      create: false,
      edit: false,
      delete: false,
    });

    setIsMember(false);
    setIsRole(false);

    dispatch(
      projectActions.setSelectedRole({
        ...selectedRole,
        _id: "",
        admin: false,
        creator: "",
        isDefaultRole: false,
        memberPermission: { create: false, delete: false, edit: false },
        rolePermission: { create: false, delete: false, edit: false },
        members: [],
        name: "",
        project: "",
      })
    );

    setAvailableUsers([]);
    setSelectedRoleMember([]);

    dispatch(projectActions.closeProjectRole());
  };

  // const handleChange = (name: string, value: boolean) => {
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  const handleOk = () => {
    const payload = {
      body: {
        name: selectedRole.name,
        admin: selectedRole.admin,
        members: selectedRole.members,
        project: selectedProject,
        rolePermission: rolePermissionLocal,
        memberPermission: memberPermissionLocal,
      },
      success: () => {
        toast.success("Role created successfully");
        dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
        handleClose();
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createRole(payload));
  };

  const checkKey = (arr: any[], key: any) => {
    return arr.some((el: any) => el.hasOwnProperty(key));
  };

  let memberIds: string[] = [];
  const checkKeyInMember = checkKey(selectedRole.members, "_id");
  if (checkKeyInMember === true) {
    memberIds = selectedRole.members.map((item: any) => item._id);
  }

  const handleUpdate = () => {
    const payload = {
      body: {
        name: selectedRole.name,
        admin: selectedRole.admin,
        members: checkKeyInMember ? memberIds : selectedRole.members,
        project: selectedRole.project,
        rolePermission: rolePermissionLocal,
        memberPermission: memberPermissionLocal,
      },

      success: () => {
        toast.success("Role Updated successfully");
        dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
        handleClose();
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedRole._id,
    };
    setLoading(true);
    dispatch(updateRole(payload));
  };

  const handleSubmit = () => {
    if (selectedRole._id !== "") {
      handleUpdate();
    } else {
      handleOk();
    }
  };

  const handleChangeRole = (e: any) => {
    setIsRole(e.target?.checked);
    if (e.target?.checked === false) {
      setRolePermissionLocal({
        create: false,
        edit: false,
        delete: false,
      });
      dispatch(
        projectActions.setSelectedRole({
          ...selectedRole,
          rolePermission: rolePermissionLocal,
        })
      );
    }
  };

  const handleChangeMember = (e: any) => {
    setIsMember(e.target?.checked);
    if (e.target?.checked === false) {
      setmemberPermissionLocal({
        create: false,
        edit: false,
        delete: false,
      });
      dispatch(
        projectActions.setSelectedRole({
          ...selectedRole,
          rolePermission: rolePermissionLocal,
        })
      );
    }
  };

  const handleAdminChange = (e: any) => {
    if (e.target?.checked === true) {
      setRolePermissionLocal({ create: true, edit: true, delete: true });
      setmemberPermissionLocal({ create: true, edit: true, delete: true });
    } else {
      if (e.target?.checked === false) {
        setmemberPermissionLocal({
          create: false,
          edit: false,
          delete: false,
        });

        setRolePermissionLocal({
          create: false,
          edit: false,
          delete: false,
        });

        setIsMember(false);
        setIsRole(false);
      }
    }

    dispatch(
      projectActions.setSelectedRole({
        ...selectedRole,
        admin: e.target?.checked,
        rolePermission: rolePermissionLocal,
        memberPermission: memberPermissionLocal,
      })
    );
  };

  const handleRolesChange = (e: any) => {
    setRolePermissionLocal({
      ...rolePermissionLocal,
      [e.target.name]: e.target.checked,
    });
    dispatch(
      projectActions.setSelectedRole({
        ...selectedRole,
        rolePermission: rolePermissionLocal,
      })
    );
  };

  const handleMemberChange = (e: any) => {
    setmemberPermissionLocal({
      ...memberPermissionLocal,
      [e.target.name]: e.target.checked,
    });
    dispatch(
      projectActions.setSelectedRole({
        ...selectedRole,
        rolePermission: rolePermissionLocal,
      })
    );
  };

  const handleNameChange = (e: any) => {
    dispatch(
      projectActions.setSelectedRole({
        ...selectedRole,
        name: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (selectedRole._id && roleDrawer) {
      // dispatch(
      //   PROJECT_APIS.getProjectRolesById ({
      //     other: selectedProject,
      //     success: (res) => {
      //       if (res.data.result.length > 0) {
      //         setIsRole(true);
      //       }
      //       if (res.data.result.member.length > 0) {
      //         setIsMember(true);
      //       }
      //       // if (res.data.timeProfile.length > 0) {
      //       //   setIsTimeProfile(true);
      //       // }
      //     },
      //   })
      // );
    }
  }, [roleDrawer, selectedRole._id]);

  useEffect(() => {
    dispatch(
      getAvailableProjectMembers({
        other: selectedProject,
        success: (res) => {
          const availableMembers =
            res.data.result.map((user: any) => ({
              label: `${user.firstName} ${user.surName}`,
              value: user.email,
              id: user._id,
            })) || [];
          setAvailableUsers(availableMembers);
        },
      })
    );
  }, [roleDrawer]);

  useEffect(() => {
    if (selectedRole._id !== "") {
      if (
        selectedRole.rolePermission.create === true ||
        selectedRole.rolePermission.edit === true ||
        selectedRole.rolePermission.delete === true
      ) {
        setIsRole(true);
      }

      if (
        selectedRole.memberPermission.create === true ||
        selectedRole.memberPermission.edit === true ||
        selectedRole.memberPermission.delete === true
      ) {
        setIsMember(true);
      }
      setmemberPermissionLocal(selectedRole.memberPermission);
      setRolePermissionLocal(selectedRole.rolePermission);
      const availableMembers =
        selectedRole.members.map((user: any) => ({
          label: `${user.firstName} ${user.surName}`,
          value: user._id,
          id: user._id,
        })) || [];
      setSelectedRoleMember(
        selectedRole._id !== "" ? availableMembers : availableUsers
      );
    }
  }, [roleDrawer]);

  const uniqueMember = getUniqueObjectsFromArr([
    ...selectedRolMember,
    ...availableUsers,
  ]);

  return (
    <Dialog open={roleDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            value={selectedRole.name}
            title="Role"
            placeholder="Enter role name"
            onChange={handleNameChange}
          />
          <br />
          <Autocomplete
            sx={{ border: "none" }}
            multiple
            id="project_owners1"
            disablePortal
            filterSelectedOptions
            disableCloseOnSelect
            limitTags={1}
            value={selectedRolMember}
            options={uniqueMember}
            size="small"
            onChange={(event, value) => {
              setSelectedRoleMember([...value]);
              const memberIds = value.map((item: any) => item.id);
              dispatch(
                projectActions.setSelectedRole({
                  ...selectedRole,
                  members: [...memberIds],
                })
              );
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                return (
                  <Chip
                    sx={{
                      height: "25px",
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: "#F1B740",
                      color: colors.white,
                      borderRadius: "4px",
                    }}
                    deleteIcon={
                      <Clear
                        style={{
                          color: "#f1b740",
                          fontSize: "15px",
                          borderRadius: "50%",
                          background: "white",
                        }}
                      />
                    }
                    label={option?.label}
                    {...getTagProps({ index })}
                  />
                );
              })
            }
            renderInput={(params) => (
              <InputHOC title="Members">
                <TextField
                  {...params}
                  placeholder="Select member(s)"
                  sx={{
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    // "@media(hover) .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    //   {
                    //     border: "none",
                    //   },
                  }}
                />
              </InputHOC>
            )}
          />

          <br />
          <HorizontalBreak color={colors.grey} />
          <div className={classes.optionsWrapper}>
            <div className={classes.option}>
              <Typography className={classes.optionTitle}>
                Project admin
              </Typography>
              <InputSwitch
                value={selectedRole.admin}
                onChange={handleAdminChange}
                label=""
              />
            </div>

            {!selectedRole.admin && (
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
                  <div className={classes.option} style={{ paddingBottom: 5 }}>
                    {/* {roles
                      .map((myRole: string, i) => {
                        return (
                          <InputCheckbox
                            key={i}
                            label={myRole}
                            checked={true}
                            onChange={(checked) =>
                              handleAccessChange(checked, myRole, "roles")
                            }
                          />
                        );
                      })} */}
                    <CustomStack
                      gap={1}
                      divider={
                        <Divider
                          textAlign="center"
                          variant="middle"
                          orientation="vertical"
                          flexItem
                          sx={{ borderWidth: "2px", height: "25px" }}
                        />
                      }
                    >
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={rolePermissionLocal.create}
                            onChange={handleRolesChange}
                            name="create"
                          />
                        }
                        label="Create"
                      />
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={rolePermissionLocal.edit}
                            onChange={handleRolesChange}
                            name="edit"
                          />
                        }
                        label="Edit"
                      />
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={rolePermissionLocal.delete}
                            onChange={handleRolesChange}
                            name="delete"
                          />
                        }
                        label="Delete"
                      />
                    </CustomStack>
                  </div>
                )}
                {/* <HorizontalBreak /> */}
                {/* <div className={classes.option}>
                  <Typography className={classes.optionTitle}>
                    Work profile
                  </Typography>
                  <InputSwitch
                    value={isTimeProfile}
                    label=""
                    onChange={handleChangeTimeProfile}
                  />
                </div> */}
                {/* {isTimeProfile && (
                  <div className={classes.option} style={{ paddingBottom: 5 }}>
                    {roles
                      ?.filter((item) => item !== "self-made")
                      .map((myRole: string, i) => {
                        return (
                          <InputCheckbox
                            key={i}
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
                <HorizontalBreak /> */}
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
                  <div className={classes.option} style={{ paddingBottom: 5 }}>
                    <CustomStack
                      gap={1}
                      divider={
                        <Divider
                          orientation="vertical"
                          textAlign="center"
                          variant="middle"
                          flexItem
                          sx={{
                            borderWidth: "2px",
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      }
                    >
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={memberPermissionLocal.create}
                            onChange={handleMemberChange}
                            name="create"
                          />
                        }
                        label="Create"
                      />
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={memberPermissionLocal.edit}
                            onChange={handleMemberChange}
                            name="edit"
                          />
                        }
                        label="Edit"
                      />
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#F1B740",
                              },
                            }}
                            checked={memberPermissionLocal.delete}
                            onChange={handleMemberChange}
                            name="delete"
                          />
                        }
                        label="Delete"
                      />
                    </CustomStack>
                  </div>
                )}
              </>
            )}
            <HorizontalBreak />
          </div>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          paddingRight: 22,
          paddingTop: 0,
          gap: "10px",
          paddingBottom: "16px",
        }}
      >
        {/* <Button
          variant="outlined"
          className={classes.cancel}
          onClick={handleClose}
          color="secondary"
          autoFocus
        >
          Cancel
        </Button> */}
        <CButton
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#605C5C",
            fontSize: 12,
            fontWeight: "700",
            borderColor: "#9D9D9D",
          }}
          label={"Cancel"}
        />

        <Button
          className={classes.ok}
          color="primary"
          variant="contained"
          disabled={
            isAnyPermissionTrue === true || selectedRole.admin === true
              ? false
              : true
          }
          onClick={handleSubmit}
        >
          {selectedRole._id !== "" ? "Update" : "Add"}
          {/* {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleDrawer;
const MuiCheckbox = styled(Checkbox)`
  color: #adb5bd;
`;
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
    maxHeight: 450,
    height: "100%",
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
    paddingTop: 8,
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
