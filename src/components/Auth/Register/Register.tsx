import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./register.css";
import RegisterForm from "./RegisterForm";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useEffect } from "react";

//style css 

import useStyles from "./RegisterStyles";
// import RegisterSkeleton from "./RegisterSkeleton";

//register form skeleton

// import RegisterSkeleton from "./RegisterSkeleton";

const Register = () => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const history = useHistory();

  const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    history.push('/login')
  }

  return (
    <Grid container className={classes.register}>
      <Grid item xs={12} md={6} lg={4} className={`${classes.form} hide-scrollbar`}>
        <RegisterForm />
        {/* <RegisterSkeleton /> */}

        <Typography className={classes.dontHave}>
          Already have an account?{" "}
          <span onClick={handleClick} className={classes.signup}>Sign in!</span>
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

export default Register;

