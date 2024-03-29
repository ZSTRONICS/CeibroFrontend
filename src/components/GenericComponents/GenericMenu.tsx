import { IconButton, Menu } from "@mui/material";
import Fade from "@mui/material/Fade";
import assets from "assets/assets";
import { MenuItemTag } from "components/CustomTags";
import React, { useRef, useState } from "react";

interface MenuProps {
  icon?: any;
  options: MenuOption[];
  disableMenu: boolean;
  paddingTop?: null | number;
  isTaskSelected?: boolean;
  isProjectGroup?: boolean;
  data?: any;
}

const GenericMenu: React.FC<MenuProps> = ({
  icon,
  options,
  disableMenu,
  isTaskSelected,
  paddingTop = null,
  isProjectGroup,
  data,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const isMenuDisabled = disableMenu || options.length === 0;

  const anchorRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <IconButton
        sx={paddingTop !== null ? { pt: 0, pb: 0 } : undefined}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
        disabled={isMenuDisabled || isTaskSelected}
        disableRipple
      >
        {!icon ? (
          <assets.MoreVertOutlinedIcon
            color={isMenuDisabled ? "disabled" : "primary"}
          />
        ) : (
          icon
        )}
      </IconButton>
      {anchorEl && (
        <Menu
          sx={{ ul: { py: 1 } }}
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
          {options.map((option, index) => (
            <MenuItemTag
              key={option.menuName + index}
              sx={{
                padding: `${isProjectGroup ? "8px" : "4px 8px 6px 8px"}`,
              }}
              disableGutters
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                option.callBackHandler();
                anchorRef?.current?.click();
                handleMenuClose();
              }}
            >
              {isProjectGroup ? (
                <a
                  ref={anchorRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClose();
                  }}
                  href={data?.fileUrl}
                  download
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {option.menuName}
                </a>
              ) : (
                option.menuName
              )}
            </MenuItemTag>
          ))}
        </Menu>
      )}
    </>
  );
};

export default GenericMenu;
