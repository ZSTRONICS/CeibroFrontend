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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  createFolder,
  createGroup,
  createRole,
  getFolder,
  getGroup,
  getRolesById,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { toast } from "react-toastify";
import { List } from "lodash";
import { group } from "console";
import { mapGroups } from "helpers/project.helper";

interface AddGroupProps {}

const AddGroup: React.FC<AddGroupProps> = () => {
  const classes = useStyles();
  // const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);

  const [name, setName] = useState();
  const [groups, setGroups] = useState();
  const [selectGroups, setSelectGroups] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  const { documentDrawer, groupList, selectedProject } = useSelector(
    (state: RootState) => state.project
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectDocuments());
  };

  const handleOk = () => {
    const payload = {
      body: {
        groupId: selectGroups?.value,
        name,
      },
      success: () => {
        toast.success("Group created successfully");
        dispatch(projectActions.closeProjectDocuments());
        dispatch(getFolder({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createFolder(payload));
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    dispatch(getGroup({ other: selectedProject }));
  }, []);
  useEffect(() => {
    if (groupList) {
      const newGroups = mapGroups(groupList);
      setGroups(newGroups);
    }
  }, [groupList]);

  return (
    <Dialog open={documentDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            value={name}
            title="Folder"
            placeholder="Enter name"
            onChange={handleNameChange}
          />
          <br />
          <SelectDropdown
            title="Group"
            placeholder="Please select"
            data={groups}
            handleChange={(e: any) => setSelectGroups(e)}
          />
          <HorizontalBreak color={colors.grey} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary" disabled={isDiabled}>
          ok
          {isDiabled && loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
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
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
