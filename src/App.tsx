import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "fontsource-roboto";
import "moment-timezone";

// components
import {
  CreateQuestioniarDrawer,
  ViewQuestioniarDrawer,
  CreateProjectDrawer,
  CreateTaskDrawer,
  ViewInvitations,
  RouterConfig
} from 'components'

// socket
import { socket } from "services/socket.services"
import { io } from "socket.io-client";

// material
import { CssBaseline } from "@mui/material";

// styling
import "react-toastify/dist/ReactToastify.css";
import "./components/Topbar/ProfileBtn.css";
import "./App.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import myStore from "redux/store";
import {
  getAllChats,
  updateMessageById,
  unreadMessagesCount,
  replaceMessagesById,
  unreadRoomMessagesCount,
} from "redux/action/chat.action";
import {
  CHAT_EVENT_REP_OVER_SOCKET,
  MESSAGE_SEEN,
  PUSH_MESSAGE,
  PUSH_MESSAGE_BY_OTHER,
  RECEIVE_MESSAGE,
  REFRESH_CHAT,
  UNREAD_MESSAGE_COUNT,
} from "config/chat.config";

// axios
import { SERVER_URL } from "utills/axios";

interface MyApp { }

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

      socket.getSocket().on(CHAT_EVENT_REP_OVER_SOCKET, (dataRcvd: any) => {
        const eventType = dataRcvd.eventType
        const payload = dataRcvd.data
        switch (eventType) {
          case RECEIVE_MESSAGE:
            {
              const selectedChat = socket.getAppSelectedChat();
              const data = payload.data;
console.log('data', data);

              if (String(data.from) !== String(user?.id)) {
                if (String(data.chat) === String(selectedChat)) {
                  dispatch({
                    type: PUSH_MESSAGE_BY_OTHER,
                    payload: data.message,
                  });
                  socket.sendMessageSeen(user.id, selectedChat, data.message._id)
                } else {
                  
                  socket.getUnreadMsgCount(user.id);
                  //dispatch(getAllChats());
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
                //dispatch(getAllChats());
                socket.getUnreadMsgCount(user.id);
              }
            }
            break;

          case REFRESH_CHAT:
            {
              socket.getUnreadMsgCount(user.id);
              dispatch(getAllChats());
            }
            break;

          case UNREAD_MESSAGE_COUNT:
            {
              dispatch(
                unreadMessagesCount({ other: payload.data })
              );
            }
            break;
          // case ROOM_MESSAGE_DATA:
          //   {
          //     const count = payload.count;
          //     const roomId = payload.roomId;
          //     const lastMessage = payload.lastMessage;
          //     console.log(roomId, count, lastMessage);

          //     dispatch(
          //       unreadRoomMessagesCount({ other: { count , roomId, lastMessage } })
          //     );
          //   }
          //   break;

          case MESSAGE_SEEN:
            {
              const selectedChat = socket.getAppSelectedChat();
              if (payload.roomId === selectedChat) {
                if (payload.updatedMessage && payload.updatedMessage.length > 0 ) {
                  const messages = payload.updatedMessage
                  
                  dispatch(
                    replaceMessagesById({
                      other: {
                        messages: messages,
                      },
                    })
                  );
                }
              }
            }
            break;

          default:
            break
        }

      });
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {/* component used here for availability of modal on all routes*/}
      <div style={{ opacity: 0, visibility: 'hidden', width: 0, height: 0 }}><ViewInvitations /></div>
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
    return String(message?._id) === String(msgIdRecieved);
  });
  return index > -1;
}
export default App;
