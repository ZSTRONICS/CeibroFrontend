import { put, takeLatest } from 'redux-saga/effects'
import { LOGIN } from '../../config/auth.config';
import apiCall from '../../utills/apiCall';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const loginRequest = apiCall({
    type: LOGIN,
    method: "post",
    path: "/auth/login",
    success: (res: any) => {
        alert('logged in successfully');
    }
})

function* projectSaga() {
  yield takeLatest(LOGIN, loginRequest);
}

export default projectSaga;