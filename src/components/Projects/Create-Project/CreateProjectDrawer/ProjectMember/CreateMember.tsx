import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Typography } from "@material-ui/core";
import InputText from "../../../../Utills/Inputs/InputText";
import SelectDropdown from "../../../../Utills/Inputs/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { mapGroups } from "helpers/project.helper";
import {
  createMember,
  getGroup,
  getRolesById,
} from "redux/action/project.action";
import { toast } from "react-toastify";

const MemberDialog = () => {
  const { documentDrawer, groupList, rolesList, selectedProject } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [groups, setGroups] = useState();
  const [roles, setRoles] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [selectRoles, setSelectRoles] = useState<any>();

  const [open, setOpen] = React.useState(false);

  const classes = useStyle();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getGroup({ other: selectedProject }));
  }, []);
  useEffect(() => {
    dispatch(getRolesById({ other: selectedProject }));
  }, []);
  useEffect(() => {
    if (groupList) {
      const newGroups = mapGroups(groupList);
      setGroups(newGroups);
    }
  }, [groupList]);

  useEffect(() => {
    console.log("role lisr here", rolesList);
    if (rolesList) {
      const newRoles = mapGroups(rolesList);
      setRoles(newRoles);
    }
  }, [rolesList]);

  const handleOk = () => {
    handleClose();
    const payload = {
      body: {
        email: name,
        roleId: selectRoles?.value,
        groupId: selectGroups?.value,
        subContractor: selectGroups?.value,
      },
      success: () => {
        toast.success("Member created successfully");
        handleClose();
        // dispatch(getFolder({ other: selectedProject }));
      },
      other: selectedProject,
    };
    dispatch(createMember(payload));
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={handleClickOpen}
      >
        Add a member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.body}>
            <div>
              <InputText
                placeholder="Search or/and add email"
                onChange={handleNameChange}
              />
            </div>
            <div className={classes.meta}>
              <SelectDropdown
                title="Role"
                data={roles}
                handleChange={(e: any) => setSelectRoles(e)}
              />
            </div>
            <div className={classes.meta}>
              <SelectDropdown
                title="Group"
                data={groups}
                handleChange={(e: any) => setSelectGroups(e)}
              />
            </div>

            <Typography variant="h5">Subcontractor Company</Typography>
            <div className={classes.meta}>
              <SelectDropdown
                title="Name"
                data={groups}
                handleChange={(e: any) => setSelectGroups(e)}
              />
            </div>
            {/* <div></div> */}
          </div>
          {/* <InputText/>
          <SelectDropdown title="Role"/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" variant="contained">
            Add
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
    width: 280,
  },
  meta: {
    marginTop: 10,
  },
});
