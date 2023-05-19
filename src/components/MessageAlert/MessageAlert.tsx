import React from "react";
import { Alert, AlertColor } from "@mui/material";

interface MessageProps {
  message: string;
  severity: AlertColor;
}

const MessageAlert: React.FC<MessageProps> = ({ message, severity }) => (
  <Alert sx={{ margin: "3px 0" }} severity={severity}>
    {message}
  </Alert>
);

export default MessageAlert;