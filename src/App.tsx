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
import { pushMessage } from './redux/action/chat.action';
import { PUSH_MESSAGE } from './config/chat.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sounds } from './assets/assets';

export const SocketContext = createContext(null);
interface MyApp {
}

const App: React.FC<MyApp> = () => {

  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useDispatch();

  const SERVER = "http://localhost:3000";


  useEffect(() => {
    if(isLoggedIn) {
      const tokens = localStorage.getItem('tokens') || "{}";
      const myToken = JSON.parse(tokens)?.access?.token;
      const mySocket = io(SERVER,{
        query: {
          token: myToken
        }
      });
      const audio = new Audio(sounds.message);
      setSocket(mySocket);
      mySocket.on("RECEIVE_MESSAGE", data => {
        if(data.from  !== user?.id) {
          dispatch({
            type: PUSH_MESSAGE,
            payload: data.message
          });
          audio.play();
        }
      })
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
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
