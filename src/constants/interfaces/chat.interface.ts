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
   id:string
}

export interface ChatListInterface {
  bookmarked: boolean;
  name: string;
  username?: string;
  lastMessage?: any;
  unreadCount?: number;
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
}

export interface ChatMessageInterface {
  username: string;
  time: string;
  companyName: string;
  message: string;
  seen: boolean;
  myMessage: boolean;
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
  type: "message" | "questioniar" | "voice";
}
