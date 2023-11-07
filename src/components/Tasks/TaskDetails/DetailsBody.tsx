import { Box } from "@mui/material";
import { styled } from "@mui/system";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent } from "constants/interfaces";
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
  handleFiles: any;
}

export default function DetailsBody(props: IProps) {
  const { description, events, media } = props;
  const [mediaWithComment, setMediaWithComment] = useState<IFile[]>([]);
  const [mediaWithoutComment, setMediaWithoutComment] = useState<IFile[]>([]);
  const [heightOffset, setHeightOffset] = useState();
  const listRef: any = useRef(null);

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
        {description && description !== "" && (
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
              {description}
            </p>
          </ReadMoreWrapper>
        )}
        {mediaWithoutComment.length > 0 && (
          <ReadMoreWrapper title="Images" readMore={true}>
            <CustomScrollbarBox>
              {mediaWithoutComment.map((file: IFile, index: any) => {
                return (
                  <ImageBoxWrapper
                    key={file._id + index}
                    onClick={() =>
                      props.handleFiles(mediaWithoutComment, file._id)
                    }
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
              {mediaWithComment.map((file: IFile, index: any) => {
                return (
                  <ImageBoxWrapper
                    key={file._id + index}
                    onClick={() =>
                      props.handleFiles(mediaWithComment, file._id)
                    }
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
    </>
  );
}
