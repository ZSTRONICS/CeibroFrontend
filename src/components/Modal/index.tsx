import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
} from "@mui/material";
import { CustomTitle } from "components/CustomTags";
import PropTypes from "prop-types";
import React from "react";
import ModalHeader from "./ModalHeader";

interface Props {
  isOpen: boolean;
  handleClose: (e: any) => void;
  title: any;
  children: any;
  showCloseBtn: boolean;
  maxWidth?: any;
  showDivider?: boolean;
  showFullWidth?: boolean;
  showTitleWithLogo?: boolean;
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  handleClose,
  showTitleWithLogo,
  title,
  children,
  showCloseBtn,
  maxWidth,
  showDivider,
  showFullWidth,
}) => {
  const closeModal = (e: any, reason?: any) => {
    if (reason === "backdropClick") return true;
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
        <Box sx={{ mt: { xs: 0.75, md: 1.5 } }}>
          {showTitleWithLogo ? (
            <ModalHeader title={title} handleClose={closeModal} />
          ) : (
            <Grid container justifyContent="space-between">
              <Grid item sx={{ ml: { xs: 0.75, md: 1.5 } }}>
                <CustomTitle sx={{ fontsize: 2 }}>{title}</CustomTitle>
              </Grid>
              {showCloseBtn && (
                <Grid item sx={{ mr: { xs: 0.75, md: 1.5 } }}>
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
          )}

          {!showTitleWithLogo && showDivider === true && (
            <Divider sx={{ my: 1 }} />
          )}
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
