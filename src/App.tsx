import CreateProjectDrawer from './components/Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer';
import './App.css';
import RouterConfig from './navigation/RouterConfig';
import "fontsource-roboto";
import React, { createContext, useContext, useEffect, useState } from 'react';
import './components/Topbar/ProfileBtn.css'
import CreateTaskDrawer from './components/Tasks/Create-Task/CreateTaskDrawer';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import { getAllChats, pushMessage, setMessagesRead } from './redux/action/chat.action';
import { PUSH_MESSAGE, PUSH_TO_UNSELECTED, RECEIVE_MESSAGE } from './config/chat.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sounds } from './assets/assets';
import { SERVER_URL } from './utills/axios';
import CreateQuestioniarDrawer from './components/Chat/Questioniar/CreateQuestioniar';

export const SocketContext = createContext(null);
interface MyApp {
}

const App: React.FC<MyApp> = () => {

  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const { selectedChat, type } = useSelector((store: RootState) => store.chat);
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useDispatch();

  const SERVER = SERVER_URL;
  const audio = new Audio(sounds.message);

  const playChatSound = (data: any) => {
    if(!data?.mutedFor?.includes(user.id)) {
      // audio.play();
    }
  }


  useEffect(() => {
    if(isLoggedIn) {
      const tokens = localStorage.getItem('tokens') || "{}";
      const myToken = JSON.parse(tokens)?.access?.token;
      const mySocket = io(SERVER,{
        query: {
          token: myToken
        }
      });
      setSocket(mySocket);
      mySocket.on(RECEIVE_MESSAGE, data => {
        if(String(data.from)  !== String(user?.id)) {
          if(String(data.chat) == String(selectedChat)) {
            dispatch({
              type: PUSH_MESSAGE,
              payload: data.message
            });
            dispatch(setMessagesRead({ other: selectedChat }));
            playChatSound(data);
          } else {
            dispatch(getAllChats());
            playChatSound(data);
          }
        }
      });

      return () => {
        mySocket.off(RECEIVE_MESSAGE);
      }
    }
  }, [isLoggedIn, selectedChat, user]);

  return (
    <div className="App">
      <CreateQuestioniarDrawer />
      <CreateProjectDrawer/>
      <ToastContainer position="bottom-left" theme="colored" />
      <CreateTaskDrawer/>
      <SocketContext.Provider value={socket}>
        <RouterConfig/>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
