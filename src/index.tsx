import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@mui/material";
// import { StyledEngineProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "theme";
import App from "./App";
import Store from "./redux/store";
import "./translation/i18next";
// import '../src/translation/i18next'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={Store.store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistGate loading={null} persistor={Store.persistor}>
        <ConfirmProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ConfirmProvider>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
