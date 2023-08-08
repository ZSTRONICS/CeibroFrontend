import React from "react";
import ImageBox from "../ImageBox";
import { Box } from "@mui/material";
import StyledTypographyBox from "../StyledTypographyBox";
interface IProps {
  src: string;
  comment:string;
}

export default function ImageBoxWithDesp({ src, comment }: IProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <ImageBox src={src} />
      <StyledTypographyBox
        text={comment}
      />
    </Box>
  );
}
