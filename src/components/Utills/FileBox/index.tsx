import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Typography } from "@mui/material";
import CustomModal from "components/Modal";
import { fileType } from "components/Tasks/type";
import PDFViewer from "components/uploadImage/WindowPDFViewer";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useState } from "react";
import assets from "../../../assets/assets";

interface IProps {
  title?: string;
  files: IFile[] | File[];
  size?: string;
  textColor?: string;
  handleClearFile?: (file: File | any, type: fileType) => void;
}

const FileBox: React.FC<IProps> = ({ files, title, size, handleClearFile }) => {
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [fileToView, setFileToView] = useState<any | null>(null);

  const openPDFNewTab = (file: any) => {
    if (file.fileUrl) {
      openModal();
      setFileToView(file.fileUrl);
    } else {
      console.log("not open ");
    }
  };

  const handleError = (e: any) => {
    console.error("Error loading PDF:", e);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          border: `${title ? "1px solid #e2e4e5" : ""}`,
          padding: "5px 0",
          paddingLeft: "15px",
          gap: 1,
          display: "flex",
          alignItems: "center",
          color: "#605c5c",
        }}
      >
        {title && (
          <Box
            sx={{
              width: "85px",
              height: "16px",
              borderRight: "1px solid #818181",
              display: "flex",
              alignItems: "center",
              paddingRight: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "12px",
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        <Box
          className="custom-scrollbar"
          sx={{
            overflow: "auto",
            width: "100%",
            maxHeight: "6rem",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {files.length > 0 ? (
            files.map((item: IFile | File | any) => {
              let f_name = "";
              let key = "";
              const { fileName, _id, name } = item;
              if (fileName) {
                f_name = fileName;
                key = _id;
              } else if (name) {
                f_name = name;
                key = `${name}_${size}`;
              }
              return (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 2,
                    mb: 1.2,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => openPDFNewTab(item)}
                >
                  <img
                    width={20}
                    height={20}
                    src={assets.FileIcon}
                    alt="File Icon"
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "14px",
                      marginLeft: "8px",
                      marginRight: "16px",
                    }}
                  >
                    {f_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "10px",
                      opacity: 0.54,
                    }}
                  >
                    {size && size}
                  </Typography>
                  {handleClearFile && (
                    <IconButton
                      size="small"
                      aria-label="clear selection"
                      onClick={() => handleClearFile(item, "doc")}
                    >
                      <ClearIcon
                        sx={{
                          height: "16px",
                          width: "auto",
                          color: "#605C5C",
                          borderRadius: "8px",
                          borderStyle: "solid",
                          borderWidth: "1px",
                          borderColor: "#605C5C",
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
              );
            })
          ) : (
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                opacity: 0.87,
                marginLeft: "8px",
                marginRight: "16px",
              }}
            >
              No files found
            </Typography>
          )}
        </Box>
      </Box>
      {isOpen && (
        <CustomModal
          maxWidth={"lg"}
          isOpen={isOpen}
          handleClose={closeModal}
          showCloseBtn={true}
          title="File Preview"
          children={
            <>
              {fileToView !== null && (
                <PDFViewer
                  src={fileToView}
                  onLoad={() => console.log("PDF loaded successfully")}
                  onError={handleError}
                />
              )}
            </>
          }
        />
      )}
    </>
  );
};
export default FileBox;
