import { Box } from "@mui/system";
import assets from "assets/assets";
import React from "react";

interface IProps {
  src: string;
}
export default function ImageBox({ src }: IProps) {
  return (
    <img
      style={{
        height: "80px",
        width: "80px",
        borderRadius: "8px",
      }}
      src={src}
    />
  );
}
