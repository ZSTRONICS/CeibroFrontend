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
  RouterConfig,
  TaskModal,
  CDrawer,
} from "components";

// socket
import { socket } from "services/socket.services";
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
} from "redux/action/chat.action";
import {
  ALL_MESSAGE_SEEN,
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
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { TASK_CONFIG } from "config/task.config";
import UploadingDocsPreview from "components/uploadImage/UploadingDocsPreview";
import { DOCS_CONFIG } from "config/docs.config";
import docsAction from "redux/action/docs.actions";
import { useLocation } from "react-router-dom";
import { uploadDocs } from "redux/action/task.action";

interface MyApp { }

const App: React.FC<MyApp> = () => {
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );

  const { selectedFilesToBeUploaded, uploadPendingFiles } = useSelector((state: RootState) => state.docs);


  useEffect(() => {
    if (!uploadPendingFiles) {
      return
    }

    let formData = new FormData();
    let filesPlaceholderData: any[] = [];

    const filesToUpload = selectedFilesToBeUploaded.files
    const moduleType = selectedFilesToBeUploaded.moduleName
    const moduleId = selectedFilesToBeUploaded.moduleId

    //console.log("Uploading pending Files => ", filesToUpload, moduleId, moduleType);

    Array.from(filesToUpload).forEach((file: any) => {
      const chunkSize = 1024 * 1024; // 1MB chunks
      let offset = 0;
      // Create an array of chunks
      const chunks = [];
      while (offset < file.size) {
        const chunk = file.slice(offset, offset + chunkSize);
        chunks.push(chunk);
        offset += chunkSize;
      }
      // Create a new Blob object from the array
      const blob = new Blob(chunks);
      formData.append("files", blob, file.name);

      filesPlaceholderData.push({
        access: [],
        version: 1,
        _id: "",
        uploadedBy: "",
        fileUrl: "",
        fileSize: file.size,
        fileType: "",
        progress: 1,
        fileName: file.name,
        uploadStatus: "",
        moduleType: moduleType,
        moduleId: moduleId,
        createdAt: "",
        updatedAt: "",
      });
    });
    formData.append("moduleName", moduleType);
    formData.append("_id", moduleId);

    dispatch({
      type: DOCS_CONFIG.PUSH_FILE_UPLAOD_RESPONSE,
      payload: filesPlaceholderData,
    });

    const payload = {
      body: formData,
      success: (res: any) => {
        if (res.status === 200) {
          //toast.success("file(s) uploaded");
          if (res.data.results.files.length > 0) {
            let allFiles = res.data.results.files;
            const files = allFiles.map((file: any) => {
              file.progress = 100;
              return file;
            });
            dispatch({
              type: DOCS_CONFIG.UPDATE_FILE_UPLAOD_RESPONSE,
              payload: files,
            });
          }
        }
      },
    };

    dispatch(uploadDocs(payload));

    dispatch({
      type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED
    });

  }, [uploadPendingFiles])

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(taskActions.openSubtaskDetailDrawer())
      // dispatch(taskActions.openTaskDrawer())
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
      socket.setSocket(sock);

      socket.getSocket().on(CHAT_EVENT_REP_OVER_SOCKET, (dataRcvd: any) => {
        const eventType = dataRcvd.eventType;
        const payload = dataRcvd.data;
        switch (eventType) {
          case RECEIVE_MESSAGE:
            {
              const selectedChat = socket.getAppSelectedChat();
              const data = payload.data;
              socket.getUnreadMsgCount(user._id);
              if (String(data.from) !== String(user?._id)) {
                if (String(data.chat) === String(selectedChat)) {
                  dispatch({
                    type: PUSH_MESSAGE_BY_OTHER,
                    payload: data.message,
                  });
                  socket.sendMessageSeen(
                    user._id,
                    selectedChat,
                    data.message._id
                  );
                } else {
                  socket.getUnreadMsgCount(user._id);
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
                  if (String(data.from) === String(user?._id)) {
                    dispatch({
                      type: PUSH_MESSAGE_BY_OTHER,
                      payload: data.message,
                    });
                  } else {
                    dispatch({
                      type: PUSH_MESSAGE,
                      payload: data.message,
                    });
                  }
                }
              } else {
                dispatch(getAllChats());
                socket.getUnreadMsgCount(user._id);
              }
            }
            break;

          case REFRESH_CHAT:
            socket.getUnreadMsgCount(user._id);
            dispatch(getAllChats());
            break;

          case UNREAD_MESSAGE_COUNT:
            dispatch(unreadMessagesCount({ other: payload.data }));

            break;
          // case ROOM_MESSAGE_DATA:
          //   {
          //     const count = payload.count;
          //     const roomId = payload.roomId;
          //     const lastMessage = payload.lastMessage;

          //     dispatch(
          //       unreadRoomMessagesCount({ other: { count , roomId, lastMessage } })
          //     );
          //   }
          //   break;
          case ALL_MESSAGE_SEEN:
          case MESSAGE_SEEN:
            {
              if (payload.updatedMessage.length === 0) {
                return;
              }
              const selectedChat = socket.getAppSelectedChat();
              if (payload.roomId === selectedChat) {
                if (
                  payload.updatedMessage &&
                  payload.updatedMessage.length > 0
                ) {
                  const messages = payload.updatedMessage;

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
            break;
        }
      });

      socket.getSocket().on(CEIBRO_LIVE_EVENT_BY_SERVER, (dataRcvd: any) => {
        const eventType = dataRcvd.eventType;
        const data = dataRcvd.data;
        console.log("eventType-->", eventType, dataRcvd);
        switch (eventType) {
          case TASK_CONFIG.TASK_CREATED:
            if (!data.access.includes(user._id)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.PUSH_TASK_TO_STORE,
              payload: data,
            });
            break;

          case TASK_CONFIG.SUB_TASK_CREATED:
            if (!data.access.includes(user._id)) {
              return;
            }

            try {
              const moduleId = data._id
              dispatch({
                type: DOCS_CONFIG.SET_SELECTED_MODULE_ID,
                payload: moduleId
              })
            } catch (e: any) {
              console.error("Failed to upload pending documents", e);
            }

            dispatch({
              type: TASK_CONFIG.PUSH_SUB_TASK_TO_STORE,
              payload: data,
            });

            break;

          case TASK_CONFIG.TASK_UPDATE_PUBLIC:
          case TASK_CONFIG.TASK_UPDATE_PRIVATE:
            if (!data.access.includes(user._id)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_IN_STORE,
              payload: data,
            });
            break;

          case TASK_CONFIG.SUB_TASK_UPDATE_PUBLIC:
            // console.log('SUB_TASK_UPDATE_PUBLIC', data)
            dispatch({
              type: TASK_CONFIG.UPDATE_SUBTASK_IN_STORE,
              payload: data,
            });
            break;

          case DOCS_CONFIG.FILE_UPLOAD_PROGRESS:
            dispatch({
              type: DOCS_CONFIG.FILE_UPLOAD_PROGRESS,
              payload: data,
            });
            break;
          case DOCS_CONFIG.FILE_UPLOADED:
            dispatch({
              type: DOCS_CONFIG.FILE_UPLOADED,
              payload: data,
            });
            break;

          case DOCS_CONFIG.FILES_UPLOAD_COMPLETED:
            //Handle switch case here
            dispatch(
              docsAction.getDocsByModuleNameAndId({
                other: {
                  moduleName: data.moduleName,
                  moduleId: data.moduleId,
                },
              })
            );

            dispatch({
              type: DOCS_CONFIG.FILES_UPLOAD_COMPLETED,
              payload: data,
            });
            break;

          case TASK_CONFIG.TASK_SUBTASK_UPDATED:
            // console.log('TASK_SUBTASK_UPDATED', data.results)
            try {
              const payload = {
                task: data.results.task,
                subtask: data.results.subtasks[0],
              };
              dispatch({
                type: TASK_CONFIG.TASK_SUBTASK_UPDATED,
                payload: payload,
              });
            } catch (e) {
              console.error(e);
            }
            break;
        }
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {/* component used here for availability of modal on all routes*/}
      <TaskModal />
      <div style={{ opacity: 0, visibility: "hidden", width: 0, height: 0 }}>
        <ViewInvitations />
      </div>
      <CssBaseline />
      {<UploadingDocsPreview />}
      <CreateQuestioniarDrawer />
      <CDrawer />
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
