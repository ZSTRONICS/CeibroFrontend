import { put, takeLatest } from 'redux-saga/effects'
import { GET_CHAT } from '../../config/chat.config';
import apiCall from '../../utills/apiCall';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const getAllChat = apiCall({
    type: GET_CHAT,
    method: "get",
    path: "/chat/rooms",
    success: (res: any) => {
        alert('got all chat rooms');
    }
})

function* chatSaga() {
  yield takeLatest(GET_CHAT, getAllChat);
}

export default chatSaga;