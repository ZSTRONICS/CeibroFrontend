import { ActionInterface } from '.'
import { requestFail, requestPending, requestSuccess } from '../../utills/status'
import {
  CLEAR_SELECTED_CHAT,
  GET_CHAT,
  GET_MESSAGES,
  PUSH_MESSAGE,
  PUSH_MESSAGE_BY_OTHER,
  SET_SELECTED_CHAT,
  SET_CHAT_TYPE,
  SET_CHAT_SEARCH,
  SET_CHAT_SIDE_BAR,
  SET_REPLY_TO_ID,
  SAVE_MESSAGES,
  SET_FAVOURITE_FILTER,
  OPEN_QUESTIONIAR_DRAWER,
  CLOSE_QUESTIONIAR_DRAWER,
  SET_QUESTIONS,
  GET_ROOM_MEDIA,
  SET_MEMBERS_DIALOG,
  SET_TEMP_MEMBERS_DIALOG,
  OPEN_VIEW_QUESTIONIAR_DRAWER,
  CLOSE_VIEW_QUESTIONIAR_DRAWER,
  SET_SELECTED_QUESTIONIAR,
  GET_QUESTIONIAR,
  SAVE_QUESTIONIAR,
  SAVE_QUESTIONIAR_ANSWERS,
  SET_LOADING_MESSAGES,
  GET_USER_QUESTIONIAR_ANSWER,
  GET_UP_MESSAGES,
  GET_DOWN_MESSAGES,
  SET_VIEWPORT,
  SET_ALLOW_SCROLL,
  SET_PAGINATION_BLOCK,
  DELETE_CONVERSATION,
  GET_PINNED_MESSAGES,
  GET_ROOM_QUESTIONIAR,
  SET_DOWN_BLOCK,
  CREATE_SINGLE_ROOM,
  MY_SOCKET,
  ROOM_MESSAGE_DATA,
  SET_GOTO_MESSAGE_ID,
  SORT_CHAT_LIST_ORDER,
  UPDATE_MESSAGE_BY_ID,
  UPDATE_CHAT_LAST_MESSAGE,
} from '../../config/chat.config'

import { QuestioniarInterface } from '../../constants/interfaces/questioniar.interface'
import { getNewQuestionTemplate } from '../../constants/questioniar.constants'
import { CREATE_ROOM } from '../../config/auth.config'
import { ChatListInterface, ChatMessageInterface } from 'constants/interfaces/chat.interface'
import { goToMessage } from 'redux/action/chat.action'
import { useDispatch } from 'react-redux'

interface ChatReducerInt {
  chat: ChatListInterface[]
  messages: [] | any
  updateChatRoom: boolean
  selectedChatId: string
  type: 'all' | 'read' | 'unread'
  favouriteFilter: boolean
  createChatLoading: boolean
  search: null | string
  sidebarOpen: boolean
  replyToId: any
  questioniarDrawer: boolean
  questioniars: QuestioniarInterface[]
  chatMedia: string[]
  membersDialog: boolean
  tempMembersDialog: boolean
  openViewQuestioniar: boolean
  selectedQuestioniar: any
  answeredByMe: boolean
  questioniarsLoading: boolean
  loadingMessages: string[]
  dueDate: any
  sender: any
  questioniarInfo: any
  viewport: any
  lastMessageIdInChat: any
  upScrollLoading: boolean
  goToMessageId: string,
  blockPagination: boolean
  mysocket: any
  allowChangeBlock: boolean
  pinnedMessages: any
  roomQuestioniars: any
  createQuestioniarLoading: boolean
  blockDown: boolean
  isGroupChat: boolean
  roomMessageData: any
}

const intialStatue: ChatReducerInt = {
  chat: [],
  messages: [],
  updateChatRoom: false,
  isGroupChat: false,
  selectedChatId: "",
  createChatLoading: false,
  type: 'all',
  favouriteFilter: false,
  search: null,
  sidebarOpen: false,
  replyToId: null,
  questioniarDrawer: false,
  questioniars: [getNewQuestionTemplate(0)],
  chatMedia: [],
  membersDialog: false,
  tempMembersDialog: false,
  openViewQuestioniar: false,
  selectedQuestioniar: null,
  answeredByMe: false,
  questioniarsLoading: false,
  loadingMessages: [],
  dueDate: null,
  sender: null,
  questioniarInfo: null,
  viewport: null,
  lastMessageIdInChat: null,
  upScrollLoading: false,
  goToMessageId: '',
  blockPagination: false,
  mysocket: null,
  allowChangeBlock: true,
  pinnedMessages: [],
  blockDown: true,
  roomQuestioniars: [],
  createQuestioniarLoading: false,
  roomMessageData: null
}

const ChatReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestSuccess(GET_CHAT): {
      state.chat = []
      return {
        ...state,
        chat: [...action.payload?.userallchat],
      }
    }

    case requestPending(CREATE_ROOM): {
      return {
        ...state,
        createChatLoading: true,
      }
    }
    case requestSuccess(CREATE_ROOM): {
      return {
        ...state,
        room: action.payload,
        createChatLoading: false,
      }
    }

    case requestFail(CREATE_ROOM): {
      return {
        ...state,
        createChatLoading: false,
      }
    }

    /** CREATE SINGLE ROOM */
    case requestPending(CREATE_SINGLE_ROOM): {
      return {
        ...state,
        createChatLoading: true,
      }
    }

    case requestSuccess(CREATE_SINGLE_ROOM): {
      return {
        ...state,
        room: action.payload,
        createChatLoading: false,
      }
    }

    case requestFail(CREATE_SINGLE_ROOM): {
      return {
        ...state,
        createChatLoading: false,
      }
    }
    /** CREATE SINGLE ROOM */

    case SET_PAGINATION_BLOCK: {
      return {
        ...state,
        blockPagination: action.payload,
      }
    }

    case SET_VIEWPORT: {
      return {
        ...state,
        viewport: action.payload,
      }
    }

    case PUSH_MESSAGE: {
      const index = state.messages.findIndex((message: any) => String(message._id) === String(action.payload._id))
      if (index === -1) {
        state.messages = [...state.messages, action.payload]
        return {
          ...state,
          messages: [...state.messages],
          loadingMessages: [...state.loadingMessages, action.payload._id],
        }
      } else {
        state.messages[index] = action.payload
        return {
          ...state,
          messages: [...state.messages],
        }
      }
    }

    case PUSH_MESSAGE_BY_OTHER: {
      const index = state.messages.findIndex((message: any) => String(message._id) === String(action.payload._id))
      if (index === -1) {
        state.messages = [...state.messages, action.payload]
      } else {
        state.messages = [...state.messages]
      }
      return {
        ...state,
        messages: [...state.messages],
      }
    }

    case SET_LOADING_MESSAGES: {
      return {
        ...state,
        loadingMessages: action.payload,
      }
    }

    case SAVE_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      }
    }

    case SET_SELECTED_CHAT: {
      return {
        ...state,
        selectedChatId: action.payload?.other,
        messages: state.selectedChatId === action.payload ? state.messages : [],
      }
    }
    case SET_GOTO_MESSAGE_ID: {
      return {
        ...state,
        goToMessageId: action.payload?.other
      }
    }

    case CLEAR_SELECTED_CHAT: {
      return {
        ...state,
        selectedChatId: null,
        messages: [],
      }
    }

    // case SORT_CHAT_LIST_ORDER: {
    //   const chatIdToTop = action.payload;
    //   const index = state.chat.findIndex((chat: ChatListInterface) => {
    //     return String(chat?._id) === String(chatIdToTop);
    //   });
    //   if (index > -1) {
    //     const filteredChat = state.chat[index]

    //     const newChatList = state.chat.filter((chat: ChatListInterface) => {
    //       return String(chat?._id) !== String(chatIdToTop);
    //     });

    //     return {
    //       ...state,
    //       chat: [filteredChat, ...newChatList],
    //     }
    //   } else {
    //     return {
    //       ...state
    //     }
    //   }
    // }

    case UPDATE_CHAT_LAST_MESSAGE: {
      const roomId = action.payload.chat;
      const index = state.chat.findIndex((chat: ChatListInterface) => {
        return String(chat._id) === String(roomId);
      });

      if (index > -1) {
        // .lastMessage = action.payload.message;
        const rcvdMsginRoom = state.chat[index];
        const newChatList = state.chat.filter((chat: ChatListInterface) => {
          return String(chat?._id) !== String(roomId);
        });
        rcvdMsginRoom.lastMessage = action.payload.message;
        rcvdMsginRoom.lastMessageTime = 'now';
        return {
          ...state,
          chat: [rcvdMsginRoom, ...newChatList],
        }
      } else {
        return {
          ...state
        }
      }

    }

    case UPDATE_MESSAGE_BY_ID: {
      const data = action.payload.other;
      const newLoadingMsgs = state.loadingMessages.filter((_id: any) => String(_id) !== String(data.oldMessageId));
      const index = state.messages.findIndex((message: any) => {
        return String(message?._id) === String(data.oldMessageId);
      });

      if (index > -1) {
        state.messages[index] = data.newMessage;
        return {
          ...state,
          messages: [...state.messages],
          loadingMessages: [...newLoadingMsgs]
        }
      } else {
        state.messages = [...state.messages]
        return {
          ...state,
          loadingMessages: [...newLoadingMsgs]
        }
      }
    }
    case requestPending(GET_MESSAGES): {
      return {
        ...state,
        upScrollLoading: false,
      }
    }

    case requestSuccess(GET_MESSAGES): {
      const newMsgs = [...action.payload.message, ...state.messages]
      let goto = false
      if ('messageId' in action.payload) {
        goto = true
      }
      return {
        ...state,
        messages: newMsgs,
        upScrollLoading: false,
      }
    }

    // case GET_MESSAGES: {
    //   return {
    //     ...state,
    //   }
    // }
    case requestFail(GET_MESSAGES): {
      return {
        ...state,
        upScrollLoading: false,
      }
    }

    case requestPending(GET_UP_MESSAGES): {
      return {
        ...state,
        upScrollLoading: true,
      }
    }

    case requestSuccess(GET_UP_MESSAGES): {
      const newMsgs = [...action.payload.message, ...state.messages]
      let gotoId = ''
      if ('messageId' in action.payload) {
        gotoId = action.payload.messageId
      }
      return {
        ...state,
        lastMessageIdInChat: state?.messages[0]?._id,
        messages: newMsgs,
        upScrollLoading: false,
        goToMessageId: gotoId
      }
    }

    case requestFail(GET_UP_MESSAGES): {
      return {
        ...state,
        upScrollLoading: false,
      }
    }

    case requestPending(GET_DOWN_MESSAGES): {
      return {
        ...state,
        blockDown: true,
      }
    }

    case requestSuccess(GET_DOWN_MESSAGES): {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.message],
      }
    }

    case SET_DOWN_BLOCK: {
      return {
        ...state,
        blockDown: action.payload,
      }
    }

    case ROOM_MESSAGE_DATA: {
      return {
        ...state,
        roomMessageData: action.payload
      }
    }

    case SET_ALLOW_SCROLL: {
      return {
        ...state,
        // lastMessageIdInChat: action.payload,
      }
    }

    case SET_CHAT_TYPE: {
      return {
        ...state,
        type: action.payload,
      }
    }

    case SET_CHAT_SEARCH: {
      return {
        ...state,
        search: action.payload,
      }
    }

    case SET_CHAT_SIDE_BAR: {
      return {
        ...state,
        sidebarOpen: action.payload,
      }
    }

    case SET_REPLY_TO_ID: {
      return {
        ...state,
        replyToId: action.payload,
      }
    }

    case SET_FAVOURITE_FILTER: {
      return {
        ...state,
        favouriteFilter: action.payload,
      }
    }

    case OPEN_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        questioniarDrawer: true,
        questioniars: [getNewQuestionTemplate(0)],
      }
    }

    case CLOSE_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        questioniarDrawer: false,
      }
    }

    case OPEN_VIEW_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        openViewQuestioniar: true,
      }
    }

    case CLOSE_VIEW_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        openViewQuestioniar: false,
      }
    }

    case SET_QUESTIONS: {
      return {
        ...state,
        questioniars: JSON.parse(JSON.stringify(action.payload)),
      }
    }

    case requestSuccess(GET_ROOM_MEDIA): {
      return {
        ...state,
        chatMedia: action.payload,
      }
    }

    case SET_MEMBERS_DIALOG: {
      return {
        ...state,
        membersDialog: action.payload,
      }
    }

    case SET_TEMP_MEMBERS_DIALOG: {
      return {
        ...state,
        tempMembersDialog: action.payload,
      }
    }

    case requestSuccess(DELETE_CONVERSATION): {
      return {
        ...state,
        selectedChatId: null,
        messages: [],
      }
    }

    case SET_SELECTED_QUESTIONIAR: {
      return {
        ...state,
        selectedQuestioniar: action.payload,
      }
    }

    case requestSuccess(GET_QUESTIONIAR): {
      return {
        ...state,
        questioniars: action.payload.questions,
        answeredByMe: action.payload.answeredByMe,
        questioniarsLoading: false,
        questioniarInfo: {
          dueDate: action.payload?.dueDate,
          sender: action.payload?.sender,
          id: action.payload?._id,
        },
      }
    }

    case GET_USER_QUESTIONIAR_ANSWER: {
      return {
        ...state,
        questioniars: [],
      }
    }

    case requestSuccess(GET_USER_QUESTIONIAR_ANSWER): {
      return {
        ...state,
        questioniars: action.payload.questions,
        answeredByMe: action.payload.answeredByMe,
        questioniarInfo: {
          dueDate: action.payload?.dueDate,
          sender: action.payload?.sender,
          id: action.payload?._id,
          isAnswered: action.payload.answeredByMe,
        },
      }
    }

    case requestPending(GET_QUESTIONIAR): {
      return {
        ...state,
        questioniarsLoading: true,
      }
    }

    case requestFail(GET_QUESTIONIAR): {
      return {
        ...state,
        questioniarsLoading: false,
      }
    }

    case requestPending(SAVE_QUESTIONIAR): {
      return {
        ...state,
        createQuestioniarLoading: true,
      }
    }

    case requestSuccess(SAVE_QUESTIONIAR): {
      return {
        ...state,
        questioniars: [getNewQuestionTemplate(0)],
        answeredByMe: false,
        questioniarDrawer: false,
        openViewQuestioniar: false,
        createQuestioniarLoading: false,
      }
    }

    case requestFail(SAVE_QUESTIONIAR): {
      return {
        ...state,
        createQuestioniarLoading: false,
      }
    }

    case requestSuccess(SAVE_QUESTIONIAR_ANSWERS): {
      return {
        ...state,
        questioniars: [getNewQuestionTemplate(0)],
        answeredByMe: false,
        questioniarDrawer: false,
        openViewQuestioniar: false,
      }
    }

    case requestSuccess(GET_PINNED_MESSAGES): {
      return {
        ...state,
        pinnedMessages: action.payload,
      }
    }

    case requestSuccess(GET_ROOM_QUESTIONIAR): {
      return {
        ...state,
        roomQuestioniars: action.payload,
      }
    }

    default:
      return state
  }

}



export default ChatReducer
