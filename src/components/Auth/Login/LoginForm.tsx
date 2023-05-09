import React, { useState } from "react";
//formik
import { Formik, Form } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// react router dom
import { useHistory } from "react-router-dom";

// material
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
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
import assets from "assets/assets";
import { CBox } from "components/material-ui";
import { purgeStoreStates } from "redux/store";
import Loading from "components/Utills/Loader/Loading";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";

interface Props {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

interface IInputValues {
  dialCode: string;
  phoneNumber: string;
  password: string;
}

const LoginForm: React.FC<Props> = (props) => {
  const { tokenLoading, showSuccess, showError } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const signinSchema = SigninSchemaValidation(t);
  const [checked, setChecked] = useState(true);
  const [lockError, setLockError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  let [timer, setTimer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = (values: IInputValues) => {
    setShowLoading(true);
    setIncorrectAuth(false);
    const { phoneNumber, password, dialCode } = values;
    const payload = {
      body: {
        dialCode,
        phoneNumber,
        password,
      },
      onFailAction: (err: any) => {
        setShowLoading(false);
        if (err.response.data.code === 400) {
          setIncorrectEmail(true);
        } else if (err.response.data.code === 404) {
          const remainingTime = (err.response.data?.message)
            .match(/^\d+|\d+\b|\d+(?=\w)/g)
            .join(" ")
            .slice(0, 2);
          setTimer(remainingTime);
          setIncorrectAuth(true);
        } else if (err.response.data.code === 406) {
          setVerifyError(true);
        } else if (err.response.data.code === 423) {
          const timer = (err.response.data?.message)
            .match(/^\d+|\d+\b|\d+(?=\w)/g)
            .join(" ")
            .slice(0, 2);
          setTimer(timer);
          setLockError(true);
        } else {
          // removed stored state
          purgeStoreStates();
        }

        setTimeout(() => {
          setLockError(false);
          setVerifyError(false);
          setIncorrectAuth(false);
          setIncorrectEmail(false);
        }, 5000);
      },
      showErrorToast: false,
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
    <>
      <Box>
        <Formik
          initialValues={{
            dialCode: "+372",
            phoneNumber: "",
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
            <Form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
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
                  {t("auth.account_locked").replace("#", `${timer}`)}
                </Alert>
              )}
              {incorrectEmail && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  {t("auth.account_not_found").replace("#", `${timer}`)}
                </Alert>
              )}
              {lockError && (
                <Alert severity="error">
                  {t("auth.errorAlerts.account_locked_message").replace(
                    "#",
                    `${timer}`
                  )}
                </Alert>
              )}

              {(showSuccess || tokenLoading) && (
                <Alert severity="success">
                  {tokenLoading
                    ? `${t("auth.successAlerts.verifying_email")}`
                    : `${t("auth.successAlerts.email_verified")}`}
                </Alert>
              )}
              <CBox mb={3.1} pt={2}>
                <CustomMuiTextField
                  name="phoneNumber"
                  typeName="phone-number"
                  inputValue={{
                    phoneNumber: values.phoneNumber,
                    dialCode: values.dialCode,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.phoneNumber}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  password={values.password}
                  placeholder="Password"
                  name="password"
                  label="Password"
                  typeName="password"
                  inputValue={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.password}
                  </Typography>
                )}
              </CBox>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <Typography
                  className={`${classes.titles} ${classes.forget}`}
                  sx={{ marginBottom: 0 }}
                  variant="body1"
                  gutterBottom
                  onClick={handlePasswordForget}
                >
                  {t("auth.ForgetPassword")}
                </Typography>
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  // disabled={checkValidInputs(values) || showLoading}
                >
                  {showLoading ? (
                    <Loading type="spin" color="white" height={14} width={14} />
                  ) : (
                    t("auth.login")
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
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
    // marginTop: -10,
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
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 15,
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
    margin: "45px 0px 15px 0px",
    "& .MuiTypography-root": {
      fontSize: 30,
      fontWeight: "bold",
    },
  },
  inputs: {
    // marginBottom: 25,
    width: "100%",
    maxWidth: 376,
  },
  inputPass: {
    position: "relative",
    "& .MuiIconButton-edgeEnd": {
      position: "absolute",
      right: 10,
      zIndex: 999,
      marginleft: 31,
    },
    "& .MuiInputAdornment-positionEnd": {
      marginLeft: "0px !important",
    },
  },
});
