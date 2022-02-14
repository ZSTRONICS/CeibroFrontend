import { ActionInterface } from ".";
import config, {
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
} from "../../config/project.config";
import { requestPending, requestSuccess } from "../../utills/status";

interface ProjectReducerInt {
  drawerOpen: boolean;
  menue: number;
  allProjects: any;
  projectMembers: [];
}

const projectReducer: ProjectReducerInt = {
  drawerOpen: false,
  menue: 1,
  allProjects: [],
  projectMembers: [],
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

    default:
      return state;
  }
};

export default AppReducer;
