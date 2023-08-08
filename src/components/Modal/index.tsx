import React from "react";

import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
//todo migrate to mui latest later becz it give error in add project status comp
// import { Dialog } from "@material-ui/core";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

interface Props {
  isOpen: boolean;
  handleClose: (e: any) => void;
  title: any;
  children: any;
  showCloseBtn: boolean;
  maxWidth?: any;
  showDivider?: boolean;
  showFullWidth?: boolean;
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  handleClose,
  title,
  children,
  showCloseBtn,
  maxWidth,
  showDivider,
  showFullWidth,
}) => {
  const closeModal = (e: any) => {
    if (!e.target.closest(".MuiDrawer-root")) {
      e.stopPropagation();
    }
    handleClose(e);
  };
  const localWidth = maxWidth || "sm";
  return (
    <>
      <Dialog
        fullWidth={showFullWidth === false ? false : true}
        maxWidth={localWidth.toString()}
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ m: { xs: 0.75, md: 1.5 } }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ padding: "9px 5px 0px 12px" }}
          >
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

          {showDivider === true && <Divider sx={{ my: 1 }} />}
          <div style={{ width: "100%" }}>
            <DialogContent
              sx={{ padding: "0px" }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {children}
            </DialogContent>
          </div>
        </Box>
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
  font-size: 24px;
  padding-bottom: 0px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
