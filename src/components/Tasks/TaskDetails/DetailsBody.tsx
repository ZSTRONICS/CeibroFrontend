import { Box } from "@mui/material";
import assets from "assets/assets";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import FileBox from "components/Utills/FileBox";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import React from "react";
import DrawingFiles from "./DrawingFiles";
import AddedDetails from "./AddedDetails";

//todo  temp url list

const urls = [assets.visual, assets.visual, assets.visual];

export default function DetailsBody() {
  return (
    <Box sx={{ paddingLeft:'15px',}}>
      <DespcriptionBox />
      <Box
        sx={{
          height: "96px",
          width: "100%",
          padding: "0px 0px 16px 0px",
          marginRight: "16px",
          display: "flex",
        }}
      >
        {urls.map((url) => {
          return (
            <Box
              sx={{
                marginRight: "16px",
              }}
            >
              <ImageBox src={url} />
            </Box>
          );
        })}
      </Box>
      {urls.map((url) => {
        return (
          <Box
            sx={{
              marginBottom: "16px",
            }}
          >
            <ImageBoxWithDesp src={url} />
          </Box>
        );
      })}
      <DrawingFiles />
      <AddedDetails />
    </Box>
  );
}
