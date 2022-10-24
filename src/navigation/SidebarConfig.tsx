import assets from "assets/assets";
import {HomeWorkOutlined,ChatOutlined, AssignmentIndOutlined,
  FolderOutlined} from '@material-ui/icons'
export interface SingleConfig {
  title: string;
  icon: any;
  path: string;
  notification: number;
  active?: boolean | undefined;
}

export interface SidebarConfigInterface {
  [key: string]: SingleConfig;
}

const SidebarConfig: SidebarConfigInterface = {
  Dashboard: {
    title: "Dashboard",
    icon: <HomeWorkOutlined className="sideBar_icon"/>,
    path: "dashboard",
    notification: 0,
    active: true,
  },
  Chat: {
    title: "Chat",
    icon: <ChatOutlined className="sideBar_icon"/>,
    path: "chat",
    notification: 0,
  },
  Tasks: {
    title: "Tasks",
    icon: <AssignmentIndOutlined className="sideBar_icon"/>,
    path: "tasks",
    notification: 0,
  },
  Projects: {
    title: "Projects",
    icon: <FolderOutlined className="sideBar_icon"/>,
    path: "projects",
    notification: 0,
  },
};

export default SidebarConfig;
