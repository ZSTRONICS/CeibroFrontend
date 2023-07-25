import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import assets from "assets/assets";

export interface Option {
  menuName: string;
  callBackHandler: () => void;
}

interface MenuProps {
  icon?: any;
  options: Option[];
  disableMenu:boolean
}

const GenericMenu: React.FC<MenuProps> = ({ icon, options, disableMenu=false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
        disabled={disableMenu||options.length===0}
      >
        <assets.MoreVertOutlinedIcon />
      </IconButton>
      {anchorEl && (
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.menuName}
              onClick={() => {
                option.callBackHandler();
                handleMenuClose();
              }}
            >
              {option.menuName}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default GenericMenu;
