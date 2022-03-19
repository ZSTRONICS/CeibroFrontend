import { projectOverviewInterface } from "constants/interfaces/project.interface";
import configs, {
  CREATE_PROJECT,
  GET_AVAILABLE_PROJECT_USERS,
  GET_FILTER_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  SET_PROJECT_OVERVIEW,
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
};

export const getProjectsWithPagination = createAction(
  GET_PROJECTS_WITH_PAGINATION
);
export const getAllProjects = createAction(GET_PROJECTS);
export const getAllProjectMembers = createAction(GET_PROJECTS_MEMBERS);
export const createProject = createAction(CREATE_PROJECT);
export const getFilterProjects = createAction(GET_FILTER_PROJECTS);

export const getAvailableProjectUsers = createAction(
  GET_AVAILABLE_PROJECT_USERS
);

export default projectActions;
