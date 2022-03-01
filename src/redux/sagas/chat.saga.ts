import { put, takeLatest, select } from 'redux-saga/effects'
import { SET_SIDEBAR_CONFIG } from '../../config/app.config';
import { GET_CHAT, GET_CHAT_API, GET_MESSAGES, SET_SELECTED_CHAT, SET_MESSAGE_READ, MUTE_CHAT, ADD_TO_FAVOURITE, SEND_REPLY_MESSAGE, PIN_MESSAGE, GET_UNREAD_CHAT_COUNT, GET_ROOM_MEDIA, ADD_MEMBERS_TO_CHAT, ADD_TEMP_MEMBERS_TO_CHAT, SAVE_QUESTIONIAR, GET_QUESTIONIAR, SAVE_QUESTIONIAR_ANSWERS, DELETE_CONVERSATION, FORWARD_CHAT, UPDATE_MESSAGE_BY_ID, SET_LOADING_MESSAGES, GET_USER_QUESTIONIAR_ANSWER, GET_UP_CHAT_MESSAGE, GET_UP_MESSAGES, SET_VIEWPORT, GET_PINNED_MESSAGES, GET_ROOM_QUESTIONIAR } from '../../config/chat.config';
import { SAVE_MESSAGES } from '../../config/chat.config';
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
      if(payload?.other?.favourite) {
        query = `${query}favourite=${payload.other.favourite}`
      }
      return `/chat/rooms${query}`;
    }
})

function* getUserChatsByFilter(action: ActionInterface): Generator<any>{
  const type = yield select((state: RootState) => state.chat.type);
  const search = yield select((state: RootState) => state.chat.search);
  const favourite = yield select((state: RootState) => state.chat.favouriteFilter);
  const payload = action.payload;
  payload.other = {
    type,
    search,
    favourite
  }
  yield put({
    type: GET_CHAT_API,
    payload
  })
  yield put({
    type: GET_UNREAD_CHAT_COUNT,
  })
}

const getRoomMessages = apiCall({
  type: GET_MESSAGES,
  method: "get",
  path: (payload: any ) => {
    let url = `/chat/room/messages/${payload.other.roomId}`
    if(payload?.other?.search) {
      url = url + `?search=${payload?.other?.search}`
    }
    return url;
  }
});

const getUpRoomMessages = apiCall({
  type: GET_UP_MESSAGES,
  method: "get",
  path: (payload: any ) => "/chat/room/messages/" + payload.other.roomId + `?lastMessageId=${payload?.other.lastMessageId}`
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

const getQuestioniarById = apiCall({
  type: GET_QUESTIONIAR,
  method: "get",
  path: (payload: any) => "/chat/questioniar/view/" + payload.other
});

const saveQuestioniarAnswers = apiCall({
  type: SAVE_QUESTIONIAR_ANSWERS,
  method: "post",
  path: (payload: any) => "/chat/questioniar/view/" + payload.other
});

const deleteConversation = apiCall({
  type: DELETE_CONVERSATION,
  method: "delete",
  path: (payload: any) => "/chat/room/" + payload.other
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

const getUnreadCount= apiCall({
    type: GET_UNREAD_CHAT_COUNT,
    method: "get",
    path: "/chat/unread/count"
  });

const getRoomMedia = apiCall({
    type: GET_ROOM_MEDIA,
    method: "get",
    path: (payload: any) => `/chat/media/${payload.other}`
  });

const addMemberToChat = apiCall({
  type: ADD_MEMBERS_TO_CHAT,
  method: "post",
  path: (payload: any) => `/chat/member/${payload?.other?.roomId}/${payload?.other?.userId}`
});

const addTempMemberToChat = apiCall({
  type: ADD_TEMP_MEMBERS_TO_CHAT,
  method: "post",
  path: (payload: any) => `/chat/member/${payload?.other?.roomId}/${payload?.other?.userId}?temporary=true`
});

const saveQuestioniar = apiCall({
  type: SAVE_QUESTIONIAR,
  method: "post",
  path: () => `chat/message/questioniar`
});

const forwardChat = apiCall({
  type: FORWARD_CHAT,
  method: "post",
  path: () => `chat/message/forward`
});

const getUserQuestioniarAnswer = apiCall({
  type: GET_USER_QUESTIONIAR_ANSWER,
  method: "get",
  path: (payload) => `/chat/questioniar/view-answer/${payload?.other?.questioniarId}/${payload?.other?.userId}`
});

const getPinnedMessages = apiCall({
  type: GET_PINNED_MESSAGES,
  method: "get",
  path: (payload: any) => `/chat/message/favourite/${payload.other}`
});

const getRoomQuestioniar = apiCall({
  type: GET_ROOM_QUESTIONIAR,
  method: "get",
  path: (payload: any) => `/chat/message/questionair/${payload.other}`
});

function* unreadMessagesCount(action: ActionInterface): Generator<any> {
    const oldRoutes: any = yield select((state: RootState) => state.app.sidebarRoutes);
    oldRoutes['Chat'].notification = action.payload?.count || 0;
    
    yield put({
      type: SET_SIDEBAR_CONFIG,
      payload: {
          ...oldRoutes
      }
    })
 }

function* updateMessageById(action: ActionInterface): Generator<any> {
  const { payload: { other } } = action;
  const messages: any = yield select((state: RootState) => state.chat.messages);
  const loadingMessages: any = yield select((state: RootState) => state.chat.loadingMessages);
  const newLoadingMessages = loadingMessages?.filter((message: any) => String(message) !== String(other.oldMessageId))
  yield put({
    type: SET_LOADING_MESSAGES,
    payload: [...newLoadingMessages]
  })
  
  const index = messages?.findIndex((message: any) => {
    console.log('matching ', message.id, 'vs ', other.oldMessageId)
    return String(message?.id) === String(other.oldMessageId)
  });
  if(index > -1) {
    const myMessage = messages[index];
    myMessage._id = other.newMessage.id;
  
    messages[index] = myMessage;
  }
  yield put({
    type: SAVE_MESSAGES,
    payload: [...messages]
  })
}

function* getUpChatMessages(action: ActionInterface): Generator<any>{
    const isBlocked = yield select((state: RootState) => state.chat.blockPagination)  
    if(!isBlocked) {
      const selectedChat = yield select((state: RootState) => state.chat.selectedChat)  
      const messages: any = yield select((state: RootState) => state.chat.messages)
      yield put({
        type: SET_VIEWPORT,
        payload: messages?.[0]?._id
      })
      const payload = {
        other: {
          roomId: selectedChat,
          lastMessageId: messages?.[0]?._id || null
        }
      }

      yield put({
        type: GET_UP_MESSAGES,
        payload
      })
    }

}



function* chatSaga() {
  yield takeLatest(GET_CHAT, getUserChatsByFilter);
  yield takeLatest(GET_CHAT_API, getAllChat);
  yield takeLatest(GET_MESSAGES, getRoomMessages);
  yield takeLatest(GET_UP_MESSAGES, getUpRoomMessages);
  yield takeLatest(SET_SELECTED_CHAT, setAllMessagesRead);
  yield takeLatest(requestSuccess(SET_SELECTED_CHAT), getAllChat);
  yield takeLatest(requestSuccess(DELETE_CONVERSATION), getAllChat);
  yield takeLatest(SET_MESSAGE_READ, setCurrentMessageRead);
  yield takeLatest(MUTE_CHAT, muteChat);
  yield takeLatest(ADD_TO_FAVOURITE, addToFavourite);
  yield takeLatest(SEND_REPLY_MESSAGE, sendReplyMessage);
  yield takeLatest(PIN_MESSAGE, pinMessage);
  yield takeLatest(GET_UNREAD_CHAT_COUNT, getUnreadCount);
  yield takeLatest(GET_ROOM_MEDIA, getRoomMedia);
  yield takeLatest(requestSuccess(GET_UNREAD_CHAT_COUNT), unreadMessagesCount);
  yield takeLatest(ADD_MEMBERS_TO_CHAT, addMemberToChat);
  yield takeLatest(ADD_TEMP_MEMBERS_TO_CHAT, addTempMemberToChat);
  yield takeLatest(SAVE_QUESTIONIAR, saveQuestioniar);
  yield takeLatest(GET_QUESTIONIAR, getQuestioniarById);
  yield takeLatest(SAVE_QUESTIONIAR_ANSWERS, saveQuestioniarAnswers);
  yield takeLatest(DELETE_CONVERSATION, deleteConversation);
  yield takeLatest(FORWARD_CHAT, forwardChat);
  yield takeLatest(UPDATE_MESSAGE_BY_ID, updateMessageById);
  yield takeLatest(GET_USER_QUESTIONIAR_ANSWER, getUserQuestioniarAnswer);
  yield takeLatest(GET_UP_CHAT_MESSAGE, getUpChatMessages);
  yield takeLatest(GET_PINNED_MESSAGES, getPinnedMessages);
  yield takeLatest(GET_ROOM_QUESTIONIAR, getRoomQuestioniar);

}

export default chatSaga;