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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers/appReducer";

// axios
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import UploadingDocsPreview from "components/uploadImage/UploadingDocsPreview";
import { useSocket } from "utills/SocketUtils";

interface MyApp {}

const App: React.FC<MyApp> = () => {
  const dispatch = useDispatch();

  let openProjectdrawer = useSelector(
    (store: RootState) => store.project.drawerOpen
  );
  let openTaskDrawer = useSelector(
    (state: RootState) => state.task.taskDrawerOpen
  );
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );
  // const { selectedFilesToBeUploaded, uploadPendingFiles } = useSelector(
  //   (state: RootState) => state.docs
  // );

  // useEffect(() => {
  //   if (!uploadPendingFiles) {
  //     return;
  //   }

  //   let formData = new FormData();
  //   let filesPlaceholderData: any[] = [];

  //   const filesToUpload = selectedFilesToBeUploaded.files;
  //   const moduleType = selectedFilesToBeUploaded.moduleName;
  //   const moduleId = selectedFilesToBeUploaded.moduleId;

  //   Array.from(filesToUpload).forEach((file: any) => {
  //     const chunkSize = 1024 * 1024; // 1MB chunks
  //     let offset = 0;
  //     // Create an array of chunks
  //     const chunks = [];
  //     while (offset < file.size) {
  //       const chunk = file.slice(offset, offset + chunkSize);
  //       chunks.push(chunk);
  //       offset += chunkSize;
  //     }
  //     // Create a new Blob object from the array
  //     const blob = new Blob(chunks);
  //     formData.append("files", blob, file.name);

  //     filesPlaceholderData.push({
  //       access: [],
  //       version: 1,
  //       _id: "",
  //       uploadedBy: "",
  //       fileUrl: "",
  //       fileSize: file.size,
  //       fileType: "",
  //       progress: 1,
  //       fileName: file.name,
  //       uploadStatus: "",
  //       moduleType: moduleType,
  //       moduleId: moduleId,
  //       createdAt: "",
  //       updatedAt: "",
  //     });
  //   });
  //   formData.append("moduleName", moduleType);
  //   formData.append("_id", moduleId);

  //   dispatch({
  //     type: DOCS_CONFIG.PUSH_FILE_UPLAOD_RESPONSE,
  //     payload: filesPlaceholderData,
  //   });

  //   const payload = {
  //     body: formData,
  //     success: (res: any) => {
  //       if (res.status === 200) {
  //         //toast.success("file(s) uploaded");
  //         if (res.data.results.files.length > 0) {
  //           let allFiles = res.data.results.files;
  //           const files = allFiles.map((file: any) => {
  //             file.progress = 100;
  //             return file;
  //           });
  //           dispatch({
  //             type: DOCS_CONFIG.UPDATE_FILE_UPLAOD_RESPONSE,
  //             payload: files,
  //           });
  //         }
  //       }
  //     },
  //   };

  //   dispatch(uploadDocs(payload));

  //   dispatch({
  //     type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED,
  //   });
  // }, [uploadPendingFiles]);

  useSocket();
  // useSocket(isLoggedIn, user?._id, dispatch);
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
