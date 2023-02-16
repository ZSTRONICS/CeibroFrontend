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
  Avatar,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { File, FileUploadProgress } from "constants/interfaces/docs.interface";

function UploadingDocsPreview() {
  const [open, setOpen] = React.useState(false);
  const { filesUploaded,fileUploadProgres, filesUploadCompleted } = useSelector((state: RootState) => state.docs);
  console.log('filesUploadCompleted', filesUploadCompleted)
  return (
    <>
     { filesUploaded.length>0&&  <Box
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
              "& ul": { padding: 0 },
            }}
          >
            <ListSubheader disableGutters>
              <Box
                sx={{
                  bgcolor: "#0076C8",
                  pb: open ? 2 : 0,
                }}
              >
                <ListItemButton
                  disableRipple
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    // "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary={`Uploading ${filesUploaded.length} file(s)`}
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
                  <KeyboardArrowDown
                    sx={{
                      color: "#FFFFFF",
                      mr: -1,
                      transform: open ? "rotate(0)" : "rotate(-180deg)",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>
              </Box>
            </ListSubheader>
            {open && (
              <>
                {filesUploaded?.map((item: File) => {
              let inProgress= fileUploadProgres.find((progres:FileUploadProgress)=> progres.fileId === item._id)
                  return (<>{
                    // inProgress.progress===95?<></>: 
                      <ListItem
                      divider
                      key={`${item._id}`}
                      secondaryAction={
                        <CircularProgress
                          thickness={6}
                          size="16px"
                          variant="determinate"
                          value={inProgress.progress}
                        />
                      }
                    >
                      <ListItemAvatar sx={{ minWidth: "40px" }}>
                        <Avatar
                          sizes="30px"
                          sx={{ width: 24, height: 24 }}
                          alt="img"
                        />
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
                    </ListItem>}
                  </>
                    
                  );
                })}
              </>
            )}
          </List>
        </Box>}
      
    </>
  );
}

export default UploadingDocsPreview;
