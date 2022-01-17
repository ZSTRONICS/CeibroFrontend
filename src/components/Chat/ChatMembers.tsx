import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import NameAvatar from "../Utills/Others/NameAvatar";


const ChatMembers = () => {
    const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
    console.log('matching', selectedChat, chat);
    const members = selectedChat ? chat.find((room: any)=> String(room._id) == String(selectedChat))?.members: []
    console.log('members are', members)
    return (
        <div className="chat-members">
            {members.map((member: any) => {
                return (
                    <Grid container className="chat-member-chip">
                        <Grid item xs={2} style={{ paddingTop: 5 }}>
                            <NameAvatar name={member?.name} />
                        </Grid>
                        <Grid item xs={10} style={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography className="chat-member-name">
                                {member.name}
                            </Typography>
                            <Typography className="chat-member-company">
                                Project: {member.compoany}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default ChatMembers;


