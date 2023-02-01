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
    // icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    // <path d="M7 1L7.48014 0.423834C7.202 0.192055 6.798 0.192055 6.51986 0.423834L7 1ZM1 6L0.519862 5.42383L0.25 5.64872V6H1ZM13 6H13.75V5.64872L13.4801 5.42383L13 6ZM13.4801 5.42383L7.48014 0.423834L6.51986 1.57617L12.5199 6.57617L13.4801 5.42383ZM6.51986 0.423834L0.519862 5.42383L1.48014 6.57617L7.48014 1.57617L6.51986 0.423834ZM13.75 12V6H12.25V12H13.75ZM0.25 6V12H1.75V6H0.25ZM2 13.75H12V12.25H2V13.75ZM12.25 12C12.25 12.1381 12.1381 12.25 12 12.25V13.75C12.9665 13.75 13.75 12.9665 13.75 12H12.25ZM0.25 12C0.25 12.9665 1.0335 13.75 2 13.75V12.25C1.86193 12.25 1.75 12.1381 1.75 12H0.25Z" fill="white"/>
    // </svg>,
    path: "dashboard",
    notification: 0,
    active: true,
  },
  Chat: {
    title: "Chat",
    icon: <ChatOutlined className="sideBar_icon"/>,
    // icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
    // <path d="M3.57143 10.9263H4.32143V10.1763H3.57143V10.9263ZM3.57143 13.4961H2.82143C2.82143 13.7801 2.98188 14.0398 3.23591 14.1668C3.48994 14.2939 3.79396 14.2666 4.02124 14.0962L3.57143 13.4961ZM7 10.9263V10.1763H6.75013L6.55019 10.3262L7 10.9263ZM4.42857 4.18023H3.67857V5.68023H4.42857V4.18023ZM9.57143 5.68023H10.3214V4.18023H9.57143V5.68023ZM4.42857 6.74998H3.67857V8.24998H4.42857V6.74998ZM7.85714 8.24998H8.60714V6.74998H7.85714V8.24998ZM2.82143 10.9263V13.4961H4.32143V10.9263H2.82143ZM4.02124 14.0962L7.44981 11.5264L6.55019 10.3262L3.12162 12.8959L4.02124 14.0962ZM7 11.6763H12.1429V10.1763H7V11.6763ZM12.1429 11.6763C13.0306 11.6763 13.75 10.9581 13.75 10.0697H12.25C12.25 10.1287 12.2031 10.1763 12.1429 10.1763V11.6763ZM13.75 10.0697V2.36047H12.25V10.0697H13.75ZM13.75 2.36047C13.75 1.47209 13.0306 0.753906 12.1429 0.753906V2.25391C12.2031 2.25391 12.25 2.30148 12.25 2.36047H13.75ZM12.1429 0.753906H1.85714V2.25391H12.1429V0.753906ZM1.85714 0.753906C0.96941 0.753906 0.25 1.47209 0.25 2.36047H1.75C1.75 2.30148 1.79688 2.25391 1.85714 2.25391V0.753906ZM0.25 2.36047V10.0697H1.75V2.36047H0.25ZM0.25 10.0697C0.25 10.9581 0.969409 11.6763 1.85714 11.6763V10.1763C1.79688 10.1763 1.75 10.1287 1.75 10.0697H0.25ZM1.85714 11.6763H3.57143V10.1763H1.85714V11.6763ZM4.42857 5.68023H9.57143V4.18023H4.42857V5.68023ZM4.42857 8.24998H7.85714V6.74998H4.42857V8.24998Z" fill="white"/>
    // </svg>,
    path: "chat",
    notification: 0,
  },
  Tasks: {
    title: "Tasks",
    icon: <AssignmentIndOutlined className="sideBar_icon"/>,
    // icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
    // <path d="M10.5 2H13V14C13 14.5523 12.5523 15 12 15H2C1.44772 15 1 14.5523 1 14V2H3.5M4 1H10V3C10 3.55228 9.55228 4 9 4H5C4.44772 4 4 3.55228 4 3V1Z" stroke="white" strokeWidth="1.5"/>
    // </svg>,
    path: "tasks",
    notification: 0,
  },
  Projects: {
    title: "Projects",
    icon: <FolderOutlined className="sideBar_icon"/>,
    // icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    // <path d="M1 12.1465V2.14648C1 1.5942 1.44772 1.14648 2 1.14648H4L6 3.14648H12C12.5523 3.14648 13 3.5942 13 4.14648V12.1465C13 12.6988 12.5523 13.1465 12 13.1465H2C1.44772 13.1465 1 12.6988 1 12.1465Z" stroke="white" strokeWidth="1.5"/>
    // </svg>,
    path: "projects",
    notification: 0,
  },
};

export default SidebarConfig;
