import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import { IntlProvider } from "react-intl";
import messages_en from "./translation/en.json";
import { PersistGate } from "redux-persist/integration/react";
import "./translation/i18next";
import { ConfirmProvider } from "material-ui-confirm";
import { theme } from "theme";

// const messages: any = {
//   en: messages_en,
// };

// const getLanguage = () => (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || 'en';

// const language: string = getLanguage()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          {/* <IntlProvider locale={language} messages={messages[language]}> */}
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          {/* </IntlProvider> */}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
