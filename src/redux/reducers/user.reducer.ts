import { Contact } from "constants/interfaces/user.interface";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";
import { ActionInterface } from "./appReducer";

import {
  CLOSE_VIEW_INVITATIONS,
  DELETE_MY_CONNECTION,
  GET_MY_CONNECTIONS,
  USER_CONFIG,
} from "config/user.config";

interface UserReducerInt {
  userAllContacts: Contact[];
  recentUserContact: Contact[];
  loadingContacts: boolean;
  refreshMyconnections: boolean;
  invites: { count: number };
  connections: { count: number };
  countryCodeName: string
  openInvites: boolean;
  id: string;
  myConnections: any;
}

const intialStatue: UserReducerInt = {
  userAllContacts: [],
  recentUserContact: [],
  loadingContacts: false,
  refreshMyconnections: false,
  invites: { count: 0 },
  connections: { count: 0 },
  openInvites: false,
  countryCodeName: "EE",
  myConnections: [],
  id: "",
};

const UserReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case USER_CONFIG.USER_UPDATED_IN_STORE:
      const { firstName, surName, email, phoneNumber, profilePic, jobTitle, countryCode, companyName, _id } = action.payload
      const userIndex = state.userAllContacts.findIndex((cotact: Contact) => cotact.isCeiborUser && cotact.userCeibroData?._id === _id);
      if (userIndex > -1) {
        const userContact = state.userAllContacts[userIndex];
        userContact.phoneNumber = phoneNumber;
        userContact.countryCode = countryCode;
        if (userContact.userCeibroData) {
          userContact.userCeibroData = {
            ...userContact.userCeibroData,
            email,
            firstName,
            surName,
            jobTitle,
            companyName,
            profilePic
          };
        }
      }
      return {
        ...state,
      };
    case requestPending(USER_CONFIG.GET_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: true,
      };
    }
    case requestSuccess(USER_CONFIG.GET_USER_CONTACTS): {
      const sortedData: Contact[] = action.payload.contacts.sort(
        (a: any, b: any) => {
          const aName = a.contactFirstName.toLowerCase();
          const bName = b.contactFirstName.toLowerCase();
          if (aName < bName) {
            return -1;
          } else if (aName > bName) {
            return 1;
          }
          return 0;
        }
      );
      return {
        ...state,
        loadingContacts: false,
        userAllContacts: sortedData,
      };
    }
    case requestFail(USER_CONFIG.GET_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: false,
      };
    }
    case requestPending(USER_CONFIG.GET_RECENT_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: true,
      };
    }
    case requestSuccess(USER_CONFIG.GET_RECENT_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: false,
        recentUserContact: action.payload.recentContacts,
      };
    }
    case requestFail(USER_CONFIG.GET_RECENT_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: false,
      };
    }
    case requestSuccess(DELETE_MY_CONNECTION): {
      return {
        ...state,
        connections: action.payload,
      };
    }
    case requestSuccess(GET_MY_CONNECTIONS): {
      return {
        ...state,
        myConnections: action.payload.myConnections,
        refreshMyconnections: true,
      };
    }


    case USER_CONFIG.COUNTRY_CODE_NAME: {
      return {
        ...state,
        countryCodeName: action.payload
      }
    }
    case CLOSE_VIEW_INVITATIONS: {
      return {
        ...state,
        openInvites: false,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
