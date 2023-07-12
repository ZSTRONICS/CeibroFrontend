import React from "react";
import { Box, Typography } from "@mui/material";
import assets from "../../../assets/assets";

interface IFile {
  fileName: string;
  fileSize: string;
}
interface IProps {
  title: string;
  files: IFile[];
  showIcon?: boolean;
}

const FileBox = ({ files, title, showIcon = false }: IProps) => (
  <Box
    sx={{
      width: "100%",
      height: "30px",
      borderColor: "#e2e4e5",
      borderStyle: "solid",
      borderWidth: "1px 0px",
      padding: "5px 0px",
      gap: 1,
    }}
  >
    <Box
      sx={{
        height: "20px",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "85px",
          height: "16px",
          borderWidth: "0px 1px 0px 0px",
          borderColor: "#818181",
          borderStyle: "solid",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          {title}
        </Typography>
      </Box>
      {files.length > 0 &&
        files.map((item, index) => {
          const { fileName, fileSize } = item;
          return (
            <Box
              key={`${fileName}-${index}`}
              sx={{
                padding: "0px 0px 0px 10px",
                display: "flex",
                alignItems: "center",
                marginRight: "16px",
              }}
            >
              {showIcon && (
                <img
                  width={20}
                  height={20}
                  src={assets.FileIcon}
                  alt="File Icon"
                />
              )}
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "24.5px",
                  opacity: 0.87,
                  letterSpacing: "0.15px",
                  marginLeft: "8px",
                  marginRight: "16px",
                }}
              >
                {fileName}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "10px",
                  lineHeight: "14px",
                  opacity: 0.54,
                }}
              >
                {fileSize}
              </Typography>
            </Box>
          );
        })}
    </Box>
  </Box>
);

export default FileBox;
