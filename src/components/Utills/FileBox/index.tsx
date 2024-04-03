import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
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
  files: IFile[] | File[] | ImageWithComment[] | string | undefined;
  textColor?: string;
  showFullHeight?: boolean;
  isnoWrap?: boolean;
  handleClearFile?: (file: File | any, type: fileType) => void;
  download?: boolean;
  iscomment?: boolean;
  fileCompRef?: any;
}

const getFileIconThumbnail = (
  fileType: string,
  width?: number,
  height?: number
) => {
  switch (fileType) {
    case "application/pdf":
    case ".pdf":
      return <PdfIconThumnails width={width} height={height} />;
    case "text/csv":
    case ".csv":
    case ".xlsx":
    case ".xls":
    case "application/vnd.ms-excel":
    case "application/vnd.oasis.opendocument.spreadsheet":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel.sheet.macroEnabled.12":
      return <ExcelFileThumbnail width={width} height={height} />;
    case "text/plain":
    case ".txt":
    case "application/vnd.oasis.opendocument.text":
      return <TextFileThumbnail width={width} height={height} />;
    case "application/msword":
    case ".docx":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <DocFileThumbnail width={width} height={height} />;
    case "application/autocad_dwg":
    case "image/vnd.dwg":
    case "application/dwg":
    case "application/x-dwg":
    case "application/x-autocad":
    case "image/x-dwg":
    case "drawing/dwg":
    case ".dwg":
      return <DrawingFileThumbnail width={width} height={height} />;
    case "application/zip":
    case "application/x-zip-compressed":
    case ".zip":
      return <ZipFileThumbnail width={width} height={height} />;
    default:
      <DefaultFileThumbnail width={width} height={height} />;
  }
};

const FileBox: React.FC<IProps> = ({
  bb,
  bt,
  files,
  title,
  isnoWrap,
  handleClearFile,
  iscomment,
  download,
  fileCompRef,
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

  const fileWidth = iscomment ? 18 : 16;
  const fileHeight = iscomment ? 20 : 27;

  const Task_Details = true;
  return (
    <Box
      ref={fileCompRef}
      sx={{
        width: "100%",
        gap: 1.2,
        display: "flex",
        alignItems: "center",
        flexWrap: isnoWrap ? "nowrap" : "wrap",
        color: "#605c5c",
        overflow: "auto",
        height: isnoWrap ? "100%" : "auto",
        pl: isnoWrap ? 2 : 0,
      }}
    >
      {files && Array.isArray(files) && files.length > 0 ? (
        files.map((item: IFile | File | ImageWithComment | any) => {
          const fileSize = filesizes(item.size);
          let f_name = "";
          let key = "";
          const { fileName, _id, name, type, fileType } = item.file
            ? item.file
            : item;
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
                width: `${item.size ? "255px" : "200px"}`,
                gap: "10px",
                // border: "solid 1px red",
                pl: 0,
                marginLeft: iscomment ? "-13px" : null,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => openPDFNewTab(item)}
            >
              {type
                ? getFileIconThumbnail(type, fileWidth, fileHeight)
                : getFileIconThumbnail(fileType, fileWidth, fileHeight)}
              <Tooltip title={f_name}>
                <Typography
                  sx={{
                    width: "max-content",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    color: "#131516",
                    fontSize: "14px",
                  }}
                >
                  {trimFileName(Task_Details, f_name)}
                </Typography>
              </Tooltip>
              {/* {item.size && (
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "11px",
                      opacity: 0.54,
                      width: "100%",
                    }}
                  >
                    {fileSize}
                  </Typography>
                )} */}
              {handleClearFile && (
                <IconButton
                  size="small"
                  aria-label="clear selection"
                  onClick={() => handleClearFile(item, "doc")}
                >
                  <ClearIconSvgGray height="20" width="20" />
                </IconButton>
              )}
              {download ? (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={item.fileUrl}
                  download={true}
                  // style={{ border: "1px solid red" }}
                >
                  <FileDownloadOutlinedIcon sx={{ color: "#1976D2" }} />
                </a>
              ) : (
                <></>
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
            marginRight: "16px",
            marginTop: "4px",
          }}
        >
          No attachment found
        </Typography>
      )}
      {isOpen && (
        <ImagePreviewModal
          isPdfFile={true}
          isOpen={isOpen}
          closeModal={closeModal}
          title="File Preview"
          fileToView={fileToView}
        />
      )}
    </Box>
  );
};

export { getFileIconThumbnail };
export default FileBox;
