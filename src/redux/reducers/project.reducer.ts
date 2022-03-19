import { ActionInterface } from ".";
import config, {
  GET_FILTER_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  SET_PROJECT_OVERVIEW,
  SET_SELECTED_PROJECT,
} from "../../config/project.config";
import { requestPending, requestSuccess } from "../../utills/status";
import {
  projectOverviewInterface,
  projectOverviewTemplate,
} from "constants/interfaces/project.interface";
import { ProjectInterface } from "components/Utills/ProjectCard/ProjectCard";

interface ProjectReducerInt {
  drawerOpen: boolean;
  menue: number;
  allProjects: any;
  projects: ProjectInterface[];
  projectMembers: [];
  selectedProject: any;
  projectOverview: projectOverviewInterface | null;
  filter: any;
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

};

const AppReducer = (state = projectReducer, action: ActionInterface) => {
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

    default:
      return state;
  }
};

export default AppReducer;
