import { ActionInterface } from ".";
import { requestSuccess } from '../../utills/status'
import { LOGIN } from '../../config/auth.config';

const intialStatue = {
    isLoggedIn: false
}



const AuthReducer = (state = intialStatue, action: ActionInterface ) => {
    
    switch(action.type) {
        
        case requestSuccess(LOGIN): {
            localStorage.setItem('tokens', JSON.stringify(action.payload?.tokens));
            return {
                ...state,
                isLoggedIn: true
            }
        } 
            
        
            default:
            return state
    }
        
} 

export default AuthReducer;