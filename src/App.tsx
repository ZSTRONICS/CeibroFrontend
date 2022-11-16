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
import {socket} from "services/socket.services"
import myStore from "redux/store";
import {
  getAllChats,
  setMessagesRead,
  updateMessageById,
} from "redux/action/chat.action";
import {
  PUSH_MESSAGE,
  RECEIVE_MESSAGE,
  REFRESH_CHAT,
} from "config/chat.config";
import { SERVER_URL } from "utills/axios";
import { io } from "socket.io-client";
import ViewInvitations from "components/Profile/ViewInvitations";

interface MyApp {}

const App: React.FC<MyApp> = () => {
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );

  useEffect(() => {
    if (isLoggedIn) {
      if (socket.getSocket() !== null) {
        return;
      }
      
      const tokens = localStorage.getItem("tokens") || "{}";
      const myToken = JSON.parse(tokens)?.access?.token;

      const sock = io(SERVER_URL, {
        query: {
          token: myToken,
        },
      });
      socket.setSocket(sock)

      socket.getSocket().on(RECEIVE_MESSAGE, (payload: any) => {
        const selectedChat = socket.getAppSelectedChat();
        if (selectedChat) {
          const chatBox: any = document.getElementById("chatBox");
          chatBox.scrollTop = chatBox.scrollHeight;
        }
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
      socket.getSocket().on(REFRESH_CHAT, () => {
        dispatch(getAllChats());
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
     {/* component used here for availability of modal on all routes*/}
       <div style={{opacity: 0, visibility: 'hidden',width:0,height:0}}><ViewInvitations /></div> 
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
function isMessageInStore(msgIdRecieved: any) {
  const messages = myStore.store.getState().chat?.messages;
  const index = messages?.findIndex((message: any) => {
    return String(message?.id) === String(msgIdRecieved);
  });
  return index > -1;
}
export default App;
