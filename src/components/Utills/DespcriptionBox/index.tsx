import React from "react";
import { Box, Typography } from "@mui/material";

interface IProps {
  desp?: string;
}

const DespcriptionBox = ({ desp }: IProps) => (
  <Box
    sx={{
      width: "100%",
      height: "60px",
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
            color:'#605c5c'
          }}
        >
          Description
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          marginLeft: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#000",
          }}
        >
          Please use Figma for developing and don't mix it with something. We
          want 100% same thing like we have in Figma.Thank you for information.
          Please refund the payment.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default DespcriptionBox;
