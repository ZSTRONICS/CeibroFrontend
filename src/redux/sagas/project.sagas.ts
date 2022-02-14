import { put, takeLatest } from "redux-saga/effects";
import {
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
} from "../../config/project.config";
import apiCall from "../../utills/apiCall";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
  try {
    yield put({ type: "USER_FETCH_SUCCEEDED" });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED" });
  }
}

const getProjects = apiCall({
  type: GET_PROJECTS,
  method: "get",
  path: "/project/all",
});

const getProjectMembers = apiCall({
  type: GET_PROJECTS_MEMBERS,
  method: "get",
  path: (payload) => `/project/members/${payload?.other}`,
});

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest(GET_PROJECTS, getProjects);
  yield takeLatest(GET_PROJECTS_MEMBERS, getProjectMembers);
}

export default projectSaga;
