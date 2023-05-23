import { UPDATE_PROFILE_PIC } from "config/user.config";
import {
  UserInterface,
  userTemplate,
} from "constants/interfaces/user.interface";
import { REGISTER } from "redux-persist";
import { unSubOneSignal } from "utills/runOneSignal";
import { ActionInterface } from ".";
import {
  GET_PROFILE,
  LOGIN,
  LOGOUT,
  OTP_VERIFY,
  REGISTER_CONFIRMATION,
  REGISTER_PROFILE_SETUP,
  UPDATE_MY_PROFILE,
  UPDATE_PROFILE_PICTURE,
  USER_CHANGE_NUMBER,
  USER_CHANGE_PASSWORD,
} from "../../config/auth.config";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";

interface authInterface {
  isLoggedIn: boolean;
  user: UserInterface;
  loginLoading: boolean;
  registerLoading: boolean;
  authSuccessMessage: string | null | undefined;
  authErrorMessage: string | null | undefined;
}

const intialStatue: authInterface = {
  isLoggedIn: false,
  user: userTemplate,
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
    //   sessionStorage.clear();
    //   purgeStoreStates()
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
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: true,
      };
    }

    case requestSuccess(REGISTER): {
      return {
        ...state,
        phoneNumber: action.payload.phoneNUmber,
        registerLoading: false,
      };
    }

    case requestFail(REGISTER): {
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestPending(REGISTER_CONFIRMATION): {
      setTimeout(() => {
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: true,
      };
    }

    case requestSuccess(REGISTER_CONFIRMATION): {
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestFail(REGISTER_CONFIRMATION): {
      // localStorage.clear();
      // sessionStorage.clear();
      setTimeout(() => {
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestPending(REGISTER_PROFILE_SETUP): {
      setTimeout(() => {
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: true,
      };
    }

    case requestSuccess(REGISTER_PROFILE_SETUP): {
      localStorage.setItem("tokens", JSON.stringify(action.payload?.tokens));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        loginLoading: false,
      };
    }

    case requestFail(REGISTER_PROFILE_SETUP): {
      // localStorage.clear();
      // sessionStorage.clear();
      setTimeout(() => {
        state.registerLoading = false;
      }, 10000 / 2);
      return {
        ...state,
        registerLoading: false,
      };
    }

    case requestSuccess(UPDATE_PROFILE_PICTURE): {
      if (action.payload.profilePic) {
        state.user.profilePic = action.payload.profilePic;
      }
      return {
        ...state,
        user: { ...state.user },
      };
    }
    case LOGOUT: {
      localStorage.removeItem("tokens");
      localStorage.clear();
      sessionStorage.clear();
      unSubOneSignal();
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
      } else {
        return {
          ...state,
        };
      }
    }

    case UPDATE_MY_PROFILE: {
      const res = action.payload.body;
      let currUser: any = state.user;
      for (var atrNmae in res) {
        if (atrNmae in currUser) {
          currUser[atrNmae] = res[atrNmae];
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
