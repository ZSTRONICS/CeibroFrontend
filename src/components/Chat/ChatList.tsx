import React, { useEffect } from 'react'
import ChatListChip from '../Utills/ChatChip/ChatListChip'
import { CHAT_LIST } from '../../constants/chat.constants'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, setSelectedChat } from '../../redux/action/chat.action';
import { ActionInterface, RootState } from '../../redux/reducers';
import { ChatListInterface } from '../../constants/interfaces/chat.interface';

const ChatList = () => {
    const dispatch = useDispatch();
    const { chat, type } = useSelector((state: RootState) => state.chat); 
    
    useEffect(() => {
        dispatch(getAllChats());
    }, [type]);

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
