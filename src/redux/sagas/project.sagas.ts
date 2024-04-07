import {
  ADD_REMOVE_FOLDER_USER,
  CREATE_FOLDER,
  CREATE_MEMBER,
  CREATE_NEW_PROFILE,
  CREATE_PROFILE_WORK,
  CREATE_ROLES,
  DELETE_MEMBER,
  DELETE_PROJECT,
  DELETE_ROLE,
  DELETE_WORK,
  GET_AVAILABLE_PROJECT_MEMBERS,
  GET_FOLDER_FILES,
  GET_GROUP_BY_ID,
  GET_GROUP_USERS,
  GET_MEMBER,
  GET_NEW_WORK,
  GET_PROJECTS_MEMBERS, GET_PROJECTS_WITH_MEMBERS, GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_PROJECT_PROFILE,
  GET_STATUS,
  GET_TIME_PROFILE_BY_ID,
  GET_WORK_BY_ID,
  PROJECT_CONFIG,
  UPDATE_GROUP,
  UPDATE_MEMBER,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PICTURE,
  UPDATE_ROLE,
  UPDATE_TIME_PROFILE,
  UPDATE_WORK,
  UPLOAD_FILE_TO_FOLDER
} from "config";
import { put, takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
  try {
    yield put({ type: "USER_FETCH_SUCCEEDED" });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED" });
  }
}
// PROJECT APIS
const createProject = apiCall({
  useV2Route: true,
  isFormData: true,
  type: PROJECT_CONFIG.CREATE_NEW_PROJECT,
  method: "post",
  path: `/project`,
});

const getAllProjects = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GET_ALL_PROJECTS,
  method: "get",
  path: "/project",
});

const projectFavUnFav = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.PROJECT_FAV_UNFAV,
  method: "post",
  path: (payload) => `/project/favorite/${payload.other.isProjFav}/${payload.other.projectId}`,
});

const groupFavUnFav = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GROUP_FAV_UNFAV,
  method: "post",
  path: (payload) => `/project/group/favorite/${payload.other.isGroupFav}/${payload.other.groupId}`,
});

const projectHideUnhide = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.PROJECT_HIDE_UNHIDE,
  method: "post",
  path: (payload) => `/project/hidden/${payload.other.isProjHidden}/${payload.other.projectId}`,
});

// FLOOR APIS
const createFloor = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.CREATE_FLOOR,
  method: 'post',
  path: (payload) => `/project/${payload.other}/floor`, //projectId
})

const getFloorsByProjectId = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID,
  method: 'get',
  path: (payload) => `/project/${payload.other.projectId}/floor`, //projectId
})

// DRAWING APIS
/**
 * Retrieve a drawing by its ID for a specific project and floor.
 *
 * @param {Object} payload - The payload object containing the project, floor, and drawing IDs.
 * @param {string} projectId - The ID of the project.
 * @param {string} floorId - The ID of the floor.
 * @param {string} drawingId - The ID of the drawing.
 */
const getDrawingById = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GET_DRAWINGS_BY_PROJECT_ID,
  method: 'get',
  path: (payload) => `/project/${payload.other.projectId}/${payload.other.floorId}/${payload.other.drawingId}`,
});

// UPLOAD_IMAGE_ON_DRAWING
const uploadImageOnDrawing = apiCall({
  useV2Route: true,
  isFormData: true,
  method: 'post',
  type: PROJECT_CONFIG.UPLOAD_IMAGE_ON_DRAWING,
  path: (payload) => `/docs/imageUplaod/${payload.other.drawingId}`,
});

const getAllDrawingImagesById = apiCall({
  useV2Route: true,
  method: 'get',
  type: PROJECT_CONFIG.GET_ALL_DRAWING_IMAGES_BY_ID,
  path: (payload) => `/docs/drawingImages/${payload.other.drawingId}`,
});

const getRecentDrawings = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GET_RECENT_DRAWINGS,
  method: 'get',
  path: "/project/recentDrawings"
})
const addNewDrawing = apiCall({
  useV2Route: true,
  isFormData: true,
  type: PROJECT_CONFIG.ADD_NEW_DRAWING,
  method: 'post',
  path: "/docs/upload/drawing"
})

// const addDrawingPinByDrawingId = apiCall({
//   useV2Route: true,
//   type: PROJECT_CONFIG.ADD_DRAWING_PIN_BY_DRAWING_ID,
//   method: 'post',
//   path: (payload) => `/project/drawingPin/${payload.other.drawingId}`,
// })

// const getDrawingPinsByDrawingId = apiCall({
//   useV2Route: true,
//   type: PROJECT_CONFIG.GET_DRAWING_PINS_BY_DRAWING_ID,
//   method: 'get',
//   path: (payload) => `/project/drawingPin/${payload.other.drawingId}`,
// })

// GROUPS APIS
const createProjectGroup = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.CREATE_GROUP,
  method: "post",
  path: (payload) => `/project/${payload.other.projectId}/group`,
});

const markGroupPrivateOrPublic = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.MARK_GROUP_PUBLIC_OR_PRIVATE,
  method: "post",
  path: (payload) => `/project/group/public/${payload.other.ispublicGroup}/${payload.other.groupId}`,
});


const getGroupsByProjectId = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.GET_GROUPS_BY_PROJECT_ID,
  method: "get",
  path: (payload) => `/project/${payload.other.projectId}/group`,
});

const updateGroupById = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.UPDATE_GROUP_BY_ID,
  method: "patch",
  path: (payload) => `/project/group/${payload.other.groupId}`
});

const deleteGroupById = apiCall({
  useV2Route: true,
  type: PROJECT_CONFIG.DELETE_GROUP_BY_ID,
  method: "delete",
  path: (payload) => `/project/group/${payload.other.groupId}`
});

const getProjectsWithMembers = apiCall({
  useV2Route: false,
  type: GET_PROJECTS_WITH_MEMBERS,
  method: "post",
  path: "/project/getProjectsWithMembers",
});

const getProjectsWithPagination = apiCall({
  useV2Route: false,
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
      url = `${url}?search=assignedTo=${selectedUser}&`;
    }

    return url;
  },
});

const getProjectMembers = apiCall({
  useV2Route: false,
  type: GET_PROJECTS_MEMBERS,
  method: "get",
  path: (payload) => `/project/member/${payload.other.projectId}`
});

const getProjectDetail = apiCall({
  useV2Route: false,
  type: GET_PROJECT_DETAIL,
  method: "get",
  path: (payload) => `/project/${payload.other}`,
});

const createRoles = apiCall({
  useV2Route: false,
  type: CREATE_ROLES,
  method: "post",
  path: (paylaod) => `/project/role/${paylaod.other}`,
});



const getAllDocuments = apiCall({
  useV2Route: false,
  type: PROJECT_CONFIG.GET_ALL_DOCUMENTS,
  method: "get",
  // path: (payload) =>
  //   `/project/folder/${payload.other?.selectedProject}?search=${payload.other?.findDoc}`,
  path: (payload) => {
    const selectedProject = payload.other.selectedProject;
    const inputData = payload.other.findDoc;
    let url = `/project/documents/${selectedProject}`;
    if (inputData) {
      url = `${url}?search=${inputData}`;
    }

    return url;
  },
});

const createFolder = apiCall({
  useV2Route: false,
  type: CREATE_FOLDER,
  method: "post",
  path: (payload) => `/project/folder/${payload.other}`,
});

const createMember = apiCall({
  useV2Route: false,
  type: CREATE_MEMBER,
  method: "post",
  path: (payload) => `/project/member/${payload.other}`,
});

const getMember = apiCall({
  useV2Route: false,
  type: GET_MEMBER,
  method: "get",
  path: (payload) => {
    let url = `/project/member/${payload.other}`;
    // if (payload.other?.includeMe) {
    //   url = `${url}?includeMe=true`;
    // }
    return url;
  },
});

const updateMember = apiCall({
  useV2Route: false,
  type: UPDATE_MEMBER,
  method: "patch",
  path: (payload) => `/project/member/update/${payload.other}`,
});

const getFolderFiles = apiCall({
  useV2Route: false,
  type: GET_FOLDER_FILES,
  method: "get",
  // path: (payload) => `/project/file/${payload.other}`,
  path: (payload) => {
    let url = "/project/folder/";
    const selectedFolder = payload.other.selectedFolder;
    const inputData = payload.other.findDoc;
    if (selectedFolder) {
      url = `${url}${selectedFolder}`;
    }
    if (inputData) {
      url = `${url}?search=${inputData}`;
    }

    return url;
  },
});
const updateProjectDocumentsAccess = apiCall({
  useV2Route: false,
  type: PROJECT_CONFIG.UPDATE_PROJECT_DOCUMENT_ACCESS,
  method: "patch",
  path: (payload) => `project/documents/updateAccess/${payload.other}`, //projectId
});

const uploadFileToFolder = apiCall({
  useV2Route: false,
  type: UPLOAD_FILE_TO_FOLDER,
  method: "post",
  path: (payload) => `/project/file/${payload.other}`,
});
const updateProject = apiCall({
  useV2Route: false,
  type: UPLOAD_FILE_TO_FOLDER,
  method: "patch",
  path: (payload) => `/project/${payload.other}`,
});

const getProjectRolesById = apiCall({
  useV2Route: false,
  type: PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID,
  method: "get",
  path: (payload) => `/project/role/${payload.other}`,
});

const updateRole = apiCall({
  useV2Route: false,
  type: UPDATE_ROLE,
  method: "patch",
  path: (payload) => `/project/role/${payload.other}`,
});

const getGroupById = apiCall({
  useV2Route: false,
  type: GET_GROUP_BY_ID,
  method: "get",
  path: (payload) => `/project/group/${payload.other}`,
});

// patch group by groupId 
const updateGroup = apiCall({
  useV2Route: false,
  type: UPDATE_GROUP,
  method: "patch",
  path: (payload) => `/project/group/${payload.other}`,
});

const createNewProfile = apiCall({
  useV2Route: false,
  type: CREATE_NEW_PROFILE,
  method: "post",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getProjectProfile = apiCall({
  useV2Route: false,
  type: GET_PROJECT_PROFILE,
  method: "get",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getTimeProfileById = apiCall({
  useV2Route: false,
  type: GET_TIME_PROFILE_BY_ID,
  method: "get",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const updateTimeProfile = apiCall({
  useV2Route: false,
  type: UPDATE_TIME_PROFILE,
  method: "put",
  path: (payload) => `/project/timeProfile/${payload.other}`,
});

const getStatus = apiCall({
  useV2Route: false,
  type: GET_STATUS,
  method: "get",
  path: "/project/count/status",
});

const createProfileWork = apiCall({
  useV2Route: false,
  type: CREATE_PROFILE_WORK,
  method: "post",
  path: (payload) => `/project/work/${payload.other}`,
});

const getNewWork = apiCall({
  useV2Route: false,
  type: GET_NEW_WORK,
  method: "get",
  path: (payload) => `/project/work/${payload.other}`,
});
const deleteProject = apiCall({
  useV2Route: false,
  type: DELETE_PROJECT,
  method: "delete",
  path: (payload) => `/project/${payload.other}`,
});

const getWorkById = apiCall({
  useV2Route: false,
  type: GET_WORK_BY_ID,
  method: "get",
  path: (payload) => `/project/work/${payload.other}`,
});

const updateWork = apiCall({
  useV2Route: false,
  type: UPDATE_WORK,
  method: "put",
  path: (payload) => `/project/work/${payload.other}`,
});

const deleteWork = apiCall({
  useV2Route: false,
  type: DELETE_WORK,
  method: "delete",
  path: (payload) => `/project/work/${payload.other}`,
});

// const getPermissions = apiCall({
//  useV2Route: false,
//   type: GET_PERMISSIONS,
//   method: "get",
//   path: (payload) => `/project/permissions/${payload.other}`,
// });
const deleteMember = apiCall({
  useV2Route: false,
  type: DELETE_MEMBER,
  method: "delete",
  // path: (payload) => `/project/member/${payload.other}`,
  path: (payload) => `/project/member/remove/${payload.other}`,
});

const updateProjectPic = apiCall({
  useV2Route: false,
  type: UPDATE_PROJECT_PICTURE,
  method: "patch",
  isFormData: true,
  path: (payload) => `/project/profile/pic/${payload.other}`,
});

const deleteRole = apiCall({
  useV2Route: false,
  type: DELETE_ROLE,
  method: "delete",
  path: (payload) => `/project/role/${payload.other}`,
});

const getAvailableProjectMembers = apiCall({
  useV2Route: false,
  type: GET_AVAILABLE_PROJECT_MEMBERS,
  method: "get",
  path: (payload) => `/project/members/available/${payload.other}`,
});

// const getGroupMembers = apiCall({
//  useV2Route: false,
//   type: GET_GROUP_MEMBERS,
//   method: "get",
//   path: (payload) => `/project/group/members/${payload.other}`,
// });

const getGroupUsers = apiCall({
  useV2Route: false,
  type: GET_GROUP_USERS,
  method: "get",
  path: (payload) => `/project/group/users/${payload.other}`,
});

const addRemoveFolderUser = apiCall({
  useV2Route: false,
  type: ADD_REMOVE_FOLDER_USER,
  method: "post",
  path: ({ other: { folderId, userId } }) =>
    `/project/folder-user/${folderId}/${userId}`,
});

function* projectSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  // project
  yield takeLatest(PROJECT_CONFIG.CREATE_NEW_PROJECT, createProject);
  yield takeLatest(PROJECT_CONFIG.PROJECT_FAV_UNFAV, projectFavUnFav);
  yield takeLatest(PROJECT_CONFIG.PROJECT_HIDE_UNHIDE, projectHideUnhide);
  yield takeLatest(PROJECT_CONFIG.GET_ALL_PROJECTS, getAllProjects);
  // groups
  yield takeLatest(PROJECT_CONFIG.GROUP_FAV_UNFAV, groupFavUnFav);
  yield takeLatest(PROJECT_CONFIG.CREATE_GROUP, createProjectGroup);
  yield takeLatest(PROJECT_CONFIG.GET_GROUPS_BY_PROJECT_ID, getGroupsByProjectId);
  yield takeLatest(PROJECT_CONFIG.UPDATE_GROUP_BY_ID, updateGroupById);
  yield takeLatest(PROJECT_CONFIG.DELETE_GROUP_BY_ID, deleteGroupById);
  yield takeLatest(PROJECT_CONFIG.MARK_GROUP_PUBLIC_OR_PRIVATE, markGroupPrivateOrPublic);
  // floors
  yield takeLatest(PROJECT_CONFIG.CREATE_FLOOR, createFloor);
  yield takeLatest(PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID, getFloorsByProjectId);
  // drawings
  yield takeLatest(PROJECT_CONFIG.ADD_NEW_DRAWING, addNewDrawing);
  yield takeLatest(PROJECT_CONFIG.UPLOAD_IMAGE_ON_DRAWING, uploadImageOnDrawing);
  yield takeLatest(PROJECT_CONFIG.GET_ALL_DRAWING_IMAGES_BY_ID, getAllDrawingImagesById);
  yield takeLatest(PROJECT_CONFIG.GET_DRAWINGS_BY_PROJECT_ID, getDrawingById);
  yield takeLatest(PROJECT_CONFIG.GET_RECENT_DRAWINGS, getRecentDrawings);
  // yield takeLatest(PROJECT_CONFIG.ADD_DRAWING_PIN_BY_DRAWING_ID, addDrawingPinByDrawingId);
  // yield takeLatest(PROJECT_CONFIG.GET_DRAWING_PINS_BY_DRAWING_ID, getDrawingPinsByDrawingId);

  yield takeLatest(GET_PROJECTS_WITH_MEMBERS, getProjectsWithMembers);
  yield takeLatest(GET_PROJECTS_MEMBERS, getProjectMembers);
  yield takeLatest(GET_PROJECTS_WITH_PAGINATION, getProjectsWithPagination);
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetail);
  yield takeLatest(CREATE_ROLES, createRoles);
  yield takeLatest(PROJECT_CONFIG.GET_ALL_DOCUMENTS, getAllDocuments);
  yield takeLatest(CREATE_FOLDER, createFolder);
  yield takeLatest(CREATE_MEMBER, createMember);
  yield takeLatest(GET_MEMBER, getMember);
  yield takeLatest(UPDATE_MEMBER, updateMember);
  yield takeLatest(GET_FOLDER_FILES, getFolderFiles);
  yield takeLatest(UPLOAD_FILE_TO_FOLDER, uploadFileToFolder);

  yield takeLatest(PROJECT_CONFIG.UPDATE_PROJECT_DOCUMENT_ACCESS, updateProjectDocumentsAccess);
  yield takeLatest(UPDATE_PROJECT, updateProject);

  yield takeLatest(PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID, getProjectRolesById);
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
  yield takeLatest(DELETE_ROLE, deleteRole);
  yield takeLatest(GET_AVAILABLE_PROJECT_MEMBERS, getAvailableProjectMembers);
  // yield takeLatest(GET_GROUP_MEMBERS, getGroupMembers);
  yield takeLatest(GET_GROUP_USERS, getGroupUsers);
  yield takeLatest(ADD_REMOVE_FOLDER_USER, addRemoveFolderUser);
}

export default projectSaga;
