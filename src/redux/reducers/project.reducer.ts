import { ActionInterface } from ".";
import config, {
  CLOSE_ROLE_DRAWER,
  GET_FILTER_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  OPEN_ROLE_DRAWER,
  SET_PROJECT_OVERVIEW,
  SET_SELECTED_DATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_STATUS,
} from "../../config/project.config";
import { requestPending, requestSuccess } from "../../utills/status";
import {
  ProjectInterface,
  projectOverviewInterface,
  projectOverviewTemplate,
} from "constants/interfaces/project.interface";

interface ProjectReducerInt {
  drawerOpen: boolean;
  menue: number;
  allProjects: any;
  projects: ProjectInterface[];
  projectMembers: [];
  selectedProject: any;
  projectOverview: projectOverviewInterface;
  filter: any;
  selectedStatus: string | null;
  selectedDate: string | null;
  roleDrawer: boolean;
}

const projectReducer: ProjectReducerInt = {
  drawerOpen: false,
  menue: 1,
  allProjects: [],
  projects: [],
  projectMembers: [],
  selectedProject: null,
  projectOverview: projectOverviewTemplate,
  filter: [],
  selectedStatus: null,
  selectedDate: null,
  roleDrawer: true,
};

const AppReducer = (
  state = projectReducer,
  action: ActionInterface
): ProjectReducerInt => {
  switch (action.type) {
    case config.OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true,
      };

    case config.CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
      };

    case config.SET_MENUE:
      return {
        ...state,
        menue: action.payload,
      };

    case requestSuccess(GET_PROJECTS): {
      return {
        ...state,
        allProjects: action.payload?.map?.((project: any) => ({
          label: project?.name,
          value: project.id,
        })),
      };
    }

    case requestSuccess(GET_PROJECTS_WITH_PAGINATION): {
      return {
        ...state,
        projects: action.payload?.results,
      };
    }

    case requestSuccess(GET_PROJECTS_MEMBERS): {
      return {
        ...state,
        projectMembers: action.payload,
      };
    }

    case requestPending(GET_PROJECTS): {
      return {
        ...state,
        projectMembers: [],
      };
    }

    case SET_PROJECT_OVERVIEW: {
      return {
        ...state,
        projectOverview: {
          ...action.payload,
        },
      };
    }

    case SET_SELECTED_PROJECT: {
      return {
        ...state,
        selectedProject: action.payload,
      };
    }
    case GET_FILTER_PROJECTS: {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case SET_SELECTED_STATUS: {
      return {
        ...state,
        selectedStatus: action.payload,
      };
    }
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload,
      };
    }

    case requestSuccess(GET_PROJECT_DETAIL): {
      const projectDetail = {
        ...action.payload,
        owner: {
          label:
            action.payload?.owner?.firstName +
            " " +
            action.payload?.owner?.surName,
          value: action.payload?.owner?.id,
        },
      };
      return {
        ...state,
        projectOverview: projectDetail,
      };
    }

    case OPEN_ROLE_DRAWER: {
      return {
        ...state,
        roleDrawer: true,
      };
    }

    case CLOSE_ROLE_DRAWER: {
      return {
        ...state,
        roleDrawer: false,
      };
    }

    default:
      return state;
  }
};

export default AppReducer;
