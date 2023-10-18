import { Box } from "@mui/material";
import { TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import userAlertMessage from "hooks/userAlertMessage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authApiAction, otpVerify } from "redux/action/auth.action";
import { LOGIN_ROUTE } from "utills/axios";
import AuthLayout from "../AuthLayout/AuthLayout";
import VerificationForm from "../CommonForm/VerificationForm";
import useStyles from "../Register/RegisterStyles";

const ForgetConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<number>(60);
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { alertMessage, showAlert, setAlertMessage } = userAlertMessage();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timer = startCountdown();
    return () => {
      clearInterval(timer);
    };
  }, []);

  function startCountdown() {
    const timer = setInterval(
      () => setCounter((prevCounter) => prevCounter - 1),
      1000
    );

    setTimeout(() => {
      clearInterval(timer);
    }, 60000);

    return timer;
  }

  const handleSubmit = (
    values: { verificationCode: string },
    { resetForm }: any
  ) => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    let dialCode = localStorage.getItem("dialCode");
    const { verificationCode } = values;
    // store temp otp code
    localStorage.setItem("otp", verificationCode);
    const payload = {
      body: {
        phoneNumber: `${dialCode}${phoneNumber}`,
        otp: verificationCode,
      },
      success: (res: any) => {
        setShowSuccess(true);
        setAlertMessage(res.data.message);
        setTimeout(() => {
          history.push("/reset-password");
          setShowSuccess(false);
        }, 2000);
        resetForm();
      },
      onFailAction: (err: any) => {
        //remove otp if enter wrong otp or failed
        localStorage.removeItem("otp");
        setAlertMessage(err.response.data.message);
      },
    };
    dispatch(otpVerify(payload));
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
        setAlertMessage(err.response.data.message);
      },
    };
    dispatch(authApiAction.resendOtpRequest(payload));
  };

  return (
    <AuthLayout
      title={t("auth.phone_number_confirmation")}
      // subTitle={t("auth.enter_your_phone_no")}
    >
      <div className={classes.registerNumberForm}>
        {isTabletOrMobile && (
          <TopBarTitle sx={{ fontSize: { md: 28, xs: 20 }, pb: 2 }}>
            {t("auth.phone_number_confirmation")}
          </TopBarTitle>
        )}
        <VerificationForm
          onSubmit={handleSubmit}
          counter={counter}
          handleResend={handleResend}
          alertMessage={alertMessage}
          showAlert={showAlert}
          showSuccess={showSuccess}
        />
      </div>
      <Box className={classes.dontHave} sx={{ color: "#131516" }}>
        {t("auth.back_to")}{" "}
        <Link to={LOGIN_ROUTE} className={classes.signup}>
          Login
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default ForgetConfirmation;
