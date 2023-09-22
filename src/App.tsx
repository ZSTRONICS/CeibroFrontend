import "fontsource-roboto";
// import "moment-timezone";
import { ToastContainer } from "react-toastify";

// components
import { RouterConfig } from "components";

// material
// import CssBaseline from "@mui/material/CssBaseline";

// styling
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./components/Topbar/ProfileBtn.css";

// axios
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { useSocket } from "utills/SocketUtils";

const App = () => {
  const isOnline = navigator.onLine;
  console.log("isOnline", isOnline);
  useSocket();
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <ErrorBoundary>
        {/* <CssBaseline /> */}
        <ToastContainer position="bottom-left" theme="colored" />
        <RouterConfig />
      </ErrorBoundary>
      {/* component used here for availability of modal on all routes*/}
      {/* <TaskModal /> 
        <div style={{ opacity: 0, visibility: "hidden", width: 0, height: 0 }}>
          <ViewInvitations />
        </div> 
        <UploadingDocsPreview />*/}
      {/* {openProjectdrawer && <CreateProjectDrawer />} */}
    </div>
    // </ThemeProvider>
  );
};

export default App;
