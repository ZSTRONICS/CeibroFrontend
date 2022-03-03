import { ActionInterface } from ".";
import {
  requestSuccess,
} from "../../utills/status";

import { GET_MY_INVITES_COUNT } from "config/user.config";

interface CountReducer {
  count: any;
}

const intialStatue: CountReducer = {
  count: [] 
};


const CountReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case requestSuccess(GET_MY_INVITES_COUNT): {
      return {
        ...state,
        count: state.count,
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
