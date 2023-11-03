import { Box } from "@mui/material";
import { styled } from "@mui/system";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import AddedDetails from "./AddedDetails";
import DrawingFiles from "./DrawingFiles";

const CustomScrollbarBox = styled(Box)({
  width: "100%",
  padding: "10px 0px 16px 0px",
  display: "flex",
  flexWrap: "wrap",
});

const ImageBoxWrapper = styled(Box)({
  marginRight: "16px",
  "&:hover": {
    cursor: "pointer",
  },
});
interface IProps {
  description: string;
  events: TaskEvent[];
  media: IFile[];
}

export default function DetailsBody(props: IProps) {
  const { description, events, media } = props;
  const [fileToView, setFileToView] = useState<any | null>(null);
  const [mediaWithComment, setMediaWithComment] = useState<IFile[]>([]);
  const [mediaWithoutComment, setMediaWithoutComment] = useState<IFile[]>([]);
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

  useEffect(() => {
    if (media && media.length > 0) {
      const mediaWithComment = media.filter((file) => file.comment.length > 0);
      const mediaWithoutComment = media.filter(
        (file) => file.comment.length === 0
      );
      setMediaWithComment([...mediaWithComment]);
      setMediaWithoutComment([...mediaWithoutComment]);
    }
  }, [media]);

  return (
    <>
      <Box
        ref={listRef}
        sx={{
          overflow: "auto",
          maxHeight: `calc(100vh - ${heightOffset}px)`,
          paddingLeft: "0px",
        }}
      >
        <ReadMoreWrapper title="Description" readMore={true}>
          <p
            style={{
              fontWeight: 400,
              fontSize: "14px",
              color: "#000",
              paddingTop: "5px",
              wordWrap: "break-word",
            }}
          >
            {description === "" ? "N/A" : description}
          </p>
        </ReadMoreWrapper>
        {/* <DespcriptionBox description={description} /> */}
        {mediaWithoutComment.length > 0 && (
          <ReadMoreWrapper title="Images" readMore={true}>
            <CustomScrollbarBox>
              {mediaWithoutComment.map((file: IFile) => {
                return (
                  <ImageBoxWrapper
                    key={file._id}
                    onClick={() => handleClick(file)}
                  >
                    <ImageBox src={file.fileUrl} />
                  </ImageBoxWrapper>
                );
              })}
            </CustomScrollbarBox>
          </ReadMoreWrapper>
        )}
        {mediaWithComment.length > 0 && (
          <ReadMoreWrapper title="Images" readMore={true}>
            <CustomScrollbarBox>
              {mediaWithComment.map((file: IFile) => {
                return (
                  <ImageBoxWrapper
                    key={file._id}
                    onClick={() => handleClick(file)}
                  >
                    <ImageBoxWithDesp
                      src={file.fileUrl}
                      comment={file.comment}
                    />
                  </ImageBoxWrapper>
                );
              })}
            </CustomScrollbarBox>
          </ReadMoreWrapper>
        )}
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
