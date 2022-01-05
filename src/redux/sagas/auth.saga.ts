import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects'
import { CREATE_ROOM, GET_USERS, LOGIN } from '../../config/auth.config';
import apiCall from '../../utills/apiCall';
import { ActionInterface } from '../reducers';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const loginRequest = apiCall({
    type: LOGIN,
    method: "post",
    path: "/auth/login",
    success: (res: any) => {
        toast.success('logged in successfully');
    }
});

const createChatRoom = apiCall({
  type: CREATE_ROOM,
  method: "post",
  path: "/chat/rooms",
  success: (_res: any, _action: ActionInterface) => {
      toast.success('Chat room created successfully');
  }
});

function* projectSaga() {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(CREATE_ROOM, createChatRoom);
}

export default projectSaga;