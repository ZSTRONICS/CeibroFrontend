import { Box } from "@mui/material";
import { CustomDivider } from "components/CustomTags";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent } from "constants/interfaces";
import { useEffect, useRef, useState } from "react";
import DrawingFiles from "./DrawingFiles";

interface IProps {
  description?: string;
  events: TaskEvent[];
  media: IFile[];
  handleFiles: any;
}

export default function DetailsBody(props: IProps) {
  const { description, media } = props;
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
        {description && (
          <>
            <ReadMoreWrapper
              title="Description"
              readMore={!!description ?? false}
              type="text"
              data={description}
            />
            <CustomDivider />
          </>
        )}
        {mediaWithoutComment.length > 0 && (
          <>
            <ReadMoreWrapper
              title="Images"
              count={mediaWithoutComment.length}
              readMore={true}
              type="image"
              data={mediaWithoutComment}
            />
            <CustomDivider />
          </>
        )}
        {mediaWithComment.length > 0 && (
          <>
            <ReadMoreWrapper
              title="Images"
              readMore={true}
              count={mediaWithComment.length}
              type="imageWithDesp"
              data={mediaWithComment}
            />
            <CustomDivider />
          </>
        )}
        <DrawingFiles />
      </Box>
    </>
  );
}
