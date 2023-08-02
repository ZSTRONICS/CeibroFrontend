import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import assets from "../../../assets/assets";
import { IFile } from "constants/interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import { fileType } from "components/Tasks/type";

interface IProps {
  title?: string;
  files: IFile[] | File[];
  size?: string;
  textColor?: string;
  handleClearFile?: (file: File, type: fileType) => void;
}

const FileBox: React.FC<IProps> = ({ files, title, size, handleClearFile }) => (
  <Box
    sx={{
      width: "100%",
      height: "30px",
      border: "1px solid #e2e4e5",
      padding: "5px 0",
      paddingLeft: "15px",
      gap: 1,
      display: "flex",
      alignItems: "center",
      color: "#605c5c",
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
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {files.length > 0 ? (
        files.map((item: IFile | File) => {
          let f_name = "";
          let key = "";
          const { fileName, _id, name } = item;
          if (fileName) {
            f_name = fileName;
            key = _id;
          } else if (name) {
            f_name = name;
            key = `${name}_${size}`;
          }
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "16px",
              }}
            >
              <img
                width={20}
                height={20}
                src={assets.FileIcon}
                alt="File Icon"
              />
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  marginLeft: "8px",
                  marginRight: "16px",
                }}
              >
                {f_name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "10px",
                  opacity: 0.54,
                }}
              >
                {size && size}
              </Typography>
              {handleClearFile && (
                <IconButton
                  size="small"
                  aria-label="clear selection"
                  onClick={() => handleClearFile(item, "doc")}
                >
                  <ClearIcon
                    sx={{
                      height: "16px",
                      width: "auto",
                      color: "#605C5C",
                      borderRadius: "8px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#605C5C",
                    }}
                  />
                </IconButton>
              )}
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
  </Box>
);

export default FileBox;
