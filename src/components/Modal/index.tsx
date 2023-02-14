import React from "react";
// mui-import
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,

} from "@material-ui/core";
import PropTypes from "prop-types";
// import { Clear } from "@material-ui/icons";
import useStyles from "./styles";
import { Button } from "@mui/material";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: any;
  children: any;
  showCloseBtn:boolean;

}

const CustomModal: React.FC<Props> = ({ isOpen, handleClose, title, children, showCloseBtn }) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container className={classes.titleWraper}>
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            {showCloseBtn&&<Grid item>
              <Button onClick={handleClose} variant='outlined'>Close</Button>
            </Grid>}
          </Grid>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

CustomModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.any,
  children: PropTypes.element,
  showCloseBtn:PropTypes.any,
};

export default CustomModal;
