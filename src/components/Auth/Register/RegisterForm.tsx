import React, { useState } from "react";

//react router dom
import { useHistory } from "react-router";

// mui-imports
import Alert from "@mui/material/Alert";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  registerRequest,
  registerSetupProfile,
} from "redux/action/auth.action";
import { RootState } from "redux/reducers";

// components

// i18next
import { useTranslation } from "react-i18next";
//formik
import { Formik } from "formik";
import { setValidationSchema } from "../userSchema/RegisterSchema";
import { Grid, SelectChangeEvent, Button, Typography } from "@mui/material";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import useStyles from "./RegisterStyles";

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
    const {
      firstName,
      surName,
      email,
      password,
      jobTitle,
      companyName,
      phoneNumber,
      dialCode,
    } = values;
    const payload = {
      body: {
        email,
        password,
        firstName,
        surName,
        jobTitle,
        companyName,
      },
      success: (res: any) => {
        history.push("/profile-pic");
        action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      },
      other: `${dialCode}${phoneNumber}`,
    };
    dispatch(registerSetupProfile(payload));
    setTimeout(() => {
      setIncorrectAuth(false);
    }, 5000);
  };
  return (
    <div className={`form-container  hide-scrollbar`}>
      <div className={classes.registerNumberForm}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            surName: "",
            confirmPassword: "",
            jobTitle: "",
            companyName: "",
            phoneNumber: localStorage.getItem("phoneNumber") ?? "",
            dialCode: localStorage.getItem("dialCode") ?? "",
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
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="text-field"
                  name="firstName"
                  label="First name"
                  placeholder={t("auth.register.first_name")}
                  inputValue={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.firstName && touched.firstName && errors.firstName}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="text-field"
                  name="surName"
                  label="Surname"
                  placeholder={t("auth.register.sur_name")}
                  inputValue={values.surName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.surName && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.surName && touched.surName && errors.surName}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="text-field"
                  subType="email"
                  name="email"
                  label="Email"
                  placeholder={t("auth.register.email")}
                  inputValue={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={false}
                />
                {errors.email && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.email && touched.email && errors.email}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="text-field"
                  name="companyName"
                  label="Company name"
                  placeholder={t("auth.register.company_name")}
                  inputValue={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={false}
                />
                {errors.companyName && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.companyName &&
                      touched.companyName &&
                      errors.companyName}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="text-field"
                  name="jobTitle"
                  label="Job title"
                  placeholder={t("auth.register.job_title")}
                  inputValue={values.jobTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.jobTitle && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.jobTitle && touched.jobTitle && errors.jobTitle}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  typeName="phone-number"
                  name="phoneNumber"
                  inputValue={{
                    phoneNumber: values.phoneNumber,
                    dialCode: values.dialCode,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  inputValue={values.password}
                  password={values.password}
                  typeName="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.password && touched.password && errors.password}
                  </Typography>
                )}
              </CBox>
              <CBox mb={3.1}>
                <CustomMuiTextField
                  password={values.confirmPassword}
                  name="confirmPassword"
                  label="Confirm password"
                  placeholder="Confirm password"
                  typeName="password"
                  inputValue={values.confirmPassword}
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
              </CBox>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderColor: "red",
                      color: "red",
                      textTransform: "capitalize !important",
                    }}
                    onClick={() => history.push("/login")}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      borderColor: "#000",
                      color: "#fff",
                      textTransform: "capitalize !important",
                    }}
                    type="submit"
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
