// ssh -i "ceibro_new_key.pem" ubuntu@ec2-16-171-45-183.eu-north-1.compute.amazonaws.com
import "fontsource-roboto";
import "moment-timezone";
import React, { createContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { io, Socket } from "socket.io-client";
import "./App.css";
import { sounds } from "./assets/assets";
import CreateQuestioniarDrawer from "./components/Chat/Questioniar/CreateQuestioniar";
import ViewQuestioniarDrawer from "./components/Chat/Questioniar/ViewQuestioniar";
import CreateProjectDrawer from "./components/Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";
import CreateTaskDrawer from "./components/Tasks/Create-Task/CreateTaskDrawer";
import "./components/Topbar/ProfileBtn.css";
import {
  PUSH_MESSAGE, RECEIVE_MESSAGE, REFRESH_CHAT, SEND_MESSAGE
} from "./config/chat.config";
import RouterConfig from "./navigation/RouterConfig";
import {
  getAllChats,
  setMessagesRead,
  globalSocketContext,
} from "./redux/action/chat.action";
import {socket} from './services/socket.services'
import { RootState } from "./redux/reducers";
import { SERVER_URL } from "./utills/axios";

export const SocketContext = createContext('');
interface MyApp {}

const App: React.FC<MyApp> = () => {

  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const { selectedChat, type } = useSelector((store: RootState) => store.chat);

  const dispatch = useDispatch();
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );
  const SERVER = SERVER_URL;
  const audio = new Audio(sounds.message);

  const playChatSound = (data: any) => {
    if (!data?.mutedFor?.includes(user.id)) {
      // audio.play();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      socket.on(REFRESH_CHAT, () => {
        dispatch(getAllChats());
      });
      return () => {
        socket.off(RECEIVE_MESSAGE);
        socket.off(REFRESH_CHAT);
      };
    }
  }, [isLoggedIn, user]);

  return (
    <div className="App">
      <CssBaseline/>
      {/* <PermissionState> */}
      <CreateQuestioniarDrawer />
      {drawerOpen && <ViewQuestioniarDrawer />}
      <CreateProjectDrawer />
      <ToastContainer position="bottom-left" theme="colored" />
      <CreateTaskDrawer />
      {/* <SocketContext.Provider value={socket}> */}
        <RouterConfig />
      {/* </SocketContext.Provider> */}
      {/* </PermissionState> */}
    </div>
  );
};

export default App;
