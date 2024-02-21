import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import { fileType } from "components/Tasks/type";
import {
  ClearIconSvgGray,
  DefaultFileThumbnail,
  DocFileThumbnail,
  DrawingFileThumbnail,
  ExcelFileThumbnail,
  PdfIconThumnails,
  TextFileThumbnail,
  ZipFileThumbnail,
} from "components/material-ui/icons";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useState } from "react";
import { filesizes, trimFileName } from "../Globals";

interface IProps {
  bt?: boolean;
  bb?: boolean;
  media?: any;
  title?: string;
  files?: IFile[] | File[] | string;
  textColor?: string;
  showFullHeight?: boolean;
  handleClearFile?: (file: File | any, type: fileType) => void;
}

const FileBox: React.FC<IProps> = ({
  bb,
  bt,
  files,
  title,
  handleClearFile,
}) => {
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [fileToView, setFileToView] = useState<any | null>(null);
  const openPDFNewTab = (file: any) => {
    if (file.fileUrl) {
      openModal();
      setFileToView(file);
    } else {
      console.log("unable to open file");
    }
  };

  const getFileIconThumbnail = (fileType: string) => {
    // console.log("fileType", fileType);
    switch (fileType) {
      case "application/pdf":
      case ".pdf":
        return <PdfIconThumnails />;
      case "text/csv":
      case ".csv":
      case ".xlsx":
      case ".xls":
      case "application/vnd.ms-excel":
      case "application/vnd.oasis.opendocument.spreadsheet":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel.sheet.macroEnabled.12":
        return <ExcelFileThumbnail />;
      case "text/plain":
      case ".txt":
      case "application/vnd.oasis.opendocument.text":
        return <TextFileThumbnail />;
      case "application/msword":
      case ".docx":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <DocFileThumbnail />;
      case "application/autocad_dwg":
      case "image/vnd.dwg":
      case "application/dwg":
      case "application/x-dwg":
      case "application/x-autocad":
      case "image/x-dwg":
      case "drawing/dwg":
      case ".dwg":
        return <DrawingFileThumbnail />;
      case "application/zip":
      case "application/x-zip-compressed":
      case ".zip":
        return <ZipFileThumbnail />;
      default:
        <DefaultFileThumbnail />;
    }
  };

  const Task_Details = true;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          gap: 1.2,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          color: "#605c5c",
          overflow: "auto",
        }}
      >
        {files && Array.isArray(files) && files.length > 0 ? (
          files.map((item: IFile | File | any) => {
            const fileSize = filesizes(item.size);
            let f_name = "";
            let key = "";
            const { fileName, _id, name } = item;
            if (fileName) {
              f_name = fileName;
              key = _id;
            } else if (name) {
              f_name = name;
              key = `${name}`;
            }
            return (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: `${item.size ? "245px" : "160px"}`,
                  gap: "10px",
                  pl: 0,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => openPDFNewTab(item)}
              >
                {item.type
                  ? getFileIconThumbnail(item.type)
                  : getFileIconThumbnail(item.fileType)}
                <Tooltip title={f_name}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: "#131516",
                      fontSize: "14px",
                    }}
                  >
                    {trimFileName(Task_Details, f_name)}
                  </Typography>
                </Tooltip>
                {item.size && (
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "11px",
                      opacity: 0.54,
                    }}
                  >
                    {fileSize}
                  </Typography>
                )}
                {handleClearFile && (
                  <IconButton
                    size="small"
                    aria-label="clear selection"
                    onClick={() => handleClearFile(item, "doc")}
                  >
                    <ClearIconSvgGray height="20" width="20" />
                  </IconButton>
                )}
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 450,
              fontSize: "13px",
              opacity: 0.9,
              marginLeft: "5px",
              marginRight: "16px",
            }}
          >
            No attachment found
          </Typography>
        )}
      </Box>
      {isOpen && (
        <ImagePreviewModal
          isPdfFile={true}
          isOpen={isOpen}
          closeModal={closeModal}
          title="File Preview"
          fileToView={fileToView}
        />
      )}
    </>
  );
};
export default FileBox;
