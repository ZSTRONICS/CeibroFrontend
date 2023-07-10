import { AssignmentSharp } from "@mui/icons-material";
import assets from "assets/assets";

export interface SingleConfig {
  title: string;
  icon: any;
  notification?: number;
  childTab: { [key: string]: SingleConfig };
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
    title: "Tasks",
    icon: TaskIcon,
    getPath: () => "tasks",
    active: false,
    childTab: {
      newTask: {
        title: "New Tasks",
        icon: NewTaskIcon,
        getPath: () => "tasks",
        active: false,
        childTab: {},
        notification: 0,
      },
      fromMe: {
        title: "From me",
        icon: FromMEIcon,
        getPath: () => "tasks",
        active: false,
        childTab: {},
        notification: 0,
      },
      toMe: {
        title: "To me",
        icon: ToMeIcon,
        getPath: () => "tasks",
        active: false,
        childTab: {},
        notification: 0,
      },
      Canceled: {
        title: "Canceled",
        icon: CanceledIcon,
        getPath: () => "tasks",
        active: false,
        childTab: {},
        notification: 0,
      },
    },
    notification: 0,
  },
  Projects: {
    title: "Projects",
    icon: ProjectIcon,
    getPath: () => "projects",
    active: false,
    childTab: {},
    notification: 0,
  },
  Locations: {
    title: "Locations",
    icon: LocationIcon,
    getPath: () => `drawingDetail`,
    active: false,
    childTab: {},
  },
};

export default SidebarConfig;
