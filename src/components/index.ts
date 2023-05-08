// Auth
import Register from "./Auth/Register/Register";
import Login from "./Auth/Login/Login";
import ResetPassword from "./Auth/ResetPassword/ResetPassword";
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
// import ForgetPassword from "components/Auth/Login/ForgetPassword";
// import VerifyEmail from "components/Auth/EmailVerify/VerifyEmail";

// dashboard
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import Connections from "./Connection/Connection";
import ViewInvitations from "./Profile/ViewInvitations";

// chat
import Chat from "./Chat/Chat";
import CreateQuestioniarDrawer from "./Chat/Questioniar/CreateQuestioniar";
import ViewQuestioniarDrawer from "./Chat/Questioniar/ViewQuestioniar";

// task
import Tasks from "./Tasks/TaskList/Task";
import CreateTaskDrawer from "./Tasks/Create-Task/CreateTaskDrawer";
import { TaskModal } from "./TaskComponent/TaskModal/TaskModal";

// project
import Projects from "./Projects/ProjectList/Project";
import CreateProjectDrawer from "./Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";

//admin
import AdminMain from './Admin/AdminMain'

// navigatoin
import RouterConfig from "navigation/RouterConfig";
import CDrawer from "Drawer/CDrawer";
import RegisterNumberForm from "./Auth/Register/RegisterNumberForm";
import RegisterConfirmationForm from "./Auth/Register/RegisterConfirmationForm";
import TermsAndConditions from "./Auth/Register/TermsAndConditions";
export {
  RouterConfig,
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
  Dashboard,
  Profile,
  Tasks,
  Chat,
};
