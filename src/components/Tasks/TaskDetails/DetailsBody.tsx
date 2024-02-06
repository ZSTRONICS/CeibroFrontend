import { Box } from "@mui/material";
import { CustomDivider } from "components/CustomTags";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile } from "constants/interfaces";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  description?: string;
  media: IFile[];
  handleFiles: any;
}

export default function DetailsBody(props: IProps) {
  const { description, media } = props;
  const [mediaWithComment, setMediaWithComment] = useState<IFile[]>([]);
  const [mediaWithoutComment, setMediaWithoutComment] = useState<IFile[]>([]);
  const [mediaDrawingFiles, setMediaDrawingFiles] = useState<IFile[]>([]);
  const [heightOffset, setHeightOffset] = useState();
  const listRef: any = useRef(null);
  const [isReadMore, setIsReadMore] = useState(false);
  const parms = useParams<{ filterkey: string }>();

  useEffect(() => {
    if (parms.filterkey === "unread" || parms.filterkey === "new") {
      setIsReadMore(true);
    }
  }, []);

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
        (file) => file.comment.length === 0 && file.fileTag != "drawing"
      );
      const mediaDrawingFiles = media.filter(
        (file) => file.comment.length === 0 && file.fileTag === "drawing"
      );
      setMediaDrawingFiles([...mediaDrawingFiles]);
      setMediaWithComment([...mediaWithComment]);
      setMediaWithoutComment([...mediaWithoutComment]);
    }
    console.log(media, "media");
  }, [media]);

  return (
    <>
      <Box
        ref={listRef}
        sx={{
          paddingLeft: "0px",
        }}
      >
        {description && (
          <>
            <ReadMoreWrapper
              title="Description"
              readMore={isReadMore}
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
              readMore={isReadMore}
              type="image"
              data={mediaWithoutComment}
            />
            <CustomDivider />
          </>
        )}
        {mediaWithComment.length > 0 && (
          <>
            <ReadMoreWrapper
              title="Images with comments"
              readMore={isReadMore}
              count={mediaWithComment.length}
              type="imageWithDesp"
              data={mediaWithComment}
            />
            <CustomDivider />
          </>
        )}
        {mediaDrawingFiles.length > 0 && (
          <>
            <ReadMoreWrapper
              title="Drawings"
              readMore={isReadMore}
              count={mediaDrawingFiles.length}
              type="image"
              data={mediaDrawingFiles}
            />
            <CustomDivider />
          </>
        )}
        {/* todo when drawingfiles functionality enable then show drawing files compoonent */}
      </Box>
    </>
  );
}
