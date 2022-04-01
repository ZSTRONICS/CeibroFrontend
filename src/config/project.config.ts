import colors from "../assets/colors";

interface ColorCodes {
  [key: string]: string;
}

const colorsByStatus: ColorCodes = {
  all: colors.white,
  ongoing: colors.darkYellow,
  approved: colors.primary,
  completed: colors.mediumGrey,
  draft: colors.lightBlack,
  submitted: colors.aquaGreen,
  rejected: colors.btnRed,
  done: colors.mediumGrey,
};

const textColorsByStatus: ColorCodes = {
  all: colors.black,
  ongoing: colors.white,
  approved: colors.white,
  completed: colors.white,
  draft: colors.white,
  submitted: colors.white,
  rejected: colors.white,
  done: colors.white,
};

export function getColorByStatus(status: string): string {
  return colorsByStatus[status.toLowerCase()];
}

export function getTextColorByStatus(status: string): string {
  return textColorsByStatus[status.toLowerCase()];
}

interface ProjectMenues {
  title: string;
  count: number;
}

export function getAllStatus(): ProjectMenues[] {
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
export function getProjectStatus(): ProjectMenues[] {
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

const projectReduxConfigs = {
  OPEN_DRAWER: "OPEN_DRAWER",
  CLOSE_DRAWER: "CLOSE_DRAWER",
  SET_MENUE: "SET_MENUE",
};
export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECTS_WITH_PAGINATION = "GET_PROJECTS_WITH_PAGINATION";
export const GET_PROJECTS_MEMBERS = "GET_PROJECT_MEMBERS";
export const CREATE_PROJECT = "CREATE_PROJECT";
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

export const GET_ROLES = "GET_ROLES";
export const GET_ROLES_BY_ID = "GET_ROLES_BY_ID";

export const CREATE_ROLES = "CREATE_ROLES";
export const CREATE_GROUP = "CREATE_GROUP";
export const GET_GROUP = "GET_GROUP";
export const GET_GROUP_BY_ID = "GET_GROUP_BY_ID";
export const UPDATE_GROUP = "UPDATE_GROUP";

export const GET_FOLDER = "GET_FOLDER";
export const GET_FOLDER_FILES = "GET_FOLDER_FILES";
export const UPLOAD_FILE_TO_FOLDER = "UPLOAD_FILE_TO_FOLDER";
export const CREATE_FOLDER = "CREATE_FOLDER";
export const CREATE_MEMBER = "CREATE_MEMBER";
export const GET_MEMBER = "GET_MEMBER";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const SET_SELECTED_GROUP = "SET_SELECTED_GROUP";
export const SET_GROUP = "SET_GROUP";

export default projectReduxConfigs;
