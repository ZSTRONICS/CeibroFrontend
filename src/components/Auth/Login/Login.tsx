import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./login.css";
import LoginForm from "./LoginForm";

import { LoginInterface } from "../../../interfaces/Login.interface";
import { useMediaQuery } from "react-responsive";
import assets from "../../../assets/assets";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useEffect } from "react";
import colors from "../../../assets/colors";

const Login: React.FC<LoginInterface> = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const history = useHistory();
  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Grid container className={classes.login}>
      <Grid item xs={12} md={6} lg={4} className={classes.form}>
        <LoginForm />
        <Typography className={classes.dontHave}>
          Don't have an account?{" "}
          <span className={classes.signup}>Sign Up!</span>
        </Typography>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;

const useStyles = makeStyles((theme) => {
  return {
    login: {
      display: "flex",
      ["@media (max-width:960px)"]: {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      ["@media (max-width:960px)"]: {
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
    },
    signup: {
      color: colors.textPrimary,
    },
    // formTile: {
    //     display: 'inline-block',
    //     margin: 'auto',
    //     textAlign: 'center'
    // }
  };
});
