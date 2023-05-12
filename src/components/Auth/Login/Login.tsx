import { Box, Grid, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useState } from "react";
import "./login.css";

// translation
import { useTranslation } from "react-i18next";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// axios
import axios from "axios";
import { urlV1 } from "utills/axios";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

// components
import Setting from "components/Setting";
import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import LoginForm from "./LoginForm";
import LoginSkeleton from "./LoginSkeleton";

import useStyles from "./LoginStyles";
import { CBox } from "components/material-ui";
import AuthLayout from "../AuthLayout/AuthLayout";
const Login: React.FC<LoginInterface> = () => {
  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const LoginData = async () => {
    const queryParams = queryString.parse(history?.location?.search);
    if (queryParams?.token) {
      // verifying email verification token
      setTokenLoading(true);
      // await axios
      //   .post(`${urlV1}/auth/verify-email?token=${queryParams?.token}`)
      //   .then((response) => {
      //     setSuccess(true);
      //     setTokenLoading(false);
      //     setTimeout(() => {
      //       setSuccess(false);
      //     }, 10000);
      //   })
      //   .catch((err) => {
      //     setError(true);
      //     setTokenLoading(false);
      //     setTimeout(() => {
      //       setError(false);
      //     }, 10000);
      //   });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
    LoginData();
  }, [isLoggedIn]);

  return (
    <AuthLayout title={t("auth.login")}>
      <LoginForm
        tokenLoading={tokenLoading}
        showSuccess={success}
        showError={error}
      />
      {/* <Grid container item className={classes.langContainer} pt={1.5}> */}
      {/* <Grid item> */}
      <Box
        className={classes.dontHave}
        sx={{ position: "absolute", bottom: "7%", color: "#131516" }}
      >
        {t("auth.dont_have_account")}{" "}
        <Link to="/register" className={classes.signup}>
          {t("auth.signUp")}
        </Link>
      </Box>
      {/* </Grid> */}
      {/* <Grid item>
                <Setting />
              </Grid> */}
      {/* </Grid> */}
    </AuthLayout>
  );
};

export default Login;
