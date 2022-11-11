
import { isMessageInStore } from 'components/Chat/Chat';
import { PUSH_MESSAGE, RECEIVE_MESSAGE } from 'config/chat.config';
import { ChatMessageInterface } from 'constants/interfaces/chat.interface';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, setMessagesRead, updateMessageById } from 'redux/action/chat.action';
import { RootState } from 'redux/reducers';
import ChatReducer from 'redux/reducers/chat.reducer';
import { io } from 'socket.io-client';
import { SERVER_URL } from "../utills/axios";

let socket: any = null
let selectedChat:any = null
let user:any= null
const InitSocket = () => {
  const tokens = localStorage.getItem("tokens") || "{}";
  const myToken = JSON.parse(tokens)?.access?.token;
  
  socket= io(SERVER_URL, {
    query: {
      token: myToken,
    },
  });

  user = useSelector((store: RootState) => store.auth.user);

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



// const OnSocketMsgRecvCallBack = () => {
//   const dispatch = useDispatch()
//   getSocket().on(RECEIVE_MESSAGE, (payload: any) => { 
//     const chatBox: any = document.getElementById("chatBox");
//     chatBox.scrollTop = chatBox.scrollHeight;
//     const selectedChat = getAppSelectedChat();  
//     const data = payload.data;
//     if (String(data.from) !== String(user?.id)) {
//       if (String(data.chat) === String(selectedChat)) {
//         dispatch({
//           type: PUSH_MESSAGE,
//           payload: data.message,
//         });
//         dispatch(setMessagesRead({ other: selectedChat }));
//       } else {
//         dispatch(getAllChats());
//         dispatch(getUnreadCount());
//       }
//     } 
//     else if (String(data.chat) === String(selectedChat)) {
//       if (isMessageInStore(payload.myId)) {
        
//         dispatch(
//           updateMessageById({
//             other: {
//               oldMessageId: payload.myId,
//               newMessage: data.message,
//             },
//           })
//         );
//       } else {
//         dispatch({
//           type: PUSH_MESSAGE,
//           payload: data.message,
//         });
//       }
//     } else {
//       dispatch(getAllChats());
//     }
//   });
// };

function getUnreadCount(): any {
  throw new Error("Function not implemented.");
}
export {
  InitSocket,
  setAppSelectedChat,
  getAppSelectedChat,
  isSocketConnected,
//  OnSocketMsgRecvCallBack,
  getSocket}