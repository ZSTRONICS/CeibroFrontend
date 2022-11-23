import React, { useState } from "react";
//formik
import { Formik, Form } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// material
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, verifyEmail } from "redux/action/auth.action";
import { RootState } from "redux/reducers";

//toastify
import { toast } from "react-toastify";

// component
import { SigninSchemaValidation } from "../userSchema/AuthSchema";
import colors from "assets/colors";
import Loading from "react-loading";
import { useHistory } from "react-router-dom";
import assets from "assets/assets";
import Alert from "@mui/material/Alert";

interface Props {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const LoginForm: React.FC<Props> = (props) => {
  const { tokenLoading, showSuccess, showError } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const signinSchema = SigninSchemaValidation(t);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [lockError, setLockError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { loginLoading } = useSelector((state: RootState) => state.auth);

  const handleKeyDown = (e: any, values: any) => {
    if (e.keyCode === 13) {
      handleSubmit(values);
    }
  };

  const handleSubmit = (values: any) => {
    const { email, password } = values;
    const payload = {
      body: {
        email,
        password,
      },
      success: (_res: any) => {
        console.log(_res.status);
        toast.success(`${t("auth.loggedin_Successfully")}`);
      },
      onFailAction: (err: any) => {
        console.log(err.response.data.code === 401);
        if (err.response.data.code === 401) {
          setIncorrectAuth(true);
        }
        if (err.response.data.code === 423) {
          setLockError(true);
        } else if (err) {
          setVerifyError(true);
        }

        setTimeout(() => {
          setLockError(false);
          setVerifyError(false);
          setIncorrectAuth(false);
        }, 3000);
      },
      showErrorToast: true,
    };
    dispatch(loginRequest(payload));
  };

  const checkValidInputs = (values: any) => {
    const { email, password } = values;
    if (email && email.length > 0 && password && password.length > 0) {
      return false;
    }
    return true;
  };

  const handleVerifyEmail = (values: any) => {
    const { email } = values;
    const payload = {
      body: { email },
      success: () => {
        toast.success(`${t("auth.check_your_email")}`);
        history.push("/login");
      },
    };
    dispatch(verifyEmail(payload));
  };

  const handlePasswordForget = () => {
    history.push("/forgot-password");
  };

  return (
    <div className={classes.container}>
      <Box className={classes.logoTitleWrapper}>
        <Box className={classes.logoWrapper}>
          <img src={assets.logo} alt="ceibro-logo" />
        </Box>
        <Box className={classes.titleWrapper}>
          <Typography className={classes.title}>{t("auth.login")}</Typography>
        </Box>
      </Box>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signinSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container className={classes.formWraper} xs={8} md={8}>
              {(showSuccess || tokenLoading) && (
                <Alert severity="success">
                  {tokenLoading
                    ? `${t('auth.successAlerts.verifying_email')}`
                    : `${t('auth.successAlerts.email_verified')}`}
                </Alert>
              )}

              {showError && (
                <Alert severity="error">{t("auth.link_expired")}</Alert>
              )}
              {verifyError && (
                <Alert
                  severity="error"
                  style={{ display: "flex", margin: "2px 0" }}
                >
                  <Typography
                    className={`${classes.titles} ${classes.forget} ${classes.color}`}
                    variant="body1"
                    gutterBottom
                    onClick={() => handleVerifyEmail(values)}
                  >
                    {t("auth.emailNotVerify")}
                    <span className={classes.emailVerify}>
                      {t("auth.verifyEmail")}
                    </span>
                  </Typography>
                </Alert>
              )}

              {incorrectAuth && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  {t("auth.incorrect_email_password")}
                </Alert>
              )}
              {lockError && (
                <Alert severity="error">
                  {t("auth.errorAlerts.account_locked_message")}
                </Alert>
              )}
              <Grid item>
                {(showSuccess || tokenLoading) && (
                  <Alert severity="success">
                    {tokenLoading
                      ? `${t("auth.successAlerts.verifying_email")}`
                      : `${t("auth.successAlerts.email_verified")}`}
                  </Alert>
                )}
                <FormControl variant="outlined" className={classes.loginInput}>
                  <OutlinedInput
                    name="email"
                    required
                    value={values.email}
                    className={classes.inputOutline}
                    placeholder={t("auth.Email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>

                {/* validation error */}
                {errors.email && touched.email && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <FormControl variant="outlined" className={classes.loginInput}>
                  <OutlinedInput
                    required
                    name="password"
                    onKeyDown={(e) => handleKeyDown(e, values)}
                    className={classes.inputOutline}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.Password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  ></OutlinedInput>
                </FormControl>

                {errors.password && touched.password && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.password}
                  </Typography>
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="checkedB"
                      color="primary"
                      style={{ padding: 0 }}
                    />
                  }
                  className={classes.remember}
                  style={{ padding: 0 }}
                  label={
                    <Typography className={classes.rememberText}>
                      {t("auth.RememberMe")}
                    </Typography>
                  }
                />
              </Grid>
              <div className={classes.actionWrapper}>
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  disabled={checkValidInputs(values) || loginLoading}
                >
                  {loginLoading ? (
                    <Loading type="spin" color="white" height={14} width={14} />
                  ) : (
                    t("auth.login")
                  )}
                </Button>
                <Typography
                  className={`${classes.titles} ${classes.forget}`}
                  variant="body1"
                  gutterBottom
                  onClick={handlePasswordForget}
                >
                  {t("auth.ForgetPassword")}
                </Typography>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
const useStyles = makeStyles({
  container: {
    height: "92%",
  },
  logoTitleWrapper: {
    padding: "0 30px 33px",
  },
  formWraper: {
    flexDirection:  'column !important',
    margin: "0 auto",
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  loginInput: {
    width: "100%",
    marginTop: "20px",
  },

  inputOutline: {
    height: "40px",
    background: "white",
  },
  wrapper: {
    height: "94%",
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: "Inter",
    marginTop: -10,
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
    marginTop: "35px !important",
    fontSize: 14,
    padding: 0,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: 500,
  },
  loginButton: {
    height: "41px",
    fontSize: 14,
    background: "#0076C8",
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
    cursor: "pointer",
  },
  color: {
    color: "#611A15",
    padding: 0,
  },
  emailVerify: {
    textDecoration: "underline",

    "&:hover": {
      cursor: "pointer",
    },
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "7%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "13%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
