import React from "react";

// material
import { Tooltip } from "@material-ui/core";
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  Stack,
  Badge,
  Button,
} from "@mui/material";
import CreateGroupChat from "./CreateGroupChat";
import CreateIndividualChat from "./CreateIndividualChat";

function CreateChat2() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openGroupChat, setOpenGroupChat] =React.useState(false)
    const [openIndividualChat, setOpenIndividualChat] =React.useState(false)
    
  const handleOpenChatMenue = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
    }
    

  const handleCloseChatMenu = () => {
    setAnchorElUser(null);
  };

  const handleOutsideClick = () => {
    setOpenGroupChat((prev) => !prev);
    setAnchorElUser(null);
  };
  const handleIndividualChat = () => {
    setOpenIndividualChat((prev) => !prev);
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {/* <Tooltip title=""> */}
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpenChatMenue}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            New chat
          </Button>
          { openGroupChat&& <CreateGroupChat openGroupChat={openGroupChat} handleOutsideClick={handleOutsideClick}/>}
          { openIndividualChat&& <CreateIndividualChat individualChat={openIndividualChat} />}

        {/* </Tooltip> */}
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseChatMenu}
        >
          <MenuItem
            disableRipple
            onClick={handleOutsideClick}
            divider
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
              <Box display="flex" alignItems="center">
              <Typography textAlign="center">Group Chat</Typography>
              </Box>
             
           
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={handleIndividualChat}
            sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
              <Box display="flex" alignItems="center">
              <Typography textAlign="center">Individual Chat</Typography>
              </Box>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default CreateChat2;
