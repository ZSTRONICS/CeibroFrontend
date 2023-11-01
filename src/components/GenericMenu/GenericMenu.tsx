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
  userState: string;
  paddingTop?: null | number;
}

const GenericMenu: React.FC<MenuProps> = ({
  icon,
  options,
  disableMenu,
  userState,
  paddingTop = null,
}) => {
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
        sx={paddingTop !== null ? { pt: 0.5, pb: 0 } : undefined}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
        disabled={disableMenu || options.length === 0}
      >
        <assets.MoreVertOutlinedIcon
          color={userState === "done" ? "disabled" : "primary"}
        />
      </IconButton>
      {anchorEl && (
        <Menu
          sx={{ ul: { py: 0.5 } }}
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
