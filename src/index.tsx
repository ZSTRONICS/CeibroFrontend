import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@mui/material";
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

// import { findDOMNode } from "react-dom";
// hoist ThemeProvider to static const to avoid rerendering.its ensure that
//  tag generated would not recalculate on each render.

// will do it later while refactoring
// "#":"react-file-utils" FOR ICON PREVIEW,
// const MuiThemeProvider = <ThemeProvider theme={theme} />

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

// Hot reloadable translation json files
// if (module.hot) {
//   module.hot.accept(['../src/translation/i18next'], () => {
//     // No need to render the App again because i18next works with the hooks
//   });
// }
// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
