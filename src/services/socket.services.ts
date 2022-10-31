
import io from 'socket.io-client';
import { SERVER_URL } from "../utills/axios";

const tokens = localStorage.getItem("tokens") || "{}";
const myToken = JSON.parse(tokens)?.access?.token;
export const socket = io(SERVER_URL, {
    query: {
      token: myToken,
    },

});

