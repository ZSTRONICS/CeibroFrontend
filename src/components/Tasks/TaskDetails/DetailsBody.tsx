import { Box } from "@mui/material";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import FileBox from "components/Utills/FileBox";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import React from "react";
import DrawingFiles from "./DrawingFiles";
import AddedDetails from "./AddedDetails";
import { File, TaskEvent } from "constants/interfaces";

interface IProps {
  description: string;
  events: TaskEvent[];
  media: File[];
}

export default function DetailsBody(props: IProps) {
  const { description, events, media } = props;
  return (
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
            .filter((media: File) => media.comment.length === 0)
            .map((file: File) => {
              return (
                <Box
                  sx={{
                    marginRight: "16px",
                  }}
                >
                  <ImageBox src={file.fileUrl} />
                </Box>
              );
            })}
      </Box>
      {media.length > 0 &&
        media
          .filter((media: File) => media.comment.length>0)
          .map((file:File) => {
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
  );
}
