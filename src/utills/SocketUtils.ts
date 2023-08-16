import { DOCS_CONFIG, TASK_CONFIG } from "config";
import { CEIBRO_LIVE_EVENT_BY_SERVER } from "config/app.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";
import { io } from "socket.io-client";
import { AxiosV2, SERVER_URL, urlV2 } from "./axios";

export const useSocket = () => {
    const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);
    const userId = user && user._id;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) {
            global.isSocketConnecting = false;
            if (socket.getSocket() !== null) {
                socket.getSocket()?.disconnect();
                socket.setSocket(null);
            }
            return;
        }

        if (isLoggedIn && socket.getSocket() !== null) {
            return;
        }
        if (global.isSocketConnecting) {
            return;
        }

        global.isSocketConnecting = true;
        const tokens = localStorage.getItem("tokens") || "{}";
        const myToken = JSON.parse(tokens)?.access?.token;

        function generateSecureUUID() {
            return crypto.randomUUID();
        }

        function sendHeartbeat() {
            if (sock !== null && sock.connected) {
                sock.emit("heartbeat");
                setTimeout(sendHeartbeat, 10000);
            }
        }

        function sendSocketEventAck(uuid: string) {
            if (sock !== null && sock.connected) {
                sock.emit("eventAck", uuid);
            }
        }

        let secureUUID = generateSecureUUID();
        // secureUUID += "-" + sock.id;
        console.log("secureUUID", secureUUID);

        const sock = io(SERVER_URL, {
            transports: ["websocket"],
            auth: {
                token: myToken,
            }, query: {
                secureUUID: String(secureUUID),
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

        sock.on("disconnect", () => {
            console.log("Disconnected from server");
            global.isSocketConnecting = false;
            socket.setSocket(null);
        });

        sock.on("reconnect", () => {
            console.log("Reconnected to server");
            socket.setSocket(sock);
        });

        sock.on("token_invalid", () => {
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
            if (dataRcvd.uuid !== undefined) {
                sendSocketEventAck(dataRcvd.uuid);
            }
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

                    dispatch({
                        type: TASK_CONFIG.UPDATE_COMMENT_WITH_FILES_IN_STORE,
                        payload: data,
                    });

                    break;
            }
        });

    }, [isLoggedIn]);
    // More socket event handling...
};
