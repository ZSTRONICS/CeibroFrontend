import { put, takeLatest } from 'redux-saga/effects'
import { GET_CHAT, GET_MESSAGES, SET_SELECTED_CHAT } from '../../config/chat.config';
import apiCall from '../../utills/apiCall';
import { requestSuccess } from '../../utills/status';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const getAllChat = apiCall({
    type: GET_CHAT,
    method: "get",
    path: "/chat/rooms"
})

const getRoomMessages = apiCall({
  type: GET_MESSAGES,
  method: "get",
  path: (payload: any ) => "/chat/room/messages/" + payload.other.roomId
});

const setAllMessagesRead = apiCall({
  type: SET_SELECTED_CHAT,
  method: "put",
  path: (payload: any ) => "/chat/room/unread/" + payload.other,
});

function* chatSaga() {
  yield takeLatest(GET_CHAT, getAllChat);
  yield takeLatest(GET_MESSAGES, getRoomMessages)
  yield takeLatest(SET_SELECTED_CHAT, setAllMessagesRead)
  yield takeLatest(requestSuccess(SET_SELECTED_CHAT), getAllChat)
}

export default chatSaga;