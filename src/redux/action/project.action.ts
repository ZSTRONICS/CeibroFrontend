import {
  GroupInterface,
  ProjectInterface,
} from "constants/interfaces/project.interface";
import {
  ProjectGroupInterface,
  ProjectMemberInterface,
  ProjectRolesInterface,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";

import { Drawing } from "constants/interfaces";
import configs, {
  ADD_REMOVE_FOLDER_USER,
  CLOSE_DOCUMENT_DRAWER,
  CLOSE_FILE_VIEW_DRAWER,
  CLOSE_GROUP_DRAWER,
  CLOSE_MEMBER_DRAWER,
  CLOSE_ROLE_DRAWER,
  CLOSE_TIME_PROFILE_DRAWER,
  CLOSE_WORK_DRAWER,
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
  GET_AVAILABLE_PROJECT_MEMBERS,
  GET_AVAILABLE_PROJECT_USERS,
  GET_FILE,
  GET_FOLDER_FILES,
  GET_GROUP,
  GET_GROUP_BY_ID,
  GET_GROUP_USERS,
  GET_MEMBER,
  GET_NEW_WORK,
  GET_PROJECT_DETAIL,
  GET_PROJECT_PROFILE,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_STATUS,
  GET_TIME_PROFILE_BY_ID,
  GET_WORK_BY_ID,
  OPEN_DOCUMENT_DRAWER,
  OPEN_FILE_VIEW_DRAWER,
  OPEN_GROUP_DRAWER,
  OPEN_MEMBER_DRAWER,
  OPEN_ROLE_DRAWER,
  OPEN_TIME_PROFILE_DRAWER,
  OPEN_WORK_DRAWER,
  PROJECT_CONFIG,
  SELECTED_FILE_TYPE,
  SELECTED_FILE_URL,
  SET_GROUP,
  SET_PROJECT_OVERVIEW,
  SET_ROLE,
  SET_SEARCH_PROJECT,
  SET_SELECTED_DATE,
  SET_SELECTED_GROUP,
  SET_SELECTED_PROJECT,
  SET_SELECTED_ROLE,
  SET_SELECTED_STATUS,
  SET_SELECTED_TIME_PROFILE,
  SET_SELECTED_USER,
  SET_SELECTED_WORK,
  UPDATE_GROUP,
  UPDATE_MEMBER,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PICTURE,
  UPDATE_ROLE,
  UPDATE_TIME_PROFILE,
  UPDATE_WORK,
  UPLOAD_FILE_TO_FOLDER
} from "../../config/project.config";
import { createAction } from "./action";

const projectActions = {
  openDrawer: () => {
    return {
      type: configs.OPEN_DRAWER,
    };
  },
  closeDrawer: () => {
    return {
      type: configs.CLOSE_DRAWER,
    };
  },
  setMenue: (id: number) => {
    return {
      type: configs.SET_MENUE,
      payload: id,
    };
  },
  setProjectOverview: (projectOverview: ProjectInterface) => {
    return {
      type: SET_PROJECT_OVERVIEW,
      payload: projectOverview,
    };
  },
  setRole: (role: ProjectRolesInterface) => {
    return {
      type: SET_ROLE,
      payload: role,
    };
  },
  setSelectedFileUrl: (url: any) => {
    return {
      type: SELECTED_FILE_URL,
      payload: url,
    };
  },
  setSelectedFileType: (type: any) => {
    return {
      type: SELECTED_FILE_TYPE,
      payload: type,
    };
  },
  setGroup: (group: GroupInterface) => {
    return {
      type: SET_GROUP,
      payload: group,
    };
  },

  setSelectedProject: (projectId: string | null) => {
    return {
      type: SET_SELECTED_PROJECT,
      payload: projectId,
    };
  },
  setSelectedFloor: (floor: object | null) => {
    return {
      type: PROJECT_CONFIG.SET_SELECTED_FLOOR,
      payload: floor,
    };
  },
  setSelectedDrawing: (drawing: Drawing | null) => {
    return {
      type: PROJECT_CONFIG.SET_SELECTED_DRAWING,
      payload: drawing,
    };
  },
  setLoadDrawing: (loadFlag: boolean) => {
    return {
      type: PROJECT_CONFIG.SET_LOAD_DRAWING,
      payload: loadFlag,
    };
  },
  setSelectedRole: (role: ProjectRolesInterface) => {
    return {
      type: SET_SELECTED_ROLE,
      payload: role,
    };
  },

  setSelectedGroup: (group: ProjectGroupInterface) => {
    return {
      type: SET_SELECTED_GROUP,
      payload: group,
    };
  },
  setSelectedMember: (member: ProjectMemberInterface) => {
    return {
      type: PROJECT_CONFIG.SET_SELECTED_MEMBER,
      payload: member,
    };
  },

  setSelectedStatus: (status: string) => {
    return {
      type: SET_SELECTED_STATUS,
      payload: status,
    };
  },
  setSelectedDate: (date: string) => {
    return {
      type: SET_SELECTED_DATE,
      payload: date,
    };
  },
  setSearchProject: (findProject: string) => {
    return {
      type: SET_SEARCH_PROJECT,
      payload: findProject,
    };
  },
  setSelectedUser: (selectedUserId: string | null) => {
    return {
      type: SET_SELECTED_USER,
      payload: selectedUserId,
    };
  },
  setSelectedwork: (id: string | null) => {
    return {
      type: SET_SELECTED_WORK,
      payload: id,
    };
  },

  openProjectRole: () => {
    return {
      type: OPEN_ROLE_DRAWER,
    };
  },

  closeProjectRole: () => {
    return {
      type: CLOSE_ROLE_DRAWER,
    };
  },
  openProjectGroup: () => {
    return {
      type: OPEN_GROUP_DRAWER,
    };
  },
  closeProjectGroup: () => {
    return {
      type: CLOSE_GROUP_DRAWER,
    };
  },
  openFileViewDrawer: () => {
    return {
      type: OPEN_FILE_VIEW_DRAWER,
    };
  },
  closeFileViewDrawer: () => {
    return {
      type: CLOSE_FILE_VIEW_DRAWER,
    };
  },
  openProjectMemberDrawer: () => {
    return {
      type: OPEN_MEMBER_DRAWER,
    };
  },

  openProjectDocumentModal: () => {
    return {
      type: PROJECT_CONFIG.OPEN_PROJECT_DOCUMENT_MODAL,
    };
  },

  closeProjectDocumentModal: () => {
    return {
      type: PROJECT_CONFIG.CLOSE_PROJECT_DOCUMENT_MODAL,
    };
  },

  closeProjectMemberDrawer: () => {
    return {
      type: CLOSE_MEMBER_DRAWER,
    };
  },

  openProjectDocuments: () => {
    return {
      type: OPEN_DOCUMENT_DRAWER,
    };
  },
  closeProjectDocuments: () => {
    return {
      type: CLOSE_DOCUMENT_DRAWER,
    };
  },

  closeTimeProfileDrawer: () => {
    return {
      type: CLOSE_TIME_PROFILE_DRAWER,
    };
  },
  openTimeProfileDrawer: () => {
    return {
      type: OPEN_TIME_PROFILE_DRAWER,
    };
  },
  closeWorkDrawer: () => {
    return {
      type: CLOSE_WORK_DRAWER,
    };
  },
  openWorkDrawer: () => {
    return {
      type: OPEN_WORK_DRAWER,
    };
  },

  setSelectedTimeProfile: (timeProfileId: string | null) => {
    return {
      type: SET_SELECTED_TIME_PROFILE,
      payload: timeProfileId,
    };
  },
};

export const PROJECT_APIS = {
  getProjectRolesById: createAction(PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID),
  getAllProjects: createAction(GET_PROJECTS),
  getAllDocuments: createAction(PROJECT_CONFIG.GET_ALL_DOCUMENTS),
  getDrawingById: createAction(PROJECT_CONFIG.GET_DRAWING_BY_ID),
  getFloorsByProjectId: createAction(PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID),
  getAvailableProjectUsers: createAction(GET_AVAILABLE_PROJECT_USERS),
  getProjectDetail: createAction(GET_PROJECT_DETAIL),
  getFolderFiles: createAction(GET_FOLDER_FILES),

  createProject: createAction(CREATE_PROJECT),
  createFloor: createAction(PROJECT_CONFIG.CREATE_FLOOR),
  createFolder: createAction(CREATE_FOLDER),

  updateProjectDocumentsAccess: createAction(
    PROJECT_CONFIG.UPDATE_PROJECT_DOCUMENT_ACCESS
  ),
  uploadFileToFolder: createAction(UPLOAD_FILE_TO_FOLDER),
  updateProject: createAction(UPDATE_PROJECT),
  updateProjectPicture: createAction(UPDATE_PROJECT_PICTURE),

  deleteProject: createAction(DELETE_PROJECT),
};

export const getProjectsWithPagination = createAction(
  GET_PROJECTS_WITH_PAGINATION
);
export const getAllProjects = createAction(GET_PROJECTS);

export const getAllProjectsWithMembers = createAction(
  GET_PROJECTS_WITH_MEMBERS
);
export const getAllProjectMembers = createAction(GET_PROJECTS_MEMBERS);
export const createProject = createAction(CREATE_PROJECT);
export const getAvailableProjectUsers = createAction(
  GET_AVAILABLE_PROJECT_USERS
);
export const getProjectDetail = createAction(GET_PROJECT_DETAIL);
export const createRole = createAction(CREATE_ROLES);
export const createGroup = createAction(CREATE_GROUP);
export const getGroup = createAction(GET_GROUP);
export const getGroupById = createAction(GET_GROUP_BY_ID);

export const getAllDocuments = createAction(PROJECT_CONFIG.GET_ALL_DOCUMENTS);
export const createFolder = createAction(CREATE_FOLDER);
export const createMember = createAction(CREATE_MEMBER);
export const getMember = createAction(GET_MEMBER);
export const deleteMember = createAction(DELETE_MEMBER);

export const updateMember = createAction(UPDATE_MEMBER);
export const getFolderFiles = createAction(GET_FOLDER_FILES);
export const uploadFileToFolder = createAction(UPLOAD_FILE_TO_FOLDER);
export const updateProject = createAction(UPDATE_PROJECT);
export const updateRole = createAction(UPDATE_ROLE);
export const updateGroup = createAction(UPDATE_GROUP);

export const createNewProfile = createAction(CREATE_NEW_PROFILE);
export const getProjectProfile = createAction(GET_PROJECT_PROFILE);
export const getTimeProfileById = createAction(GET_TIME_PROFILE_BY_ID);
export const updateTimeProfile = createAction(UPDATE_TIME_PROFILE);
export const getFile = createAction(GET_FILE);
export const getStatus = createAction(GET_STATUS);
export const createProfileWork = createAction(CREATE_PROFILE_WORK);
export const getNewWork = createAction(GET_NEW_WORK);
export const deleteProject = createAction(DELETE_PROJECT);
export const getWorkById = createAction(GET_WORK_BY_ID);
export const updateWork = createAction(UPDATE_WORK);
export const deleteWork = createAction(DELETE_WORK);
// export const getPermissions = createAction(GET_PERMISSIONS);
export const updateProjectPicture = createAction(UPDATE_PROJECT_PICTURE);
export const deleteGroup = createAction(DELETE_GROUP);
export const deleteRole = createAction(DELETE_ROLE);
// export const getGroupMembers = createAction(GET_GROUP_MEMBERS);
export const getGroupUsers = createAction(GET_GROUP_USERS);
export const addRemoveFolderUser = createAction(ADD_REMOVE_FOLDER_USER);
export const getAvailableProjectMembers = createAction(
  GET_AVAILABLE_PROJECT_MEMBERS
);

export default projectActions;
