import {
  CLOSE_DOCUMENT_DRAWER,
  CLOSE_FILE_VIEW_DRAWER,
  CLOSE_GROUP_DRAWER,
  CLOSE_MEMBER_DRAWER,
  CLOSE_ROLE_DRAWER,
  CLOSE_TIME_PROFILE_DRAWER,
  CLOSE_WORK_DRAWER,
  CREATE_NEW_PROFILE,
  DELETE_PROJECT,
  GET_FILTER_PROJECTS,
  GET_FOLDER_FILES,
  GET_GROUP,
  GET_GROUP_BY_ID,
  GET_MEMBER,
  GET_NEW_WORK,
  GET_PERMISSIONS,
  GET_PROJECTS_MEMBERS,
  GET_PROJECTS_WITH_MEMBERS,
  GET_PROJECT_DETAIL,
  GET_PROJECT_PROFILE,
  GET_STATUS,
  GET_TIME_PROFILE_BY_ID,
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
} from "config";
import { ActionInterface } from "./appReducer";

import projectReduxConfigs from "config/project.config";
import { Drawing, Floor, UserInterface } from "constants/interfaces";
import {
  ProjectGroupInterface,
  ProjectMemberInterface,
  ProjectRolesInterface,
  memberTemplate,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";
import {
  FolderInterfaceRoot,
  GroupInterface,
  ProjectInterface,
  RoleInterface,
  groupTemplate,
  projectOverviewTemplate,
  projectProfileInterface,
  rolesTemplate,
} from "constants/interfaces/project.interface";
import {
  requestFail,
  requestPending,
  requestSuccess,
} from "../../utills/status";

interface ProjectReducerInt {
  allProjects: Project[];
  allGroups: Group[];
  allFloors: Floor[];
  drawerOpen: boolean;
  menue: number;
  isFloorLoading: boolean;
  projects: Project[];
  projectMembers: [];
  projectWithMembers: any[];
  selectedProject: any;
  selectedFloor: any;
  selectedDrawing: any;
  loadDrawing: boolean;
  selectedRole: ProjectRolesInterface;
  selectedMember: ProjectMemberInterface;
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
  allProjectsTitles: any[];
  isOpenProjectDocumentModal: boolean;
  isfloorCreating: boolean;
  selectedDrawingFiles: Drawing[];
  projectFloors: Floor[];
  selectedGroupName: String;
  selectedProjectName: String;
}

const projectReducer: ProjectReducerInt = {
  allProjects: [],
  projectFloors: [],
  selectedDrawingFiles: [],
  selectedGroupName: '',
  selectedProjectName: '',
  allGroups: [],
  allFloors: [],
  isOpenProjectDocumentModal: false,
  isFloorLoading: false,
  isfloorCreating: false,
  getAllProjectRoles: [],
  drawerOpen: false,
  menue: 1,
  allProjectsTitles: [],
  projects: [],
  projectMembers: [],
  selectedProject: null,
  selectedFloor: null,
  selectedDrawing: null,
  loadDrawing: false,
  selectedRole: {
    _id: "",
    admin: false,
    createdAt: "",
    updatedAt: "",
    creator: "",
    isDefaultRole: false,
    memberPermission: { create: false, delete: false, edit: false },
    rolePermission: { create: false, delete: false, edit: false },
    members: [],
    name: "",
    project: "",
  },
  selectedMember: memberTemplate,
  filePath: null,
  fileType: null,
  selectedFolder: null,
  selectedGroup: {
    members: [],
    _id: "",
    name: "",
    project: "",
    createdAt: "",
    creator: "",
    isDefaultGroup: false,
    updatedAt: "",
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
  folderList: { folders: [], files: [] },
  memberList: [],
  getStatuses: [],
  getNewWorkList: [],
  userPermissions: null,
  folderFiles: { folders: [], files: [] },
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

    case PROJECT_CONFIG.GROUP_DRAWING_FILE_UPLOADED:
      const findGroupIndex = state.allGroups.findIndex((group: any) => String(group._id) === String(action.payload.groupId))

      if (findGroupIndex > -1) {
        const drawingIndex = state.allGroups[findGroupIndex].drawings.findIndex((drawing: any) => String(drawing._id) === String(action.payload.drawings[0]._id))
        if (drawingIndex === -1) {
          state.allGroups[findGroupIndex].drawings = [...action.payload.drawings, ...state.allGroups[findGroupIndex].drawings]
          state.selectedDrawingFiles = [...action.payload.drawings, ...state.selectedDrawingFiles]
        }
      }
      return {
        ...state,
      }
    case PROJECT_CONFIG.PROJECT_GROUP_REMOVED:
    case PROJECT_CONFIG.PROJECT_GROUP_DELETED:
      const groupId = action.payload.removedGroupId ? action.payload.removedGroupId : action.payload
      const deletedGroupIndex = state.allGroups.findIndex((group: any) => String(group._id) === String(groupId))
      if (deletedGroupIndex > -1) {
        state.allGroups.splice(deletedGroupIndex, 1)
      }
      return {
        ...state,
      }

    case PROJECT_CONFIG.PROJECT_GROUP_CREATED:
      const isExistingGroup = state.allGroups.findIndex((group: any) => String(group._id) === String(action.payload._id))
      if (isExistingGroup === - 1) {
        state.allGroups = [...state.allGroups, action.payload]
      }
      return {
        ...state,
      }

    case PROJECT_CONFIG.PROJECT_UPDATED:
      const projectIndex = state.allProjects.findIndex((project: any) => String(project._id) === String(action.payload._id))
      if (projectIndex > -1) {
        state.allProjects[projectIndex] = action.payload;
      }
      return {
        ...state,
      };

    case PROJECT_CONFIG.PROJECT_GROUP_UPDATED:
      const groupIndex = state.allGroups.findIndex((group: any) => String(group._id) === String(action.payload._id))
      if (groupIndex > -1) {
        state.allGroups[groupIndex] = action.payload;
      } else {
        state.allGroups = [...state.allGroups, action.payload]
        console.log("PROJECT_GROUP_UPDATED", action.payload)
      }
      return {
        ...state,
      };

    // case PROJECT_CONFIG.PROJECT_GROUP_REMOVED:
    //   const findDeletedGroupIndex = state.allGroups.findIndex((group: any) => String(group._id) === String(action.payload))
    //   if (groupIndex > -1) {
    //     state.allGroups[groupIndex] = action.payload;
    //     console.log(state.allGroups[groupIndex])
    //   }
    //   return {
    //     ...state,
    //   };

    case PROJECT_CONFIG.PROJECT_FLOOR_CREATED: {
      if (action.payload.length > 0) {
        action.payload.forEach((commingFloor: any) => {
          const matchingFloorIndex = state.projectFloors.findIndex((floor: any) => String(floor._id) === String(commingFloor._id));
          if (matchingFloorIndex === -1) {
            state.projectFloors.push(commingFloor);
          }
        });
      } else {
        const findFloorIndex = state.projectFloors.findIndex((floor: any) => String(floor._id) === String(action.payload._id))
        if (findFloorIndex === -1) {
          state.projectFloors = [...state.projectFloors, action.payload]
        }
      }

      return {
        ...state,
      }
    }

    case PROJECT_CONFIG.UPDATE_PROJECT_FLOORS: {
      return {
        ...state,
        projectFloors: [...state.projectFloors, action.payload],
      }
    }
    case PROJECT_CONFIG.SET_SELECTED_DRAWING_FILES: {
      return {
        ...state,
        selectedDrawingFiles: action.payload.drawings,
        selectedGroupName: action.payload.groupName,
        selectedProjectName: action.payload.projectTitle,
        projectFloors: action.payload.projectFloors
      };
    }

    case requestSuccess(DELETE_PROJECT): {
      return {
        ...state,
        selectedProject: null,
      };
    }

    case projectReduxConfigs.OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true,
      };

    case projectReduxConfigs.CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
        getAllProjectRoles: [],
        role: rolesTemplate,
        memberList: [],
        groupList: [],
        folderList: { folders: [], files: [] },
        projectOverview: projectOverviewTemplate,
      };

    case projectReduxConfigs.SET_MENUE:
      return {
        ...state,
        menue: action.payload,
      };

    // get all floors by projectId
    case requestPending(PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID): {
      return {
        ...state,
        isFloorLoading: true,
      };
    }
    case requestSuccess(PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID): {
      return {
        ...state,
        isFloorLoading: false,
        allFloors: action.payload.floors,
      };
    }

    case requestFail(PROJECT_CONFIG.GET_FLOORS_BY_PROJECT_ID): {
      return {
        ...state,
        isFloorLoading: false,
      };
    }
    case requestPending(PROJECT_CONFIG.GET_ALL_PROJECTS): {
      return {
        ...state,
      };
    }
    case requestSuccess(PROJECT_CONFIG.GET_ALL_PROJECTS): {
      let projects = action.payload.allProjects;
      let newProjects: any = [];

      if (state.allProjects.length === 0) {
        state.allProjects = projects;
      } else {
        projects.forEach((project: any) => {
          const isExistingProject = state.allProjects.findIndex(
            (prevProject: any) =>
              String(prevProject._id) === String(project._id)
          );
          if (isExistingProject > -1) {
            state.allProjects[isExistingProject] = project;
          } else {
            newProjects.push(project);
          }
        });
      }

      if (newProjects.length > 0) {
        state.allProjects = [...newProjects, ...state.allProjects];
      }

      return {
        ...state,
        allProjects: [...state.allProjects],
        allGroups: action.payload.allGroups,
        allFloors: action.payload.allFloors
      };
    }
    case requestFail(PROJECT_CONFIG.GET_ALL_PROJECTS): {
      return {
        ...state,
      };
    }

    case requestPending(PROJECT_CONFIG.CREATE_FLOOR): {
      return {
        ...state,
        isfloorCreating: true,
      };
    }
    case requestSuccess(PROJECT_CONFIG.CREATE_FLOOR): {
      return {
        ...state,
        isfloorCreating: false,
      };
    }
    case requestFail(PROJECT_CONFIG.CREATE_FLOOR): {
      return {
        ...state,
        isfloorCreating: false,
      };
    }

    case PROJECT_CONFIG.PROJECT_CREATED: {
      let project = action.payload;
      if (state.allProjects.length === 0) {
        state.allProjects.push(project);
      } else {
        const isExistingProject = state.allProjects.findIndex(
          (prevProject: any) => String(prevProject._id) === String(project._id)
        );
        if (isExistingProject > -1) {
          state.allProjects[isExistingProject] = project;
        } else {
          state.allProjects = [project, ...state.allProjects];
        }
      }

      return {
        ...state,
        allProjects: [...state.allProjects],
      };
    }

    case requestSuccess(GET_PROJECTS_WITH_MEMBERS): {
      const projectLabels = action.payload.projectDetails.map(
        (project: any) => {
          return {
            label: project.title,
            value: project._id,
          };
        }
      );
      state.projectWithMembers = action.payload.projectDetails;
      return {
        ...state,
        allProjectsTitles: [...projectLabels],
      };
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
        projectOverview: action.payload,
      };
    }

    case SET_SELECTED_PROJECT: {
      return {
        ...state,
        selectedProject: action.payload,
        menue: 1,
      };
    }
    case PROJECT_CONFIG.SET_SELECTED_FLOOR: {
      return {
        ...state,
        selectedFloor: action.payload,
      };
    }
    case PROJECT_CONFIG.SET_SELECTED_DRAWING: {
      return {
        ...state,
        selectedDrawing: action.payload,
      };
    }
    case PROJECT_CONFIG.SET_LOAD_DRAWING: {
      return {
        ...state,
        loadDrawing: action.payload,
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
        selectedRole: { ...action.payload },
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
      let project = action.payload.result;

      project.owner = action.payload.result.owner?.map(
        (user: UserInterface) => {
          return {
            label: user?.firstName + " " + user?.surName,
            value: user?._id,
          };
        }
      );
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
      state.selectedRole = {
        _id: "",
        admin: false,
        createdAt: "",
        updatedAt: "",
        creator: "",
        isDefaultRole: false,
        memberPermission: { create: false, delete: false, edit: false },
        rolePermission: { create: false, delete: false, edit: false },
        members: [],
        name: "",
        project: "",
      };
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
    case requestSuccess(PROJECT_CONFIG.GET_ALL_DOCUMENTS): {
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
      state.getAllProjectRoles = [];
      return {
        ...state,
        getAllProjectRoles: [...action.payload.result],
      };
    }

    case PROJECT_CONFIG.ROLE_CREATED: {
      let newRole = action.payload;

      if (String(state.projectOverview._id) !== String(newRole.project)) {
        return {
          ...state,
        };
      } else {
        if (state.getAllProjectRoles.length === 0) {
          state.getAllProjectRoles.push(newRole);
        } else {
          const isExistingProject = state.getAllProjectRoles.findIndex(
            (prevRole: any) => String(prevRole._id) === String(newRole._id)
          );
          if (isExistingProject > -1) {
            state.getAllProjectRoles[isExistingProject] = newRole;

            if (String(state.role._id) === String(newRole._id)) {
              state.role = newRole;
            }
          } else {
            state.getAllProjectRoles = [...state.getAllProjectRoles, newRole];
          }
        }

        return {
          ...state,
          getAllProjectRoles: [...state.getAllProjectRoles],
          role: { ...state.role },
        };
      }
    }

    case PROJECT_CONFIG.ROLE_UPDATED: {
      let updatedRole = action.payload;
      if (String(state.projectOverview._id) !== String(updatedRole.project)) {
        return {
          ...state,
        };
      } else {
        const isExistingRole = state.getAllProjectRoles.findIndex(
          (prevRole: any) => String(prevRole._id) === String(updatedRole._id)
        );
        if (isExistingRole > -1) {
          state.getAllProjectRoles[isExistingRole] = updatedRole;
        }

        if (String(state.role._id) === String(updatedRole._id)) {
          state.role = updatedRole;
        }

        return {
          ...state,
          getAllProjectRoles: [...state.getAllProjectRoles],
          role: { ...state.role },
        };
      }
    }


    case PROJECT_CONFIG.PROJECT_MEMBERS_ADDED: {
      let members = action.payload;
      let newMembers: any = [];
      if (state.memberList.length === 0) {
        state.memberList = members;
      } else {
        members.forEach((member: any) => {
          const isExistingMember = state.memberList.findIndex(
            (prevMember: any) => String(prevMember._id) === String(member._id)
          );
          if (isExistingMember > -1) {
            state.memberList[isExistingMember] = member;
          } else {
            newMembers.push(member);
          }
        });
      }

      if (newMembers.length > 0) {
        state.memberList = [...state.memberList, ...newMembers];
      }
      return {
        ...state,
        memberList: [...state.memberList],
      };
    }

    case PROJECT_CONFIG.PROJECT_MEMBERS_UPDATED: {
      let member = action.payload;
      const isExistingMember = state.memberList.findIndex(
        (prevMember: any) => String(prevMember._id) === String(member._id)
      );
      if (isExistingMember > -1) {
        state.memberList[isExistingMember] = member;
      }

      if (String(state.projectOverview._id) === String(member._id)) {
        state.projectOverview = member;
      }

      return {
        ...state,
        memberList: [...state.memberList],
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
