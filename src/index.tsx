// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import "./translation/i18next";
import { ConfirmProvider } from "material-ui-confirm";
import { theme } from "theme";

// hoist ThemeProvider to static const to avoid rerendering.its ensure that
//  tag generated would not recalculate on each render.
// will do it later while refactoring
// const MuiThemeProvider = <ThemeProvider theme={theme} />

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
