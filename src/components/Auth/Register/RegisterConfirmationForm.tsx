import { Box, Button, Grid, Typography } from "@mui/material";
import Setting from "components/Setting";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";
import AuthLayout from "../AuthLayout/AuthLayout";
import { registerConfirmationRequest } from "redux/action/auth.action";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useResponsive from "hooks/useResponsive";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";

export default function RegisterConfirmationForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const isTabletOrMobile = useResponsive("down", "md", "");

  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = (values: any, action: any) => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    let dialCode = localStorage.getItem("dialCode");
    const { verificationCode } = values;
    const payload = {
      body: {
        phoneNumber: `${dialCode}${phoneNumber}`,
        otp: verificationCode,
      },
      success: (res: any) => {
        history.push("/t&c");
        action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      },
    };
    dispatch(registerConfirmationRequest(payload));
    setTimeout(() => {
      setIncorrectAuth(false);
    }, 5000);
  };
  return (
    <AuthLayout
      title={t("auth.phone_number_confirmation")}
      subTitle={t("auth.enter_your_phone_no")}
    >
      <div className={classes.registerNumberForm}>
        {isTabletOrMobile && (
          <div>
            <TopBarTitle sx={{ fontSize: 28 }}>Get started</TopBarTitle>
            <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
              by entering your phone number
            </SubLabelTag>
          </div>
        )}
        <Formik
          initialValues={{
            verificationCode: "",
          }}
          // validationSchema={registerSch}
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
              <CBox mb={3.1}>
                <CustomMuiTextField
                  name="verificationCode"
                  typeName="text-field"
                  label="Enter your code"
                  placeholder="Enter your code"
                  inputValue={values.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.verificationCode && touched.verificationCode && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.verificationCode}
                  </Typography>
                )}
              </CBox>
              <div style={{ marginBottom: "24px" }}>
                <Typography>
                  {t("auth.didnot_receive_code")}{" "}
                  <Link to="/login" className={classes.signup}>
                    {t("auth.send_again")}
                  </Link>
                </Typography>
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Box className={classes.dontHave} sx={{ color: "#131516" }}>
        {t("auth.back_to")}{" "}
        <Link to="/login" className={classes.signup}>
          Login
        </Link>
      </Box>
    </AuthLayout>
  );
}
