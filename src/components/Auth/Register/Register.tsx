import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./register.css";
import RegisterForm from "./RegisterForm";
import { useMediaQuery } from "react-responsive";
import assets from "assets/assets";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useEffect } from "react";
import colors from "assets/colors";
import { useTranslation } from "react-i18next";
import Setting from "components/Setting";
import { Link } from "react-router-dom";

const Register = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const {t} = useTranslation()
  const history = useHistory();

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Grid container className={classes.register}>
      <Grid item xs={12} md={6} lg={4} className={`${classes.form} hide-scrollbar`}>
        <RegisterForm />
        <Grid container className={classes.langContainer} justifyContent="space-between">
          <Grid item>
          <Typography className={classes.dontHave}>
          {t('auth.Already_have_an_account')}{" "}
              <Link to ="/login" className={classes.signup}>
              {t('auth.register.signIn')}
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Setting/>
          </Grid>
          </Grid>
        
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default Register;

const useStyles = makeStyles((theme) => {
  return {
    langContainer:{
      padding: "10px 13%",
    },
    register: {
      display: "flex",
      ["@media (max-width:960px)"]: {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      overflowY: 'scroll',
      paddingBottom: 10,
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
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer"
    },
    signup: {
      color: colors.textPrimary,
      textDecoration:'none'
    },
    // formTile: {
    //     display: 'inline-block',
    //     margin: 'auto',
    //     textAlign: 'center'
    // }
  };
});
