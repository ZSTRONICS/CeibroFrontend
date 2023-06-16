import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/appReducer";
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface";
import colors from "../../assets/colors";
import { goToMessage, setDownBlock } from "redux/action/chat.action";

interface chatMInt {}

const ChatPinned: React.FC<chatMInt> = (props) => {
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.chat);
  const { pinnedMessages } = useSelector((state: RootState) => state.chat);
  
  const handleGoToMesg = (messageId: string) => {
    dispatch(setDownBlock(false))
    dispatch(goToMessage(messageId, messages.length));
  };

  return (
    <Grid container className="chat-member-chip" style={styles.wrapper}>
      {pinnedMessages?.message?.map?.((message: ChatMessageInterface) => {
        return (
          <Grid
            item
            xs={12}
            className="pin-message-chip"
            onClick={() => handleGoToMesg(message._id)}
            style={{ padding: 10, background: colors.white, marginTop: 10 }}
          >
            <Typography style={{ fontSize: 14 }}>{message?.message}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChatPinned;

const styles = {
  wrapper: {
    height: "auto",
    maxHeight: 240,
    overflow: "auto",
  },
};
