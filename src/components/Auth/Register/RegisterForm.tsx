import { useRef, useState } from "react";

//react router dom
import { useHistory } from "react-router";

// mui-imports
import Alert from "@mui/material/Alert";

// redux
import { useDispatch } from "react-redux";

// components

// i18next
import { useTranslation } from "react-i18next";
//formik
import { Button, Divider, Grid, Typography } from "@mui/material";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { FormikProps, FormikValues, useFormik } from "formik";
import { authApiAction } from "redux/action";
import { LOGIN_ROUTE } from "utills/axios";
import { setValidationSchema } from "../userSchema/RegisterSchema";
import useStyles from "./RegisterStyles";

const RegisterForm = () => {
  const classes = useStyles();
  const { t }: any = useTranslation<any>();
  const dispatch = useDispatch();
  const history = useHistory();
  const registerSch = setValidationSchema(t);
  const formikRef = useRef<FormikProps<FormikValues | any>>(null);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = (values: any) => {
    const {
      firstName,
      surName,
      email,
      password,
      jobTitle,
      companyName,
      phoneNumber,
      countryCode,
    } = values;

    const payload = {
      body: {
        email,
        password,
        firstName,
        surName,
        jobTitle,
        companyName,
        countryCode,
      },
      success: (res: any) => {
        history.push("/profile-pic");
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
          setErrorMessage(err.response.data.message);
        }
      },
      other: `${countryCode}${phoneNumber}`,
    };
    dispatch(authApiAction.registerSetupProfile(payload));
    setTimeout(() => {
      setIncorrectAuth(false);
    }, 5000);
  };

  const checkValidInputs = (values: {
    email: string;
    firstName: string;
    surName: string;
    password: string;
  }): boolean => {
    const { email, firstName, surName, password } = values;
    return !(
      password &&
      password.length > 7 &&
      email &&
      firstName.length > 0 &&
      surName.length > 0
    );
  };

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      surName: "",
      confirmPassword: "",
      jobTitle: "",
      companyName: "",
      phoneNumber: localStorage.getItem("phoneNumber") ?? "",
      countryCode: localStorage.getItem("dialCode") ?? "",
    },
    innerRef: formikRef,
    validationSchema: registerSch,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const marginBottom = 2.4;
  return (
    <div className={`form-container  hide-scrollbar`}>
      <div
        className={`${classes.registerNumberForm} ${classes.registerNumberFormProfile}`}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          {incorrectAuth && <Alert severity="error">{errorMessage}</Alert>}
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              inputVariant="outlined"
              required={true}
              typeName="text-field"
              name="firstName"
              label="First name *"
              placeholder={t("auth.register.first_name")}
              inputValue={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.firstName && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.firstName as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              inputVariant="outlined"
              required={true}
              typeName="text-field"
              name="surName"
              label="Surname *"
              placeholder={t("auth.register.sur_name")}
              inputValue={formik.values.surName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.surName && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.surName as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              // required={true}
              inputVariant="outlined"
              typeName="text-field"
              subType="email"
              name="email"
              label="Email *"
              placeholder={t("auth.register.email")}
              inputValue={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.email as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              inputVariant="outlined"
              typeName="text-field"
              name="companyName"
              label="Company name"
              placeholder={t("auth.register.company_name")}
              inputValue={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={false}
            />
            {formik.errors.companyName && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.companyName as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              inputVariant="outlined"
              typeName="text-field"
              name="jobTitle"
              label="Job title"
              placeholder={t("auth.register.job_title")}
              inputValue={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.jobTitle && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.jobTitle as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              disabled={true}
              typeName="phone-number"
              name="phoneNumber"
              inputValue={{
                phoneNumber: formik.values.phoneNumber,
                dialCode: formik.values.countryCode,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </CBox>
          <Divider sx={{ mb: 1.8 }} />
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              inputValue={formik.values.password}
              password={formik.values.password}
              typeName="password"
              name="password"
              label="Password *"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // required={true}
            />
            {formik.errors.password && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.password as string}
              </Typography>
            )}
          </CBox>
          <CBox mb={marginBottom}>
            <CustomMuiTextField
              password={formik.values.confirmPassword}
              name="confirmPassword"
              label="Confirm password *"
              placeholder="Confirm password"
              typeName="password"
              inputValue={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword && (
              <Typography className={`error-text ${classes.errorText}`}>
                {formik.errors.confirmPassword as string}
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
                  py: { xs: 0.3, md: 1.3 },
                  textTransform: "capitalize !important",
                }}
                onClick={() => history.push(LOGIN_ROUTE)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  borderColor: "#000",
                  color: "#fff",
                  textTransform: "capitalize !important",
                  backgroundColor: "#0075D0",
                  py: { xs: 0.5, md: 1.5 },
                }}
                disabled={checkValidInputs(formik.values)}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
