import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";

interface chatMInt {
    media: any;
}

const ChatMembers: React.FC<chatMInt> = (props) => {
    
    const { media } = props;

    return (
            <Grid container className="chat-member-chip" style={styles.wrapper}>
                {media?.map?.((file: any) => {
                    return (
                            <Grid item xs={4} style={{ padding: 10 }}>
                                <FilePreviewer 
                                    file={file}
                                    showControls={false}
                                />
                            </Grid>
                    )
                })}
            </Grid>
    )
}

export default ChatMembers;

const styles = {
    wrapper: {
        height: "auto",
        maxHeight: 240,
        overflow: 'auto'
    }
}


