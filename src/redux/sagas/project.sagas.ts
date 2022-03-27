import { put, takeLatest } from "redux-saga/effects";
import {
  CREATE_FOLDER,
  CREATE_GROUP,
  CREATE_MEMBER,
  CREATE_PROJECT,
  CREATE_ROLES,
  GET_FILTER_PROJECTS,
  GET_FOLDER,
  GET_GROUP,
  GET_MEMBER,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_ROLES,
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

const getAllRoles = apiCall({
  type: GET_ROLES,
  method: "get",
  path: (payload) => `/project/role/${payload?.other}`,
});
const createRoles = apiCall({
  type: CREATE_ROLES,
  method: "post",
  path: (paylaod) => `/project/role/${paylaod?.other}`,
});

const createGroup = apiCall({
  type: CREATE_GROUP,
  method: "post",
  path: (payload) => `/project/group/${payload?.other}`,
});

const getGroup = apiCall({
  type: GET_GROUP,
  method: "get",
  path: (payload) => `/project/group/${payload?.other}`,
});
const geFolder = apiCall({
  type: GET_FOLDER,
  method: "get",
  path: (payload) => `/project/folder/${payload?.other}`,
});

const createFolder = apiCall({
  type: CREATE_FOLDER,
  method: "post",
  path: (payload) => `/project/folder/${payload?.other}`,
});
const createMember = apiCall({
  type: CREATE_MEMBER,
  method: "post",
  path: (payload) => `/project/member/${payload?.other}`,
});
const getMember = apiCall({
  type: GET_MEMBER,
  method: "get",
  path: (payload) => `/project/member/${payload?.other}`,
});

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest(GET_PROJECTS, getProjects);
  yield takeLatest(GET_PROJECTS_MEMBERS, getProjectMembers);
  yield takeLatest(CREATE_PROJECT, createProject);
  // yield takeLatest(GET_FILTER_PROJECTS, getFilterProjects);

  yield takeLatest(GET_PROJECTS_WITH_PAGINATION, getProjectsWithPagination);
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetail);
  yield takeLatest(GET_ROLES, getAllRoles);
  yield takeLatest(CREATE_ROLES, createRoles);
  yield takeLatest(CREATE_GROUP, createGroup);
  yield takeLatest(GET_GROUP, getGroup);
  yield takeLatest(GET_FOLDER, geFolder);
  yield takeLatest(CREATE_FOLDER, createFolder);
  yield takeLatest(CREATE_MEMBER, createMember);
  yield takeLatest(GET_MEMBER, getMember);
}

export default projectSaga;
