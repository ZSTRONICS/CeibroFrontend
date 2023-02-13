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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { uploadDocs } from "redux/action/task.action";

const UploadImage = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedfile, setSelectedFile] = useState<any>([]);
  let { selectedTaskId } = useSelector((state: RootState) => state.task);

  const onChangePicture = (e: any) => {
    let formData = new FormData();
    Array.from(e.target.files).forEach((file: any) => {
      formData.append("files", file, file.name)
      setSelectedFile((prev: any) => {
        return [
          ...prev,
          {
            name: file.name,
            type: file.type,
            filesize: filesizes(file.size),
          },
        ];
      });
    });
      formData.append("moduleName", "Task");
      formData.append("_id", selectedTaskId);

    const payload = {
      body: formData,
      success: (res: any) => {
        if(res.status=== 200){
          setSelectedFile([])
        }
      },
    };
    dispatch(uploadDocs(payload));
  };

  const handleDelteFile = (name: string) => {
    const result = selectedfile.filter((data: any) => data.name !== name);
    setSelectedFile(result);
  };

  const shortFileName = (str: string) => {
    return str.substring(0, 16) + "... " + str.substr(-4, str.length);
  };

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
              <CustomStack
                sx={{
                  p: 1,
                  textAlign: "center",
                  flexDirection: "column !important",
                  rowGap: "8px",
                }}
              >
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
                  onChange={(e: any) => onChangePicture(e)}
                />
                <Button
                  LinkComponent="a"
                  className="btn-choose"
                  component="span"
                >
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
              {selectedfile?.map((item: any, index: any) => {
                const { name } = item;
                const itemName: string =
                  name?.length > 16 ? shortFileName(name) : name;
                return (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        aria-label="comment"
                        onClick={() => handleDelteFile(item.name)}
                      >
                        X
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt="img" src={item.blobUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${itemName}`}
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: "400",
                      }}
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
                  </ListItem>
                );
              })}
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
    cursor: "pointer",
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
