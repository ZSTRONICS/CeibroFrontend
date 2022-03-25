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
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";

interface AddRoleProps {}

const AddRole: React.FC<AddRoleProps> = () => {
  const classes = useStyles();
  const roles = ["create", "edit", "delete", "self-made"];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTimeProfile, setIsTimeProfile] = useState(false);
  const { roleDrawer, role } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(projectActions.closeProjectRole());
  };

  const handleOk = () => {};

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
    }
  };

  return (
    <Dialog open={roleDrawer} onClose={handleClose}>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <Input value={role.name} title="Role" placeholder="Enter role name" />
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
