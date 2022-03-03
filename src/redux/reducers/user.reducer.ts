import { ActionInterface } from ".";
import {
  requestSuccess,
} from "../../utills/status";

import { GET_MY_CONNECTIONS_COUNT, GET_MY_INVITES_COUNT } from "config/user.config";

interface CountReducer {
  invites: any;
  connections: any
}

const intialStatue: CountReducer = {
  invites: [],
  connections:[],
};


const CountReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestSuccess(GET_MY_INVITES_COUNT): {
      return {
        ...state,
        invites: action.payload,
      };
    }
      case requestSuccess(GET_MY_CONNECTIONS_COUNT): {
      return {
        ...state,
        connections: action.payload,
      };
    }


    // case requestSuccess(GET_MY_INVITES_COUNT): {
    //   return {
    //     ...state,
    //     createChatLoading: false,
    //   };
    // }

    default:
      return state;
  }
};

export default CountReducer;
