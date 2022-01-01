import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { GET_CHAT, PUSH_MESSAGE } from "../../config/chat.config";

interface ChatReducer {
    chat: any;
    messages: any;
}

const intialStatue: ChatReducer = {
    chat: [],
    messages: []
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

            
        
        default:
            return state
    }
        
} 

export default ChatReducer;