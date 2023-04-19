import { UserInterface } from "./user.interface";
export interface ChatMembers{  
   role:string
   isEmailVerified: boolean
   pinnedMessages: string[]
   pinnedChat: string[]
   mutedChat: string[]
   isOnline: boolean
   firstName:string
   surName:string
   username:string
   email:string
   socketId:string
   lockedUntil:Date
   _id:string
}

export interface ChatListInterface {
  bookmarked: boolean;
  name: string;
  username?: string;
  lastMessage?: any;
  unreadCount: any;
  lastMessageTime?: string;
  _id: string;
  project?: any;
  mutedBy?: any;
  pinnedBy?: any;
  isGroupChat: boolean;
  initiator:string
  members:ChatMembers[]
  removedMembers:ChatMembers[]
  removedAccess:ChatMembers[]
  access:[]
  createdAt:string
}

export interface ChatMessageInterface {
  username: string;
  time: string;
  companyName: string;
  message: string;
  seen: boolean;
  myMessage: string;
  files?: any;
  replyOf?: any;
  _id: any;
  id?: any;
  readBy?: UserInterface[];
  pinnedBy?: any;
  sender?: UserInterface| any;
  title?: string;
  voiceUrl?: string;
  dueDate?: any;
  chat?: any;
  type: "message" | "questioniar" | "voice" | "bot" | "start-bot";
  createdAt:string|any
}
