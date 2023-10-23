import { Box } from "@mui/material";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import { IFile, TaskEvent } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
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
  const [heightOffset, setHeightOffset] = useState();
  const listRef: any = useRef(null);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const handleClick = (file: any) => {
    setFileToView(file);
    openModal();
  };

  useEffect(() => {
    if (listRef.current) {
      const newTop = listRef.current.getBoundingClientRect().top;
      setHeightOffset(newTop);
    }
  }, [listRef]);

  return (
    <>
      <Box ref={listRef} sx={{ overflow: 'auto', maxHeight: `calc(100vh - ${heightOffset}px)`,paddingLeft:'0px' }}>
        <DespcriptionBox description={description} />
        <Box
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
        >
          {media.length > 0 &&
            media.map((file: IFile) => {
              const hasComment = file.comment.length === 0;
              return (
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
              );
            })}
        </Box>
        <DrawingFiles />
        {events && <AddedDetails events={events} hasFile={media.length > 0} />}
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
