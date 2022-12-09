import React, { useState } from "react";
//formik
import { Formik, Form } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// react router dom
import { useHistory } from "react-router-dom";

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
import Alert from "@mui/material/Alert";

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
import assets from "assets/assets";
import TextField from "components/Utills/Inputs/TextField";
import { CBox } from "components/material-ui";
import { perisitStoreState } from "redux/store";


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
  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  let [timer, setTimer] = useState('')
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
          toast.success(`${t("auth.loggedin_Successfully")}`);
        },
        onFailAction: (err: any) => {
          if (err.response.data.code === 401) {
            if ((err.response.data?.message).match(/^\d+|\d+\b|\d+(?=\w)/g)) {
              const remainingTime = (err.response.data?.message).match(/^\d+|\d+\b|\d+(?=\w)/g).join(' ').slice(0, 2)
              setTimer(remainingTime)
              setIncorrectAuth(true);
            } else {
              setIncorrectEmail(true)
            }
  
          } else if (err.response.data.code === 423) {
            const timer = (err.response.data?.message).match(/^\d+|\d+\b|\d+(?=\w)/g).join(' ').slice(0, 2)
            setTimer(timer)
            setLockError(true);
          } else if (err) {
            setVerifyError(true);
          }  else{
            // removed stored state 
            perisitStoreState()
          }
          

          setTimeout(() => {
            setLockError(false);
            setVerifyError(false);
            setIncorrectAuth(false);
            setIncorrectEmail(false)
  
          }, 10000);
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
    <div>
      <Box>
        <Box className={classes.logoWrapper}>
          <img src={assets.logo} alt="ceibro-logo" />
        </Box>
        <Box className={classes.titleWrapper}>
          <Typography className={classes.title}>{t("auth.login")}</Typography>
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

              {(showSuccess || tokenLoading) && (
                <Alert severity="success">
                  {tokenLoading
                    ? `${t("auth.successAlerts.verifying_email")}`
                    : `${t("auth.successAlerts.email_verified")}`}
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
                  {t("auth.account_locked").replace('#', `${timer}`)}
                </Alert>
              )}
              {incorrectEmail && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  {t("auth.account_not_found").replace('#', `${timer}`)}
                </Alert>
              )}
              {lockError && (
                <Alert severity="error">
                  {t("auth.errorAlerts.account_locked_message").replace('#', `${timer}`)}
                </Alert>
              )}

              {(showSuccess || tokenLoading) && (
                <Alert severity="success">
                  {tokenLoading
                    ? `${t("auth.successAlerts.verifying_email")}`
                    : `${t("auth.successAlerts.email_verified")}`}
                </Alert>
              )}
              <CBox mb={3.1}>
                <TextField
                  placeholder={t("auth.register.first_name")}
                  className={classes.inputs}
                  name="email"
                  inputProps={{
                    style: { height: 12, width: "100%" },
                  }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.email}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <TextField
                  placeholder={t("auth.register.first_name")}
                  type={showPassword ? "text" : "password"}
                  className={`${classes.inputs} ${classes.inputPass}`}
                  name="password"

                  inputProps={{
                    style: { height: 12, width: "100%" },
                  }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                />
                {errors.password && touched.password && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.password}
                  </Typography>
                )}
              </CBox>


              {/* <FormControl variant="outlined" className={classes.loginInput}>
                  <OutlinedInput
                    name="email"
                    required
                    value={values.email}
                    className={classes.inputOutline}
                    placeholder={t("auth.Email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl> */}

              {/* validation error */}






              {/* <FormControl variant="outlined" className={classes.loginInput}>
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
                </FormControl> */}



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

              <div className={classes.actionWrapper}>
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                // disabled={checkValidInputs(values) || loginLoading}
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

            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default LoginForm;
const useStyles = makeStyles({
  container: {
    height: "92%",
  },

  formWraper: {
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
    // paddingLeft: "7%",
  },
  titleWrapper: {
    margin: '45px 0px 15px 0px',


  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inputs: {
    // marginBottom: 25,
    width: "100%",
    maxWidth: 376,

  },
  inputPass: {
    position: 'relative',
    '& .MuiIconButton-edgeEnd': {

      position: 'absolute',
      right: 10,
      zIndex: 999,
      marginleft: 31,

    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: '0px !important'
    }
    // padding: '16px 10px',
    // borderRadius: 5,
    // border: '1px solid #DBDBE5',
    // '&:focus': {
    //   border: '2px solid !important'
    // },
    // '& input': {
    //   border: 'none !important',
    //   padding: 'px !important',
    //   '& :focus': {
    //     borderColor: 'red !important'
    //   }
    // },
    // '& .MuiInputBase-root': {
    //   height: 12,
    //   width: '100%',
    //   border: '1px solid #DBDBE5'
    // },
    // '& .MuiInputBase-input': {
    //   border: 'none !important',
    //   '&:focus': {
    //     border: '2px solid !important'
    //   }
    // }
  }
});