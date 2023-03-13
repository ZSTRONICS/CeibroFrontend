import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import colors from "assets/colors";
import Input from "components/Utills/Inputs/Input";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createGroup,
  getGroup,
  updateGroup,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";

interface AddGroupProps {}

const AddGroup: React.FC<AddGroupProps> = () => {
  const classes = useStyles();
  // const roles = ["create", "edit", "delete", "self-made"];
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isRole, setIsRole] = useState(false);
  // const [isMember, setIsMember] = useState(false);
  // const [isTimeProfile, setIsTimeProfile] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { groupDrawer, selectedGroup, selectedProject } = useSelector(
    (state: RootState) => state.project
  );
  const [name, setName] = useState(selectedGroup.name);

  const isDiabled = !loading ? false : true;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectGroup());
    setName("");
  };

  const handleOk = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("Group created successfully");
        dispatch(projectActions.closeProjectGroup());
        dispatch(getGroup({ other: selectedProject }));
        setName("");
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(createGroup(payload));
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    // if (selectedGroup) {
    //   dispatch(
    //     projectActions.setGroup({
    //       ...group,
    //       name: e.target?.value,
    //     })
    //   );
    // }
  };
  // useEffect(() => {
  //   if (selectedGroup && groupDrawer) {
  //     dispatch(
  //       getGroupById({
  //         other: selectedGroup,
  //         success: (res) => {
  //           setName(res.data.name);
  //         },
  //       })
  //     );
  //   }
  // }, [groupDrawer, selectedGroup]);

  const handleUpdate = () => {
    const payload = {
      body: { name },
      success: () => {
        toast.success("Group Updated successfully");
        dispatch(projectActions.closeProjectGroup());
        dispatch(getGroup({ other: selectedProject }));
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedGroup._id,
    };
    setLoading(true);

    dispatch(updateGroup(payload));
  };

  const handleSubmit = () => {
    if (selectedGroup._id) {
      handleUpdate();
    } else {
      handleOk();
    }
  };

  useEffect(() => {
    setName(selectedGroup.name);
  }, [selectedGroup]);

  return (
    <Dialog open={groupDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
            value={name}
            title="Group"
            placeholder="Enter group name"
            onChange={handleNameChange}
          />
          <br />
        </div>
      </DialogContent>
      <DialogActions className={classes.btnWraper}>
        <Button
          variant="outlined"
          className={classes.cancel}
          onClick={handleClose}
          color="secondary"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          className={classes.ok}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={isDiabled}
        >
          {selectedGroup._id ? "Update" : "Add"}

          {isDiabled && loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroup;

const useStyles = makeStyles({
  btnWraper: {
    "& .MuiButton-outlinedSecondary:hover": {
      backgroundColor: "transparent",
      border: "1px solid #9D9D9D",
    },
    padding: "12px 24px",
    gap: "10px",
  },
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
    "& .input-text": { fontWeight: "600 !important" },

    maxWidth: 370,
    width: 370,
    // height: 300,
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
    color: "#9D9D9D",
    borderColor: "#9D9D9D",
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
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
