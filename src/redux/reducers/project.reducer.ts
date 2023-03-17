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
  GET_PROJECTS_WITH_MEMBERS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECT_DETAIL,
  PROJECT_CONFIG,
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
  GET_PROJECT_PROFILE,
  CLOSE_TIME_PROFILE_DRAWER,
  OPEN_TIME_PROFILE_DRAWER,
  SET_SELECTED_TIME_PROFILE,
  GET_TIME_PROFILE_BY_ID,
  GET_STATUS,
  SET_SEARCH_PROJECT,
  GET_NEW_WORK,
  SET_SELECTED_WORK,
  CLOSE_WORK_DRAWER,
  OPEN_WORK_DRAWER,
  GET_PERMISSIONS,
  SET_SELECTED_USER,
  CLOSE_MEMBER_DRAWER,
  OPEN_MEMBER_DRAWER,
  CREATE_NEW_PROFILE,
  OPEN_FILE_VIEW_DRAWER,
  CLOSE_FILE_VIEW_DRAWER,
  SELECTED_FILE_URL,
  SELECTED_FILE_TYPE,
  DELETE_PROJECT,
} from "../../config/project.config";
import {
  requestPending,
  requestSuccess,
} from "../../utills/status";
import {
  ProjectInterface,
  RoleInterface,
  projectOverviewTemplate,
  rolesTemplate,
  FolderInterface,
  GroupInterface,
  FolderFileInterface,
  groupTemplate,
  projectProfileInterface,
  FolderInterfaceRoot,
} from "constants/interfaces/project.interface";
import { UserInterface } from "constants/interfaces/user.interface";
import { ProjectGroupInterface, ProjectMemberInterface,memberTemplate, ProjectRolesInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";

interface ProjectReducerInt {
  drawerOpen: boolean;
  menue: number;
  allProjects: any;
  projects: ProjectInterface[];
  projectMembers: [];
  projectWithMembers: any[];
  selectedProject: any;
  selectedRole: ProjectRolesInterface;
  selectedMember:ProjectMemberInterface;
  filePath: any;
  fileType: any;
  selectedFolder: any;
  selectedGroup: ProjectGroupInterface;
  selectedTimeProfile: any;
  projectOverview: ProjectInterface;
  getAllProjectRoles: ProjectRolesInterface[];
  role: ProjectRolesInterface;
  filter: any;
  selectedStatus: string | null;
  selectedWork: string | null;
  selectedDate: string | null;
  searchProject: string | null;
  selectedUser: string | null;
  roleDrawer: boolean;
  groupDrawer: boolean;
  documentDrawer: boolean;
  memberDrawer: boolean;
  timeProfileDrawer: boolean;
  workDrawer: boolean;
  FileViewerDrawer: boolean;
  rolesList: RoleInterface[];
  groupList: ProjectGroupInterface[];
  group: GroupInterface;
  folderList: FolderInterfaceRoot;
  folderFiles: FolderInterfaceRoot;
  projectProfile: projectProfileInterface[];
  memberList: ProjectMemberInterface[];
  load: boolean;
  getTimeProfileById: any;
  getStatuses: any;
  getNewWorkList: any;
  userPermissions: any;
  allProjectsTitles: any[],
  isOpenProjectDocumentModal:boolean
}

const projectReducer: ProjectReducerInt = {
  isOpenProjectDocumentModal:false,
  getAllProjectRoles:[],
  drawerOpen: false,
  menue: 1,
  allProjects: [],
  allProjectsTitles: [],
  projects: [],
  projectMembers: [],
  selectedProject: null,
  selectedRole:{
    _id:'',
    admin:false,
    createdAt:"",
    updatedAt:'',
    creator:"",
    isDefaultRole:false,
    memberPermission:{create:false,delete:false,edit:false},
    rolePermission:{create:false,delete:false,edit:false},
    members:[],
    name:"",
    project:"",
  },
  selectedMember:memberTemplate,
  filePath: null,
  fileType: null,
  selectedFolder: null,
  selectedGroup: {
    members:[],
    _id:"",
    name:"",
    project:"",
    createdAt:"",
    creator:"",
    isDefaultGroup:false,
    updatedAt:"",
  },
  selectedTimeProfile: null,
  projectOverview: projectOverviewTemplate,
  role: rolesTemplate,
  filter: [],
  selectedStatus: null,
  selectedWork: null,
  selectedDate: null,
  selectedUser: null,
  searchProject: "",
  roleDrawer: false,
  groupDrawer: false,
  documentDrawer: false,
  memberDrawer: false,
  timeProfileDrawer: false,
  workDrawer: false,
  FileViewerDrawer: false,
  rolesList: [],
  groupList: [],
  group: groupTemplate,
  folderList: {folders:[],files:[]},
  memberList: [],
  getStatuses: [],
  getNewWorkList: [],
  userPermissions: null,
  folderFiles: {folders:[],files:[]},
  projectProfile: [],
  load: false,
  getTimeProfileById: [],
  projectWithMembers: [],
};

const NavigationReducer = (
  state = projectReducer,
  action: ActionInterface
): ProjectReducerInt => {
  switch (action.type) {
    case requestSuccess(DELETE_PROJECT): {
      return {
        ...state,
        selectedProject: null,
      };
    }

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

    case requestPending(GET_PROJECTS): {
      return {
        ...state,
        allProjects: [],
      };
    }
    case requestSuccess(GET_PROJECTS): {
      let projects = action.payload.results
      return {
        ...state,
        allProjects: [...projects]
      };
    }

    case requestSuccess(GET_PROJECTS_WITH_MEMBERS): {
      const projectLabels = action.payload.projectDetails.map((project: any) => {
        return {
          label: project.title,
          value: project._id,
        }
      });
      state.projectWithMembers = action.payload.projectDetails;
      return {
        ...state,
        allProjectsTitles: [...projectLabels]
      }

    }

    case requestSuccess(GET_PROJECTS_MEMBERS): {
      return {
        ...state,
        projectMembers: action.payload,
      };
    }
    case SET_PROJECT_OVERVIEW: {
      return {
        ...state,
        projectOverview: { ...action.payload }
      };
    }

    case SET_SELECTED_PROJECT: {
      return {
        ...state,
        selectedProject: action.payload,
        menue: 1,
      };
    }
    case SELECTED_FILE_URL: {
      return {
        ...state,
        filePath: action.payload,
      };
    }
    case SELECTED_FILE_TYPE: {
      return {
        ...state,
        fileType: action.payload,
      };
    }

    case SET_SELECTED_ROLE: {
      return {
        ...state,
        selectedRole: action.payload,
      };
    }

    case PROJECT_CONFIG.SET_SELECTED_MEMBER: {
      return {
        ...state,
        selectedMember: action.payload,
      };
    }

    case SET_SELECTED_GROUP: {
      return {
        ...state,
        selectedGroup: action.payload,
      };
    }
    case SET_SELECTED_TIME_PROFILE: {
      return {
        ...state,
        selectedTimeProfile: action.payload,
      };
    }
    case requestSuccess(CREATE_NEW_PROFILE): {
      return {
        ...state,
        selectedTimeProfile: action.payload?.data?._id,
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

    case SET_SELECTED_WORK: {
      return {
        ...state,
        selectedWork: action.payload,
      };
    }
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload,
      };
    }

    case SET_SEARCH_PROJECT: {
      return {
        ...state,
        searchProject: action.payload,
      };
    }

    case SET_SELECTED_USER: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }

    case requestSuccess(GET_PROJECT_DETAIL): {
      let project = action.payload.result

      project.owner = action.payload.result.owner?.map((user: UserInterface) => {
        return {
          label: user?.firstName + " " + user?.surName,
          value: user?._id,
        };
      })
      return {
        ...state,
        projectOverview: project,
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

    case CLOSE_TIME_PROFILE_DRAWER: {
      return {
        ...state,
        timeProfileDrawer: false,
      };
    }

    case OPEN_TIME_PROFILE_DRAWER: {
      return {
        ...state,
        timeProfileDrawer: true,
      };
    }

    case CLOSE_WORK_DRAWER: {
      return {
        ...state,
        workDrawer: false,
      };
    }
    case OPEN_WORK_DRAWER: {
      return {
        ...state,
        workDrawer: true,
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
        groupList: action.payload.result,
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

    case OPEN_MEMBER_DRAWER: {
      return {
        ...state,
        memberDrawer: true,
      };
    }
    case PROJECT_CONFIG.OPEN_PROJECT_DOCUMENT_MODAL: {
      return {
        ...state,
        isOpenProjectDocumentModal: true,
      };
    }
    case PROJECT_CONFIG.CLOSE_PROJECT_DOCUMENT_MODAL: {
      return {
        ...state,
        isOpenProjectDocumentModal: false,
      };
    }

    case CLOSE_MEMBER_DRAWER: {
      return {
        ...state,
        memberDrawer: false,
      };
    }
    case OPEN_FILE_VIEW_DRAWER: {
      return {
        ...state,
        FileViewerDrawer: true,
      };
    }
    case CLOSE_FILE_VIEW_DRAWER: {
      return {
        ...state,
        FileViewerDrawer: false,
      };
    }
    case requestSuccess(GET_FOLDER): {
      return {
        ...state,
        folderList: action.payload.result,
      };
    }

    case requestSuccess(GET_MEMBER): {
      return {
        ...state,
        memberList: action.payload.results,
      };
    }

    case requestSuccess(GET_FOLDER_FILES): {
      return {
        ...state,
        folderFiles: action.payload.result,
      };
    }

    case requestSuccess(PROJECT_CONFIG.GET_PROJECT_ROLES_BY_ID): {
      return {
        ...state,
        role: action.payload.result,
        getAllProjectRoles: action.payload.result,
      };
    }

    case requestSuccess(GET_GROUP_BY_ID): {
      return {
        ...state,
        group: action.payload,
      };
    }
    case requestSuccess(GET_PROJECT_PROFILE): {
      return {
        ...state,
        projectProfile: action.payload,
      };
    }
    case requestSuccess(GET_TIME_PROFILE_BY_ID): {
      return {
        ...state,
        getTimeProfileById: action.payload,
      };
    }
    case requestSuccess(GET_STATUS): {
      return {
        ...state,
        getStatuses: action.payload,
      };
    }
    case requestSuccess(GET_NEW_WORK): {
      return {
        ...state,
        getNewWorkList: action.payload,
      };
    }
    // GET_NEW_WORK;
    case requestSuccess(GET_PERMISSIONS): {
      return {
        ...state,
        userPermissions: action.payload,
      };
    }

    default:
      return state;
  }
};

export default NavigationReducer;
