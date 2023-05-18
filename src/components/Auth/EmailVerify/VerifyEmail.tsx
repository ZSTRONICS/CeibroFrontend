import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import ImageTile from "../Login/ImageTile";
import "../Login/login.css";
import VerifyEmailForm from "./VerifyEmailForm";

import { useMediaQuery } from "react-responsive";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";

const VerifyEmail = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" })

  const [tokenLoading, setTokenLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Grid container className={classes.login}>
      <Grid item xs={12} md={6} lg={4} className={classes.form}>
        <VerifyEmailForm
          tokenLoading={tokenLoading}
          showSuccess={success}
          showError={error}
        />
        {/* <Typography className={classes.dontHave}>
          <span onClick={goToSignup} className={classes.signup}>
            Sign Up!
          </span>
        </Typography> */}
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default VerifyEmail;

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
