import { VscHome } from "react-icons/vsc";
import { BsChatSquareDots } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiOutlineFolder } from "react-icons/ai";
import assets from "assets/assets";

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
    icon: assets.sidebarDashboardIcon,
    path: "dashboard",
    notification: 0,
    active: true,
  },
  Chat: {
    title: "Chat",
    icon: assets.sidebarChatIcon,
    path: "chat",
    notification: 0,
  },
  Tasks: {
    title: "Tasks",
    icon: assets.sidebarPaseIcon,
    path: "tasks",
    notification: 0,
  },
  Projects: {
    title: "Projects",
    icon: assets.sidebarFolderIcon,
    path: "projects",
    notification: 0,
  },
};

export default SidebarConfig;
