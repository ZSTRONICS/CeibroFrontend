import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { 
    CLEAR_SELECTED_CHAT, 
    GET_CHAT, GET_MESSAGES, 
    PUSH_MESSAGE, 
    SET_SELECTED_CHAT,
    SET_CHAT_TYPE,
    SET_CHAT_SEARCH,
    SET_CHAT_SIDE_BAR,
    SET_REPLY_TO_ID,
    SAVE_MESSAGES
} from "../../config/chat.config";

interface ChatReducer {
    chat: any;
    messages: any;
    selectedChat: null;
    type: "all" | "read" | "unread";
    search: null | string;
    sidebarOpen: boolean;
    replyToId: any;
}

const intialStatue: ChatReducer = {
    chat: [],
    messages: [],
    selectedChat: null,
    type: "all",
    search: null,
    sidebarOpen: false,
    replyToId: null
}


const ChatReducer = (state = intialStatue, action: ActionInterface ) => {

    switch(action.type) {
        
        case requestSuccess(GET_CHAT): {
            return {
                ...state,
                chat: action.payload 
            }
        }

        case PUSH_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        }

        case SAVE_MESSAGES: {
            return {
                ...state,
                messages: action.payload
            }
        }

        case SET_SELECTED_CHAT: {
            return {
                ...state,
                selectedChat: action.payload?.other,
                messages: state.selectedChat === action.payload? state.messages: []
            }
        }

        case CLEAR_SELECTED_CHAT: {
            return {
                ...state,
                selectedChat: null,
                messages: []
            }
        }

        case requestSuccess(GET_MESSAGES): {
            return {
                ...state,
                messages: action.payload?.conversation
            }
        }

        case SET_CHAT_TYPE: {
            return {
                ...state,
                type: action.payload
            }
        }

        case SET_CHAT_SEARCH: {
            return {
                ...state,
                search: action.payload
            }
        }

        case SET_CHAT_SIDE_BAR: {
            return {
                ...state,
                sidebarOpen: action.payload
            }
        }

        case SET_REPLY_TO_ID: {
            return {
                ...state,
                replyToId: action.payload
            }
        }


            
        
        default:
            return state
    }
        
} 

export default ChatReducer;