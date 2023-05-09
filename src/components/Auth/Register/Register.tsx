import { Grid, Typography } from "@material-ui/core";
import { CBox } from "components/material-ui";
import Setting from "components/Setting";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "redux/reducers";
import ImageTile from "./ImageTile";
import "./register.css";
import RegisterForm from "./RegisterForm";
import useStyles from "./RegisterStyles";
import RegisterNumberForm from "./RegisterNumberForm";
import RegisterConfirmationForm from "./RegisterConfirmationForm";
import TermsAndConditions from "./TermsAndConditions";
import AuthLayout from "../AuthLayout/AuthLayout";
import RegisterSetupProfile from "./RegisterSetupProfile";
const Register = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const { t } = useTranslation();
  const history = useHistory();

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    // <AuthLayout>
    //   <RegisterForm />
    // </AuthLayout>
    <RegisterSetupProfile />
  );
};

export default Register;
