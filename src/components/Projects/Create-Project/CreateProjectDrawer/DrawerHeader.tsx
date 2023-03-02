
import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import {makeStyles } from "@material-ui/core";
import CButton from "components/Button/Button";
import colors from "../../../../assets/colors";

interface Props {
  title: string
  handleClose: () => void
}

const DrawerHeader = ({ title, handleClose }: Props):any => {
  const classes = useStyles();

  const handleCloseDrawer = () => {
    handleClose()
  };

  return (
    <div className={classes.drawerHeader}>
      <div>
        <Typography sx={{fontSize:{sm:20,md:24},fontWeight:600}} className={classes.headerTitle}>{title}</Typography>
      </div>
      <CButton sx={{padding:'6px 10px'}} label="Close" variant='outlined' onClick={handleCloseDrawer} />
    </div>
  );
};

export default DrawerHeader;

DrawerHeader.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired
}

const useStyles = makeStyles({
  drawerHeader: {
    backgroundColor: colors.white,
    height: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid #dbdbe5',
  },
  headerTitle: {
    textTransform: 'capitalize',
    fontStyle: "normal",
  },

});
