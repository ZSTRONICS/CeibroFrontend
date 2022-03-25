import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Input from "components/Utills/Inputs/Input";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import colors from "assets/colors";
import { RootState } from "redux/reducers";
import SelectDropdown from "components/Utills/Inputs/SelectDropdown";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";
import InputSwitch from "components/Utills/Inputs/InputSwitch";

interface AddRoleProps {}

const AddRole: React.FC<AddRoleProps> = () => {
  const classes = useStyles();
  const [isRole, setIsRole] = useState(false);
  const { roleDrawer } = useSelector((state: RootState) => state.project);

  const handleClose = () => {};

  const handleOk = () => {};

  const handleChangeRole = (e: any) => {
    setIsRole(e.target?.checked);
  };

  return (
    <Dialog open={roleDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input title="Role" placeholder="Enter role name" />
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
              <InputSwitch label="" />
            </div>
            <div className={classes.option}>
              <Typography className={classes.optionTitle}>Role</Typography>
              <InputSwitch
                value={isRole}
                label=""
                onChange={handleChangeRole}
              />
            </div>
            <div className={classes.option}>
              <Typography className={classes.optionTitle}>Member</Typography>
              <InputSwitch label="" />
            </div>
            <div className={classes.option}>
              <Typography className={classes.optionTitle}>
                Time profile
              </Typography>
              <InputSwitch label="" />
            </div>
          </div>
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
    maxWidth: 300,
    width: 300,
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
