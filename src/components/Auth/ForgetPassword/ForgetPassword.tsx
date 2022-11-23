import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "../Login/ImageTile";
import "../Login/login.css";
import ForgetPasswordForm from "./ForgetPasswordForm";

import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import { useMediaQuery } from "react-responsive";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";

const ForgetPassword: React.FC<LoginInterface> = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Grid container className={classes.login}>
      <Grid item xs={12} md={6} lg={4} className={classes.form}>
        <ForgetPasswordForm
          tokenLoading={tokenLoading}
          showSuccess={success}
          showError={error}
        />
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default ForgetPassword;

const useStyles = makeStyles((theme) => {
  return {
    login: {
      display: "flex",
      "@media (max-width:960px)": {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      "@media (max-width:960px)": {
        background: `url(${assets.visual})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
      },
    },
    tileWrapper: {
      position: "relative",
    },
    dontHave: {
      paddingLeft: "12%",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
    },
    signup: {
      color: colors.textPrimary,
    },

  };
});
