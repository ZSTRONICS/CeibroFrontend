import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useStyles from "../Register/RegisterStyles";
import AuthLayout from "../AuthLayout/AuthLayout";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import {
  otpVerify,
  registerConfirmationRequest,
} from "redux/action/auth.action";
import { authApiAction } from "redux/action/auth.action";
import VerificationForm from "../CommonForm/VerificationForm";
import { Box } from "@mui/material";

const ForgetConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<number>(60);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);

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
        history.push("/reset-password");
        resetForm();
      },
      onFailAction: (err: any) => {
        //remove otp if enter wrong otp or failed
        localStorage.removeItem("otp");
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      },
    };
    dispatch(otpVerify(payload));
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
        {/* <TopBarTitle sx={{ fontSize: 28 }}>Get started</TopBarTitle>
        <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
          by entering your phone number
        </SubLabelTag> */}
        <VerificationForm
          onSubmit={handleSubmit}
          counter={counter}
          handleResend={handleResend}
          incorrectAuth={incorrectAuth}
        />
      </div>
      <Box className={classes.dontHave} sx={{ color: "#131516" }}>
        {t("auth.back_to")}{" "}
        <Link to="/login" className={classes.signup}>
          Login
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default ForgetConfirmation;
