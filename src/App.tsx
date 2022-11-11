// ssh -i "ceibro_new_key.pem" ubuntu@ec2-16-171-45-183.eu-north-1.compute.amazonaws.com

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "fontsource-roboto";
import "moment-timezone";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateQuestioniarDrawer from "./components/Chat/Questioniar/CreateQuestioniar";
import ViewQuestioniarDrawer from "./components/Chat/Questioniar/ViewQuestioniar";
import CreateProjectDrawer from "./components/Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";
import CreateTaskDrawer from "./components/Tasks/Create-Task/CreateTaskDrawer";
import "./components/Topbar/ProfileBtn.css";
import RouterConfig from "./navigation/RouterConfig";

import { RootState } from "./redux/reducers";
import {
  getAllChats,
  setMessagesRead,
  updateMessageById,
} from "redux/action/chat.action";
import {
  getAppSelectedChat,
  getSocket,
  InitSocket,
  isSocketConnected,
  
} from "services/socket.services";
import { PUSH_MESSAGE, RECEIVE_MESSAGE } from "config/chat.config";
import { isMessageInStore } from "components/Chat/Chat";


interface MyApp {}

const App: React.FC<MyApp> = () => {
  const dispatch = useDispatch();
  InitSocket();


  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );


    getSocket().on(RECEIVE_MESSAGE, (payload: any) => {
      const chatBox: any = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight;
      const selectedChat = getAppSelectedChat();
      const data = payload.data;

      if (String(data.from) !== String(user?.id)) {
        if (String(data.chat) === String(selectedChat)) {
          dispatch({
            type: PUSH_MESSAGE,
            payload: data.message,
          });
          dispatch(setMessagesRead({ other: selectedChat }));
        } else {
          dispatch(getAllChats());
          dispatch(getUnreadCount());
        }
      } else if (String(data.chat) === String(selectedChat)) {
        if (isMessageInStore(payload.myId)) {
          dispatch(
            updateMessageById({
              other: {
                oldMessageId: payload.myId,
                newMessage: data.message,
              },
            })
          );
        } else {
          dispatch({
            type: PUSH_MESSAGE,
            payload: data.message,
          });
        }
      } else {
        dispatch(getAllChats());
      }
    });


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // if (!isSocketConnected()) {
  //     //   initSocket
  //     //   onSocketMsgRecvCallBack
  //     // }
  //   }
  // }, [isLoggedIn]);
  return (
    <div className="App">
      <CssBaseline />
      <CreateQuestioniarDrawer />
      {drawerOpen && <ViewQuestioniarDrawer />}
      <CreateProjectDrawer />
      <ToastContainer position="bottom-left" theme="colored" />
      <CreateTaskDrawer />
      <RouterConfig />
    </div>
  );
};

export default App;
function getUnreadCount(): any {
  throw new Error("Function not implemented.");
}
