import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  ListSubheader,
  CircularProgress,
  Box,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import {
  FileInterface,
  FileUploadProgress,
} from "constants/interfaces/docs.interface";
import assets from "assets/assets";
import { DOCS_CONFIG } from "config/docs.config";
import { FileUploadIcon } from "components/material-ui/icons/attachment/fileUpload";
function UploadingDocsPreview() {
  const [open, setOpen] = React.useState(true);
  const {
    filesBeingUploaded,
    allFilesUploadedDone,
    filesBeingUploadedCount,
    fileUploadProgres,
    showFileUploadPreview,
  } = useSelector((state: RootState) => state.docs);

  const dispatch = useDispatch();
  const [showFileUploadProgress, setShowFileUploadProgress] = React.useState(false);
  const removeListItem = () => {
    dispatch({
      type: DOCS_CONFIG.CLEAR_FILE_BEING_UPLOADED,
    });
  };
  React.useEffect(() => {
    setShowFileUploadProgress(showFileUploadPreview);
    if (showFileUploadPreview) {
      setOpen(true);
    }
  }, [showFileUploadPreview]);

  return (
    <>
      {showFileUploadProgress && (
        <Box
          sx={{
            position: "absolute",
            right: "25px",
            bottom: "3px",
            maxWidth: "345px",
            width: "100%",
            zIndex: 1500,
          }}
        >
          <List
            disablePadding
            component="nav"
            sx={{
              width: "100%",
              maxWidth: 345,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              border: "1px solid #d0d2d3",
              "& ul": { padding: 0 },
            }}
          >
            <ListSubheader disableGutters>
              <Box
                sx={{
                  bgcolor: "#0076C8",
                  pb: open ? 1 : 0,
                }}
              >
                <ListItemButton
                  disableRipple
                  // key="crosBtn1"
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 2.5,
                    pt: 1,
                    pb: open ? 0 : 1,
                    // "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                 
                  <ListItemText
                    primary={`Uploading ${filesBeingUploadedCount} file(s)`}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: "600",
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                    // secondary="Uploading files"
                    // secondaryTypographyProps={{
                    //   noWrap: true,
                    //   fontSize: 12,
                    //   lineHeight: "16px",
                    //   color: open ? "rgba(0,0,0,0)" : "#FFFFFF",
                    // }}
                    sx={{ my: 0 }}
                  />
                  {
                    !allFilesUploadedDone ? (
                      <KeyboardArrowDown
                        sx={{
                          color: "#FFFFFF",
                          mr: -1,
                          transform: open ? "rotate(0)" : "rotate(-180deg)",
                          transition: "0.2s",
                        }}
                      />
                    ) : (
                      // <Box >
                      <assets.HighlightOffIcon
                        sx={{ color: "#FFFFFF" }}
                        onClick={removeListItem}
                      />
                    )
                    // </Box>
                  }
                </ListItemButton>
              </Box>
            </ListSubheader>
            {open && (
              <>
                {filesBeingUploaded?.map((item: FileInterface) => {
                  let inProgress = fileUploadProgres.find(
                    (progres: FileUploadProgress) => progres.fileId === item._id
                  );
                  return (
                    <>
                      {
                        <ListItem
                          key={item._id + 1}
                          divider
                          secondaryAction={
                            <>
                              {item.uploadStatus === "done" ? (
                                <assets.CheckCircleIcon
                                  sx={{ color: "#55BCB3", fontSize: "1.2rem" }}
                                />
                              ) : (
                                <CircularProgress
                                  thickness={6}
                                  size="16px"
                                  variant="indeterminate"
                                  value={inProgress?.progress || 0}
                                />
                              )}
                            </>
                          }
                        >
                          <ListItemAvatar sx={{ minWidth: "40px" }}>
                            <FileUploadIcon />
                          </ListItemAvatar>
                          <ListItemText
                            primaryTypographyProps={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              display: "inline-block",
                              maxWidth: 220,
                              fontSize: 12,
                              fontWeight: "500",
                            }}
                            primary={` ${item.fileName}`}
                          />
                        </ListItem>
                      }
                    </>
                  );
                })}
              </>
            )}
          </List>
        </Box>
      )}
    </>
  );
}

export default UploadingDocsPreview;
