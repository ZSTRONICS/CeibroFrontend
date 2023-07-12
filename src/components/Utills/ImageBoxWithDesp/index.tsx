import React from "react";
import ImageBox from "../ImageBox";
import { Box } from "@mui/material";
import StyledTypographyBox from "../StyledTypographyBox";
interface IProps {
  src: string;
}

export default function ImageBoxWithDesp({ src }: IProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <ImageBox src={src} />
      <StyledTypographyBox
        text="Please use Figma for developing and don't mix it with something. We
          want 100% same thing like we have in Figma.Thank you for information.
          Please refund the payment."
      />
    </Box>
  );
}
