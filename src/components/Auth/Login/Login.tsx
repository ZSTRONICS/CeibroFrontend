import { Box } from "@mui/material";
import "./login.css";

// translation
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/appReducer";

// components
import LoginForm from "./LoginForm";

import AuthLayout from "../AuthLayout/AuthLayout";
import useStyles from "./LoginStyles";

const Login = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);
  const { t }: any = useTranslation<any>();

  return (
    <AuthLayout title={t("auth.login")}>
      <LoginForm showSuccess={isLoggedIn} />
      <Box
        className={classes.dontHave}
        sx={{
          color: "#131516",
          bottom: `${window.innerHeight < 550 ? "1%" : "6%"}`,
        }}
      >
        {t("auth.dont_have_account")}{" "}
        <Link to="/register" className={classes.signup}>
          {t("auth.signUp")}
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default Login;
