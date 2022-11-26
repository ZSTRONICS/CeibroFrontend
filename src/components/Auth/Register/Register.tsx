import { Grid, Typography } from "@material-ui/core";
import Setting from "components/Setting";
import { useEffect } from "react";
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
const Register = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const { t } = useTranslation()
  const history = useHistory();

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Grid container className={classes.register}>
      <Grid item xs={12} md={6} lg={5} className={`${classes.form} hide-scrollbar`}>
        <RegisterForm />
        <Grid container className={classes.langContainer} justifyContent="space-between">
          <Grid item>
            <Typography className={classes.dontHave}>
              {t('auth.Already_have_an_account')}{" "}
              <Link to="/login" className={classes.signup}>
                {t('auth.register.signIn')}
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

export default Register;

