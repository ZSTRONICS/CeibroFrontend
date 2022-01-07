import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { 
    CLEAR_SELECTED_CHAT, 
    GET_CHAT, GET_MESSAGES, 
    PUSH_MESSAGE, 
    SET_SELECTED_CHAT,
    SET_CHAT_TYPE,
    SET_CHAT_SEARCH
} from "../../config/chat.config";

interface ChatReducer {
    chat: any;
    messages: any;
    selectedChat: null;
    type: "all" | "read" | "unread";
    search: null | string;
}

const intialStatue: ChatReducer = {
    chat: [],
    messages: [],
    selectedChat: null,
    type: "all",
    search: null
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

            
        
        default:
            return state
    }
        
} 

export default ChatReducer;