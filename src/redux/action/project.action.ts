import {
  projectOverviewInterface,
  roleInterface,
} from "constants/interfaces/project.interface";
import configs, {
  CLOSE_ROLE_DRAWER,
  CREATE_PROJECT,
  CREATE_ROLES,
  GET_AVAILABLE_PROJECT_USERS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_ROLES,
  OPEN_GROUP_DRAWER,
  OPEN_ROLE_DRAWER,
  SET_PROJECT_OVERVIEW,
  SET_ROLE,
  SET_SELECTED_DATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_STATUS,
  CLOSE_GROUP_DRAWER,
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
  setProjectOverview: (projectOverview: projectOverviewInterface) => {
    return {
      type: SET_PROJECT_OVERVIEW,
      payload: projectOverview,
    };
  },
  setRole: (role: roleInterface) => {
    return {
      type: SET_ROLE,
      payload: role,
    };
  },
  setSelectedProject: (projectId: string | null) => {
    return {
      type: SET_SELECTED_PROJECT,
      payload: projectId,
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
};

export const getProjectsWithPagination = createAction(
  GET_PROJECTS_WITH_PAGINATION
);
export const getAllProjects = createAction(GET_PROJECTS);
export const getAllProjectMembers = createAction(GET_PROJECTS_MEMBERS);
export const createProject = createAction(CREATE_PROJECT);
export const getAvailableProjectUsers = createAction(
  GET_AVAILABLE_PROJECT_USERS
);
export const getProjectDetail = createAction(GET_PROJECT_DETAIL);
export const getRolesById = createAction(GET_ROLES);
export const createRole = createAction(CREATE_ROLES);

export default projectActions;
