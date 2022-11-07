import { RECEIVE_MESSAGE } from 'config/chat.config';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, updateMessageById } from 'redux/action/chat.action';
import { RootState } from 'redux/reducers';
import { io } from 'socket.io-client';
import { SERVER_URL } from "../utills/axios";

let socket: any = null
let selectedChat:any = null

const initSocket = () => {
  const tokens = localStorage.getItem("tokens") || "{}";
  const myToken = JSON.parse(tokens)?.access?.token;
  
  socket= io(SERVER_URL, {
    query: {
      token: myToken,
    },
  });
}

const setAppSelectedChat = (chat:any)=>{
  selectedChat = chat
}
const getAppSelectedChat = ()=>{
  return selectedChat
}

const getSocket = () => {
  return socket;
}

const isSocketConnected =()=>{
  try {
      return socket.connected
  } catch (error) {
    return false
  }

}

export {
  initSocket,
  setAppSelectedChat,
  getAppSelectedChat,
  isSocketConnected,
  getSocket}

