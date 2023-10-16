import { DOCS_CONFIG, TASK_CONFIG } from "config";
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
    const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
    const { RECENT_TASK_UPDATED_TIME_STAMP } = useSelector((store: RootState) => store.task);
    const [shouldSendHeartbeat, setShouldSendHeartbeat] = useState(true);
    const userId = user && user._id;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSocketEvents = (dataRcvd: any) => {
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
                    type: TASK_CONFIG.PUSH_NEW_TASK_TO_STORE,
                    payload: data,
                });
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
                if (!data.access.includes(userId)) {
                    return;
                }
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: { task: data, eventType: "TASK_FORWARDED", userId, taskUpdatedAt: data.updatedAt },
                });
                break;

            case TASK_CONFIG.TASK_DONE:
            case TASK_CONFIG.CANCELED_TASK:
            case TASK_CONFIG.UN_CANCEL_TASK:
            case TASK_CONFIG.NEW_TASK_COMMENT:
                dispatch({
                    type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                    payload: data,
                });
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

        const myToken = tokens && JSON.parse(tokens)?.access?.token;

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

        const sock = io(SERVER_URL, {
            transports: ["websocket"],
            auth: {
                token: myToken,
            }, query: {
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
            console.log("logout-web from server");
            await sock.emit("logout", secureUUID);
            sock.disconnect();
            socket.setSocket(null);
            window.location.reload();
        });

        sock.on("token_invalid", () => {
            console.log("token_invalid received from server");

            const tokens = localStorage.getItem("tokens") || "{}";
            const jsonToken = JSON.parse(tokens);
            if ("refresh" in jsonToken) {
                AxiosV2.post(`${urlV2}/auth/refresh-tokens`, {
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
                            global.isSocketConnecting = false;
                            history.push(LOGIN_ROUTE);
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        global.isSocketConnecting = false;
                        history.push(LOGIN_ROUTE);
                        alert("Session Expired");
                        window.location.reload();
                    });
            } else {
                history.push(LOGIN_ROUTE);
                window.location.reload();
            }
        });

        sock.on(CEIBRO_LIVE_EVENT_BY_SERVER, (dataRcvd: any, ack: any) => {
            console.log("eventType--->", dataRcvd);
            if (ack) {
                console.log(`sending ack to server`)
                ack();
            }
            sendSocketEventAck(dataRcvd.uuid);
            handleSocketEvents(dataRcvd);
        });

    }, [isLoggedIn]);
    // More socket event handling...
};