import { makeStyles, Typography } from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import colors from "../../../../../assets/colors";
import assets from "../../../../../assets/assets";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { ConfirmDescriptionTag } from "components/CustomTags";
import CButton from "components/Button/Button";
import { IconButton } from "@mui/material";
import { ProjectRolesInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";

interface RoleMenuProps {
  role: ProjectRolesInterface;
  userRole: ProjectRolesInterface;
  onEdit: any;
  onDelete: any;
}
const RoleMenu: React.FC<RoleMenuProps> = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const confirm = useConfirm();
  let canEdit = props.userRole.rolePermission.edit;
  let canDelete = props.userRole.rolePermission.delete;
  const userRole = props.userRole;
  const role = props.role;

  if (canEdit === true && userRole.admin === false) {
    if (role.admin === true) {
      canEdit = false;
    }
    if (String(role._id) === String(userRole._id)) {
      canEdit = false;
    }
  }
  
  if (canDelete === true && userRole.admin === false) {
    if (role.admin === true) {
      canDelete = false;
    }
    if (String(role._id) === String(userRole._id)) {
      canDelete = false;
    }
  }

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const handleEdit = (e: any) => {
    handleToggle(e);
    props.onEdit();

  };

  const handleDelete = (e: any) => {
    handleToggle(e);
    e.preventDefault();
    e.stopPropagation();
    confirm({
      title: (
        <CustomStack gap={1}>
          <assets.ErrorOutlineOutlinedIcon /> Confirmation
        </CustomStack>
      ),
      description: (
        <ConfirmDescriptionTag sx={{ pt: 2 }}>
          Are you confirm want to delete this role?
        </ConfirmDescriptionTag>
      ),
      titleProps: { color: "red", borderBottom: "1px solid #D3D4D9" },
      confirmationText: "Remove",
      confirmationButtonProps: {
        sx: {
          textTransform: "capitalize",
          padding: "4px 15px",
          color: "#FA0808",
          borderColor: "#FA0808",
          marginRight: "10px",
        },
        variant: "outlined",
      },
      cancellationText: (
        <CButton
          variant="contained"
          elevation={1}
          styles={{
            color: "#605C5C",
            backgroundColor: "#ECF0F1",
            fontSize: 12,
            fontWeight: "bold",
          }}
          label={"Cancel"}
        />
      ),
    }).then(() => {
      props.onDelete();
    });
  };
  const showDropdown = canEdit===false && canDelete===false

  return (<>{ showDropdown===false &&  <div className="dropdown">
      <IconButton disableRipple disableTouchRipple onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} alt="" />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            {canEdit === true && (
              <div onClick={handleEdit} className={classes.btnContainer}>
                Edit
              </div>
            )}

            {canDelete === true && (
              <>
                {" "}
                {canEdit === true && <hr className={classes.break} />}
                <div
                  onClick={handleDelete}
                  className={classes.btnContainer}
                  style={{ color: "#FA0808" }}
                >
                  Delete
                </div>
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </div>}
  </>
    
  );
};

export default RoleMenu;

const useStyles = makeStyles({
  btnContainer: {
    color: "#0076C8",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    paddingLeft: "10px",
    "&:hover": {
      background: "",
    },
  },
  deleteContainer: {},
  moreIcon: {
    cursor: "pointer",
  },
  dropdownContent: {
    minWidth: 80,
    display: "block",
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
});
