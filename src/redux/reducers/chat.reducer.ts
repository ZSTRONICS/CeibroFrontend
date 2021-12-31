import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { GET_CHAT } from "../../config/chat.config";

const intialStatue = {
    chat: []
}


const ChatReducer = (state = intialStatue, action: ActionInterface ) => {
    
    switch(action.type) {
        
        case requestSuccess(GET_CHAT): {
            return {
                ...state,
                chat: action.payload 
            }
        } 
            
        
            default:
            return state
    }
        
} 

export default ChatReducer;