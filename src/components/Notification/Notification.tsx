import React, { useState } from "react";
import assets from "assets/assets";
import { Badge, IconButton, MenuItem,Menu } from "@mui/material";
import NotificationList from "./NotificationList";

interface MenuCellProps {
  value: string;
}

const Notification = ({ value }: MenuCellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
      <Badge badgeContent={0} showZero={true} overlap="rectangular">
             <assets.NotificationsOutlinedIcon/>
            </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              // "&:before": {
              //   content: '""',
              //   display: "block",
              //   position: "absolute",
              //   top: 0,
              //   right: 14,
              //   width: 10,
              //   height: 10,
              //   bgcolor: "background.paper",
              //   transform: "translateY(-50%) rotate(45deg)",
              //   zIndex: 0,
              // },
            },
          }}
      >
        {/* <MenuItem onClick={handleViewProfile}>View</MenuItem> */}
        <NotificationList/>
      </Menu>
    </div>
  );
};

export default Notification;
