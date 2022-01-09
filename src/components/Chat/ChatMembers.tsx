import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";


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
                        <Grid item xs={2}>
                            <img style={{ width: '100%', height: '100%' }} src={member.image || 'https://www.propertytwinsswfl.com/wp-content/uploads/2018/09/dummy-profile-pic-male.jpg'} />
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


