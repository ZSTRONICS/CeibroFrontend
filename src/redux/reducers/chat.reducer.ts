import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { GET_CHAT, GET_MESSAGES, PUSH_MESSAGE, SET_SELECTED_CHAT } from "../../config/chat.config";

interface ChatReducer {
    chat: any;
    messages: any;
    selectedChat: null
}

const intialStatue: ChatReducer = {
    chat: [],
    messages: [],
    selectedChat: null
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

        case requestSuccess(GET_MESSAGES): {
            return {
                ...state,
                messages: action.payload?.conversation
            }
        }

            
        
        default:
            return state
    }
        
} 

export default ChatReducer;