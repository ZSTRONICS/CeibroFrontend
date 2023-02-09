import React, { useRef, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import {
  Box,
  Button,
  ListItem,
  List,
  IconButton,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  styled,
} from "@mui/material";
import { filesizes } from "components/Utills/Globals/Common";
import "./upload.css";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { CloudUploadIcon } from "components/material-ui/icons/cloudUpload/CloudUpload";
import PreviewCollection from "./PreviewCollection";

const UploadImage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedfile, setSelectedFile] = useState<any>([]);
  // const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  // const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const inputChange = (e: any) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
     console.log("file", file);

      reader.onloadend = () => {
        setSelectedFile((prev: any) => {
          return [
            ...prev,
            {
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              filesize: filesizes(e.target.files[i].size),
            },
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  const upload = () => {
 
  };

  const handleDelteFile = (fileimage:string) => {
        const result = selectedfile.filter((data:any) => data.fileimage !== fileimage);
        setSelectedFile(result);
}


const shortFileName = (str:string)=>{
return str.substring(0,16)+"... "+ str.substr(-4, str.length)
}
  return (
    <>
      <div className="mg20">
      <label htmlFor="btn-upload">
      <CustomBox>
      <Box
        className="file-upload-box"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "relative",
            width: "100%",
            height: "8rem",
            borderRadius: "20px",
        }}
          ref={wrapperRef}
        >
       
        <CustomStack sx={{ p: 1, textAlign: "center", flexDirection:'column !important', rowGap:'8px' }}>
            <Box
              sx={{
                background: "rgba(25, 118, 210, 0.12)",
                padding: "12px 17px",
                borderRadius: "64px",
              }}
            >
              <CloudUploadIcon />
            </Box>
                <input
                  id="btn-upload"
                  name="btn-upload"
                  hidden
                  multiple={true}
                  type="file"
                  accept="*"
                  onChange={(e: any) => inputChange(e)}
                />
                <Button LinkComponent='a' className="btn-choose"  component="span">
                Click to upload
                </Button>
            
             {/*  <Button LinkComponent='a' disableRipple>Click to upload </Button>
            <span style={{fontSize:'16px', fontWeight:'400', color:'#1976D2'}}> Click to upload &nbsp;
              <span style={{color:'#000000'}}>or drag and drop</span> 
            </span>*/}
          </CustomStack>
        </Box>
      </CustomBox>
        </label> 
        <Box width="100%">
          {selectedfile && (
            <List
              sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
            >
              {selectedfile?.map((item:any,index:any)=>{
                const {filename}=item
                const itemName:string = filename?.length>16? shortFileName(filename) :filename
                return(
                <ListItem
                key={index}
                alignItems="flex-start"
                secondaryAction={
                  <IconButton aria-label="comment" onClick={()=>handleDelteFile(item.fileimage)}>
                    X
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="img" src={item.fileimage} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${itemName}`}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                      >
                        {item.filesize && item.filesize} &nbsp;
                        {"Uploading"}
                      </Typography>
                      <Box width="100%" pt={1.5} mr={1}>
                        <LinearProgress />
                      </Box>
                    </>
                  }
                />
              </ListItem>)
              })
                }
            </List>
          )}
        </Box>
      </div>
      {/* {selectedfile.length>0&&<Box sx={{mb:1, pb:3}}> <Button
        
        className="btn-upload"
        color="primary"
        variant="contained"
        disabled={selectedfile.length<0?false:true}
        onClick={upload}
      >
        Upload
      </Button>
      </Box>} */}
    </>
  );
};

export default UploadImage;

const CustomBox = styled(Box)({
  "&.MuiBox-root": {
    cursor:'pointer',
    backgroundColor: " #F5F7F8",
    border: "1px dashed rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    padding: "1rem",
  },
  // "&.MuiBox-root:hover, &.MuiBox-root.dragover": {
  //   opacity: 0.6,
  // },
});