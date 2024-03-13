import { Box, Button, Menu, MenuItem } from "@mui/material";
import assets from "assets";
import { LabelTag } from "components/CustomTags";
import React from "react";

interface MenuItemProps {
  label: string;
  callBackHandler: () => void;
}

interface UserMenuProps {
  menuItems: MenuItemProps[];
  selectedMenu: string;
}

const TaskMenu: React.FC<UserMenuProps> = ({ menuItems, selectedMenu }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button
        disableRipple
        onClick={handleOpenUserMenu}
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-expanded={anchorEl ? "true" : undefined}
        variant="contained"
        sx={{
          textTransform: "unset",
          color: "#131516",
          minWidth: "85px",
          width: "100%",
          padding: "6px 12px",
        }}
      >
        <LabelTag
          sx={{
            color: "white",
            minWidth: "53px",
            maxWidth: "60px",
            width: "100%",
          }}
        >
          {selectedMenu}
        </LabelTag>
        <assets.ArrowDropDownOutlinedIcon sx={{ color: "white" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        MenuListProps={{
          role: "listbox",
        }}
        open={open}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            disableRipple
            onClick={() => {
              item.callBackHandler();
              handleMenuClose();
            }}
            sx={{
              "&.MuiMenuItem-root": {
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TaskMenu;
