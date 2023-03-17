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
import styled from "@emotion/styled";

interface Props {
  isOpen: boolean;
  handleClose: (e: any) => void;
  title: any;
  children: any;
  showCloseBtn: boolean;
  maxWidth?:any
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  handleClose,
  title,
  children,
  showCloseBtn,
  maxWidth,
}) => {
  const classes = useStyles();
  const closeModal = (e: any) => {
    if (!e.target.closest(".MuiDrawer-root")) {
      e.stopPropagation();
    }
    handleClose(e);
  };
  const localWidth =  maxWidth ? maxWidth: "sm"
  return (
    <> 
      <Dialog
        fullWidth
        maxWidth={localWidth.toString()}
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       > 
        <DialogTitle id="alert-dialog-title">
          <Grid container className={classes.titleWraper}>
            <Grid item>
              <CustomTitle>{title}</CustomTitle>
            </Grid>
            {showCloseBtn && (
              <Grid item>
                <Button
                  sx={{
                    padding: "3px 4px",
                    textTransform: "capitalize",
                  }}
                  onClick={closeModal}
                  variant="outlined"
                >
                  Close
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogTitle>
        <div style={{border:'1px solid red',width:'100%'}}>
        <DialogContent>{children}</DialogContent> 
        </div>
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
  showCloseBtn: PropTypes.any,
};

export default CustomModal;

const CustomTitle = styled(Typography)`
  font-family: "Inter";
  font-weight: 600;
  font-size: 26px;
`;
