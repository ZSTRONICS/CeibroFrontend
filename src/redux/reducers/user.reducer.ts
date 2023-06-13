import { Contact, UserAllContacts } from 'constants/interfaces/user.interface';
import { ActionInterface } from './appReducer'
import { requestFail, requestPending, requestSuccess } from '../../utills/status'

import {
  CLOSE_VIEW_INVITATIONS,
  GET_MY_CONNECTIONS_COUNT,
  GET_MY_INVITES_COUNT,
  OPEN_VIEW_INVITATIONS,
  DELETE_MY_CONNECTION,
  GET_MY_CONNECTIONS,
  DISABLE_REFRESH_CONNECTIONS,
  USER_CONFIG,
} from 'config/user.config'

interface UserReducerInt {
  userAllContacts: Contact[]
  loadingContacts: boolean
  refreshMyconnections: boolean;
  invites: { count: number }
  connections: { count: number }
  openInvites: boolean
  id: string
  myConnections: any,
}

const intialStatue: UserReducerInt = {
  userAllContacts:[],
  loadingContacts: false,
  refreshMyconnections: false,
  invites: { count: 0 },
  connections: { count: 0 },
  openInvites: false,
  myConnections: [],
  id: ""
}

const UserReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestPending(USER_CONFIG.GET_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: true
      }
    }
    case requestSuccess(USER_CONFIG.GET_USER_CONTACTS): {
      const sortedData: Contact[] = action.payload.contacts.sort((a: any, b: any) => {
        const aName = a.contactFirstName.toLowerCase();
        const bName = b.contactFirstName.toLowerCase();
        if (aName < bName) {
          return -1;
        } else if (aName > bName) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        loadingContacts: false,
        userAllContacts: sortedData
      }
    }
    case requestFail(USER_CONFIG.GET_USER_CONTACTS): {
      return {
        ...state,
        loadingContacts: false,
      }
    }

    case requestSuccess(GET_MY_INVITES_COUNT): {
      return {
        ...state,
        invites: action.payload,
      }
    }
    case requestSuccess(DELETE_MY_CONNECTION): {
      return {
        ...state,
        connections: action.payload,
      }
    }
    case requestSuccess(GET_MY_CONNECTIONS): {
      return {
        ...state,
        myConnections: action.payload.myConnections,
        refreshMyconnections: true
      }
    }

    case DISABLE_REFRESH_CONNECTIONS: {
      return {
        ...state,
        refreshMyconnections: false
      }
    }

    case requestSuccess(GET_MY_CONNECTIONS_COUNT): {
      return {
        ...state,
        connections: action.payload,
      }
    }

    case OPEN_VIEW_INVITATIONS: {
      return {
        ...state,
        openInvites: true,
      }
    }

    case CLOSE_VIEW_INVITATIONS: {
      return {
        ...state,
        openInvites: false,
      }
    }

    // case requestSuccess(GET_MY_INVITES_COUNT): {
    //   return {
    //     ...state,
    //     createChatLoading: false,
    //   };
    // }

    default:
      return state
  }
}

export default UserReducer
