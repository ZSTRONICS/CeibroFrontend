import React, { useEffect, useState } from "react";
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
import axios, { baseURL, SERVER_URL } from "utills/axios";
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { TASK_CONFIG } from "config/task.config";
import UploadingDocsPreview from "components/uploadImage/UploadingDocsPreview";
import { DOCS_CONFIG } from "config/docs.config";
import docsAction from "redux/action/docs.actions";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  getAllSubTaskList,
  getAllSubTaskOfTask,
  uploadDocs,
} from "redux/action/task.action";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { PROJECT_CONFIG } from "config/project.config";
import {
  getAllProjectMembers,
  getAllProjects,
  getGroup,
  getMember,
  PROJECT_APIS,
} from "redux/action/project.action";

interface MyApp {}

const App: React.FC<MyApp> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  let openProjectdrawer = useSelector(
    (store: RootState) => store.project.drawerOpen
  );
  let openTaskDrawer = useSelector(
    (state: RootState) => state.task.taskDrawerOpen
  );
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );
  const { selectedFilesToBeUploaded, uploadPendingFiles } = useSelector(
    (state: RootState) => state.docs
  );

  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    if (!uploadPendingFiles) {
      return;
    }

    let formData = new FormData();
    let filesPlaceholderData: any[] = [];

    const filesToUpload = selectedFilesToBeUploaded.files;
    const moduleType = selectedFilesToBeUploaded.moduleName;
    const moduleId = selectedFilesToBeUploaded.moduleId;
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
      type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED,
    });
  }, [uploadPendingFiles]);

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
        reconnectionDelayMax: 3000,
        //timeout: 4000,
        // multiplex: false,
        // forceNew: true,
        auth: {
          token: myToken,
        },
      });

      // Listen for connect event
      sock.on("connect", () => {
        console.log("Connected to server");
      });

      // Listen for disconnect event
      sock.on("disconnect", (reason: string) => {
        console.log(`Disconnected from server: ${reason}`);
        // Attempt to reconnect to the server
        sock.io.opts.reconnectionAttempts = 10;
        sock.io.opts.reconnectionDelay = 1000;
      });
      // Listen for reconnect event
      sock.on("reconnect", (attemptNumber: number) => {
        console.log(`Reconnected to server after ${attemptNumber} attempts`);
      });

      sock.on("connect_error", (err) => {
        console.error("Socket failed to connect ", err);
      });

      socket.setSocket(sock);

      socket.getSocket().on("token_invalid", () => {
        console.log("Invalid Token");
        const tokens = localStorage.getItem("tokens") || "{}";
        const jsonToken = JSON.parse(tokens);
        if ("refresh" in jsonToken) {
          axios
            .post(`${baseURL}/auth/refresh-tokens`, {
              refreshToken: String(jsonToken.refresh.token),
            })
            .then((response: any) => {
              if (response.status === 200) {
                localStorage.setItem("tokens", JSON.stringify(response.data));
                //setAuthToken(response.data.access.token);
                sock.auth = {
                  token: response.data.access.token,
                };
                sock.connect();
                socket.setSocket(sock);
              } else {
                console.log("failed");
                history.push("/login");
              }
            })
            .catch((err) => {
              console.error("Failed to connect to socket ", err);
              history.push("/login");
              alert("Token failed");
              window.location.reload();
            });
        } else {
          console.log("failed");
          history.push("/login");
        }
      });

      // sock.on("reconnect", (attempt) => {
      //   console.log("=>>>> SOCKET RECONNECTED <<<<=");

      //   socket.setSocket(sock);
      // });

      // sock.on("disconnect", (reason) => {
      //   console.log("=>>>> SOCKET DISCONNECTED <<<<=");
      //   if (reason === "io server disconnect") {
      //     console.log("=>>>> RECONNECTING SOCKET TO SERVER <<<<=");
      //     // the disconnection was initiated by the server, you need to reconnect manually
      //     socket.getSocket().connect();
      //   }
      //   // else the socket will automatically try to reconnect
      // });

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
            if (!data.access.includes(String(user._id))) {
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
              const moduleId = data._id;
              dispatch({
                type: DOCS_CONFIG.SET_SELECTED_MODULE_ID,
                payload: moduleId,
              });
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
            if (!data.access.includes(String(user._id))) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_IN_STORE,
              payload: data,
            });
            break;

          case TASK_CONFIG.REFRESH_TASK:
            dispatch({
              type: TASK_CONFIG.GET_TASK,
              payload: data,
            });
            break;

          case TASK_CONFIG.REFRESH_TASK_SUB_TASK:
            dispatch(
              getAllSubTaskOfTask({
                other: {
                  taskId: data.taskId,
                },
              })
            );
            break;

          case TASK_CONFIG.REFRESH_SUB_TASK:
            dispatch(getAllSubTaskList());
            break;
          case TASK_CONFIG.SUB_TASK_UPDATE_PUBLIC:
          case TASK_CONFIG.SUB_TASK_UPDATE_PRIVATE:
            if (!data.access.includes(String(user._id))) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_SUBTASK_IN_STORE,
              payload: data,
            });

            break;

          case TASK_CONFIG.SUBTASK_NEW_COMMENT:
            if (!data.access.includes(String(user._id))) {
              return;
            }
            try {
              const moduleId = data._id;
              dispatch({
                type: DOCS_CONFIG.SET_SELECTED_MODULE_ID,
                payload: moduleId,
              });
            } catch (e: any) {
              console.error("Failed to upload pending documents", e);
            }
            dispatch({
              type: TASK_CONFIG.PUSH_NEW_COMMENT_IN_STORE,
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
          case DOCS_CONFIG.COMMENT_WITH_FILES:
            dispatch({
              type: DOCS_CONFIG.COMMENT_FILES_UPLOADED,
              payload: data,
            });

            dispatch({
              type: TASK_CONFIG.UPDATE_COMMENT_WITH_FILES_IN_STORE,
              payload: data,
            });

            break;
          case PROJECT_CONFIG.REFRESH_PROJECTS:
            dispatch(getAllProjects());
            break;
          case PROJECT_CONFIG.REFRESH_ROLES:
            dispatch(
              PROJECT_APIS.getProjectRolesById({ other: data.projectId })
            );
            break;
          case PROJECT_CONFIG.REFRESH_PROJECT_GROUP:
            dispatch(getGroup({ other: data.projectId }));
            break;
          case PROJECT_CONFIG.REFRESH_PROJECT_MEMBERS:
            dispatch(getMember({ other:  data.projectId }));
            break;

          case TASK_CONFIG.TASK_SUBTASK_UPDATED:
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
      <ErrorBoundary>
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
        {openProjectdrawer && <CreateProjectDrawer />}
        <ToastContainer position="bottom-left" theme="colored" />
        {openTaskDrawer && <CreateTaskDrawer />}
        <RouterConfig />
      </ErrorBoundary>
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
