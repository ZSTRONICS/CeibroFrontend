import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import assets from "assets/assets";
import i18n from "translation/i18next";
import {Box} from '@mui/material'

const Setting = () => {
  const [anchorElem, setAnchorEl] = useState(null);
  const open = Boolean(anchorElem);

  const handleOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };
  
  return (
    <Box>
      <assets.LanguageOutlinedIcon onClick={handleOpen} />
      <Menu
        id="basic-menu"
        anchorEl={anchorElem}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={()=>handleChangeLang('en')}> English </MenuItem>
        <MenuItem onClick={()=>handleChangeLang('et')}> Estonian </MenuItem>

      </Menu>
    </Box>
  );
};

export default Setting;
