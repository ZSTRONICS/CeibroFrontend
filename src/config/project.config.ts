import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import colors from "../assets/colors";

interface ColorCodes {
  [key: string]: string;
}

export const colorsByStatus: ColorCodes = {
  all: colors.black,
  new: colors.new,
  ongoing: colors.ongoing,
  active: colors.darkYellow,
  approved: colors.primary,
  accepted: colors.accepted,
  draft: colors.draft,
  submitted: colors.aquaGreen,
  rejected: colors.rejected,
  done: colors.done,
  assigned: colors.assigned,
};

const textColorsByStatus: ColorCodes = {
  all: colors.black,
  ongoing: colors.ongoing,
  approved: colors.primary,
  draft: colors.draft,
  submitted: colors.white,
  rejected: colors.rejected,
  done: colors.done,
  new: colors.new,
  active: colors.darkYellow,
};

export function getColorByStatus(status: string): string {
  if (status) return colorsByStatus[status.toLowerCase()];
  else return colorsByStatus.draft;
}

export function getTextColorByStatus(status: string): string {
  return textColorsByStatus[status.toLowerCase()];
}

export function getStatusDropdown(): dataInterface[] {
  const data = Object.entries(colorsByStatus).map((status: any) => ({
    label: status[0],
    value: status[0],
    color: status[1],
  }));
  data?.splice(0, 1);
  return data;
}

interface StatusMenues {
  title: string;
  count: number;
}

export function getAllStatus(): StatusMenues[] {
  return [
    {
      title: "All",
      count: 3,
    },
    {
      title: "Ongoing",
      count: 1,
    },
    {
      title: "Submitted",
      count: 3,
    },
    {
      title: "Rejected",
      count: 5,
    },
    {
      title: "Approved",
      count: 2,
    },
    {
      title: "Done",
      count: 1,
    },
    {
      title: "Draft",
      count: 1,
    },
  ];
}

export function getProjectStatus(): StatusMenues[] {
  return [
    {
      title: "All",
      count: 3,
    },
    {
      title: "Ongoing",
      count: 1,
    },
    {
      title: "Approved",
      count: 4,
    },
    {
      title: "Done",
      count: 1,
    },
    {
      title: "Draft",
      count: 1,
    },
  ];
}

export const avaialablePermissions = {
  create_permission: "create",
  edit_permission: "edit",
  delete_permission: "delete",
  self_made_permission: "self-made",
};

const projectReduxConfigs = {
  OPEN_DRAWER: "OPEN_DRAWER",
  CLOSE_DRAWER: "CLOSE_DRAWER",
  SET_MENUE: "SET_MENUE",
};

export const PROJECT_CONFIG = {
  // project
  GET_ALL_PROJECTS: "GET_ALL_PROJECTS",
  CREATE_NEW_PROJECT: "CREATE_NEW_PROJECT",
  PROJECT_FAV_UNFAV: "PROJECT_FAV_UNFAV",
  PROJECT_HIDE_UNHIDE: "PROJECT_HIDE_UNHIDE",
  // groups
  CREATE_GROUP: "CREATE_GROUP",
  PROJECT_GROUP_REMOVED: "PROJECT_GROUP_REMOVED",
  GET_GROUPS_BY_PROJECT_ID: "GET_GROUPS_BY_PROJECT_ID",
  DELETE_GROUP_BY_ID: "DELETE__GROUP_BY_ID",
  UPDATE_GROUP_BY_ID: "UPDATE_GROUP_BY_ID",
  PUBLISH_GROUP: "PUBLISH_GROUP",
  SHARE_GROUP: "SHARE_GROUP",
  GROUP_HIDE_UNHIDE: "GROUP_HIDE_UNHIDE",
  GROUP_FAV_UNFAV: "GROUP_FAV_UNFAV",
  MARK_GROUP_PUBLIC_OR_PRIVATE: "MARK_GROUP_PUBLIC_OR_PRIVATE",
  PROJECT_GROUP_DELETED: "PROJECT_GROUP_DELETED",

  //  floors
  CREATE_FLOOR: "CREATE_FLOOR",
  GET_FLOORS_BY_PROJECT_ID: "GET_FLOORS_BY_PROJECT_ID",
  UPDATE_PROJECT_FLOORS: "UPDATE_PROJECT_FLOORS",
  PROJECT_FLOOR_CREATED: "PROJECT_FLOOR_CREATED",

  // drawings
  UPLOAD_IMAGE_ON_DRAWING: "UPLOAD_IMAGE_ON_DRAWING",
  GET_ALL_DRAWING_IMAGES_BY_ID: "GET_ALL_DRAWING_IMAGES_BY_ID",
  ADD_DRAWING_PIN_BY_DRAWING_ID: "ADD_DRAWING_PIN_BY_DRAWING_ID",
  GET_DRAWING_PINS_BY_DRAWING_ID: "GET_DRAWING_PINS_BY_DRAWING_ID",
  ADD_NEW_DRAWING: "ADD_NEW_DRAWING",
  GET_DRAWINGS_BY_PROJECT_ID: "GET_DRAWINGS_BY_PROJECT_ID",
  GET_RECENT_DRAWINGS: "GET_RECENT_DRAWINGS",
  DELETE_DRAWING: "DELETE_DRAWING",
  HIDE_DRAWING: "HIDE_DRAWING",
  UNHIDE_DRAWING: "UNHIDE_DRAWING",
  SET_SELECTED_DRAWING_FILES: "SET_SELECTED_DRAWING_FILES",

  GET_PROJECT_ROLES_BY_ID: "GET_PROJECT_ROLES_BY_ID",
  SET_SELECTED_MEMBER: "SET_SELECTED_MEMBER",
  OPEN_PROJECT_DOCUMENT_MODAL: "OPEN_PROJECT_DOCUMENT_MODAL",
  CLOSE_PROJECT_DOCUMENT_MODAL: "CLOSE_PROJECT_DOCUMENT_MODAL",
  UPDATE_PROJECT_DOCUMENT_ACCESS: "UPDATE_PROJECT_DOCUMENT_ACCESS",
  GET_ALL_DOCUMENTS: "GET_ALL_DOCUMENTS",
  PUSH_ALL_DRAWING_TASKS: "PUSH_ALL_DRAWING_TASKS",

  SET_SELECTED_FLOOR: "SET_SELECTED_FLOOR",
  SET_SELECTED_DRAWING: "SET_SELECTED_DRAWING",
  SET_LOAD_DRAWING: "SET_LOAD_DRAWING",
  // socket events
  DRAWING_FILE_UPDATED: "DRAWING_FILE_UPDATED",
  PROJECT_CREATED: "PROJECT_CREATED",
  PROJECT_UPDATED: "PROJECT_UPDATED",
  REFRESH_PROJECTS: "REFRESH_PROJECTS",

  GROUP_DRAWING_FILE_UPLOADED: "GROUP_DRAWING_FILE_UPLOADED",
  IMAGE_UPLOADED_ON_DRAWING: "IMAGE_UPLOADED_ON_DRAWING",
  ROLE_CREATED: "ROLE_CREATED",
  ROLE_UPDATED: "ROLE_UPDATED",
  REFRESH_ROLES: "REFRESH_ROLES",

  PROJECT_GROUP_CREATED: "PROJECT_GROUP_CREATED",
  PROJECT_GROUP_UPDATED: "PROJECT_GROUP_UPDATED",
  REFRESH_PROJECT_GROUP: "REFRESH_PROJECT_GROUP",

  PROJECT_MEMBERS_ADDED: "PROJECT_MEMBERS_ADDED",
  PROJECT_MEMBERS_UPDATED: "PROJECT_MEMBERS_UPDATED",
  REFRESH_PROJECT_MEMBERS: "REFRESH_PROJECT_MEMBERS",

  REFRESH_ROOT_DOCUMENTS: "REFRESH_ROOT_DOCUMENTS",
  REFRESH_FOLDER: "REFRESH_FOLDER",
};

export const Set_EXPORT_LIST = "Set_EXPORT_LIST"
export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECTS_WITH_MEMBERS = "GET_PROJECTS_WITH_MEMBERS";
export const GET_PROJECTS_WITH_PAGINATION = "GET_PROJECTS_WITH_PAGINATION";
export const GET_PROJECTS_MEMBERS = "GET_PROJECT_MEMBERS";
export const SET_PROJECT_OVERVIEW = "SET_PROJECT_OVERVIEW";
export const SET_ROLE = "SET_ROLE";
export const GET_AVAILABLE_PROJECT_USERS = "GET_AVAILABLE_PROJECT_USERS";
export const SET_SELECTED_PROJECT = "SET_SELECTED_PROJECT";
export const SET_SELECTED_ROLE = "SET_SELECTED_ROLE";

export const GET_PROJECT_DETAIL = "GET_PROJECT_DETAIL";
export const GET_FILTER_PROJECTS = "GET_FILTER_PROJECTS";
export const SET_SELECTED_STATUS = "SET_SELECTED_STATUS";
export const SET_SELECTED_DATE = "SET_SELECTED_DATE";
export const OPEN_ROLE_DRAWER = "OPEN_ROLE_DRAWER";
export const OPEN_GROUP_DRAWER = "OPEN_GROUP_DRAWER";
export const CLOSE_GROUP_DRAWER = "CLOSE_GROUP_DRAWER";
export const CLOSE_ROLE_DRAWER = "CLOSE_ROLE_DRAWER";

export const OPEN_DOCUMENT_DRAWER = "OPEN_DOCUMENT_DRAWER";
export const CLOSE_DOCUMENT_DRAWER = "CLOSE_DOCUMENT_DRAWER";
export const CREATE_ROLES = "CREATE_ROLES";
export const GET_GROUP = "GET_GROUP";
export const GET_GROUP_BY_ID = "GET_GROUP_BY_ID";
export const UPDATE_GROUP = "UPDATE_GROUP";

export const GET_FOLDER_FILES = "GET_FOLDER_FILES";
export const UPLOAD_FILE_TO_FOLDER = "UPLOAD_FILE_TO_FOLDER";
export const CREATE_FOLDER = "CREATE_FOLDER";
export const CREATE_MEMBER = "CREATE_MEMBER";
export const GET_MEMBER = "GET_MEMBER";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const DELETE_MEMBER = "DELETE_MEMBER";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const SET_SELECTED_GROUP = "SET_SELECTED_GROUP";
export const SET_GROUP = "SET_GROUP";

export const CREATE_NEW_PROFILE = "CREATE_NEW_PROFILE";
export const GET_PROJECT_PROFILE = "GET_PROJECT_PROFILE";

export const OPEN_TIME_PROFILE_DRAWER = "OPEN_TIME_PROFILE_DRAWER";
export const CLOSE_TIME_PROFILE_DRAWER = "CLOSE_TIME_PROFILE_DRAWER";
export const SET_SELECTED_TIME_PROFILE = "SET_SELECTED_TIME_PROFILE";
export const GET_TIME_PROFILE_BY_ID = "GET_TIME_PROFILE_BY_ID";
export const UPDATE_TIME_PROFILE = "UPDATE_TIME_PROFILE";
export const SET_FIND_DOC = "SET_FIND_DOC";
export const GET_FILE = "GET_FILE";
export const GET_STATUS = "GET_STATUS";
export const SET_SEARCH_PROJECT = "SET_SEARCH_PROJECT";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const GET_NEW_WORK = "GET_NEW_WORK";
export const GET_AVAILABLE_PROJECT_MEMBERS = "GET_AVAILABLE_PROJECT_MEMBERS";

export const CREATE_PROFILE_WORK = "CREATE_PROFILE_WORK";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const SET_SELECTED_WORK = "SET_SELECTED_WORK";
export const OPEN_WORK_DRAWER = "OPEN_WORK_DRAWER";
export const CLOSE_WORK_DRAWER = "CLOSE_WORK_DRAWER";
export const GET_WORK_BY_ID = "GET_WORK_BY_ID";
export const UPDATE_WORK = "UPDATE_WORK";
export const DELETE_WORK = "DELETE_WORK";
export const GET_PERMISSIONS = "GET_PERMISSIONS";
export const UPDATE_PROJECT_PICTURE = "UPDATE_PROJECT_PICTURE";
export const DELETE_ROLE = "DELETE_ROLE";
export const OPEN_MEMBER_DRAWER = "OPEN_MEMBER_DRAWER";
export const CLOSE_MEMBER_DRAWER = "CLOSE_MEMBER_DRAWER";
export const OPEN_FILE_VIEW_DRAWER = "OPEN_FILE_VIEW_DRAWER";
export const CLOSE_FILE_VIEW_DRAWER = "CLOSE_FILE_VIEW_DRAWER";
export const SELECTED_FILE_URL = "SELECTED_FILE_URL";
export const SELECTED_FILE_TYPE = "SELECTED_FILE_TYPE";
export const ADD_REMOVE_FOLDER_USER = "ADD_REMOVE_FOLDER_USER";

export const GET_GROUP_MEMBERS = "GET_GROUP_MEMBERS";
export const GET_GROUP_USERS = "GET_GROUP_USERS";

export default projectReduxConfigs;
