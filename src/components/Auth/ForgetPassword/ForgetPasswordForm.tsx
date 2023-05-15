import React, { useState } from "react";

import { Typography, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import TextField from "../../Utills/Inputs/TextField";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/action/auth.action";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { forgotPasswordSchemaValidation } from "../userSchema/AuthSchema";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";

interface Props {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const ForgetPasswordForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const forgotPasswordSchema = forgotPasswordSchemaValidation(t);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailFoundErr, setEmailFound] = useState<boolean>(false);
  const isDisabled = !loading ? false : true;

  const handleKeyDown = (e: any, values: any) => {
    if (e.keyCode === 13) {
      handleSubmit(values);
    }
  };

  const handleSubmit = (values: any) => {
    const { email } = values;
    const payload = {
      body: { email },
      success: (res: any) => {
        toast.success(`${t("auth.check_your_email")}`);
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 404) {
          setEmailFound(true);
        }
      },
      finallyAction: () => {
        setLoading(false);
      },
    };

    setTimeout(() => {
      setEmailFound(false);
    }, 5000);

    setLoading(true);
    dispatch(forgetPassword(payload));
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>
          {t("auth.phoneNumber")}
        </Typography>
      </div>

      <div className={classes.loginForm}>
        {(showSuccess || tokenLoading) && (
          <Alert severity="success">
            {tokenLoading
              ? `${t("auth.forgot_pass.verifying")}`
              : `${t("auth.forgot_pass.email_verify_successfully")}`}
          </Alert>
        )}
        {emailFoundErr && (
          <Alert style={{ margin: "2px 0" }} severity="error">
            {t("auth.noUserFound_with_email")}
          </Alert>
        )}

        {showError && <Alert severity="error">{t("auth.link_expired")}</Alert>}
        <Formik
          initialValues={{ phoneNumber: "", dialCode: "+372" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
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
              <div className={classes.actionWrapper}>
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                >
                  {isDisabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  {t("auth.send")}
                </Button>
                <span className={classes.rememberText}>
                  {t("auth.Remember")}
                  <Link to={"/login"} className={classes.rememberLogin}>
                    {t("auth.login")}
                  </Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;

const useStyles = makeStyles({
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
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
  rememberLogin: {
    paddingLeft: 5,
    textDecoration: "none",
  },
  rememberText: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: 600,
  },
  inputs: {
    // marginTop: 40,
    height: 5,
  },
  loginButton: {
    height: 32,
    width: 21,
    fontSize: 14,
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
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
