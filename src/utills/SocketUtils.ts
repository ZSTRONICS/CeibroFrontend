import { DOCS_CONFIG, TASK_CONFIG } from "config";
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { AxiosV2, SERVER_URL, urlV2 } from "./axios";

export const useSocket = () => {
    const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
    const [shouldSendHeartbeat, setShouldSendHeartbeat] = useState(true);
    const userId = user && user._id;
    const dispatch = useDispatch();
    const history = useHistory();

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
                setTimeout(sendHeartbeat, 10000);
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
            },
        });

        sock.on("connect", () => {
            if (socket.getSocket() !== null) {
                return;
            }
            console.log("Connected to server");
            socket.setUserId(userId);
            socket.setSocket(sock);
            setTimeout(sendHeartbeat, 10000);
        });

        sock.on("heartbeatAck", () => {
            console.log("heartbeatAck");
        });

        // sock.on("disconnect", () => {
        //     console.log("Disconnected from server");
        //     global.isSocketConnecting = false;
        //     try {
        //         sock.disconnect();
        //     } catch (e) {
        //         console.log("error in disconnecting socket", e);
        //     }
        //     socket.setSocket(null);
        // });

        sock.on("reconnect", () => {
            console.log("Reconnected to server");
            socket.setSocket(sock);
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
                            history.push("/login");
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        global.isSocketConnecting = false;
                        history.push("/login");
                        alert("Session Expired");
                        window.location.reload();
                    });
            } else {
                history.push("/login");
                window.location.reload();
            }
        });

        sock.on(CEIBRO_LIVE_EVENT_BY_SERVER, (dataRcvd: any) => {
            console.log("eventType--->", dataRcvd);
            const eventType = dataRcvd.eventType;
            const data = dataRcvd.data;
            sendSocketEventAck(dataRcvd.uuid);
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
                        payload: { task: data, eventType: "TASK_FORWARDED", userId },
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

                case DOCS_CONFIG.COMMENT_WITH_FILES:
                    dispatch({
                        type: DOCS_CONFIG.COMMENT_FILES_UPLOADED,
                        payload: data,
                    });
                    break;
            }
        });

    }, [isLoggedIn]);
    // More socket event handling...
};
