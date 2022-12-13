// @ts-nocheck
import { ChatListInterface, ChatMessageInterface } from "./interfaces/chat.interface";

export const CHAT_LIST: ChatListInterface[] = [
    {
        name: 'qasim',
        bookmarked: false,
        username: 'Paul Mets',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 0,
        lastMessageTime: '10:24pm',
        _id: "234",
        isGroupChat: false,
        initiator:'12a',
        members:[],
        removedMembers: [],
        access:[],
        removedAccess:[],
        createdAt: new Date(),
    }
]

export const CHAT_MESSAGE:ChatMessageInterface[] = [
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: 'asdasd12312',
        id: "",
        type: 'questioniar',
        createdAt: '2017-02-02 08:00:13.567',
    },

]
