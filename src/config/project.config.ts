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
      title: "Approvedww",
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
export const GET_AVAILABLE_PROJECT_USERS = "GET_AVAILABLE_PROJECT_USERS";
export const SET_SELECTED_PROJECT = "SET_SELECTED_PROJECT";
export const GET_FILTER_PROJECTS = "GET_FILTER_PROJECTS";


export default projectReduxConfigs;
