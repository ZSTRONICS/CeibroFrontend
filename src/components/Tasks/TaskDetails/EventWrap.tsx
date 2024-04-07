import { Box, useMediaQuery } from "@mui/material";
import React, { ReactNode } from "react";

interface EventWrapProps {
  keyId: string;
  children: ReactNode;
  creator: boolean;
}

const EventWrap: React.FC<EventWrapProps> = ({ children, keyId, creator }) => {
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const style = {
    backgroundColor: creator ? "#EAEAEA" : "#D3E9F9",
    marginRight: creator ? (isMediumScreen ? "82px" : "16px") : "0",
    marginLeft: ` ${creator ? 0 : isMediumScreen ? "16px" : "82px"}`,
    padding: "8px 16px 8px 16px",
    marginBottom: "11px",
    borderRadius: "4px",
  };

  return (
    <Box key={`${keyId}`} style={{ ...style }}>
      {children}
    </Box>
  );
};

export default EventWrap;
