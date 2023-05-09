import { Box, Button } from "@mui/material";
import ProfileView from "components/Auth/Register/ProfilePicView";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import {
  CloudUploadIcon,
  CloudUploadIconForPic,
} from "components/material-ui/icons/cloudUpload/CloudUpload";
import { CustomBox } from "components/uploadImage/UploadDocs";
import React, { useState } from "react";

interface File {
  id: number;
  name: string;
  size: number;
}

const DragAndDrop: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imgUrl, setImageUrl] = useState<string>("");
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles: File[] = [];
    console.log("e.dataTransfer.files", e.dataTransfer.files);
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      //   newFiles.push([...file]);
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      // setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const HandleremoveImg = () => {
    setImageUrl("");
  };
  console.log("url", url);
  return (
    <div>
      <label htmlFor="btn-upload">
        <CustomBox
          sx={{
            "&.MuiBox-root": {
              backgroundColor: "white",
            },
          }}
        >
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
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
                  // background: "rgba(25, 118, 210, 0.12)",
                  padding: "12px 17px",
                  borderRadius: "64px",
                }}
              >
                <CloudUploadIconForPic />
              </Box>
              <input
                id="btn-upload"
                name="btn-upload"
                hidden
                multiple={true}
                type="file"
                accept="*"
                onChange={(e: any) => onUploadFiles(e)}
              />
              <Button
                LinkComponent="a"
                variant="text"
                className="btn-choose"
                component="span"
                sx={{ textTransform: "unset", color: "#605C5C" }}
              >
                Drag your file here with mouse or <span style={{color:'#0076C8'}}> &nbsp;browse</span> 
              </Button>
              {/*  <Button LinkComponent='a' disableRipple>Click to upload </Button>
            <span style={{fontSize:'16px', fontWeight:'400', color:'#1976D2'}}> Click to upload &nbsp;
              <span style={{color:'#000000'}}>or drag and drop</span> 
            </span>*/}
            </CustomStack>
          </Box>
        </CustomBox>
      </label>
      {imgUrl && (
        <ProfileView imgSrc={url} title={""} removeImg={HandleremoveImg} />
      )}
    </div>
  );
};

export default DragAndDrop;
