import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface chatMInt {
    media: any;
}

const ChatMembers: React.FC<chatMInt> = (props) => {
    
    const { media } = props;

    return (
            <Grid container className="chat-member-chip">
            {media?.map?.((file: any) => {
                return (
                        <Grid item xs={4} style={{ padding: 10 }}>
                            <img style={{ width: '100%', height: '100%' }} src={file} />
                        </Grid>
                )
            })}
            </Grid>
    )
}

export default ChatMembers;


