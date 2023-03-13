import { CircularProgress, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import colors from "assets/colors";
import CButton from "components/Button/Button";
import { mapGroups } from "helpers/project.helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createMember,
  getAvailableProjectMembers, getMember
} from "redux/action/project.action";

import { RootState } from "redux/reducers";
import CreateableSelectDropdown from "../../../../Utills/Inputs/CreateAbleSelect";
import SelectDropdown, {
  dataInterface
} from "../../../../Utills/Inputs/SelectDropdown";

const MemberDialog = () => {
  const {
    documentDrawer,
    groupList,
    getAllProjectRoles,
    selectedProject,
    userPermissions,
    memberDrawer,
  } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [groups, setGroups] = useState();
  const [roles, setRoles] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [selectRoles, setSelectRoles] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableUsers, setAvailableUsers] = useState<dataInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  const classes = useStyle();
  const isDiabled = !loading ? false : true;

  const handleClickOpen = () => {
    // setOpen(true);
    dispatch(projectActions.openProjectMemberDrawer());
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(projectActions.closeProjectMemberDrawer());
  };
  useEffect(() => {
    dispatch(
      getAvailableProjectMembers({
        other: selectedProject,
        success: (res) => {
          const availableMembers = res.data.result.map((user:any) => ({
            label: `${user.firstName} ${user.surName}`,
            value: user.email,
            id: user._id,
          })) || [];
          setAvailableUsers(availableMembers);
        },
      })
    );
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

  const handleOk = () => {
    const payload = {
      body: {
        user: selectedUser.map((user:any)=>user.id),
        role: selectRoles?.value,
        group: selectGroups?.value,
      },
      success: () => {
        toast.success("Member created successfully");
        dispatch(getMember({ other:  selectedProject }));
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
            <div>
              <CreateableSelectDropdown
              isMulti={true}
                title="Role"
                data={availableUsers}
                handleChange={(e: any) => setSelectedUser(e)}
                zIndex={12}
                noOptionMessage={"No user available"}
              />
              {/* <InputText
                placeholder="Search or/and add email"
                onChange={handleNameChange}
              /> */}
            </div>

            <div
              className={classes.meta}
              style={{ zIndex: 10, position: "relative" }}
            >
              <SelectDropdown
                title="Role"
                data={roles}
                handleChange={(e: any) => setSelectRoles(e)}
                zIndex={12}
                noOptionMessage="No role available"
              />
            </div>

            <div className={classes.meta}>
              <SelectDropdown
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
        <DialogActions
          style={{
            paddingRight: "25px",
          }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleOk}
            color="primary"
            variant="contained"
            disabled={isDiabled}
          >
            Add
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
    height:'100%'
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
});
