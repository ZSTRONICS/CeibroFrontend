import { Box } from "@mui/material";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import { IFile, TaskEvent } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useState } from "react";
import AddedDetails from "./AddedDetails";
import DrawingFiles from "./DrawingFiles";

interface IProps {
  description: string;
  events: TaskEvent[];
  media: IFile[];
}

export default function DetailsBody(props: IProps) {
  const { description, events, media } = props;
  const [fileToView, setFileToView] = useState<any | null>(null);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const handleClick = (file: any) => {
    setFileToView(file);
    openModal();
  };
  return (
    <>
      <Box sx={{ paddingLeft: "15px" }}>
        <DespcriptionBox description={description} />
        <Box
          sx={{
            // height: "96px",
            width: "100%",
            padding: "0px 0px 16px 0px",
            marginRight: "16px",
            display: "flex",
          }}
        >
          {media.length > 0 &&
            media.map((file: IFile) => {
              const hasComment = file.comment.length === 0;
              return (
                <React.Fragment key={file._id}>
                  {hasComment && (
                    <Box
                      key={file._id}
                      sx={{
                        marginRight: "16px",
                        "&:hover": { cursor: "pointer" },
                      }}
                      onClick={() => handleClick(file)}
                    >
                      <ImageBox src={file.fileUrl} />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
        </Box>
        {media.length > 0 &&
          media.map((file: IFile) => {
            const hasComment = file.comment.length > 0;
            return (
              <React.Fragment key={file._id}>
                {hasComment && (
                  <Box
                    sx={{
                      marginBottom: "16px",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={() => handleClick(file)}
                  >
                    <ImageBoxWithDesp
                      src={file.fileUrl}
                      comment={file.comment}
                    />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        <DrawingFiles />
        <AddedDetails events={events} />
      </Box>
      {isOpen && (
        <ImagePreviewModal
          isPdfFile={false}
          isOpen={isOpen}
          closeModal={closeModal}
          title="Image Preview"
          fileToView={fileToView}
        />
      )}
    </>
  );
}
