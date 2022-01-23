import { Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../assets/assets";
import { RootState } from "../../redux/reducers";
import NameAvatar from "../Utills/Others/NameAvatar";
import { useConfirm } from 'material-ui-confirm';
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { toast } from "react-toastify";

const ChatMembers = () => {
    const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
    const members = selectedChat ? chat.find((room: any)=> String(room._id) == String(selectedChat))?.members: []
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const handleClick = (userId: any) => {
        // console.log('confirm is ', confirm
        confirm({ description: 'User will be removed from this chat' })
        .then(() => { 
            dispatch(addMemberToChat({
                other: {
                    roomId: selectedChat,
                    userId: userId
                },
                success: () => {
                    dispatch(getAllChats());
                    toast.success('Chat member removed successfully');   
                }
            }))
        })
    }

    return (
        <div className="chat-members">
            {members.map((member: any) => {
                return (
                    <Grid key={member.id} container className="chat-member-chip">
                        <Grid item xs={2} style={{ paddingTop: 5 }}>
                            <NameAvatar name={member?.name} />
                        </Grid>
                        <Grid item xs={8} style={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography className="chat-member-name">
                                {member.name}
                            </Typography>
                            <Typography className="chat-member-company">
                                Project: {member.compoany}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={styles.trashWrapper}>
                            <IconButton onClick={() => handleClick(member.id)}>
                                <img
                                    src={assets.trashIcon} 
                                    style={styles.trashImage} 
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default ChatMembers;

const styles = {
    trashWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trashImage: {
        cursor: 'pointer'
    }
}