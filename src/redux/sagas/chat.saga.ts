import { put, takeLatest, select } from 'redux-saga/effects'
import { GET_CHAT, GET_CHAT_API, GET_MESSAGES, SET_SELECTED_CHAT, SET_MESSAGE_READ, MUTE_CHAT, ADD_TO_FAVOURITE, SEND_REPLY_MESSAGE, PIN_MESSAGE } from '../../config/chat.config';
import apiCall from '../../utills/apiCall';
import { requestSuccess } from '../../utills/status';
import { ActionInterface, RootState } from '../reducers';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const getAllChat = apiCall({
    type: GET_CHAT,
    method: "get",
    path: (payload) => {
      let query = '?';
      if(payload?.other?.type) {
        query = `${query}type=${payload?.other?.type}&&`
      }
      if(payload?.other?.search) {
        query = `${query}name=${payload.other.search}`
      }
      return `/chat/rooms${query}`;
    }
})

function* getUserChatsByFilter(action: ActionInterface): Generator<any>{
  const type = yield select((state: RootState) => state.chat.type);
  const search = yield select((state: RootState) => state.chat.search);
  const payload = action.payload;
  payload.other = {
    type,
    search
  }
  yield put({
    type: GET_CHAT_API,
    payload
  })
}

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

const setCurrentMessageRead = apiCall({
  type: SET_MESSAGE_READ,
  method: "put",
  path: (payload: any ) => "/chat/room/unread/" + payload.other,
});

const muteChat = apiCall({
  type: MUTE_CHAT,
  method: "post",
  path: (payload: any) => "/chat/room/mute/" + payload.other
});

const addToFavourite = apiCall({
  type: ADD_TO_FAVOURITE,
  method: "post",
  path: (payload: any) => "/chat/room/favourite/" + payload.other
});

const sendReplyMessage = apiCall({
  type: SEND_REPLY_MESSAGE,
  method: "post",
  path: "/chat/message/reply"
});

const pinMessage= apiCall({
    type: PIN_MESSAGE,
    method: "post",
    path: (payload: any) => "/chat/message/favourite/" + payload.other
  });

function* chatSaga() {
  yield takeLatest(GET_CHAT, getUserChatsByFilter);
  yield takeLatest(GET_CHAT_API, getAllChat);
  yield takeLatest(GET_MESSAGES, getRoomMessages);
  yield takeLatest(SET_SELECTED_CHAT, setAllMessagesRead);
  yield takeLatest(requestSuccess(SET_SELECTED_CHAT), getAllChat);
  yield takeLatest(SET_MESSAGE_READ, setCurrentMessageRead);
  yield takeLatest(MUTE_CHAT, muteChat);
  yield takeLatest(ADD_TO_FAVOURITE, addToFavourite);
  yield takeLatest(SEND_REPLY_MESSAGE, sendReplyMessage);
  yield takeLatest(PIN_MESSAGE, pinMessage);
}

export default chatSaga;