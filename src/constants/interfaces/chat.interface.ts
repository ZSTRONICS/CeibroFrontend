import { UserInterface } from "./user.interface";

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
  pinnedBy?: any;
  sender?: UserInterface;
  voiceUrl?: string;
  type: "message" | "questioniar" | "voice";
}
