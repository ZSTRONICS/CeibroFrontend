import { Box } from "@mui/material";
import { styled } from "@mui/system";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent } from "constants/interfaces";
import { useEffect, useRef, useState } from "react";
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
  description?: string;
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
        <ReadMoreWrapper title="Description" readMore={!!description??false} type="text" data={description} />
        {mediaWithoutComment.length > 0 && (
          <ReadMoreWrapper title="Images" readMore={true} type='image' data={mediaWithoutComment} />
        )}
        {mediaWithComment.length > 0 && (
          <ReadMoreWrapper title="Images" readMore={true} type='imageWithDesp' data={mediaWithComment} />
        )}
        <DrawingFiles />
        {/* {events && <AddedDetails events={events} hasFile={media.length > 0} />} */}
      </Box>
    </>
  );
}
