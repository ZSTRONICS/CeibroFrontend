import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";
import { ChatMessageInterface } from '../../constants/interfaces/chat.interface'
import colors from "../../assets/colors";

interface chatMInt {
}

const ChatPinned: React.FC<chatMInt> = (props) => {
    
    const { pinnedMessages } = useSelector((state: RootState) => state.chat);


    return (
            <Grid container className="chat-member-chip" style={styles.wrapper}>
                {pinnedMessages?.map?.((message: ChatMessageInterface) => {
                    return (
                            <Grid item xs={12} style={{ padding: 10, background: colors.white, marginTop: 10 }}>
                                <Typography>
                                    {message?.message}
                                </Typography>
                            </Grid>
                    )
                })}
            </Grid>
    )
}

export default ChatPinned;

const styles = {
    wrapper: {
        height: "auto",
        maxHeight: 240,
        overflow: 'auto'
    }
}


