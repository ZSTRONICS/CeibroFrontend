import { Box } from "@mui/material";
import CustomModal from "components/Modal";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import { IFile, TaskEvent } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useState } from "react";
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
            media
              .filter((media: IFile) => media.comment.length === 0)
              .map((file: IFile) => {
                return (
                  <Box
                    sx={{
                      marginRight: "16px",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={() => {
                      openModal(), setFileToView(file);
                    }}
                  >
                    <ImageBox src={file.fileUrl} />
                  </Box>
                );
              })}
        </Box>
        {media.length > 0 &&
          media
            .filter((media: IFile) => media.comment.length > 0)
            .map((file: IFile) => {
              return (
                <Box
                  sx={{
                    marginBottom: "16px",
                  }}
                >
                  <ImageBoxWithDesp src={file.fileUrl} comment={file.comment} />
                </Box>
              );
            })}
        <DrawingFiles />
        <AddedDetails events={events} />
      </Box>
      {isOpen && (
        <CustomModal
          maxWidth={"sm"}
          isOpen={isOpen}
          handleClose={closeModal}
          showCloseBtn={true}
          title="Image Preview"
          children={
            <>
              {fileToView !== null && (
                <div>
                  <img src={fileToView.fileUrl} width="100%" />
                </div>
              )}
            </>
          }
        />
      )}
    </>
  );
}
