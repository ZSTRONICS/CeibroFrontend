import React from "react"
import { Alert, AlertColor, Box } from "@mui/material";

interface MessageProps {
  message: string;
  severity: AlertColor;
  showMessage?: boolean;
}

const MessageAlert: React.FC<MessageProps> = ({ message, severity, showMessage = false }) => (
  <>
    {showMessage === false ? <Box sx={{ margin: {lg:"6px 0", md:"15px 0", xs:"15px 0"} }}> <br/> <br/> </Box> :

    <Alert sx={{ margin: {md:"6px 0", xs:"10px 0"} }} severity={severity}>
      {message}
    </Alert>
    }
  </>
);

export default MessageAlert;
