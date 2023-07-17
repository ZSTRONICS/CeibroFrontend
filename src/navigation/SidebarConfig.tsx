import { AssignmentSharp } from "@mui/icons-material";
import assets from "assets/assets";
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

const {
  TaskIcon,
  LocationIcon,
  ProjectIcon,
  NewTaskIcon,
  FromMEIcon,
  ToMeIcon,
  CanceledIcon,
} = assets;
const SidebarConfig: SidebarConfigInterface = {
  Tasks: {
    key: "task",
    title: "Task",
    icon: TaskIcon,
    getPath: () => "tasks",
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
  Projects: {
    key: "project",
    title: "Projects",
    icon: ProjectIcon,
    getPath: () => "projects",
    active: false,
    childTab: {},
    notification: 0,
  },
  Locations: {
    key: "location",
    title: "Location",
    icon: LocationIcon,
    getPath: () => `drawingDetail`,
    active: false,
    childTab: {},
  },
};

export default SidebarConfig;
