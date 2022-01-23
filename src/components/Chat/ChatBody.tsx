import { Grid, makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface"
import { getRoomMessages } from "../../redux/action/chat.action"
import { RootState } from "../../redux/reducers"
import MessageChat from '../Utills/ChatChip/MessageChat';
import AddTempChatMember from '../Utills/ChatChip/AddTempChatMember';

interface ChatBodyInt {
    messages: ChatMessageInterface[]
}

const ChatBody: React.FC<ChatBodyInt> = (props) => {
    const messages: ChatMessageInterface[] = useSelector((store: RootState) => store.chat.messages);
    const selectedChat = useSelector((store: RootState) => store.chat.selectedChat);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedChat) {
            const payload = {
                other: {
                    roomId: selectedChat
                }
            }
            dispatch(getRoomMessages(payload))
        }
    }, [selectedChat]);

    useEffect(() => {
        setTimeout(() => {
            const chatBox = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 300);
    }, [messages?.length, selectedChat]);

    return (
        <Grid className={`${classes.wrapper} custom-scrollbar`} id="chatBox" container >
            {messages && messages?.map((message: ChatMessageInterface) => {
                return <MessageChat message={message} />
            })}   
            <AddTempChatMember />
        </Grid>
    )
}

export default ChatBody

const useStyles = makeStyles({
     wrapper: {
         height: 'calc(100vh - 271px)',
         overflowY: 'auto',
         display: 'block'
     }
})