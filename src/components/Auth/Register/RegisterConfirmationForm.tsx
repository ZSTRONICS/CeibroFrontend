import { Box, Button, Grid, Typography } from "@mui/material";
import Setting from "components/Setting";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";
import AuthLayout from "../AuthLayout/AuthLayout";
import {
  authApiAction,
  registerConfirmationRequest,
} from "redux/action/auth.action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useResponsive from "hooks/useResponsive";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import { toast } from "react-toastify";

export default function RegisterConfirmationForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const isTabletOrMobile = useResponsive("down", "md", "");

  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(60);
  let timer: false | NodeJS.Timer;

  useEffect(() => {
    timer = startCountdown();
    return () => {
      timer && clearInterval(timer);
    };
  }, [counter]);

  function startCountdown() {
    timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    setTimeout(() => {
      timer && clearInterval(timer); // stop the countdown after 60 seconds
    }, 60000); // 60 seconds (60000 milliseconds)

    return timer;
  }

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
  const handleResend = () => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    let dialCode = localStorage.getItem("dialCode");
    const payload = {
      body: {
        phoneNumber: `${dialCode}${phoneNumber}`,
      },
      success: (res: any) => {
        toast.success(res.data.message);
        setCounter(60);
        startCountdown();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      },
    };
    dispatch(authApiAction.resendOtpRequest(payload));
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
              <div style={{ marginBottom: "26px" }}>
                {counter > 0 ? (
                  <Typography>
                    {t("auth.didnot_receive_code")}{" "}
                    <span style={{ color: "grey" }}>
                      {`${counter} ${t("auth.seconds_left")}`}
                    </span>
                  </Typography>
                ) : (
                  <Typography>
                    {t("auth.didnot_receive_code")}{" "}
                    <span className={classes.signup} onClick={handleResend}>
                      {t("auth.send_again")}
                    </span>
                  </Typography>
                )}
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  sx={{ py: { xs: 0.5, md: 1.5 } }}
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={values.verificationCode.length < 1}
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
