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
  size?: string;
  textColor?: string;
}

const FileBox: React.FC<IProps> = ({ files, title, showIcon = false }) => (
  <Box
    sx={{
      width: "100%",
      height: "30px",
      border: "1px solid #e2e4e5",
      padding: "5px 0",
      paddingLeft:'15px',
      gap: 1,
      display: "flex",
      alignItems: "center",
      color:'#605c5c'
    }}
  >
    <Box
      sx={{
        width: "85px",
        height: "16px",
        borderRight: "1px solid #818181",
        display: "flex",
        alignItems: "center",
        paddingRight: "10px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
    </Box>
    {files.length > 0 ? (
      files.map((item, index) => {
        const { fileName, fileSize } = item;
        return (
          <Box
            key={`${fileName}-${index}`}
            sx={{
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
                opacity: 0.54,
              }}
            >
              {fileSize}
            </Typography>
          </Box>
        );
      })
    ) : (
      <Typography
        sx={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "14px",
          opacity: 0.87,
          marginLeft: "8px",
          marginRight: "16px",
        }}
      >
        No files found
      </Typography>
    )}
  </Box>
);

export default FileBox;
