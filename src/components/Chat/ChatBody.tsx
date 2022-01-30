import { Grid, makeStyles } from "@material-ui/core"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface"
import { getRoomMessages, getUpMessages } from "../../redux/action/chat.action"
import { RootState } from "../../redux/reducers"
import MessageChat from '../Utills/ChatChip/MessageChat';
import AddTempChatMember from '../Utills/ChatChip/AddTempChatMember';
import { SET_ALLOW_SCROLL, SET_PAGINATION_BLOCK, SET_VIEWPORT } from "../../config/chat.config"

interface ChatBodyInt {
    messages: ChatMessageInterface[]
}

const ChatBody: React.FC<ChatBodyInt> = memo((props) => {
    const messages: ChatMessageInterface[] = useSelector((store: RootState) => store.chat.messages);
    const selectedChat = useSelector((store: RootState) => store.chat.selectedChat);
    const viewport = useSelector((store: RootState) => store.chat.viewport);
    const {blockPagination, allowChangeBlock} = useSelector((store: RootState) => store.chat);
    const allowScroll = useSelector((store: RootState) => store.chat.allowScroll);
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
        const element = document.getElementById('chatBox');
        element?.addEventListener('scroll', () => handleScroll(blockPagination))
        return () => {
            element?.removeEventListener('scroll', () => {
            });
        }
    }, [blockPagination, allowChangeBlock]);

    const handleScroll = (blocked: boolean) => {
        const element = document.getElementById('chatBox');
        if(element && element?.scrollTop <= 0) {
            if(!blockPagination) {
                dispatch(getUpMessages())
            }
        }
    }

    useEffect(() => {
        if(!viewport) {
            setTimeout(() => {
                const chatBox = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 300);
        }
    }, [messages?.length, selectedChat]);

    useEffect(() => {
        console.log("🚀 ~ file: ChatBody.tsx ~ line 45 ~ useEffect ~ allowScroll", allowScroll)
        if(allowScroll) {
            // will run when something merge at top
                const chatBox = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
                const element = document.getElementById(viewport)
                console.log("🚀 ~ file: ChatBody.tsx ~ line 49 ~ useEffect ~ element", element)
                if(element) {
                    console.log("🚀 ~ file: ChatBody.tsx ~ line 52 ~ useEffect ~ element?.scrollTop", element?.scrollTop)
                    chatBox.scrollTop = element.offsetTop - 20;
                    // element.scrollIntoView({ behavior: "auto" });
                    // scroll.setScroll($(window).scrollTop()  -120- 120);
      
                    dispatch({
                        type: SET_VIEWPORT,
                        payload: null
                    })
                    dispatch({
                        type: SET_ALLOW_SCROLL,
                        payload: false
                    })
                }
        }
    }, [viewport, allowScroll]);

    return (
        <Grid className={`${classes.wrapper} custom-scrollbar`} id="chatBox" container >
            {messages && messages?.map?.((message: ChatMessageInterface) => {
                return <MessageChat message={message} />
            })}   
            <AddTempChatMember />
        </Grid>
    )
})

export default ChatBody

const useStyles = makeStyles({
     wrapper: {
         height: 'calc(100vh - 271px)',
         overflowY: 'auto',
         display: 'block',
         position: 'relative'
     },
     
})