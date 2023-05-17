import { Box, Button } from "@mui/material";
import ProfilePicView from "components/Auth/Register/ProfilePicView";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { CloudUploadIconForPic } from "components/material-ui/icons/cloudUpload/CloudUpload";
import { CustomBox } from "components/uploadImage/UploadDocs";
import React, { useState } from "react";
interface IProps {
  setFile: (file: File) => void;
  deleteFile: () => void;
}

const DragAndDrop: React.FC<IProps> = ({ setFile, deleteFile }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setUrl(URL.createObjectURL(e.dataTransfer.files[0]));
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const onUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };
  const HandleremoveImg = () => {
    setUrl("");
    deleteFile();
  };

  return (
    <div style={{margin:'0', }} >
      {url === "" ? (
        <label htmlFor="btn-upload">
          <CustomBox
            sx={{
              "&.MuiBox-root": {
                backgroundColor: `${isDragging?"#efefef":"white"}`,
              },
            }}
          >
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
                  multiple={false}
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => onUploadFiles(e)}
                />
                <Button
                  LinkComponent="a"
                  variant="text"
                  className="btn-choose"
                  component="span"
                  sx={{ textTransform: "unset", color: "#605C5C", display:'flex', flexDirection:'column' }}
                >
                  Drag your file here with mouse or
                  <span style={{ color: "#0076C8" }}> &nbsp;browse</span>
                </Button>
              </CustomStack>
            </Box>
          </CustomBox>
        </label>
      ) : (
        <ProfilePicView imgSrc={url} title={""} removeImg={HandleremoveImg} />
      )}
    </div>
  );
};

export default DragAndDrop;
