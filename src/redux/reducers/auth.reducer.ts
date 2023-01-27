import { REGISTER } from "redux-persist";
import { ActionInterface } from ".";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";
import { GET_PROFILE, LOGIN, LOGOUT, UPDATE_MY_PROFILE } from "../../config/auth.config";
import { UserInterface } from "constants/interfaces/user.interface";
import { perisitStoreState } from "redux/store";

interface authInterface {
  isLoggedIn: boolean;
  user: UserInterface | null | undefined;
  loginLoading: boolean;
  registerLoading: boolean;
  authSuccessMessage: string | null | undefined;
  authErrorMessage: string | null | undefined;
}

const intialStatue: authInterface = {
  isLoggedIn: false,
  user: null,
  loginLoading: false,
  registerLoading: false,
  authSuccessMessage: "",
  authErrorMessage: "",
};

const AuthReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    // case requestPending(LOGIN): {
    //   setTimeout(() => {
    //     state.loginLoading = false
    //   }, 10000 / 2);
    //   return {
    //     ...state,
    //     loginLoading: true,
    //   };
    // }
    // case requestFail(LOGIN): {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   perisitStoreState()
    //   setTimeout(() => {
    //     state.loginLoading = false
    //   }, 10000 / 2);
    //   return {
    //     ...state,
    //     loginLoading: false,
    //   };
    // }

    case requestSuccess(LOGIN): {
      localStorage.setItem("tokens", JSON.stringify(action.payload?.tokens));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        loginLoading: false,
      };
    }



    case requestPending(REGISTER): {
      setTimeout(() => {
        state.registerLoading = false
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: true,
      };
    }

    case requestSuccess(REGISTER): {
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestFail(REGISTER): {
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        state.registerLoading = false
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: false,
      };
    }

    case LOGOUT: {
      localStorage.removeItem("tokens");
      localStorage.clear();
      sessionStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    case GET_PROFILE: {
      if (action?.payload?.body) {

        return {
          ...state,
          user: action.payload,
        };
      }else{
        return {
          ...state
        }
      }
    }

    case UPDATE_MY_PROFILE: {
      const res = action.payload.body
      let currUser: any = state.user
      for (var atrNmae in res) {
        if (atrNmae in currUser) {
          currUser[atrNmae] = res[atrNmae]
        }
      }
      return {
        ...state,
        user: currUser,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
