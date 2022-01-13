import { Grid, makeStyles } from '@material-ui/core'
import colors from '../../assets/colors'
import ChatSidebar from './ChatSidebar'
import ChatBoxHeader from './ChatBoxHeader'
import { CHAT_LIST, CHAT_MESSAGE } from '../../constants/chat.constants'
import ChatBody from './ChatBody'
import ChatForm from './ChatForm'
import { useEffect, useRef, useState } from 'react'
import { clearSelectedChat } from '../../redux/action/chat.action'
import { useDispatch, useSelector } from 'react-redux';
import MediaSidebar from './MediaSidebar';
import './chat.css'
import { RootState } from '../../redux/reducers'

const Chat = () => {
    const classes = useStyles()

    const [messages, setMessage] = useState(CHAT_MESSAGE);
    const { selectedChat, sidebarOpen } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();

    const sendMessage = (text: string) => {

        const today = new Date()
        const nowTime = today.getHours() % 12 + ":" + today.getMinutes() + " Pm"

        setMessage([
            ...messages,
            {
                username: 'Kristo Vunukainen',
                time: nowTime,
                companyName: 'Electrician',
                message: text,
                seen: false,
                myMessage: true,
                _id: ""
            }
        ])

        setTimeout(() => {
            const chatBox: any = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
            chatBox.scrollTop = chatBox.scrollHeight
    
        }, 300)

        setTimeout(() => {
            setMessage(old => [
                ...old,
                {
                    username: 'Kristo Vunukainen',
                    time: nowTime,
                    companyName: 'Electrician',
                    message: 'I am fine . ',
                    seen: false,
                    myMessage: false,
                    _id: ""
                }
            ])
            setTimeout(() => {
                const chatBox: any = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
                chatBox.scrollTop = chatBox.scrollHeight
        
            }, 300)
        }, 6000)

        return text
    }

    useEffect(() => {
        dispatch(clearSelectedChat());
        return () => {
            dispatch(clearSelectedChat());    
        }
    }, []);

    return (
        <>
            {selectedChat && <MediaSidebar />}
            <Grid container className={classes.wrapper}>
                <Grid item xs={12} md={sidebarOpen ? 4: 3}>
                    <ChatSidebar/>
                </Grid>
                <Grid item xs={12} md={sidebarOpen ? 8: 9} style={{ background: 'white' }}>
                    <ChatBoxHeader chat={CHAT_LIST[0]} />
                    <ChatBody messages={messages} />
                    <ChatForm handleSendClick={sendMessage}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Chat

const useStyles = makeStyles({
    wrapper: { 
        background: colors.white,
        position: 'relative'
    }
})