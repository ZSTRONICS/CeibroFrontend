
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';

import { io } from 'socket.io-client';
import { SERVER_URL } from "../utills/axios";

class WebSocketService {
  public static socket: any 
  public static selectedChat: any 

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

  public setSocket(socket:any){
    WebSocketService.socket = socket
  }

}

const socket = new WebSocketService()

export {socket}