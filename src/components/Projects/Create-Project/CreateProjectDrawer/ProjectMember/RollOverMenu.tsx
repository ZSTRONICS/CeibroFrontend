import React, { useCallback, useRef } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import assets from "assets/assets";
import { CustomButton } from "components/TaskComponent/Tabs/TaskCard";

function RollOverMenu(props: any) {
  const divRef = useRef();
  const [anchorElMember, setAnchorElMember] =React.useState<null | HTMLElement>(null);

  const openPopup = useCallback((e: any) => {
    e.stopPropagation();
    if(e.currentTarget){
      setAnchorElMember(e.currentTarget);
    }
  }, [anchorElMember]);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    props.handleDelete();
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    props.handleEdit()
  }

  const closePopup = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
  };
  const open = Boolean(anchorElMember);
  const id = open ? "simple-popover" : undefined;

  return (
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

       {props.showDelBtn===true&& <MenuItem
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
        </MenuItem>}
      </Menu>
    </Box>
  );
}

export default RollOverMenu;
