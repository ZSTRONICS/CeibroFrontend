import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { LOGIN } from '../../config/auth.config';

const intialStatue = {
    isLoggedIn: false,
    user: {}
}



const AuthReducer = (state = intialStatue, action: ActionInterface ) => {
    
    switch(action.type) {
        
        case requestSuccess(LOGIN): {
            localStorage.setItem('tokens', JSON.stringify(action.payload?.tokens));
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            }
        }
            
        
        default:
            return state
    }
        
} 

export default AuthReducer;