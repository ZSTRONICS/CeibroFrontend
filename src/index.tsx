import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "theme";
import App from "./App";
import Store from "./redux/store";
import "./translation/i18next";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
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
