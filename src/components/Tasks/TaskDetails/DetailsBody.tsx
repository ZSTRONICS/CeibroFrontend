import { Box } from "@mui/material";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
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
  const handleClick = (file: any) => {
    setFileToView(file);
    openModal();
  };
  return (
    <>
      <Box sx={{ paddingLeft: "5px" }}>
        <DespcriptionBox description={description} />
        <Box
          className="custom-scrollbar"
          sx={{
            // height: "96px",
            width: "100%",
            padding: "10px 0px 16px 0px",
            marginRight: "16px",
            overflowX: "auto",
            display: "flex",
          }}
        >
          {media.length > 0 &&
            media.map((file: IFile) => {
              const hasComment = file.comment.length === 0;
              return (
                // <React.Fragment key={file._id}>
                //   {hasComment && (
                    <Box
                      key={file._id}
                      sx={{
                        marginRight: "16px",
                        "&:hover": { cursor: "pointer" },
                      }}
                      onClick={() => handleClick(file)}
                    >
                     {hasComment?<ImageBox src={file.fileUrl} />: <ImageBoxWithDesp
                      src={file.fileUrl}
                      comment={file.comment}
                    />}
                    </Box>
                //   )}
                // </React.Fragment>
              );
            })}
        </Box>
        {/* {media.length > 0 &&
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
          })} */}
        <DrawingFiles />
        {events && events.length && (
          <AddedDetails events={events} hasFile={media.length === 0} />
        )}
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
