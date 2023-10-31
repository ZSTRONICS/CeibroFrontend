import { Box, IconButton, Typography } from "@mui/material";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import { fileType } from "components/Tasks/type";
import { ClearIconSvgGray } from "components/material-ui/icons";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useState } from "react";
import assets from "../../../assets/assets";
import { filesizes } from "../Globals";

interface IProps {
  bt?: boolean;
  bb?: boolean;
  media?: any;
  title?: string;
  files: IFile[] | File[];
  size?: string;
  textColor?: string;
  showFullHeight?: boolean;
  handleClearFile?: (file: File | any, type: fileType) => void;
}

const FileBox: React.FC<IProps> = ({
  bb,
  bt,
  files,
  title,
  size,
  showFullHeight,
  handleClearFile,
}) => {
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [fileToView, setFileToView] = useState<any | null>(null);
  console.log("files", files);
  const openPDFNewTab = (file: any) => {
    if (file.fileUrl) {
      openModal();
      setFileToView(file);
    } else {
      console.log("not open ");
    }
  };

  const handleClick = (file: any) => {
    setFileToView(file);
    openModal();
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderTop: bt ? "1px solid #ccc" : "none",
          borderBottom: bb ? "1px solid #ccc" : "none",
          gap: 1,
          display: "flex",
          alignItems: "center",
          color: "#605c5c",
        }}
      >
        {title && (
          <Box
            sx={{
              mt: 0.6,
              mb: 0.6,
              width: "83px",
              height: "20px",
              pl: 0,
              display: "flex",
              alignItems: "center",
              paddingRight: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
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
            borderLeft: "1.9px solid #818181",
            maxHeight: `${showFullHeight ? "100%" : "6.5rem"}`,
            display: "flex",
            flexWrap: "wrap",
            pl: 1.25,
          }}
        >
          {files.length > 0 ? (
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
                key = `${name}_${size}`;
              }
              return (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    gap: "7px",
                    pl: 0,
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
                      fontWeight: 450,
                      color: "#131516",
                      fontSize: "14px",
                    }}
                  >
                    {f_name}
                  </Typography>
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
      </Box>

      {/* <Box
        className="custom-scrollbar"
        sx={{
          // height: "96px",
          width: "100%",
          padding: "10px 0px 16px 0px",
          // marginRight: "16px",
          // overflowX: "auto",
          flexWrap: "wrap",
          display: "flex",
        }}
      > */}
      {/* {media && media.length > 0 &&
        media.map((file: IFile) => {
          const hasComment = file.comment.length === 0;

          <Box
            key={file._id}
            sx={{
              marginRight: "16px",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleClick(file)}
          >
            {hasComment ? (
              <ImageBox src={file.fileUrl} />
            ) : (
              <ImageBoxWithDesp
                src={file.fileUrl}
                comment={file.comment}
              />
            )}
          </Box>
        })} */}
      {/* </Box> */}

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
