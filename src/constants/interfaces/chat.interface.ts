export interface ChatListInterface {
    bookmarked: boolean;
    name: string;
    username?: string;
    lastMessage?: any;
    unreadCount?: number,
    lastMessageTime?: string;
    _id: string;
    project?: any;
}

export interface ChatMessageInterface {
    username: string;
    time: string;
    companyName: string;
    message: string;
    seen: boolean;
    myMessage: boolean;
    files?: any
}