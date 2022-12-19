import React,{useRef} from "react";

// material
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CreateGroupChat from "./CreateGroupChat";
import CreateIndividualChat from "./CreateIndividualChat";

 function CreateChat() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [individualEl, setAnchorEl] = React.useState<any>(undefined);
    const [anchorGroupEl, setAnchorGroupEl] = React.useState<any>(undefined);
    const divRef = useRef();

  const handleOpenChatMenue = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
    }
    
  const handleCloseChatMenu = () => {
    setAnchorElUser(null);
  };

  const handleIndividualChat = () => {
    setAnchorEl(divRef.current);
    setAnchorElUser(null);
  };

  const handleGroupChat = () => {
    setAnchorGroupEl(divRef.current);
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGroupClose = () => {
    setAnchorGroupEl(null);
  };

  const open = Boolean(individualEl);
  const openGroup = Boolean(anchorGroupEl);
  const id = open ? 'sigle-popover' : undefined
  const gId = open ? 'group-popover' : undefined

  return (
    <>
      <Box sx={{ flexGrow: 0 }} ref={divRef}>
          <Button
          sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 12
          }}
            color="primary"
            variant="contained"
            onClick={handleOpenChatMenue}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            New chat
          </Button>
            <CreateGroupChat  ButtonId={gId} openGroup={openGroup} groupEl={anchorGroupEl} handleGroupClose={handleGroupClose} />
           <CreateIndividualChat ButtonId = {id} open={open} individualEl={individualEl} handleClose= {handleClose} />
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
            aria-describedby={gId}
            onClick={handleGroupChat}
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
            aria-describedby={id}
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

export default CreateChat;
