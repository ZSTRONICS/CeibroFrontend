import { put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PROJECT,
  GET_FILTER_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
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

const getProjectsWithPagination = apiCall({
  type: GET_PROJECTS_WITH_PAGINATION,
  method: "get",
  path: (payload, store) => {
    let url = "/project?";
    const status = store?.project?.selectedStatus;
    const selectedDate = store?.project?.selectedDate;

    if (status) {
      url = `${url}publishStatus=${status?.toLowerCase()}`;
    }

    if (selectedDate) {
      url = `${url}&dueDate=${selectedDate}`;
    }

    return url;
  },
});

const getProjectMembers = apiCall({
  type: GET_PROJECTS_MEMBERS,
  method: "get",
  path: (payload) => `/project/members/${payload?.other}`,
});
// const getFilterProjects = apiCall({
//   type: GET_FILTER_PROJECTS,
//   method: "get",
//   path: (payload) => `/project/${payload?.filter}`,
// });

const createProject = apiCall({
  type: CREATE_PROJECT,
  method: "post",
  path: `/project`,
});

const getProjectDetail = apiCall({
  type: GET_PROJECT_DETAIL,
  method: "get",
  path: (payload) => `/project/detail/${payload.other}`,
});

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest(GET_PROJECTS, getProjects);
  yield takeLatest(GET_PROJECTS_MEMBERS, getProjectMembers);
  yield takeLatest(CREATE_PROJECT, createProject);
  // yield takeLatest(GET_FILTER_PROJECTS, getFilterProjects);

  yield takeLatest(GET_PROJECTS_WITH_PAGINATION, getProjectsWithPagination);
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetail);
}

export default projectSaga;
