import { ActionInterface } from ".";
import { requestSuccess } from "../../utills/status";
import {
  CLEAR_SELECTED_CHAT,
  GET_CHAT,
  GET_MESSAGES,
  PUSH_MESSAGE,
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
} from "../../config/chat.config";

import { QuestioniarInterface } from "../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../constants/questioniar.constants";

interface ChatReducer {
  chat: any;
  messages: any;
  selectedChat: null;
  type: "all" | "read" | "unread";
  favouriteFilter: boolean;
  search: null | string;
  sidebarOpen: boolean;
  replyToId: any;
  questioniarDrawer: boolean;
  questioniars: QuestioniarInterface[];
  chatMedia: string[];
}

const intialStatue: ChatReducer = {
  chat: [],
  messages: [],
  selectedChat: null,
  type: "all",
  favouriteFilter: false,
  search: null,
  sidebarOpen: false,
  replyToId: null,
  questioniarDrawer: false,
  questioniars: [getNewQuestionTemplate(0)],
  chatMedia: []
};

const ChatReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestSuccess(GET_CHAT): {
      return {
        ...state,
        chat: action.payload,
      };
    }

    case PUSH_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }

    case SAVE_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case SET_SELECTED_CHAT: {
      return {
        ...state,
        selectedChat: action.payload?.other,
        messages: state.selectedChat === action.payload ? state.messages : [],
      };
    }

    case CLEAR_SELECTED_CHAT: {
      return {
        ...state,
        selectedChat: null,
        messages: [],
      };
    }

    case requestSuccess(GET_MESSAGES): {
      return {
        ...state,
        messages: action.payload?.conversation,
      };
    }

    case SET_CHAT_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }

    case SET_CHAT_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case SET_CHAT_SIDE_BAR: {
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    }

    case SET_REPLY_TO_ID: {
      return {
        ...state,
        replyToId: action.payload,
      };
    }

    case SET_FAVOURITE_FILTER: {
      return {
        ...state,
        favouriteFilter: action.payload,
      };
    }

    case OPEN_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        questioniarDrawer: true,
      };
    }

    case CLOSE_QUESTIONIAR_DRAWER: {
      return {
        ...state,
        questioniarDrawer: false,
      };
    }

    case SET_QUESTIONS: {
      return {
        ...state,
        questioniars: JSON.parse(JSON.stringify(action.payload)),
      };
    }

    case requestSuccess(GET_ROOM_MEDIA): {
      return {
        ...state,
        chatMedia: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ChatReducer;
