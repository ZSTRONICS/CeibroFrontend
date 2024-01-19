import { lazy } from "react";
// Auth
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import Login from "./Auth/Login/Login";
import RegisterAddProfilePic from "./Auth/Register/RegisterAddProfilePic";
import RegisterConfirmationForm from "./Auth/Register/RegisterConfirmationForm";
import RegisterNumberForm from "./Auth/Register/RegisterNumberForm";
import TermsAndConditions from "./Auth/Register/TermsAndConditions";
import ResetPassword from "./Auth/ResetPassword/ResetPassword";

// task
// import Projects from "./Projects/ProjectList/Project";
import CreateProjectDrawer from "./Location/Create-Project/CreateProjectDrawer/CreateProjectDrawer";

//admin
import AdminMain from "./Admin/AdminMain";

// navigatoin
import CDrawer from "Drawer/CDrawer";
import RouterConfig from "navigation/RouterConfig";
import Location from "./Location/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/Location";
import ForwardTask from "./Tasks/Forward-Task";
import MockTaskApis from "./Tasks/MockTaskApis/MockTaskApis";

// Auth
const Register = lazy(() => import("./Auth/Register/Register"));

const ForgetConfirmation = lazy(
  () => import("./Auth/ForgetPassword/ForgetConfirmation")
);

// connection
const Connections = lazy(() => import("./Connection/Connection"));

// profile
const Profile = lazy(() => import("./Profile/Profile"));

// task
const Task = lazy(() => import("./Tasks/TaskList/Task"));
const CreateNewTask = lazy(() => import("./Tasks/Create-Task/CreateNewTask"));

// project
const Projects = lazy(() => import("./Location/ProjectList/Project"));
const ProjectLocations = lazy(
  () =>
    import(
      "./Location/Create-Project/CreateProjectDrawer/ProjectLocations/ProjectLocations"
    )
);
// const DrawingDetails = lazy(()=>import("./Projects/Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/DrawingDetails"))

export {
  AdminMain,
  CDrawer,
  Connections,
  CreateNewTask,
  CreateProjectDrawer,
  ForgetConfirmation,
  ForgetPassword,
  ForwardTask,
  Location,
  Login,
  MockTaskApis,
  Profile,
  ProjectLocations,
  Projects,
  Register,
  RegisterAddProfilePic,
  RegisterConfirmationForm,
  RegisterNumberForm,
  ResetPassword,
  RouterConfig,
  Task,
  TermsAndConditions
};

