import { Box } from "@mui/material";
import axios from "axios";
import { TopBarTitle } from "components/CustomTags";
import { encryptData } from "components/Utills/Globals";
import useResponsive from "hooks/useResponsive";
import userAlertMessage from "hooks/userAlertMessage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuthApiToken, otpVerify } from "redux/action/auth.action";
import { RootState } from "redux/reducers";
import { LOGIN_ROUTE, SERVER_URL } from "utills/axios";
import { checkValidPhoneNumber } from "utills/formFunctions";
import AuthLayout from "../AuthLayout/AuthLayout";
import VerificationForm from "../CommonForm/VerificationForm";
import useStyles from "../Register/RegisterStyles";

const ForgetConfirmation: React.FC = () => {
  const { t }: any = useTranslation<any>();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<number>(60);
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { alertMessage, showAlert, setAlertMessage } = userAlertMessage();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const countryCodeName = useSelector(
    (state: RootState) => state.user.countryCodeName
  );
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

  const getResendOtp = async (data: any) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/v2/auth/otp/resend`,
        { phoneNumber: `${data.dialCode}${data.phoneNumber}` },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (response.data) {
        handleSuccess(response.data);
        console.log("Response:", response.data);
      }
    } catch (error: any) {
      if (error.response) {
        handleError(error.response.data);
        console.error("Server Error:", error);
      }
    }
  };
  const handleSuccess = (data: any) => {
    toast.success(data.message);
    setCounter(60);
    startCountdown();
  };

  const handleError = (error: any) => {
    setAlertMessage(error.message);
  };

  const handleResend = () => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    let dialCode = localStorage.getItem("dialCode");
    const encryptedHex = encryptData(`${dialCode}${phoneNumber}`);
    const getAuthToken = {
      body: {
        clientId: encryptedHex,
      },
      success: async (res: any) => {
        if (res) {
          getResendOtp({
            dialCode: dialCode,
            phoneNumber: phoneNumber,
            token: res.data.access.token,
          });
        }
      },
    };

    const checkPhoneNumber = checkValidPhoneNumber(
      `${dialCode}${phoneNumber}`,
      countryCodeName
    );
    if (checkPhoneNumber?.isValid) {
      dispatch(getAuthApiToken(getAuthToken));
    } else {
      setAlertMessage(checkPhoneNumber.msg);
    }
  };

  return (
    <AuthLayout
      title={t("auth.phone_number_confirmation_heading")}
      // subTitle={t("auth.enter_your_phone_no")}
    >
      <div className={classes.registerNumberForm}>
        {isTabletOrMobile && (
          <TopBarTitle sx={{ fontSize: { md: 28, xs: 20 }, pb: 2 }}>
            {t("auth.phone_number_confirmation_heading")}
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
