/* eslint-disable react-hooks/exhaustive-deps */
import "fontsource-roboto";
import "moment-timezone";
import React from "react";
import { ToastContainer } from "react-toastify";

// components
import {
  CDrawer,
  CreateProjectDrawer,
  CreateQuestioniarDrawer,
  CreateTaskDrawer,
  RouterConfig,
  TaskModal,
  ViewInvitations,
  ViewQuestioniarDrawer,
} from "components";

// socket

// material
import { CssBaseline } from "@mui/material";

// styling
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./components/Topbar/ProfileBtn.css";

// redux
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers/appReducer";

// axios
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import UploadingDocsPreview from "components/uploadImage/UploadingDocsPreview";
import { useSocket } from "utills/SocketUtils";

interface MyApp { }

const App: React.FC<MyApp> = () => {
  // const [doOnce, setDoOnce] = React.useState(false);
  let openProjectdrawer = useSelector(
    (store: RootState) => store.project.drawerOpen
  );
  let openTaskDrawer = useSelector(
    (state: RootState) => state.task.taskDrawerOpen
  );
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );

  useSocket();
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <ErrorBoundary>
        {/* component used here for availability of modal on all routes*/}
        <TaskModal />
        <div style={{ opacity: 0, visibility: "hidden", width: 0, height: 0 }}>
          <ViewInvitations />
        </div>
        <CssBaseline />
        {<UploadingDocsPreview />}
        <CreateQuestioniarDrawer />
        <CDrawer />
        {drawerOpen && <ViewQuestioniarDrawer />}
        {openProjectdrawer && <CreateProjectDrawer />}
        <ToastContainer position="bottom-left" theme="colored" />
        {openTaskDrawer && <CreateTaskDrawer />}
        <RouterConfig />
      </ErrorBoundary>
    </div>
    // </ThemeProvider>
  );
};

export default App;
