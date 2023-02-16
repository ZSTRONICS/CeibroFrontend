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
import assets from 'assets/assets'
function UploadingDocsPreview() {
  const [open, setOpen] = React.useState(false);
  const { filesUploaded,fileUploadProgres, allFilesUploadedDone } = useSelector((state: RootState) => state.docs);
const [isRemoved,setIsRemoved]= React.useState(false)
const removeListItem=()=>{
  setIsRemoved(true)
}
React.useEffect(()=>{
  setIsRemoved(false)
},[filesUploaded])
  return (
    <>
     { filesUploaded.length>0&&!isRemoved&&<Box
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
              border:'1px solid #d0d2d3',
              "& ul": { padding: 0,  },
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
                  key='crosBtn1'
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.2,
                    // "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary={`Uploading ${filesUploaded.length} file(s)`}
                    // primary={`Uploading file(s)`}
                    key={filesUploaded[0]._id}
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
                 {!allFilesUploadedDone? <KeyboardArrowDown
                    sx={{
                      color: "#FFFFFF",
                      mr: -1,
                      transform: open ? "rotate(0)" : "rotate(-180deg)",
                      transition: "0.2s",
                    }}
                  />
                  :
                  // <Box >
                    <assets.HighlightOffIcon sx={{ color: "#FFFFFF"}} onClick={removeListItem}/>
                  // </Box>
                  }
                     
                </ListItemButton>
              </Box>
            </ListSubheader>
            {open && (
              <>
                {filesUploaded?.map((item: File) => {
              let inProgress= fileUploadProgres.find((progres:FileUploadProgress)=> progres.fileId === item._id)
                  return (<>{
                 
                      <ListItem
                      divider
                      id={item._id}
                      key={item._id}
                      secondaryAction={
                        <>
                       {item.uploadStatus==="done"?
                       <assets.CheckCircleIcon sx={{color:'#55BCB3', fontSize:'1.2rem'}}/>
                       : <CircularProgress
                          thickness={6}
                          size="16px"
                          variant="determinate"
                          value={inProgress.progress}
                        />}
                        </>
                      }
                    >
                      <ListItemAvatar key={item._id} sx={{ minWidth: "40px" }}>
                        <Avatar
                          sizes="30px"
                          sx={{ width: 24, height: 24 }}
                          alt="img"
                          src={item.fileUrl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        key={item._id}
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
