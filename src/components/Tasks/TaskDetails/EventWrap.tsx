import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface EventWrapProps {
  key: string;
  children: ReactNode;
  creator: boolean;
}

const EventWrap: React.FC<EventWrapProps> = ({ children, key, creator }) => {
  const style = {
    backgroundColor: creator ? "#EAEAEA" : "#D3E9F9",
    marginRight: creator ? "82px" : "0",
    marginLeft: ` ${creator ? "0" : "82px"}`,
    padding: "8px 16px 8px 16px",
    marginBottom: "11px",
    borderRadius: "4px",
  };

  return (
    <Box key={key} style={{ ...style }}>
      {children}
    </Box>
  );
};

export default EventWrap;
