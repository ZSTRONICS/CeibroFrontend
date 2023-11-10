// import "moment-timezone";
import { ToastContainer } from "react-toastify";
import "./assets/InterFont.css";
// components
// material
// import CssBaseline from "@mui/material/CssBaseline";

// styling
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./components/Topbar/ProfileBtn.css";

// axios
import { Box, Grid } from "@mui/material";
import assets from "assets";
import { RouterConfig } from "components";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";
import { useSocket } from "utills/SocketUtils";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleNetworkStatusChange);
    window.addEventListener("offline", handleNetworkStatusChange);
    return () => {
      window.removeEventListener("online", handleNetworkStatusChange);
      window.removeEventListener("offline", handleNetworkStatusChange);
    };
  }, []);
  useSocket();
  return (
    <div className="App">
      <ToastContainer position="bottom-left" theme="colored" />
      <ErrorBoundary>
        {!isOnline && !window.location.pathname.includes("/create-new-task") ? (
          <Grid
            item
            md={6.3}
            sm={7}
            sx={{
              display: { md: "block", sm: "block" },
              width: "100%",
              height: "100vh",
              background: `url(${assets.logo}) no-repeat`,
              backgroundSize: "auto",
              backgroundPosition: "50% 32%",
            }}
          >
            <Box
              sx={{
                fontSize: { md: "1.2rem", xs: "1rem" },
                fontWeight: "500",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <p>
                Connection to the Ceibro server appears to be unstable. Please
                check your internet connection.
              </p>
              <br />
              <p>
                Ühendus Ceibro serveriga tundub ebastabiilne. Palun kontrollige
                oma internetiühendust.
              </p>
            </Box>
          </Grid>
        ) : (
          <RouterConfig />
        )}
      </ErrorBoundary>
      {/* component used here for availability of modal on all routes*/}
      {/* <TaskModal /> 
        <UploadingDocsPreview />*/}
      {/* {openProjectdrawer && <CreateProjectDrawer />} */}
    </div>
  );
};

export default App;
