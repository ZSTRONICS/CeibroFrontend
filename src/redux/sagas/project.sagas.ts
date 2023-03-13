import { put, takeLatest } from "redux-saga/effects";
import {
  ADD_REMOVE_FOLDER_USER,
  CREATE_FOLDER,
  CREATE_GROUP,
  CREATE_MEMBER,
  CREATE_NEW_PROFILE,
  CREATE_PROFILE_WORK,
  CREATE_PROJECT,
  CREATE_ROLES,
  DELETE_GROUP,
  DELETE_MEMBER,
  DELETE_PROJECT,
  DELETE_ROLE,
  DELETE_WORK,
  GET_AVAILABLE_PROJECT_MEMBERS, GET_FOLDER,
  GET_FOLDER_FILES,
  GET_GROUP,
  GET_GROUP_BY_ID,
  GET_GROUP_USERS,
  GET_MEMBER,
  GET_NEW_WORK,
  GET_PROJECTS, GET_PROJECTS_MEMBERS, GET_PROJECTS_WITH_MEMBERS, GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_PROJECT_PROFILE,
  PROJECT_CONFIG,
  GET_STATUS,
  GET_TIME_PROFILE_BY_ID,
  GET_WORK_BY_ID, UPDATE_GROUP,
  UPDATE_MEMBER,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PICTURE,
  UPDATE_ROLE,
  UPDATE_TIME_PROFILE,
  UPDATE_WORK,
  UPLOAD_FILE_TO_FOLDER
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
  path: "/project",
});
const getProjectsWithMembers = apiCall({
  type: GET_PROJECTS_WITH_MEMBERS,
  method: "post",
  path: "/project/getProjectsWithMembers",
});

const getProjectsWithPagination = apiCall({
  type: GET_PROJECTS_WITH_PAGINATION,
  method: "get",
  path: (payload, store: any) => {
    let url = "/project";
    const {
      selectedStatus: status,
      selectedDate,
      searchProject,
      selectedUser,
    } = store?.project;

    if (status) {
      url = `${url}publishStatus=${status?.toLowerCase()}&`;
    }

    if (selectedDate) {
      url = `${url}dueDate=${selectedDate}&`;
    }

    if (searchProject) {
      url = `${url}title=${searchProject}&`;
    }

    if (selectedUser) {
      url = `${url}assignedTo=${selectedUser}&`;
    }

    return url;
  },
});

const getProjectMembers = apiCall({
  type: GET_PROJECTS_MEMBERS,
  method: "get",
  path: (payload) => {
    let url = `/project/members/${payload?.other?.projectId}`;
    if (payload.other?.includeMe) {
      url = `${url}?includeMe=true`;
    }
    return url;
  },
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
  path: (payload) => `/project/${payload?.other}`,
});

const createRoles = apiCall({
  type: CREATE_ROLES,
  method: "post",
  path: (paylaod) => `/project/role/${paylaod.other}`,
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
  // path: (payload) =>
  //   `/project/folder/${payload?.other?.selectedProject}?search=${payload?.other?.findDoc}`,
  path: (payload) => {
    const selectedProject = payload?.other?.selectedProject;
    const inputData = payload?.other?.findDoc;

    let url = `/project/folder/${selectedProject}`;

    if (inputData) {
      url = `${url}?search=${inputData}`;
    }

    return url;
  },
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
  path: (payload) => {
    let url = `/project/member/${payload?.other}`;
    // if (payload.other?.includeMe) {
    //   url = `${url}?includeMe=true`;
    // }
    return url;
  },
});

const updateMember = apiCall({
  type: UPDATE_MEMBER,
  method: "patch",
  path: (payload) => `/project/member/${payload?.other}`,
});

const getFolderFiles = apiCall({
  type: GET_FOLDER_FILES,
  method: "get",
  // path: (payload) => `/project/file/${payload.other}`,

  path: (payload) => {
    let url = "/project/file/";
    const selectedFolder = payload?.other?.selectedFolder;
    const inputData = payload?.other?.findDoc;
    if (selectedFolder) {
      url = `${url}${selectedFolder}`;
    }

    if (inputData) {
      url = `${url}?search=${inputData}`;
    }

    return url;
  },
});

const uploadFileToFolder = apiCall({
  type: UPLOAD_FILE_TO_FOLDER,
  method: "post",
  path: (payload) => `/project/file/${payload.other}`,
});
const updateProject = apiCall({
  type: UPLOAD_FILE_TO_FOLDER,
  method: "patch",
  path: (payload) => `/project/${payload.other}`,
});

const getProjectRolesById  = apiCall({
  type: PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID,
  method: "get",
  path: (payload) => `/project/role/${payload.other}`,
});

const updateRole = apiCall({
  type: UPDATE_ROLE,
  method: "patch",
  path: (payload) => `/project/role/${payload.other}`,
});

const getGroupById = apiCall({
  type: GET_GROUP_BY_ID,
  method: "get",
  path: (payload) => `/project/group/${payload.other}`,
});

// patch group by groupId 
const updateGroup = apiCall({
  type: UPDATE_GROUP,
  method: "patch",
  path: (payload) => `/project/group/${payload.other}`,
});

const createNewProfile = apiCall({
  type: CREATE_NEW_PROFILE,
  method: "post",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getProjectProfile = apiCall({
  type: GET_PROJECT_PROFILE,
  method: "get",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getTimeProfileById = apiCall({
  type: GET_TIME_PROFILE_BY_ID,
  method: "get",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const updateTimeProfile = apiCall({
  type: UPDATE_TIME_PROFILE,
  method: "put",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getStatus = apiCall({
  type: GET_STATUS,
  method: "get",
  path: "/project/count/status",
});

const createProfileWork = apiCall({
  type: CREATE_PROFILE_WORK,
  method: "post",
  path: (payload) => `/project/work/${payload.other}`,
});

const getNewWork = apiCall({
  type: GET_NEW_WORK,
  method: "get",
  path: (payload) => `/project/work/${payload.other}`,
});
const deleteProject = apiCall({
  type: DELETE_PROJECT,
  method: "delete",
  path: (payload) => `/project/${payload.other}`,
});

const getWorkById = apiCall({
  type: GET_WORK_BY_ID,
  method: "get",
  path: (payload) => `/project/work/${payload.other}`,
});

const updateWork = apiCall({
  type: UPDATE_WORK,
  method: "put",
  path: (payload) => `/project/work/${payload.other}`,
});

const deleteWork = apiCall({
  type: DELETE_WORK,
  method: "delete",
  path: (payload) => `/project/work/${payload.other}`,
});

// const getPermissions = apiCall({
//   type: GET_PERMISSIONS,
//   method: "get",
//   path: (payload) => `/project/permissions/${payload.other}`,
// });
const deleteMember = apiCall({
  type: DELETE_MEMBER,
  method: "delete",
  // path: (payload) => `/project/member/${payload.other}`,
  path: (payload) => `/project/member/remove/${payload.other}`,
});

const updateProjectPic = apiCall({
  type: UPDATE_PROJECT_PICTURE,
  method: "patch",
  isFormData: true,
  path: (payload) => `/project/profile/pic/${payload.other}`,
});

const deleteGroup = apiCall({
  type: DELETE_GROUP,
  method: "delete",
  path: (payload) => `/project/group/${payload?.other}`,
});

const deleteRole = apiCall({
  type: DELETE_ROLE,
  method: "delete",
  path: (payload) => `/project/role/${payload?.other}`,
});

const getAvailableProjectMembers = apiCall({
  type: GET_AVAILABLE_PROJECT_MEMBERS,
  method: "get",
  path: (payload) => `/project/members/available/${payload?.other}`,
});

// const getGroupMembers = apiCall({
//   type: GET_GROUP_MEMBERS,
//   method: "get",
//   path: (payload) => `/project/group/members/${payload?.other}`,
// });

const getGroupUsers = apiCall({
  type: GET_GROUP_USERS,
  method: "get",
  path: (payload) => `/project/group/users/${payload?.other}`,
});

const addRemoveFolderUser = apiCall({
  type: ADD_REMOVE_FOLDER_USER,
  method: "post",
  path: ({ other: { folderId, userId } }) =>
    `/project/folder-user/${folderId}/${userId}`,
});

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest(GET_PROJECTS, getProjects);
  yield takeLatest(GET_PROJECTS_WITH_MEMBERS, getProjectsWithMembers);
  yield takeLatest(GET_PROJECTS_MEMBERS, getProjectMembers);
  yield takeLatest(CREATE_PROJECT, createProject);
  yield takeLatest(GET_PROJECTS_WITH_PAGINATION, getProjectsWithPagination);
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetail);
  yield takeLatest(CREATE_ROLES, createRoles);
  yield takeLatest(CREATE_GROUP, createGroup);
  yield takeLatest(GET_GROUP, getGroup);
  yield takeLatest(GET_FOLDER, geFolder);
  yield takeLatest(CREATE_FOLDER, createFolder);
  yield takeLatest(CREATE_MEMBER, createMember);
  yield takeLatest(GET_MEMBER, getMember);
  yield takeLatest(UPDATE_MEMBER, updateMember);
  yield takeLatest(GET_FOLDER_FILES, getFolderFiles);
  yield takeLatest(UPLOAD_FILE_TO_FOLDER, uploadFileToFolder);
  yield takeLatest(UPDATE_PROJECT, updateProject);
  yield takeLatest(PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID, getProjectRolesById );
  yield takeLatest(GET_GROUP_BY_ID, getGroupById);
  yield takeLatest(UPDATE_GROUP, updateGroup);
  yield takeLatest(DELETE_MEMBER, deleteMember);

  yield takeLatest(UPDATE_ROLE, updateRole);
  yield takeLatest(CREATE_NEW_PROFILE, createNewProfile);
  yield takeLatest(GET_PROJECT_PROFILE, getProjectProfile);
  yield takeLatest(GET_TIME_PROFILE_BY_ID, getTimeProfileById);
  yield takeLatest(UPDATE_TIME_PROFILE, updateTimeProfile);
  yield takeLatest(GET_STATUS, getStatus);

  yield takeLatest(CREATE_PROFILE_WORK, createProfileWork);
  yield takeLatest(GET_NEW_WORK, getNewWork);
  yield takeLatest(DELETE_PROJECT, deleteProject);
  yield takeLatest(GET_WORK_BY_ID, getWorkById);
  yield takeLatest(UPDATE_WORK, updateWork);
  yield takeLatest(DELETE_WORK, deleteWork);
  // yield takeLatest(GET_PERMISSIONS, getPermissions);
  yield takeLatest(UPDATE_PROJECT_PICTURE, updateProjectPic);
  yield takeLatest(DELETE_GROUP, deleteGroup);
  yield takeLatest(DELETE_ROLE, deleteRole);
  yield takeLatest(GET_AVAILABLE_PROJECT_MEMBERS, getAvailableProjectMembers);
  // yield takeLatest(GET_GROUP_MEMBERS, getGroupMembers);
  yield takeLatest(GET_GROUP_USERS, getGroupUsers);
  yield takeLatest(ADD_REMOVE_FOLDER_USER, addRemoveFolderUser);
}

export default projectSaga;
