import { ActionInterface } from ".";
import config, {
  CLOSE_DOCUMENT_DRAWER,
  CLOSE_GROUP_DRAWER,
  CLOSE_ROLE_DRAWER,
  GET_FILTER_PROJECTS,
  GET_FOLDER,
  GET_FOLDER_FILES,
  GET_GROUP,
  GET_MEMBER,
  GET_PROJECTS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_PAGINATION,
  GET_PROJECT_DETAIL,
  GET_ROLES,
  GET_ROLES_BY_ID,
  OPEN_DOCUMENT_DRAWER,
  OPEN_GROUP_DRAWER,
  OPEN_ROLE_DRAWER,
  SET_PROJECT_OVERVIEW,
  SET_ROLE,
  SET_SELECTED_DATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_ROLE,
  SET_SELECTED_STATUS,
  SET_SELECTED_GROUP,
  GET_GROUP_BY_ID,
  SET_GROUP,
} from "../../config/project.config";
import { requestPending, requestSuccess } from "../../utills/status";
import {
  ProjectInterface,
  RoleInterface,
  ProjectOverviewInterface,
  projectOverviewTemplate,
  rolesTemplate,
  FolderInterface,
  MemberInterface,
  GroupInterface,
  FolderFileInterface,
  groupTemplate,
} from "constants/interfaces/project.interface";
import { GET_PROFILE } from "config/auth.config";

interface ProjectReducerInt {
  drawerOpen: boolean;
  menue: number;
  allProjects: any;
  projects: ProjectInterface[];
  projectMembers: [];
  selectedProject: any;
  selectedRole: any;
  selectedGroup: any;
  projectOverview: ProjectOverviewInterface;
  role: RoleInterface;
  filter: any;
  selectedStatus: string | null;
  selectedDate: string | null;
  roleDrawer: boolean;
  groupDrawer: boolean;
  documentDrawer: boolean;
  rolesList: RoleInterface[];
  groupList: GroupInterface[];
  group: GroupInterface;

  folderList: FolderInterface[];
  folderFiles: FolderFileInterface[];
  memberList: MemberInterface[];
  load: boolean;
}

const projectReducer: ProjectReducerInt = {
  drawerOpen: false,
  menue: 1,
  allProjects: [],
  projects: [],
  projectMembers: [],
  selectedProject: null,
  selectedRole: null,
  selectedGroup: null,
  projectOverview: projectOverviewTemplate,
  role: rolesTemplate,
  filter: [],
  selectedStatus: null,
  selectedDate: null,
  roleDrawer: false,
  groupDrawer: false,
  documentDrawer: false,
  rolesList: [],
  groupList: [],
  group: groupTemplate,
  folderList: [],
  memberList: [],
  folderFiles: [],
  load: false,
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
    case SET_SELECTED_ROLE: {
      return {
        ...state,
        selectedRole: action.payload,
      };
    }
    case SET_SELECTED_GROUP: {
      return {
        ...state,
        selectedGroup: action.payload,
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

    case OPEN_GROUP_DRAWER: {
      return {
        ...state,
        groupDrawer: true,
      };
    }
    case CLOSE_GROUP_DRAWER: {
      return {
        ...state,
        groupDrawer: false,
      };
    }

    case requestSuccess(GET_ROLES): {
      return {
        ...state,
        rolesList: action.payload,
        //  finallyAction: () => {
        //     setLoading(false);
        //   },
      };
    }

    case SET_ROLE: {
      return {
        ...state,
        role: action.payload,
      };
    }

    case SET_GROUP: {
      return {
        ...state,
        group: action.payload,
      };
    }

    case requestSuccess(GET_GROUP): {
      return {
        ...state,
        groupList: action.payload,
      };
    }

    case OPEN_DOCUMENT_DRAWER: {
      return {
        ...state,
        documentDrawer: true,
      };
    }

    case CLOSE_DOCUMENT_DRAWER: {
      return {
        ...state,
        documentDrawer: false,
      };
    }

    case requestSuccess(GET_FOLDER): {
      return {
        ...state,
        folderList: action.payload,
      };
    }

    case requestSuccess(GET_MEMBER): {
      return {
        ...state,
        memberList: action.payload,
      };
    }

    case requestSuccess(GET_FOLDER_FILES): {
      return {
        ...state,
        folderFiles: action.payload,
      };
    }

    case requestSuccess(GET_ROLES_BY_ID): {
      return {
        ...state,
        role: action.payload,
      };
    }

    case requestSuccess(GET_GROUP_BY_ID): {
      return {
        ...state,
        group: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AppReducer;
