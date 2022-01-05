import React, { useEffect } from 'react'
import ChatListChip from '../Utills/ChatChip/ChatListChip'
import { CHAT_LIST } from '../../constants/chat.constants'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, setSelectedChat } from '../../redux/action/chat.action';
import { ActionInterface, RootState } from '../../redux/reducers';
import { ChatListInterface } from '../../constants/interfaces/chat.interface';

const ChatList = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state: RootState) => state.chat?.chat); 
    
    useEffect(() => {
        dispatch(getAllChats());
    }, []);

    const handleClick = (chat: any) => {
        dispatch(setSelectedChat({ other: chat?._id }));
    }
    
    return (
        <div>
            {chat && chat.map((chat: ChatListInterface, index: number) =>  {
                    return <ChatListChip 
                                handleClick={handleClick} 
                                chat={chat} 
                                key={index}
                            />
                }
            )}
        </div>
    )
}

export default ChatList
