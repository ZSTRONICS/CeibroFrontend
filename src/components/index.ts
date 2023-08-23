import { lazy } from "react";
// Auth
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import RegisterAddProfilePic from "./Auth/Register/RegisterAddProfilePic";
import RegisterConfirmationForm from "./Auth/Register/RegisterConfirmationForm";
import RegisterNumberForm from "./Auth/Register/RegisterNumberForm";
import TermsAndConditions from "./Auth/Register/TermsAndConditions";
import ResetPassword from "./Auth/ResetPassword/ResetPassword";

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
import { TaskModal } from "./TaskComponent/TaskModal/TaskModal";
import CreateTaskDrawer from "./Tasks/Create-Task/CreateTaskDrawer";

// project
// import Projects from "./Projects/ProjectList/Project";
import CreateProjectDrawer from "./Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";

//admin
import AdminMain from "./Admin/AdminMain";

// navigatoin
import CDrawer from "Drawer/CDrawer";
import RouterConfig from "navigation/RouterConfig";
import DrawingDetails from "./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails";
import MockTaskApis from "./Tasks/MockTaskApis/MockTaskApis";

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
  AdminMain, CDrawer, Chat, Connections, CreateProjectDrawer, CreateQuestioniarDrawer, CreateTaskDrawer, DrawingDetails,
  ForgetConfirmation, ForgetPassword, Login, MockTaskApis, Profile, ProjectLocations, Projects, Register, RegisterAddProfilePic,
  RegisterConfirmationForm,
  RegisterNumberForm, ResetPassword, RouterConfig, TaskModal, Tasks, TermsAndConditions, ViewInvitations, ViewQuestioniarDrawer
};

