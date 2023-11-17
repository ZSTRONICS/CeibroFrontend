import { unSeenTasks } from "components/Utills/Globals";
import { USER_CONFIG } from "config";
import {
  UserInterface,
  userTemplate,
} from "constants/interfaces/user.interface";
import { REGISTER } from "redux-persist";
import {
  GET_PROFILE,
  LOGIN,
  LOGOUT,
  REGISTER_CONFIRMATION,
  REGISTER_PROFILE_SETUP,
  UPDATE_MY_PROFILE,
  UPDATE_PROFILE_PICTURE
} from "../../config/auth.config";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";
import { ActionInterface } from "./appReducer";

interface authInterface {
  profilePicUploading: boolean
  isLoggedIn: boolean;
  user: UserInterface;
  loginLoading: boolean;
  registerLoading: boolean;
  secureUUID: string | null;
  authSuccessMessage: string | null | undefined;
  authErrorMessage: string | null | undefined;
}

const intialStatue: authInterface = {
  isLoggedIn: false,
  profilePicUploading: false,
  secureUUID: null,
  user: userTemplate,
  loginLoading: false,
  registerLoading: false,
  authSuccessMessage: "",
  authErrorMessage: "",
};


const AuthReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case 'SET_SECURE_UUID':
      // check if secureUUID is already set
      if (state.secureUUID) {
        return state
      }
      return {
        ...state,
        secureUUID: action.payload
      }


    case requestSuccess(LOGIN): {
      localStorage.setItem("tokens", JSON.stringify(action.payload?.tokens));
      localStorage.setItem("unSeenTasks", JSON.stringify(unSeenTasks));
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
    case requestPending(UPDATE_PROFILE_PICTURE): {
      return {
        ...state,
        profilePicUploading: true,
      };
    }
    case requestSuccess(UPDATE_PROFILE_PICTURE): {
      const { profilePic, firstName, surName, email, phoneNumber, companyName, jobTitle } = action.payload.user
      const updatedUser = {
        ...state.user,
        firstName: firstName,
        surName: surName,
        email: email,
        phoneNumber: phoneNumber,
        companyName: companyName,
        jobTitle: jobTitle,
        profilePic: profilePic
      };
      return {
        ...state,
        user: updatedUser,
        profilePicUploading: false,
      };
    }
    case requestFail(UPDATE_PROFILE_PICTURE): {
      return {
        ...state,
        profilePicUploading: false,
      };
    }

    case LOGOUT: {
      localStorage.removeItem("tokens");
      localStorage.clear();
      sessionStorage.clear();
      // unSubOneSignal();
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
    case USER_CONFIG.USER_UPDATED_IN_STORE:
    case UPDATE_MY_PROFILE: {
      const { firstName, profilePic, surName, email, phoneNumber, companyName, jobTitle, _id } = action.payload
      let updatedUser = {
        ...state.user
      }
      if (state.user._id === _id) {
        updatedUser = {
          ...state.user,
          firstName: firstName,
          surName: surName,
          email: email,
          phoneNumber: phoneNumber,
          companyName: companyName,
          profilePic: profilePic,
          jobTitle: jobTitle,
        };
      }
      return {
        ...state,
        user: updatedUser,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
