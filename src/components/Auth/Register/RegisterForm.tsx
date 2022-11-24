// @ts-nocheck
import React, { useState } from "react";

//react router dom
import { useHistory } from "react-router";

// mui-imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@mui/material/Alert";


// redux
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "redux/action/auth.action";
import { RootState } from "redux/reducers";

// components
import assets from "assets/assets";
import colors from "assets/colors";
import TextField from "components/Utills/Inputs/TextField";
import Loading from "components/Utills/Loader/Loading";

//formik
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { setValidationSchema } from "../userSchema/RegisterSchema";

const RegisterForm = () => {
  const classes = useStyles();
  const { registerLoading } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const registerSch = setValidationSchema(t);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);

  const handleSubmit = (values: any, action: any) => {
    const { firstName, surName, email, password } = values;
    const payload = {
      body: {
        firstName,
        surName,
        email,
        password,
      },
      success: (res: any) => {
        history.push("/login");
        action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      }
    };
    dispatch(registerRequest(payload));
    setTimeout(() => {
      setIncorrectAuth(false);
    }, 3000);
  };

  return (
    <div className={`form-container ${classes.wrapper} hide-scrollbar`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>
          {t("auth.register.register")}
        </Typography>
      </div>

      <div className={classes.loginForm}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            surName: "",
            confirmPassword: "",
          }}
          validationSchema={registerSch}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              
               {incorrectAuth && (
                <Alert severity="error">{t("auth.email_already_taken")}</Alert>
                )} 
              <TextField
                placeholder={t("auth.register.first_name")}
                className={classes.inputs}
                name="firstName"
                inputProps={{
                  style: { height: 12, width: "100%" },
                }}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </Typography>
              )}

              <TextField
                placeholder={t("auth.register.sur_name")}
                className={classes.inputs}
                name="surName"
                value={values.surName}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.surName && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.surName && touched.surName && errors.surName}
                </Typography>
              )}

              <TextField
                placeholder={t("auth.Email")}
                className={classes.inputs}
                name="email"
                value={values.email}
                inputProps={{
                  style: { height: 12 },
                }}
                error={true}
                helperText={t("auth.register.Not_valid_email")}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.email && touched.email && errors.email}
                </Typography>
              )}

              <TextField
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.Password")}
                className={classes.inputs}
                name="password"
                value={values.password}
                inputProps={{
                  style: { height: 12 },
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={classes.positionEnd}
                  >
                    <IconButton
                      className={classes.endAornmnetBtn}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleChange}
                onBlur={handleBlur}
                autoFill={false}
              />
              {errors.password && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.password && touched.password && errors.password}
                </Typography>
              )}

              <TextField
                type={confirmPass ? "text" : "password"}
                placeholder={t("auth.confirm_password")}
                name="confirmPassword"
                value={values.confirmPassword}
                className={classes.inputs}
                inputProps={{
                  style: { height: 12 },
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={classes.positionEnd}
                  >
                    <IconButton
                      className={classes.endAornmnetBtn}
                      aria-label="toggle password visibility"
                      onClick={() => setConfirmPass((prev) => !prev)}
                      edge="end"
                    >
                      {confirmPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </Typography>
              )}

              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid || registerLoading}
                >
                  {registerLoading ? (
                    <Loading type="spin" color="white" height={14} width={20} />
                  ) : (
                    `${t("auth.register.register")}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;

const useStyles = makeStyles({
  positionEnd: {
    marginLeft: "-50px",
  },
  endAornmnetBtn: {
    marginRight: 0,
  },
  wrapper: {
    minHeight: "94%",
    overflowY: "auto",
    marginBottom: 20,
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: "Inter",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    padding: "10px 13%",
    "@media (max-width:960px)": {
      padding: "10 13%",
    },
  },
  remember: {
    marginTop: 25,
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
  },
  inputs: {
    marginTop: 30,
    height: 8,
    width: "100%",
  },
  loginButton: {
    height: 32,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "7%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "12.5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
});
