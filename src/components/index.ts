import { lazy } from "react";
// Auth
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import RegisterAddProfilePic from "./Auth/Register/RegisterAddProfilePic";
import RegisterConfirmationForm from "./Auth/Register/RegisterConfirmationForm";
import RegisterNumberForm from "./Auth/Register/RegisterNumberForm";
import TermsAndConditions from "./Auth/Register/TermsAndConditions";
import ResetPassword from "./Auth/ResetPassword/ResetPassword";

import ViewInvitations from "./Profile/ViewInvitations";

// task
// import Projects from "./Projects/ProjectList/Project";
import CreateProjectDrawer from "./Projects/Create-Project/CreateProjectDrawer/CreateProjectDrawer";

//admin
import AdminMain from "./Admin/AdminMain";

// navigatoin
import CDrawer from "Drawer/CDrawer";
import RouterConfig from "navigation/RouterConfig";
import DrawingDetails from "./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails";
import ForwardTask from "./Tasks/Forward-Task";
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
const Task = lazy(() => import("./Tasks/TaskList/Task"));
const CreateNewTask = lazy(() => import("./Tasks/Create-Task/CreateNewTask"));

// project
const Projects = lazy(() => import("./Projects/ProjectList/Project"));
const ProjectLocations = lazy(() => import("./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/ProjectLocations"));
// const DrawingDetails = lazy(()=>import("./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails"))


export {
  AdminMain, CDrawer, Connections, CreateNewTask, CreateProjectDrawer, DrawingDetails, ForgetConfirmation, ForgetPassword, ForwardTask, Login, MockTaskApis, Profile, ProjectLocations, Projects, Register, RegisterAddProfilePic,
  RegisterConfirmationForm, RegisterNumberForm, ResetPassword, RouterConfig, Task, TermsAndConditions, ViewInvitations
};

