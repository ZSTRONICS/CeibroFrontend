/* eslint-disable react-hooks/exhaustive-deps */
import "fontsource-roboto";
import "moment-timezone";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

// components
import {
  CDrawer,
  CreateProjectDrawer,
  CreateQuestioniarDrawer,
  CreateTaskDrawer,
  RouterConfig,
  TaskModal,
  ViewInvitations,
  ViewQuestioniarDrawer,
} from "components";

// socket
import { socket } from "services/socket.services";
import { io } from "socket.io-client";

// material
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// styling
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./components/Topbar/ProfileBtn.css";

// redux
import {
  ALL_MESSAGE_SEEN,
  CHAT_EVENT_REP_OVER_SOCKET,
  MESSAGE_SEEN,
  PUSH_MESSAGE_BY_OTHER,
  RECEIVE_MESSAGE,
  REFRESH_CHAT,
  UNREAD_MESSAGE_COUNT,
  UPDATE_CHAT_LAST_MESSAGE,
  UPDATE_MESSAGE_BY_ID,
} from "config/chat.config";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChats,
  replaceMessagesById,
  unreadMessagesCount,
} from "redux/action/chat.action";
import myStore from "redux/store";
import { RootState } from "./redux/reducers/appReducer";

// axios
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import UploadingDocsPreview from "components/uploadImage/UploadingDocsPreview";
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { DOCS_CONFIG } from "config/docs.config";
import { PROJECT_CONFIG } from "config/project.config";
import { TASK_CONFIG } from "config/task.config";
import { USER_CONFIG } from "config/user.config";
import { useHistory } from "react-router-dom";
import docsAction from "redux/action/docs.actions";
import {
  PROJECT_APIS,
  getAllDocuments,
  getAllProjectMembers,
  // getAllProjectMembers,
  getAllProjects,
  getFolderFiles,
  getGroup,
  getMember,
} from "redux/action/project.action";
import {
  getAllSubTaskList,
  getAllSubTaskOfTask,
  uploadDocs,
} from "redux/action/task.action";
import { getMyInvitesCount } from "redux/action/user.action";
import { AxiosV1, SERVER_URL, urlV1 } from "utills/axios";
import runOneSignal, { InitOneSignal } from "utills/runOneSignal";
import { theme } from "./theme";

interface MyApp {}

const App: React.FC<MyApp> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let sock: any = null;
  let socketIntervalId: any = null;

  const [intervalId, setLocalIntervalId] = useState<NodeJS.Timer>();
  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
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

  useEffect(() => {
    runOneSignal();
  }, []);

  // const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    if (!uploadPendingFiles) {
      return;
    }

    let formData = new FormData();
    let filesPlaceholderData: any[] = [];

    const filesToUpload = selectedFilesToBeUploaded.files;
    const moduleType = selectedFilesToBeUploaded.moduleName;
    const moduleId = selectedFilesToBeUploaded.moduleId;

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

  // Send a heartbeat event to the server periodically
  function sendHeartbeat() {
    if (sock !== null) {
      sock.emit("heartbeat");
      // hbCounter += 1
      // if (hbCounter === 6 && hbAckRcvd === false) {
      //   // reconnect logic here
      //   console.log('No HB RCVD :>> ');
      // }
      // if (hbCounter > 5) {
      //   hbAckRcvd = false;
      //   hbCounter = 0;
      // }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      InitOneSignal(userId);

      if (sock !== null) {
        return;
      }

      const tokens = localStorage.getItem("tokens") || "{}";
      const myToken = JSON.parse(tokens)?.access?.token;

      sock = io(SERVER_URL, {
        auth: {
          token: myToken,
        },
      });

      // Listen for connect event
      sock.on("connect", () => {
        clearInterval(intervalId);
        console.log("Connected to server");
        socket.setUserId(userId);
        socket.setSocket(sock);

        if (socketIntervalId === null) {
          socketIntervalId = setInterval(sendHeartbeat, 400);
        }
      });

      // Listen for disconnect event
      sock.on("disconnect", (reason: string) => {
        console.log(`Disconnected from server: ${reason}`);
        clearInterval(socketIntervalId);
        clearInterval(intervalId);
        let localInterval = setInterval(() => {
          if (socket.getSocket() != null) {
            sock.connect();
          }
        }, 2000);
        setLocalIntervalId(localInterval);
      });

      sock.on("connect_error", (err: any) => {
        clearInterval(socketIntervalId);
        clearInterval(intervalId);
        let localInterval = setInterval(() => {
          if (socket.getSocket() != null) {
            sock.connect();
          }
        }, 1000);
        setLocalIntervalId(localInterval);
      });

      sock.on("token_invalid", () => {
        const tokens = localStorage.getItem("tokens") || "{}";
        const jsonToken = JSON.parse(tokens);
        if ("refresh" in jsonToken) {
          AxiosV1.post(`${urlV1}/auth/refresh-tokens`, {
            refreshToken: String(jsonToken.refresh.token),
          })
            .then((response: any) => {
              if (response.status === 200) {
                localStorage.setItem("tokens", JSON.stringify(response.data));

                const tokens = localStorage.getItem("tokens") || "{}";
                const newToken = JSON.parse(tokens)?.access?.token;

                sock.auth = {
                  token: newToken,
                };
                sock.connect();
              } else {
                alert("Session Expired");
                history.push("/login");
                window.location.reload();
              }
            })
            .catch((err) => {
              history.push("/login");
              alert("Session Expired");
              window.location.reload();
            });
        } else {
          history.push("/login");
          window.location.reload();
        }
      });

      sock.on(CHAT_EVENT_REP_OVER_SOCKET, (dataRcvd: any) => {
        const eventType = dataRcvd.eventType;
        const payload = dataRcvd.data;
        console.log("event received", eventType, payload);
        switch (eventType) {
          case RECEIVE_MESSAGE:
            {
              const selectedChatId = socket.getAppSelectedChat();
              const data = payload.data;
              if (String(data.from) !== userId) {
                if (String(data.chat) === String(selectedChatId)) {
                  dispatch({
                    type: PUSH_MESSAGE_BY_OTHER,
                    payload: data.message,
                  });

                  socket.sendMessageSeen(
                    user._id,
                    selectedChatId,
                    data.message._id
                  );
                } else {
                }
              } else if (String(data.chat) === String(selectedChatId)) {
                if (isMessageInStore(payload.myId)) {
                  dispatch({
                    type: UPDATE_MESSAGE_BY_ID,
                    payload: {
                      other: {
                        oldMessageId: payload.myId,
                        newMessage: data.message,
                      },
                    },
                  });
                } else {
                  dispatch({
                    type: PUSH_MESSAGE_BY_OTHER,
                    payload: data.message,
                  });
                }
              }
              dispatch({
                type: UPDATE_CHAT_LAST_MESSAGE,
                payload: payload.data,
              });
              socket.getUnreadMsgCount(user._id);
            }
            break;

          case REFRESH_CHAT:
            dispatch(getAllChats());
            socket.getUnreadMsgCount(user._id);
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
              const selectedChatId = socket.getAppSelectedChat();

              if (String(payload.roomId) === String(selectedChatId)) {
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

      sock.on(CEIBRO_LIVE_EVENT_BY_SERVER, (dataRcvd: any) => {
        console.log("eventType--->", dataRcvd);
        const eventType = dataRcvd.eventType;
        const data = dataRcvd.data;
        switch (eventType) {
          case TASK_CONFIG.TOPIC_CREATED:
            dispatch({
              type: TASK_CONFIG.PUSH_TOPIC_IN_STORE,
              payload: data,
            });
            break;
          case TASK_CONFIG.TASK_CREATED:
            if (!data.access.includes(userId)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.PUSH_TASK_TO_STORE,
              payload: data,
            });
            break;

          case TASK_CONFIG.TASK_SEEN:
          case TASK_CONFIG.TASK_SHOWN:
          case TASK_CONFIG.TASK_HIDDEN:
          case TASK_CONFIG.UN_CANCEL_TASK:
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
              payload: { ...data, userId, eventType },
            });
            break;

          case TASK_CONFIG.TASK_FORWARDED:
            if (!data.access.includes(userId)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
              payload: { ...data, eventType: "TASK_FORWARDED", userId },
            });
            break;

          case TASK_CONFIG.CANCELED_TASK:
          case TASK_CONFIG.TASK_DONE:
          case TASK_CONFIG.NEW_TASK_COMMENT:
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
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
            if (!data.access.includes(userId)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_IN_STORE,
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
            if (!data.access.includes(userId)) {
              return;
            }
            dispatch({
              type: TASK_CONFIG.UPDATE_SUBTASK_IN_STORE,
              payload: data,
            });

            break;

          case TASK_CONFIG.SUBTASK_NEW_COMMENT:
            if (!data.access.includes(userId)) {
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

          case PROJECT_CONFIG.PROJECT_UPDATED:
          case PROJECT_CONFIG.PROJECT_CREATED:
            if (!data.access.includes(userId)) {
              return;
            }
            dispatch({
              type: eventType,
              payload: data,
            });
            break;

          case PROJECT_CONFIG.ROLE_UPDATED:
          case PROJECT_CONFIG.ROLE_CREATED:
            dispatch({
              type: eventType,
              payload: data,
            });
            break;

          case PROJECT_CONFIG.PROJECT_GROUP_UPDATED:
          case PROJECT_CONFIG.PROJECT_GROUP_CREATED:
            dispatch({
              type: eventType,
              payload: data,
            });
            break;

          case PROJECT_CONFIG.PROJECT_MEMBERS_ADDED:
            dispatch({
              type: PROJECT_CONFIG.PROJECT_MEMBERS_ADDED,
              payload: data,
            });
            break;

          case PROJECT_CONFIG.PROJECT_MEMBERS_UPDATED:
            dispatch({
              type: PROJECT_CONFIG.PROJECT_MEMBERS_UPDATED,
              payload: data,
            });
            break;

          case PROJECT_CONFIG.REFRESH_ROLES:
            dispatch(
              PROJECT_APIS.getProjectRolesById({ other: data.projectId })
            );
            break;

          case PROJECT_CONFIG.REFRESH_PROJECT_GROUP:
            dispatch(getGroup({ other: data.projectId }));
            break;
          // project documents and files socket events
          case PROJECT_CONFIG.REFRESH_ROOT_DOCUMENTS:
            dispatch(
              getAllDocuments({ other: { selectedProject: data.projectId } })
            );
            break;

          case PROJECT_CONFIG.REFRESH_FOLDER:
            dispatch(
              getFolderFiles({ other: { selectedFolder: data.folderId } })
            );
            break;

          case PROJECT_CONFIG.REFRESH_PROJECT_MEMBERS:
            dispatch(getMember({ other: data.projectId }));
            break;

          case USER_CONFIG.REFRESH_INVITATIONS:
            dispatch(getMyInvitesCount());
            break;

          case USER_CONFIG.REFRESH_PROJECT_MEMBERS:
            dispatch(
              getAllProjectMembers({
                other: {
                  projectId: data.projectId,
                },
              })
            );
            break;

          case USER_CONFIG.REFRESH_CONNECTIONS:
            // dispatch(getMyConnections());
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
    // <ThemeProvider theme={theme}>
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
    // </ThemeProvider>
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
