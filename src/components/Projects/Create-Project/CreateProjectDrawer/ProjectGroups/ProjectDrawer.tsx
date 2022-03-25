import {
  Button,
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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  createRole,
  getRolesById,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { toast } from "react-toastify";

interface AddGroupProps {}

const AddGroup: React.FC<AddGroupProps> = () => {
  const classes = useStyles();
  const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);
  const { groupDrawer, role, selectedProject } = useSelector(
    (state: RootState) => state.project
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectGroup());
  };

  const handleOk = () => {
    dispatch(projectActions.closeProjectGroup());
    // const payload = {
    //   body: role,
    //   success: () => {
    //     toast.success("Role created successfully");
    //     dispatch(projectActions.closeProjectRole());
    //     dispatch(getRolesById({ other: selectedProject }));
    //   },
    //   other: selectedProject,
    // };
    // dispatch(createRole(payload));
  };

  const handleNameChange = (e: any) => {
    // dispatch(
    //   projectActions.setRole({
    //     ...role,
    //     name: e?.target?.value,
    //   })
    // );
  };

  return (
    <Dialog open={groupDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            value={role.name}
            title="Role"
            placeholder="Enter role name"
            onChange={handleNameChange}
          />
          <br />
          <HorizontalBreak color={colors.grey} />
          <h1>Add Group</h1>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={false} onClick={handleOk} color="primary">
          ok
        </Button>
        <Button onClick={handleClose} color="secondary" autoFocus>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroup;

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
});
