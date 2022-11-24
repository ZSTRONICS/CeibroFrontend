import { useState, useEffect } from "react";
import "./login.css";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import queryString from "query-string";

// translation
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// axios
import axios from "axios";
import { baseURL } from "utills/axios";

// redux
import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";

// components
import ImageTile from "./ImageTile";
import LoginForm from "./LoginForm";
import Setting from "components/Setting";
import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";

const Login: React.FC<LoginInterface> = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
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
      await axios
        .post(`${baseURL}/auth/verify-email?token=${queryParams?.token}`)
        .then((response) => {
          setSuccess(true);
          setTokenLoading(false);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        })
        .catch((err) => {
          setError(true);
          setTokenLoading(false);
          setTimeout(() => {
            setError(false);
          }, 5000);
          console.log("error is ", err);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
    LoginData();
  }, [isLoggedIn]);

  return (
    <Grid container className={classes.login}>
      <Grid item xs={12} md={6} lg={5} className={classes.form}>
        <LoginForm
          tokenLoading={tokenLoading}
          showSuccess={success}
          showError={error}
        />
        <Grid container className={classes.langContainer}>
          <Grid item>
            <Typography className={classes.dontHave}>
              {t("auth.dont_have_account")}{" "}
              <Link to ="/register" className={classes.signup}>
                {t("auth.signUp")}
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Setting />
          </Grid>
        </Grid>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={7} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;

const useStyles = makeStyles((theme) => {
  return {
    langContainer: {
      justifyContent: "space-between",
      padding: "10px 13%",
    },
    login: {
      display: "flex",
      "@media (max-width:960px)":{
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      "@media (max-width:960px)":{
        background: `url(${assets.visual})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
      },
    },
    tileWrapper: {
      position: "relative",
    },
    dontHave: {
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
    },
    signup: {
      color: colors.textPrimary,
      textDecoration:"none"
    },
  };
});
