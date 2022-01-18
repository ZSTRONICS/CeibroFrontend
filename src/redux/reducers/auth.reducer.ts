import { ActionInterface } from ".";
import { requestFail, requestPending, requestSuccess } from '../../utills/status'
import { LOGIN, LOGOUT } from '../../config/auth.config';

const intialStatue = {
    isLoggedIn: false,
    user: {},
    loginLoading: false
}



const AuthReducer = (state = intialStatue, action: ActionInterface ) => {
    
    switch(action.type) {
        
        case requestPending(LOGIN): {
            return {
                ...state,
                loginLoading: true
            }
        }
     
    
        case requestSuccess(LOGIN): {
            localStorage.setItem('tokens', JSON.stringify(action.payload?.tokens));
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                loginLoading: false
            }
        }
     
        case requestFail(LOGIN): {
            localStorage.setItem('tokens', JSON.stringify(action.payload?.tokens));
            return {
                ...state,
                loginLoading: false
            }
        }
     
        case LOGOUT: {
            localStorage.removeItem('tokens');
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        }
            
        
        default:
            return state
    }
        
} 

export default AuthReducer;