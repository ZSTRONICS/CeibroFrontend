import { Grid, makeStyles, Typography } from "@material-ui/core"
import { Create } from "@material-ui/icons"
import { useSelector } from "react-redux"
import colors from "../../assets/colors"
import { ChatListInterface } from "../../constants/interfaces/chat.interface"
import { RootState } from "../../redux/reducers"
import ChatUserMenu from '../Utills/ChatChip/ChatUserMenu'
import MessageSearch from './MessageSearch';
import AddChatMember from '../Utills/ChatChip/AddChatMember';
interface ChatBoxHeaderProps {
    chat?: ChatListInterface
}

const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = (props) => {
    
    const classes = useStyles();

    const { chat: allChats, selectedChat } = useSelector((store: RootState) => store.chat); 
    const myChat = allChats?.find?.((room: any) => String(room._id) == String(selectedChat));

    return (
        <Grid container className={classes.wrapper}>
            <AddChatMember />
            {
                myChat && (
                    <>
                        <Grid item xs={1} className={classes.editWrapper}>
                            <Create className={classes.editIcon} />
                        </Grid>
                        <Grid item xs={4} className={classes.usernameWrapper}>
                            <Typography className={classes.username}>
                                {myChat?.name}
                            </Typography>
                            {myChat?.project && <Typography className={classes.projectName}>
                                Project: <span className={classes.projectTitle}> {myChat?.project?.name} </span>
                            </Typography>}
                        </Grid>
                        <Grid item xs={6} className={classes.moreWrapper}>
                            <MessageSearch />
                        </Grid>
                        <Grid item xs={1} className={classes.moreWrapper}>
                            <ChatUserMenu/>
                        </Grid>
                    </>
                )
            }
            
        </Grid>
    )
}

export default ChatBoxHeader

const useStyles = makeStyles({
    wrapper: {
        borderBottom: `1px solid ${colors.grey}`,
        height: 48
    },
    editIcon: {
        color: colors.textPrimary,
        fontSize: 14,
        border: `0.5px solid ${colors.lightGrey}`,
        padding: 8
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    editWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontWeight: "bold",
        fontSize: 14,
        paddingTop: 2
    },
    avatarWrapper: {
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    moreWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectName: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 10
    },
    projectTitle: {
        fontWeight: "bold",
        fontSize: 10,
        color: colors.textPrimary
    }
})
