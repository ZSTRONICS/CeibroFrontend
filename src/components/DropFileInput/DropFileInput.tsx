import { Box, Button } from "@mui/material";
import ImgCard from "components/Auth/Register/ImgCard";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { CloudUploadIconForPic } from "components/material-ui/icons/cloudUpload/CloudUpload";
import { CustomBox } from "components/uploadImage/UploadDocs";
import React, { useState } from "react";
interface IProps {
  setFile: (file: File) => void;
  deleteFile: () => void;
  isAcceptAllFileTypes?: boolean;
}

const DragAndDrop: React.FC<IProps> = ({
  setFile,
  deleteFile,
  isAcceptAllFileTypes,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<any>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isPdfFile, setIsPdfFile] = useState<boolean>(false);
  const [fileName, setFileName]=  useState<string>("");

  const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return "";
  };

  const isPDFFile = (fileName: string): boolean => {
    return fileName.toLowerCase().endsWith("pdf");
  };

  const generateFilePreview = (file: File): string => {
    const fileURL = URL.createObjectURL(file);
    return fileURL + "#toolbar=0";
  };

  const handleDrop =  (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name)
      let fileURL = generateFilePreview(selectedFile);
      const fileExtension = getFileExtension(selectedFile.name);
      setIsPdfFile(isPDFFile(fileExtension));
      setUrl(fileURL);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const onUploadFiles =  (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const selectedFile = e.target.files?.[0];
      setFileName(selectedFile.name)
      const fileExtension = getFileExtension(selectedFile.name);
      setIsPdfFile(isPDFFile(fileExtension));
      if (selectedFile) {
        const previewURL = generateFilePreview(selectedFile);
        setUrl(previewURL);
      }

      setFile(e.target.files[0]);
    }
  };
  const HandleremoveImg = () => {
    setUrl("");
    deleteFile();
  };

  return (
    <div style={{ margin: "0" }}>
      {url === "" ? (
        <label htmlFor="btn-upload">
          <CustomBox
            sx={{
              "&.MuiBox-root": {
                backgroundColor: `${isDragging ? "#efefef" : "white"}`,
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
                  accept={isAcceptAllFileTypes ? "*/*" : "image/*"}
                  onChange={(e: any) => onUploadFiles(e)}
                />
                <Button
                  LinkComponent="a"
                  variant="text"
                  className="btn-choose"
                  component="span"
                  sx={{
                    textTransform: "unset",
                    color: "#605C5C",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  Drag your file here with mouse or
                  <span style={{ color: "#0076C8" }}> &nbsp;browse</span>
                </Button>
              </CustomStack>
            </Box>
          </CustomBox>
        </label>
      ) : (
        <ImgCard
          imgSrc={url}
          title={fileName}
          removeImg={HandleremoveImg}
          showCancelBtn={true}
          showSkeleton={false}
          showPdf={isPdfFile}
        />
      )}
    </div>
  );
};

export default DragAndDrop;
