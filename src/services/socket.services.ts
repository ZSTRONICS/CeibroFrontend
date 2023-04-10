
import { ALL_MESSAGE_SEEN, CHAT_EVENT_REQ_OVER_SOCKET, MESSAGE_SEEN, UNREAD_MESSAGE_COUNT, USER_JOINED_ROOM } from 'config/chat.config';

class WebSocketService {

  public static socket: any
  public static selectedChat: any
  pendingMessages: { type: string; data: string; }[] = [];
  public constructor() {
    WebSocketService.socket = null;
    WebSocketService.selectedChat = null;

  }

  public setAppSelectedChat(chat: any) {
    WebSocketService.selectedChat = chat
  }

  public getAppSelectedChat() {
    return WebSocketService.selectedChat
  }

  public isSocketConnected() {
    try {
      return WebSocketService.socket.connected
    } catch (error) {
      return false
    }
  }

  public getSocket() {
    return WebSocketService.socket
  }

  public setSocket(socket: any) {
    WebSocketService.socket = socket
    if (this.pendingMessages.length > 0) {
      this.pendingMessages.forEach((item: { type: string; data: string; }) => {
        WebSocketService.socket.emit(item.type, item.data);
      })
      this.pendingMessages = []
    }
  }

  public logoutSocketsIO() {
    WebSocketService.socket.close();
    WebSocketService.socket = null
    this.pendingMessages = []
  }

  public async getUnreadMsgCount(userId: any) {
    const data = {
      eventType: UNREAD_MESSAGE_COUNT,
      data: {
        userId
      }
    }
    if (this.getSocket() === null) {
      this.pendingMessages.push({ type: CHAT_EVENT_REQ_OVER_SOCKET, data: JSON.stringify(data) })
    } else {

      socket.getSocket().emit(CHAT_EVENT_REQ_OVER_SOCKET, JSON.stringify(data));
    }
  }

  public async sendMessageSeen(userId: any, roomId: any, messageId: any) {
    const data = {
      eventType: MESSAGE_SEEN,
      data: {
        userId,
        roomId,
        messageId,
      }
    }
    if (this.getSocket() === null) {
      this.pendingMessages.push({ type: CHAT_EVENT_REQ_OVER_SOCKET, data: JSON.stringify(data) })
    } else {

      socket.getSocket().emit(CHAT_EVENT_REQ_OVER_SOCKET, JSON.stringify(data));
    }
  }

  public async setAllMessageRead(userId: any, roomId: any) {
    const data = {
      eventType: ALL_MESSAGE_SEEN,
      data: {
        userId,
        roomId
      }
    }
    if (this.getSocket() === null) {
      this.pendingMessages.push({ type: CHAT_EVENT_REQ_OVER_SOCKET, data: JSON.stringify(data) })
    } else {

      socket.getSocket().emit(CHAT_EVENT_REQ_OVER_SOCKET, JSON.stringify(data));
    }
  }

  public async joinChatRoom(userId: any, roomId: any) {
    const data = {
      eventType: USER_JOINED_ROOM,
      data: {
        userId,
        roomId
      }
    }
    if (this.getSocket() === null) {
      this.pendingMessages.push({ type: CHAT_EVENT_REQ_OVER_SOCKET, data: JSON.stringify(data) })
    } else {

      socket.getSocket().emit(CHAT_EVENT_REQ_OVER_SOCKET, JSON.stringify(data));
    }
  }

}

const socket = new WebSocketService()

export { socket }