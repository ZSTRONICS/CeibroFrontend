import { Box } from "@mui/material";
import assets from "assets/assets";
import { CustomStack, DescriptionTag, SubHeading } from "components/CustomTags";
import React from "react";
interface IProps {
  showWaterMark: boolean;
  content: { heading: string; description: string }[];
}

function EmptyScreenDescription(props: IProps) {
  const { showWaterMark, content } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: " column",
        justifyContent: "center",
        background: `url(${
          showWaterMark ? assets.CeibroWaterMark : ""
        }) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "auto auto",
        backgroundOrigin: "content-box, padding-box",
      }}
    >
      <CustomStack
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "0 auto",
          p: 0.57,
          gap: "0.6rem",
        }}
      >
        {content.map((item, index) => (
          <React.Fragment key={index}>
            <SubHeading>{item.heading}</SubHeading>
            <DescriptionTag>{item.description}</DescriptionTag>
          </React.Fragment>
        ))}
      </CustomStack>
    </Box>
  );
}

export default EmptyScreenDescription;
