import { CircularProgress, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Autocomplete,
  TextField,
  Chip,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import colors from "assets/colors";
import CButton from "components/Button/Button";
import InputHOC from "components/Utills/Inputs/InputHOC";
import { mapGroups } from "helpers/project.helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createMember,
  getAvailableProjectMembers,
  getGroup,
  getMember,
  PROJECT_APIS,
  updateMember,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import SelectDropdown, {
  dataInterface,
} from "../../../../Utills/Inputs/SelectDropdown";
import Clear from "@mui/icons-material/Clear";
import { memberTemplate } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { getUniqueObjectsFromArr } from "components/Utills/Globals/Common";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { EditMemberLabelTag, EditMemberNameTag } from "components/CustomTags";
import assets from "assets/assets";

const MemberDialog = () => {
  const {
    documentDrawer,
    groupList,
    getAllProjectRoles,
    selectedProject,
    userPermissions,
    memberDrawer,
    selectedMember,
  } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState();
  const [roles, setRoles] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [selectRoles, setSelectRoles] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [availableUsers, setAvailableUsers] = useState<dataInterface[]>([]);
  // const [selectedMemberLocal,setSelectedMemberLocal]= useState<dataInterface[]>([])

  const [selectedUser, setSelectedUser] = useState<any[]>([]);

  const classes = useStyle();
  const isDiabled = !loading ? false : true;
  const handleClickOpen = () => {
    dispatch(projectActions.openProjectMemberDrawer());
  };

  const handleClose = () => {
    dispatch(projectActions.closeProjectMemberDrawer());
    dispatch(projectActions.setSelectedMember(memberTemplate));
  };

  useEffect(() => {
    dispatch(
      getAvailableProjectMembers({
        other: selectedProject,
        success: (res) => {
          const availableMembers = res.data.result.map((user: any) => ({
            label: `${user.firstName} ${user.surName}`,
            value: user.email,
            id: user._id,
          }));
          setAvailableUsers(availableMembers);
        },
      })
    );
    dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
    dispatch(getGroup({ other: selectedProject }));
  }, [memberDrawer]);

  useEffect(() => {
    if (groupList) {
      const newGroups = mapGroups(groupList);
      setGroups(newGroups);
    }
  }, [groupList]);

  useEffect(() => {
    if (getAllProjectRoles) {
      const newRoles = mapGroups(getAllProjectRoles);
      setRoles(newRoles);
    }
  }, [getAllProjectRoles]);

  // const havePermission = checkMemberPermission(
  //   userPermissions,
  //   avaialablePermissions.create_permission
  // );

  const handleOk = (e: any) => {
    e.stopPropagation();
    const payload = {
      body: {
        user: selectedUser.map((user: any) => user.id),
        role: selectRoles?.value,
        group: selectGroups?.value,
      },
      success: () => {
        toast.success("Member created successfully");
        dispatch(getMember({ other: selectedProject }));
        handleClose();
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createMember(payload));
  };

  const handleUpdate = (e: any) => {
    e.stopPropagation();
    const payload = {
      body: {
        // user: selectedMember.user._id,
        roleId: selectRoles?.value,
        groupId: selectGroups?.value,
      },
      success: () => {
        toast.success("Member updated successfully");
        dispatch(getMember({ other: selectedProject }));
        handleClose();
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedMember._id,
    };
    dispatch(updateMember(payload));
  };

  //   useEffect(() => {
  //     if (selectedMember._id !== "") {

  // }
  //   }, [selectedMember._id]);

  const handleSubmit = (e: any) => {
    if (selectedMember._id) {
      handleUpdate(e);
    } else {
      handleOk(e);
    }
  };
  const letters =
    selectedMember?.user?.firstName?.[0]?.toUpperCase?.() +
    (selectedMember?.user?.surName?.[0]?.toUpperCase?.() || "");
  const fixedGroup = [
    {
      label: selectedMember.group.name,
      value: selectedMember.group._id,
    },
  ];
  const fixedRole = [
    {
      label: selectedMember?.role?.name,
      value: selectedMember.role._id,
    },
  ];

  return (
    <div>
      <CButton
        variant="outlined"
        color="primary"
        label="Add"
        sx={{ fontSize: 14, fontWeight: "700" }}
        // className={classes.btn}
        // disabled={havePermission ? false : true}
        onClick={handleClickOpen}
      />
      <Dialog
        open={memberDrawer}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.body}>
            {selectedMember._id !== "" ? (
              <Grid item container gap={0.8}>
                <Grid item>
                  {selectedMember.user.profilePic ? (
                    <Avatar
                      alt="avater"
                      src={selectedMember.user?.profilePic}
                      variant="rounded"
                      sx={{ width: "65px", height: "65px" }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{ width: "65px", height: "65px" }}
                    >
                      {letters}
                    </Avatar>
                  )}
                </Grid>
                <Grid item>
                  <CustomStack gap={0.6}>
                    <EditMemberNameTag>
                      {`${selectedMember.user.firstName} ${selectedMember.user.surName}`}
                    </EditMemberNameTag>
                    <EditMemberLabelTag>
                      {selectedMember.user.companyName}
                    </EditMemberLabelTag>
                  </CustomStack>
                  <CustomStack gap={0.6}>
                    <assets.EmailIcon sx={{ color: "#7D7E80" }} />
                    {selectedMember.user.workEmail ? (
                      <EditMemberNameTag>
                        {`${selectedMember.user.workEmail}`}
                      </EditMemberNameTag>
                    ) : (
                      <EditMemberLabelTag>N/A</EditMemberLabelTag>
                    )}
                  </CustomStack>

                  <CustomStack gap={0.6}>
                    <assets.CallIcon sx={{ color: "#7D7E80" }} />
                    {selectedMember.user.companyPhone ? (
                      <EditMemberNameTag>
                        {`${selectedMember.user.companyPhone}`}
                      </EditMemberNameTag>
                    ) : (
                      <EditMemberLabelTag>N/A</EditMemberLabelTag>
                    )}
                  </CustomStack>
                </Grid>
                <Divider sx={{ width: "100%", py: "10px" }} />
              </Grid>
            ) : (
              <InputHOC title="Member">
                <Autocomplete
                  sx={{ width: "100%" }}
                  multiple={true}
                  id="project_members1"
                  filterSelectedOptions
                  disableCloseOnSelect
                  limitTags={1}
                  options={availableUsers}
                  size="small"
                  onChange={(event, value) => {
                    setSelectedUser([...value]);
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
                    <TextField
                      sx={{
                        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "none",
                          padding: "0px",
                        },
                        // border: "1px solid #DBDBE5",
                        // borderRadius: "4px",
                      }}
                      {...params}
                      name="members"
                      // label="Owners"
                      placeholder="Select member(s)"
                    />
                  )}
                />
              </InputHOC>
            )}

            <div
              className={classes.meta}
              style={{ zIndex: 10, position: "relative", margin: "20px 0" }}
            >
              <SelectDropdown
                title="Role"
                defaultValue={fixedRole}
                data={roles}
                handleChange={(e: any) => setSelectRoles(e)}
                zIndex={12}
                noOptionMessage="No role available"
              />
            </div>
            <div className={classes.meta}>
              <SelectDropdown
                defaultValue={fixedGroup}
                title="Group"
                data={groups}
                noOptionMessage="No group available"
                handleChange={(e: any) => setSelectGroups(e)}
              />
            </div>

            {/* <Typography variant="h5" className={classes.subContractor}>
              Subcontractor Company
            </Typography>
            <div className={classes.meta}>
              <SelectDropdown
                title="Name"
                data={groups}
                handleChange={(e: any) => setSelectGroups(e)}
                zIndex={5}
              />
            </div> */}
          </div>

          {/* <InputText/>
          <SelectDropdown title="Role"/> */}
        </DialogContent>
        <Divider sx={{ color: "1px solid #ECF0F1 ", margin: "10px 25px" }} />
        <DialogActions
          style={{
            paddingRight: "25px",
          }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={isDiabled}
          >
            {selectedMember._id !== "" ? "Update" : "Add"}
            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberDialog;

const useStyle = makeStyles({
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  body: {
    width: 360,
    // minHeight: 300,
    maxHeight: 450,
    height: "100%",
  },
  meta: {
    marginTop: 10,
  },
  subContractor: {
    fontSize: 14,
    fontWeight: 700,
    paddingTop: 10,
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
  inputHoc: {
    "& .makeStyles-titleWrapper-69": {
      padding: 0,
    },
  },
});
