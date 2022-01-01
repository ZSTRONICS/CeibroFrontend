import React, { useEffect } from 'react'
import ChatListChip from '../Utills/ChatChip/ChatListChip'
import { CHAT_LIST } from '../../constants/chat.constants'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../../redux/action/chat.action';
import { RootState } from '../../redux/reducers';
import { ChatListInterface } from '../../constants/interfaces/chat.interface';

const ChatList = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state: RootState) => state.chat?.chat); 
    
    useEffect(() => {
        dispatch(getAllChats());
    }, []);
    
    return (
        <div>
            {chat && chat.map((chat: ChatListInterface, index: number) =>  {
                    return <ChatListChip chat={chat} key={index}/>
                }
            )}
        </div>
    )
}

export default ChatList
