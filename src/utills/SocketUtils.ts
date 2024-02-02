import { DOCS_CONFIG, PROJECT_CONFIG, TASK_CONFIG, USER_CONFIG } from "config";
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { AxiosV2, LOGIN_ROUTE, SERVER_URL, urlV2 } from "./axios";

export const useSocket = () => {
    const { isLoggedIn, forceCloseWindow, user } = useSelector((store: RootState) => store.auth);
    const { RECENT_TASK_UPDATED_TIME_STAMP, unSeenTasks } = useSelector((store: RootState) => store.task);
    const [shouldSendHeartbeat, setShouldSendHeartbeat] = useState(true);
    const [localToken, setLocalToken] = useState<string>("");
    const userId = user && user._id;
    const dispatch = useDispatch();
    const history = useHistory();
    const updateLocalTaskTabSeen = (newTaskData: any) => {
        const { toMeState,
            fromMeState,
            isCreator,
            hiddenState,
            isSeenByMe } = newTaskData
        return dispatch({
            type: TASK_CONFIG.TASK_UNSEEN_TABS,
            payload: {
                isTomeUnseen: !isSeenByMe && toMeState !== "NA" ? true : unSeenTasks.isTomeUnseen,
                isFromMeUnseen: !isSeenByMe && isCreator && fromMeState !== "NA" ? true : unSeenTasks.isFromMeUnseen,
                isHiddenUnseen: !isSeenByMe && hiddenState !== "NA" ? true : unSeenTasks.isHiddenUnseen,
            }
        });
    }
    const handleSocketEvents = (dataRcvd: any) => {
        const eventType = dataRcvd.eventType;
        const data = dataRcvd.data;
        switch (eventType) {
            // DOCS_CONFIG
            case DOCS_CONFIG.DRAWING_FILE_UPLOADED:
                dispatch({
                    type: PROJECT_CONFIG.GROUP_DRAWING_FILE_UPLOADED,
                    payload: data
                });
                break;
            // PROJECT_CONFIG
            case PROJECT_CONFIG.PROJECT_FLOOR_CREATED:
                dispatch({
                    type: PROJECT_CONFIG.PROJECT_FLOOR_CREATED,
                    payload: data,
                });
                break;
            case PROJECT_CONFIG.PROJECT_GROUP_REMOVED:
            case PROJECT_CONFIG.PROJECT_GROUP_DELETED:
                dispatch({
                    type: PROJECT_CONFIG.PROJECT_GROUP_DELETED,
                    payload: data
                })
                break;
            case PROJECT_CONFIG.PROJECT_UPDATED:
                dispatch({
                    type: PROJECT_CONFIG.PROJECT_UPDATED,
                    payload: data
                });
                break;
            case PROJECT_CONFIG.PROJECT_GROUP_UPDATED:
                dispatch({
                    type: PROJECT_CONFIG.PROJECT_GROUP_UPDATED,
                    payload: data
                });
                break;
            case PROJECT_CONFIG.PROJECT_GROUP_CREATED:
                dispatch({
                    type: PROJECT_CONFIG.PROJECT_GROUP_CREATED,
                    payload: data,
                });
                break;
            case USER_CONFIG.USER_UPDATED:
                dispatch({
                    type: USER_CONFIG.USER_UPDATED_IN_STORE,
                    payload: data,
                });
                break;
            case TASK_CONFIG.TOPIC_CREATED:
                dispatch({
                    type: TASK_CONFIG.PUSH_TOPIC_IN_STORE,
                    payload: data,
                });
                break;
            case TASK_CONFIG.TASK_FORWARDED_TO_ME:
                dispatch({
                    type: TASK_CONFIG.PUSH_FORWARDED_TO_ME_NEW,
                    payload: data,
                });
                dispatch({
                    type: TASK_CONFIG.TASK_UNSEEN_TABS,
                    payload: {
                        isTomeUnseen: data.task.isAssignedToMe && data.task.toMeState === 'new' ? true : unSeenTasks.isTomeUnseen,
                        isFromMeUnseen: data.task.isCreator && data.task.fromMeState === "ongoing" ? true : unSeenTasks.isFromMeUnseen,
                        isHiddenUnseen: unSeenTasks.isHiddenUnseen,
                    }
                });
                break;
            case TASK_CONFIG.TASK_CREATED:
                if (!data.access.includes(userId)) {
                    return;
                }
                dispatch({
                    type: TASK_CONFIG.PUSH_NEW_TASK_TO_STORE,
                    payload: data,
                });
                dispatch({
                    type: TASK_CONFIG.TASK_UNSEEN_TABS,
                    payload: {
                        isTomeUnseen: data.isAssignedToMe && data.toMeState === 'new' ? true : unSeenTasks.isTomeUnseen,
                        isFromMeUnseen: data.isCreator && data.fromMeState === "unread" ? true : unSeenTasks.isFromMeUnseen,
                        isHiddenUnseen: unSeenTasks.isHiddenUnseen,
                    }
                });
                break;
            case TASK_CONFIG.NEW_TASK_COMMENT:
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: data,
                });
                updateLocalTaskTabSeen(data.oldTaskData)
                break;
            case TASK_CONFIG.TASK_SEEN:
            case TASK_CONFIG.TASK_SHOWN:
            case TASK_CONFIG.TASK_HIDDEN:
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: { ...data, userId, eventType },
                });
                break;
            case TASK_CONFIG.TASK_FORWARDED:
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: { task: data, eventType: "TASK_FORWARDED", userId, taskUpdatedAt: data.updatedAt },
                });
                updateLocalTaskTabSeen(data.oldTaskData)
                break;
            case TASK_CONFIG.TASK_DONE:
            case TASK_CONFIG.CANCELED_TASK:
            case TASK_CONFIG.UN_CANCEL_TASK:
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: data,
                });
                updateLocalTaskTabSeen(data.newTaskData)
                break;

            case DOCS_CONFIG.COMMENT_WITH_FILES:
                dispatch({
                    type: DOCS_CONFIG.COMMENT_FILES_UPLOADED,
                    payload: data,
                });
                break;
        }
    }

    useEffect(() => {
        const windowClose = window.getSelection();

        if (windowClose && forceCloseWindow) {
            window.close();
        }
    }, [forceCloseWindow]);


    useEffect(() => {
        let sock: any = null
        if (!isLoggedIn) {
            console.log("not logged in")

            global.isSocketConnecting = false;
            if (socket.getSocket() !== null) {
                console.log("socket found")
                setShouldSendHeartbeat(false);
                socket.getSocket().emit("logout");
                socket.getSocket().disconnect();
                socket.setSocket(null);
                global.isSocketConnecting = false;
            }
            return;
        }

        if (isLoggedIn && socket.getSocket() !== null) {
            return;
        }

        if (global.isSocketConnecting) {
            return;
        }

        const tokens = localStorage.getItem("tokens") || null;
        if (!tokens) {
            return;
        }

        const myToken = tokens && JSON.parse(tokens).access.token;
        setLocalToken(myToken);
        global.isSocketConnecting = true;
        function generateSecureUUID() {
            return uuidv4();
        }

        function sendHeartbeat() {
            if (sock !== null && sock.connected && shouldSendHeartbeat) {
                sock.emit("heartbeat");
                setTimeout(sendHeartbeat, 5000);
            }
        }

        function sendSocketEventAck(uuid: string) {
            if (sock !== null && sock.connected && shouldSendHeartbeat) {
                sock.emit("eventAck", uuid);
            }
        }

        const secureUUID = generateSecureUUID();
        console.log("secureUUID", secureUUID);

        // Event listener to handle page refresh, tab/window close, etc.
        window.addEventListener('beforeunload', async function () {
            await sock.emit("logout", secureUUID);
            sock.disconnect();
            socket.setSocket(null);
        });

        sock = io(SERVER_URL, {
            transports: ["websocket"],
            auth: {
                token: myToken,
            },
            query: {
                secureUUID: String(secureUUID),
                deviceType: "web",
            }
        });

        sock.on("connect", () => {
            if (sock.recovered) {
                console.log("recovered");
                socket.setSocket(sock);
                setTimeout(sendHeartbeat, 1000);
                return;
            }

            console.log("Connected to server");
            socket.setUserId(userId);
            socket.setSocket(sock);
            setTimeout(sendHeartbeat, 1000);
        });

        sock.on("disconnect", () => {
            console.log("Socket Disconnected from server");
            if (sock.io.engine) {
                console.log("Closing previous socket connection");
                // close the low-level connection and trigger a reconnection
                sock.io.engine.close();
            }
        });

        sock.on("heartbeatAck", () => {
            console.log("heartbeatAck");
        });

        sock.on("RE_SYNC_DATA", () => {
            sock.emit("RE_SYNC_DATA_ACK");
            dispatch(taskActions.syncAllTasks(
                {
                    other: {
                        syncTime: RECENT_TASK_UPDATED_TIME_STAMP,
                    },
                }
            ));
            dispatch(userApiAction.getUserContacts());
            console.log("RE_SYNC_DATA_ACK");
        });

        sock.on("logout-web", async () => {
            try {
                console.log("logout-web from server");
                await sock.emit("logout", secureUUID);
                sock.disconnect();
                socket.setSocket(null);
                window.location.reload();
            } catch (error) {
                console.log("socket error: ", error);
            }
        });

        sock.on("token_invalid", async () => {
            console.log("token_invalid received from server");
            try {
                const tokens = localStorage.getItem("tokens") || "{}";
                const jsonToken = JSON.parse(tokens || '{}');
                if (jsonToken && jsonToken.access.token) {
                    const response = await AxiosV2.post(`${urlV2}/auth/refresh-tokens`, {
                        refreshToken: String(jsonToken.refresh.token),
                    })
                    if (response) {
                        localStorage.setItem("tokens", JSON.stringify(response.data));
                        console.log('jsonToken>>>111', response.data.access);
                        const newToken = response.data.access.token;
                        setLocalToken(newToken);
                        // Reconnect socket with the new token
                        sock.disconnect();
                        sock = io(SERVER_URL, {
                            transports: ['websocket'],
                            auth: {
                                token: newToken,
                            },
                            query: {
                                secureUUID: String(secureUUID),
                                deviceType: 'web',
                            },
                        });
                        setTimeout(function () {
                            sock.emit("heartbeat");
                        }, 1000);
                        console.log('jsonToken>>>222', newToken, sock.auth)
                    }
                } else {
                    alert("Session Expired");
                    global.isSocketConnecting = false;
                    history.push(LOGIN_ROUTE);
                    window.location.reload();
                }
            } catch (error) {
                alert("Session Expired");
                global.isSocketConnecting = false;
                history.push(LOGIN_ROUTE);
                window.location.reload();
            }
        });

        sock.on(CEIBRO_LIVE_EVENT_BY_SERVER, (dataRcvd: any, ack: any) => {
            console.log("eventType--->", dataRcvd);
            // if (ack) {
            //     console.log(`sending ack to server`)
            //     ack();
            // }
            sendSocketEventAck(dataRcvd.uuid);
            handleSocketEvents(dataRcvd);
        });

    }, [isLoggedIn, localToken]);
};