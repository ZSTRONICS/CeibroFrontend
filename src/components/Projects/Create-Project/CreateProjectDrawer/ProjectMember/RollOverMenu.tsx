import React, { useRef } from 'react'
import {Box, IconButton,Menu,MenuItem } from '@mui/material'
import assets from 'assets/assets'
import { CustomButton } from 'components/TaskComponent/Tabs/TaskCard'

function RollOverMenu(props:any) {
    const divRef = useRef();
    const [anchorElMember, setAnchorElMember] = React.useState<null | HTMLElement>(null);

    const openPopup = (e: any) => {
        e.stopPropagation();
        setAnchorElMember(e.currentTarget);
      };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    props.handleDele()
    setAnchorElMember(null);
  }
  const handleEdit = (e: any) => {
    e.stopPropagation();
    props.handleEdit()
    setAnchorElMember(null);
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
        // dense={true}
        disableRipple
        disableGutters
        // aria-describedby={id}
        onClick={handleEdit}
        // divider={deleteOnlyCreator}
        // sx={{
        //   "&.MuiMenuItem-root": {
        //     padding: "4px 10px",
        //   },
        // }}
      >
        <CustomButton
          variant="outlined"
          disableRipple
          sx={{ border: "none", textTransform: "capitalize" }}
        >
          Edit
        </CustomButton>
      </MenuItem>
    
          <MenuItem
            disableGutters
            disableRipple
            onClick={handleDelete}
            // aria-describedby={id}
            // sx={{
            //   "&.MuiMenuItem-root": {
            //     padding: "4px 10px",
            //   },
            // }}
          >
            <CustomButton
              variant="outlined"
              disableElevation
              disableFocusRipple
              disableRipple
              sx={{
                // padding:'0',
                border: "none",
                textTransform: "capitalize",
                color: "#FA0808",
              }}
            >
              Delete
            </CustomButton>
          </MenuItem>
    </Menu>
  </Box>
  )
}

export default RollOverMenu