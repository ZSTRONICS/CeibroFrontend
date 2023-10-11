import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import assets from "assets/assets";
import CustomButton from "components/Utills/CustomButton";
import {
  ProjectMemberInterface,
  ProjectRolesInterface,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";
import React, { FC, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
interface RoleMenuProps {
  userRole?: ProjectRolesInterface;
  member?: ProjectMemberInterface;
  edit: string;
  showDelBtn: boolean;
  handleDelete: any;
  handleEdit: any;
}

const RollOverMenu: FC<RoleMenuProps> = (props) => {
  const divRef = useRef();
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorElMember, setAnchorElMember] =
    React.useState<null | HTMLElement>(null);
  let canEdit,
    canDelete = false;
  if (props.showDelBtn === true) {
    canDelete = true;
  } else {
    canEdit = true;
  }

  let isAdminUser = false;
  if (props.userRole) {
    canEdit = props.userRole.memberPermission.edit;
    canDelete = props.userRole.memberPermission.delete;
    isAdminUser = props.userRole.admin;
  }

  let isAdminRole = false;
  if (props.member) {
    isAdminRole = props.member.role?.admin || false;
    if (isAdminRole === true && isAdminUser === false) {
      canEdit = false;
      canDelete = false;
    }
    if (
      String(props.member.user._id) === String(user._id) &&
      isAdminRole === false
    ) {
      canEdit = false;
      canDelete = false;
    }
  }

  const openPopup = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (e.currentTarget) {
        setAnchorElMember(e.currentTarget);
      }
    },
    [anchorElMember]
  );

  const handleDelete = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    props.handleDelete();
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    props.handleEdit();
  };

  const closePopup = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
  };
  const open = Boolean(anchorElMember);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {(canEdit === true || canDelete === true) && (
        <Box ref={divRef}>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            aria-describedby={id}
            disableRipple={true}
            onClick={openPopup}
          >
            <assets.MoreVertOutlinedIcon color="primary" />
          </IconButton>

          <Menu
            MenuListProps={{ sx: { py: 0 } }}
            id={id}
            open={open}
            disableAutoFocusItem={true}
            anchorEl={anchorElMember}
            onClose={closePopup}
            sx={{ "& .MuiMenuList-padding": { padding: 0 } }}
            elevation={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {canEdit && (
              <MenuItem
                disableRipple
                disableGutters
                // aria-describedby={id}
                onClick={handleEdit}
              >
                <CustomButton
                  variant="outlined"
                  disableRipple
                  sx={{
                    border: "none",
                    textTransform: "capitalize",
                  }}
                >
                  {props.edit}
                </CustomButton>
              </MenuItem>
            )}

            {props.showDelBtn === true && (
              <>
                {canDelete && (
                  <MenuItem
                    disableGutters
                    disableRipple
                    onClick={handleDelete}
                    aria-describedby={id}
                  >
                    <CustomButton
                      variant="outlined"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      sx={{
                        border: "none",
                        textTransform: "capitalize",
                        color: "#FA0808",
                      }}
                    >
                      Delete
                    </CustomButton>
                  </MenuItem>
                )}
              </>
            )}
          </Menu>
        </Box>
      )}
    </>
  );
};

export default RollOverMenu;
