import { lazy } from "react";
// Auth
import ResetPassword from "./Auth/ResetPassword/ResetPassword";
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import RegisterNumberForm from "./Auth/Register/RegisterNumberForm";
import RegisterConfirmationForm from "./Auth/Register/RegisterConfirmationForm";
import TermsAndConditions from "./Auth/Register/TermsAndConditions";
import RegisterAddProfilePic from "./Auth/Register/RegisterAddProfilePic";
// import ForgetPassword from "components/Auth/Login/ForgetPassword";

// dashboard
// import Dashboard from "./Dashboard/Dashboard";
// import Profile from "./Profile/Profile";
// import Connections from "./Connection/Connection";
import ViewInvitations from "./Profile/ViewInvitations";

// chat
import Chat from "./Chat/Chat";
import CreateQuestioniarDrawer from "./Chat/Questioniar/CreateQuestioniar";
import ViewQuestioniarDrawer from "./Chat/Questioniar/ViewQuestioniar";

// task
// import Tasks from "./Tasks/TaskList/Task";
import CreateTaskDrawer from "./Tasks/Create-Task/CreateTaskDrawer";
import { TaskModal } from "./TaskComponent/TaskModal/TaskModal";

// project
// import Projects from "./Projects/ProjectList/Project";
import CreateProjectDrawer from "./Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";

//admin
import AdminMain from "./Admin/AdminMain";

// navigatoin
import RouterConfig from "navigation/RouterConfig";
import CDrawer from "Drawer/CDrawer";
import DrawingDetails from "./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails";

// Auth
const Register = lazy(() => import("./Auth/Register/Register"));
const Login = lazy(() => import("./Auth/Login/Login"));
const ForgetConfirmation = lazy(() => import("./Auth/ForgetPassword/ForgetConfirmation"))

// connection
const Connections = lazy(() => import("./Connection/Connection"));

// profile
const Profile = lazy(() => import("./Profile/Profile"));

// task
const Tasks = lazy(() => import("./Tasks/TaskList/Task"));

// project
const Projects = lazy(() => import("./Projects/ProjectList/Project"));
const ProjectLocations = lazy(() => import("./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/ProjectLocations"));
// const DrawingDetails = lazy(()=>import("./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails"))


export {
  RouterConfig,
  ProjectLocations,
  DrawingDetails,
  ForgetConfirmation,
  RegisterAddProfilePic,
  RegisterConfirmationForm,
  RegisterNumberForm,
  TermsAndConditions,
  AdminMain,
  TaskModal,
  CDrawer,
  CreateQuestioniarDrawer,
  ViewQuestioniarDrawer,
  CreateProjectDrawer,
  CreateTaskDrawer,
  ViewInvitations,
  Login,
  Connections,
  ForgetPassword,
  ResetPassword,
  Register,
  Projects,
  Profile,
  Tasks,
  Chat,
};
