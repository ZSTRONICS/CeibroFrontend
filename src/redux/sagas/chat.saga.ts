import { put, select, takeLatest } from "redux-saga/effects";
import { SET_SIDEBAR_CONFIG } from "../../config/app.config";
import {
  ADD_MEMBERS_TO_CHAT,
  ADD_TEMP_MEMBERS_TO_CHAT, ADD_TO_FAVOURITE, CREATE_SINGLE_ROOM, DELETE_CONVERSATION, EDIT_ROOM_NAME, FORWARD_CHAT, GET_CHAT,
  GET_CHAT_API, GET_DOWN_MESSAGES, GET_MESSAGES, GET_PINNED_MESSAGES, GET_QUESTIONIAR, GET_ROOM_MEDIA, GET_ROOM_QUESTIONIAR, GET_UNREAD_CHAT_COUNT, GET_UP_CHAT_MESSAGE,
  GET_UP_MESSAGES, GET_USER_QUESTIONIAR_ANSWER, GO_TO_MESSAGES, MUTE_CHAT, PIN_MESSAGE, REPLACE_MESSAGE_BY_ID,
  ROOM_MESSAGE_DATA, SAVE_MESSAGES, SAVE_QUESTIONIAR, SAVE_QUESTIONIAR_ANSWERS, SET_LOADING_MESSAGES, UPDATE_MESSAGE_BY_ID
} from "../../config/chat.config";
import apiCall from "../../utills/apiCall";
import { requestSuccess } from "../../utills/status";
import { ActionInterface, RootState } from "../reducers";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const getAllChat = apiCall({
  type: GET_CHAT,
  method: "get",
  path: (payload) => {
    let query = "?";
    if (payload?.other?.type) {
      query = `${query}type=${payload?.other?.type}&`;
    }
    if (payload?.other?.search) {
      query = `${query}name=${payload.other.search}&`;
    }
    if (payload?.other?.favourite) {
      query = `${query}favourite=${payload.other.favourite}`;
    }
    return `/chat/rooms${query}`;
  },
});

function* getUserChatsByFilter(action: ActionInterface): Generator<any> {
  const type = yield select((state: RootState) => state.chat.type);
  const search = yield select((state: RootState) => state.chat.search);
  const favourite = yield select(
    (state: RootState) => state.chat.favouriteFilter
  );
  const payload = action.payload;
  payload.other = {
    type,
    search,
    favourite,
  };
  yield put({
    type: GET_CHAT_API,
    payload,
  });

  // yield put({
  //   type: GET_UNREAD_CHAT_COUNT,
  // });

}

const getRoomMessages = apiCall({
  type: GET_MESSAGES,
  method: "get",
  path: (payload: any) => {
    let url = `/chat/room/messages/${payload.other.roomId}?`;
    // if (payload?.other?.search) {
    //   url = url + `search=${payload?.other?.search}&`;
    // }
    // if (payload?.other?.username) {
    //   url = url + `username=${payload?.other?.username}&`;
    // }
    // if (payload?.other?.company) {
    //   url = url + `company=${payload?.other?.company}&`;
    // }
    // if (payload?.other?.group) {
    //   url = url + `group=${payload?.other?.group}&`;
    // }
    // if (payload?.other?.startDate) {
    //   url = url + `startDate=${payload?.other?.startDate}&`;
    // }
    if (payload?.other?.messageId) {
      url = url + `messageId=${payload?.other?.messageId}&`;
    }
    if (payload?.other?.skip) {
      url = url + `skip=${payload?.other?.skip}&`;
     }
    if (payload?.other?.limit) {
      url = url + `limit=${payload?.other?.limit}`;
     }
     //else{
    //   url = url + `limit=21`
    // }

    return url;
  },
});

const getUpRoomMessages = apiCall({
  type: GET_UP_MESSAGES,
  method: "get",
  path: (payload: any) => {
    let apiUrl = "/chat/room/messages/" + payload.other.roomId + "?"

    if (payload?.other?.messageId) {
      apiUrl = apiUrl + `messageId=${payload?.other?.messageId}&`;
    }
    if (payload?.other?.lastMessageId) {
      apiUrl = apiUrl + `lastMessageId=${payload?.other?.lastMessageId}&`;
    }
    if (payload?.other.skip){
      apiUrl = apiUrl + `skip=${payload?.other.skip}&`
    }
    if (payload?.other?.limit) {
      apiUrl = apiUrl + `limit=${payload?.other?.limit}`;
    }else{
      apiUrl = apiUrl + `limit=10`;
    }
    return apiUrl
  }
});

// const getDownRoomMessages = apiCall({
//   type: GET_DOWN_MESSAGES,
//   method: "get",
//   path: (payload: any) =>
//     "/chat/room/messages/" +
//     payload.other.roomId +
//     `?lastMessageId=${payload?.other.lastMessageId}&down=true`,
// });

// const setAllMessagesRead = apiCall({
//   type: SET_SELECTED_CHAT,
//   method: "put",
//   path: (payload: any) => "/chat/room/read/" + payload.other,
// });

// const setCurrentMessageRead = apiCall({
//   type: SET_MESSAGE_SEEN,
//   method: "put",
//   path: (payload: any) => "/chat/room/read/" + payload.other,
// });

const muteChat = apiCall({
  type: MUTE_CHAT,
  method: "post",
  path: (payload: any) => "/chat/room/mute/" + payload.other,
});

const getQuestioniarById = apiCall({
  type: GET_QUESTIONIAR,
  method: "get",
  path: (payload: any) => "/chat/questioniar/view/" + payload.other,
});

const saveQuestioniarAnswers = apiCall({
  type: SAVE_QUESTIONIAR_ANSWERS,
  method: "post",
  path: (payload: any) => "/chat/questioniar/view/" + payload.other,
});

const deleteConversation = apiCall({
  type: DELETE_CONVERSATION,
  method: "delete",
  path: (payload: any) => "/chat/room/removeChatRoom/" + payload.other,
});

const editRoomName = apiCall({
  type: EDIT_ROOM_NAME,
  method: "put",
  path: (payload: any) => "/chat/room/" + payload.other,
});

const addToFavourite = apiCall({
  type: ADD_TO_FAVOURITE,
  method: "post",
  path: (payload: any) => "/chat/room/favourite/" + payload.other,
});

// const sendReplyMessage = apiCall({
//   type: SEND_REPLY_MESSAGE,
//   method: "post",
//   path: "/chat/message/reply",
// });

const pinMessage = apiCall({
  type: PIN_MESSAGE,
  method: "post",
  path: (payload: any) => "/chat/message/favourite/" + payload.other,
});

// const getUnreadCount = apiCall({
//   type: GET_UNREAD_CHAT_COUNT,
//   method: "get",
//   path: "/chat/unread/count",
// });

const getRoomMedia = apiCall({
  type: GET_ROOM_MEDIA,
  method: "get",
  path: (payload: any) => `/chat/media/${payload.other}`,
});

const addMemberToChat = apiCall({
  type: ADD_MEMBERS_TO_CHAT,
  method: "post",
  path: (payload: any) =>
    `/chat/member/${payload?.other?.roomId}/${payload?.other?.userId}`,
});

const addTempMemberToChat = apiCall({
  type: ADD_TEMP_MEMBERS_TO_CHAT,
  method: "post",
  path: (payload: any) =>
    `/chat/member/${payload?.other?.roomId}/${payload?.other?.userId}?temporary=true`,
});

const saveQuestioniar = apiCall({
  type: SAVE_QUESTIONIAR,
  method: "post",
  path: () => `chat/message/questioniar`,
});

const forwardChat = apiCall({
  type: FORWARD_CHAT,
  method: "post",
  path: () => `chat/message/forward`,
});

const getUserQuestioniarAnswer = apiCall({
  type: GET_USER_QUESTIONIAR_ANSWER,
  method: "get",
  path: (payload) =>
    `/chat/questioniar/view-answer/${payload?.other?.questioniarId}/${payload?.other?.userId}`,
});

const getPinnedMessages = apiCall({
  type: GET_PINNED_MESSAGES,
  method: "get",
  path: (payload: any) => `/chat/message/favourite/${payload.other}`,
});

const getRoomQuestioniar = apiCall({
  type: GET_ROOM_QUESTIONIAR,
  method: "get",
  path: (payload: any) => `/chat/message/questionair/${payload.other}`,
});

const createSingleRoom = apiCall({
  type: CREATE_SINGLE_ROOM,
  method: "post",
  path: (payload) => `/chat/room/single/${payload?.other?._id}`,
  // success: payload => payload?.success,
});

function* unreadMessagesCount(action: ActionInterface): Generator<any> {
  const { payload: { other }, } = action;
  let totalCount = 0
  let roomData: Map<String, {}>  = new Map()
  other?.map((data: any) => {
    for (var key of Object.keys(data)) {
      totalCount += data[key].unreadMessageCount
      roomData.set(String(key), data[key])
   }});

  const oldRoutes: any = yield select(
    (state: RootState) => state.app.sidebarRoutes
  );

  oldRoutes["Chat"].notification = totalCount || 0;

  yield put({
    type: SET_SIDEBAR_CONFIG,
    payload: {
      ...oldRoutes,
    },
  });

  yield put({
    type: ROOM_MESSAGE_DATA,
    payload: roomData,
  });
}

function* goToMessage(action: ActionInterface): Generator<any> {
  if (action.payload) {
    const msgId = action.payload.messageId
    const skip = action.payload.skip
    const messageFound = gotoMsg(msgId)
    if (messageFound === false) {
      // if message is not in dom
      const roomId = yield select((state: any) => state.chat.selectedChat);
      yield put({
        type: GET_UP_MESSAGES,
        payload: {
          other: {
            roomId: roomId,
            messageId: msgId,
            skip: skip
          },
        },
      });
    }
  }
}

function gotoMsg(messageId: any): Boolean {
  const elem = document.getElementById(messageId);
  if (elem === null){
    return false 
  }
  const attrs:any = elem?.getAttributeNames().reduce((acc, name) => {
    return {...acc, [name]: elem?.getAttribute(name)};
  }, {});

  let newStyle = String(attrs?.class) + " chatReplyBox"
  elem?.setAttribute("class", newStyle);
  if (elem) {
    elem?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
  });
    setTimeout((elem, oldclass) => {
      elem?.setAttribute("class", oldclass)
    }, 1000, elem, attrs?.class);
  }
  return true
}


function* updateMessageById(action: ActionInterface): Generator<any> {
  const { payload: { other }, } = action;


  const loadingMessages: any = yield select(
    (state: RootState) => state.chat.loadingMessages
  );

  const newLoadingMessages = loadingMessages?.filter(
    (_id: any) => String(_id) !== String(other.oldMessageId)
  );
  yield put({
    type: SET_LOADING_MESSAGES,
    payload: [...newLoadingMessages],
  });

  const messages: any = yield select((state: RootState) => state.chat.messages);
  const index = messages?.findIndex((message: any) => {
    return String(message?._id) === String(other.oldMessageId);
  });

  if (index > -1) {
    messages[index] = other.newMessage;
  }

  yield put({
    type: SAVE_MESSAGES,
    payload: [...messages],
  });
}



function* replaceMessagesById(action: ActionInterface): Generator<any> {
  const { payload: { other }, } = action;
  var initialIndex = 0;

  const storeMsgs: any = yield select((state: RootState) => state.chat.messages);

  other.messages.forEach((element: any) => {
    for(var i = initialIndex; i < storeMsgs.length ; i++) {
        if(String(storeMsgs[i]?._id)  === String(element._id)) {
            storeMsgs[i].readBy = element.readBy;
            initialIndex = i
            break;
        }
    }
  });

  yield put({
    type: SAVE_MESSAGES,
    payload: [...storeMsgs],
  });
}


function* getUpChatMessages(action: ActionInterface): Generator<any> {

  const selectedChat = yield select(
    (state: RootState) => state.chat.selectedChat
  );

  const messages: any = yield select(
    (state: RootState) => state.chat.messages
  );

  const payload = {
    other: {
      roomId: selectedChat,
      lastMessageId: messages?.[0]?._id || null,
      skip: messages.length
    },
  };

  yield put({
    type: GET_UP_MESSAGES,
    payload,
  });

}

function* getDownChatMessages(action: ActionInterface): Generator<any> {
  const selectedChat = yield select(
    (state: RootState) => state.chat.selectedChat
  );
  const messages: any = yield select(
    (state: RootState) => state.chat.messages
  );
  const payload = {
    other: {
      roomId: selectedChat,
      lastMessageId: messages?.[messages?.length - 1]?._id || null,
    },
  };

  yield put({
    type: GET_DOWN_MESSAGES,
    payload,
  });

}

function* chatSaga() {
  // yield takeLatest(GET_DOWN_MESSAGES, getDownRoomMessages);
  //yield takeLatest(SET_SELECTED_CHAT, setAllMessagesRead);
  //yield takeLatest(requestSuccess(SET_SELECTED_CHAT), getAllChat);
  //yield takeLatest(SET_MESSAGE_SEEN, setCurrentMessageRead);
  // yield takeEvery(SEND_REPLY_MESSAGE, sendReplyMessage);
  //yield takeLatest(GET_UNREAD_CHAT_COUNT, getUnreadCount);
  //yield takeLatest(requestSuccess(GET_UNREAD_CHAT_COUNT), unreadMessagesCount);
  // yield takeLatest(GET_DOWN_CHAT_MESSAGE, getDownChatMessages);

  yield takeLatest(GET_CHAT, getUserChatsByFilter);
  yield takeLatest(GET_CHAT_API, getAllChat);
  yield takeLatest(GET_MESSAGES, getRoomMessages);
  yield takeLatest(GET_UP_MESSAGES, getUpRoomMessages);
  yield takeLatest(requestSuccess(DELETE_CONVERSATION), getAllChat);
  yield takeLatest(MUTE_CHAT, muteChat);
  yield takeLatest(CREATE_SINGLE_ROOM, createSingleRoom);
  yield takeLatest(ADD_TO_FAVOURITE, addToFavourite);
  yield takeLatest(PIN_MESSAGE, pinMessage);
  yield takeLatest(GET_ROOM_MEDIA, getRoomMedia);
  yield takeLatest(GET_UNREAD_CHAT_COUNT, unreadMessagesCount);
  yield takeLatest(ADD_MEMBERS_TO_CHAT, addMemberToChat);
  yield takeLatest(ADD_TEMP_MEMBERS_TO_CHAT, addTempMemberToChat);
  yield takeLatest(SAVE_QUESTIONIAR, saveQuestioniar);
  yield takeLatest(GET_QUESTIONIAR, getQuestioniarById);
  yield takeLatest(SAVE_QUESTIONIAR_ANSWERS, saveQuestioniarAnswers);
  yield takeLatest(DELETE_CONVERSATION, deleteConversation);
  yield takeLatest(FORWARD_CHAT, forwardChat);
  yield takeLatest(UPDATE_MESSAGE_BY_ID, updateMessageById);
  yield takeLatest(REPLACE_MESSAGE_BY_ID, replaceMessagesById);
  yield takeLatest(GET_USER_QUESTIONIAR_ANSWER, getUserQuestioniarAnswer);
  yield takeLatest(GET_UP_CHAT_MESSAGE, getUpChatMessages);
  yield takeLatest(GET_PINNED_MESSAGES, getPinnedMessages);
  yield takeLatest(GET_ROOM_QUESTIONIAR, getRoomQuestioniar);
  yield takeLatest(EDIT_ROOM_NAME, editRoomName);
  yield takeLatest(GO_TO_MESSAGES, goToMessage);
}

export default chatSaga;
