import { IconButton, Menu } from "@mui/material";
import Fade from "@mui/material/Fade";
import assets from "assets/assets";
import { MenuItemTag } from "components/CustomTags";
import React, { useState } from "react";

export interface Option {
  menuName: string;
  callBackHandler: () => void;
}

interface MenuProps {
  icon?: any;
  options: Option[];
  disableMenu: boolean;
}

const GenericMenu: React.FC<MenuProps> = ({ icon, options, disableMenu }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault()
    event.stopPropagation();
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
        disabled={disableMenu || options.length === 0}
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
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {options.map((option) => (
            <MenuItemTag
              disableGutters
              key={option.menuName}
              onClick={() => {
                option.callBackHandler();
                handleMenuClose();
              }}
            >
              {option.menuName}
            </MenuItemTag>
          ))}
        </Menu>
      )}
    </>
  );
};

export default GenericMenu;
