import {
  CanceledIcon,
  FromMEIcon,
  LocationIcon,
  NewTaskIcon,
  ProjectIcon,
  TaskIcon,
  ToMeIcon,
} from "components/material-ui/icons";
import { selectedTaskFilterType } from "redux/type";

export interface SingleConfig {
  key: selectedTaskFilterType;
  title: string;
  icon: any;
  notification?: number;
  childTab: SidebarConfigInterface;
  active?: boolean | undefined;
  getPath: (id: string) => string;
}

export interface SidebarConfigInterface {
  [key: string]: SingleConfig;
}

const SidebarConfig: SidebarConfigInterface = {
  tasks: {
    key: "tasks",
    title: "Task",
    icon: TaskIcon,
    getPath: () =>
      window.location.pathname.split("/").pop() === "tasks"
        ? "tasks/allTaskFromMe"
        : window.location.pathname.includes("tasks")
        ? window.location.pathname
        : "tasks/allTaskFromMe",
    active: false,
    childTab: {
      newTask: {
        key: "newTask",
        title: "New Tasks",
        icon: NewTaskIcon,
        getPath: () => "tasks",
        active: false,
        childTab: {},
        notification: 0,
      },
      allTaskFromMe: {
        key: "allTaskFromMe",
        title: "From me",
        icon: FromMEIcon,
        getPath: () => "tasks/fromMe",
        active: false,
        childTab: {},
        notification: 0,
      },
      allTaskToMe: {
        key: "allTaskToMe",
        title: "To me",
        icon: ToMeIcon,
        getPath: () => "tasks/toMe",
        active: false,
        childTab: {},
        notification: 0,
      },
      allTaskHidden: {
        key: "allTaskHidden",
        title: "Hidden",
        icon: CanceledIcon,
        getPath: () => "tasks/hiddenTask",
        active: false,
        childTab: {},
        notification: 0,
      },
    },
    notification: 0,
  },
  projects: {
    key: "projects",
    title: "Projects",
    icon: ProjectIcon,
    getPath: () => "projects",
    active: false,
    childTab: {
      // newProject: {
      //   key: "newProject",
      //   title: "New Project",
      //   icon: NewTaskIcon,
      //   getPath: () => "newProject",
      //   active: false,
      //   childTab: {},
      //   notification: 0,
      // },
    },
    notification: 0,
  },
  locations: {
    key: "locations",
    title: "Location",
    icon: LocationIcon,
    getPath: () => "drawingDetail",
    active: false,
    childTab: {},
  },
};

export default SidebarConfig;
