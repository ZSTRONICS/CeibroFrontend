import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { encryptData } from "components/Utills/Globals";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import useResponsive from "hooks/useResponsive";
import userAlertMessage from "hooks/userAlertMessage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuthApiToken,
  registerConfirmationRequest,
} from "redux/action/auth.action";
import { RootState } from "redux/reducers";
import { LOGIN_ROUTE, SERVER_URL } from "utills/axios";
import { checkValidPhoneNumber } from "utills/formFunctions";
import AuthLayout from "../AuthLayout/AuthLayout";
import useStyles from "./RegisterStyles";

export default function RegisterConfirmationForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const countryCodeName = useSelector(
    (state: RootState) => state.user.countryCodeName
  );
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
        action.resetForm();
      },
      onFailAction: (err: any) => {
        setAlertMessage(err.response.data.message);
      },
    };
    dispatch(registerConfirmationRequest(payload));
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
        // console.log("Response:", response.data);
      }
    } catch (error: any) {
      if (error.response) {
        handleError(error.response.data);
        // console.error("Server Error:", error);
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
              <CBox mb={3.1} pt={2}>
                <CustomMuiTextField
                  inputVariant="outlined"
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
              <div style={{ marginBottom: "15px" }}>
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
              <MessageAlert
                message={alertMessage}
                severity={showSuccessAlert === true ? "success" : "error"}
                showMessage={showAlert}
              />
              <div className={classes.actionWrapper}>
                <Button
                  sx={{ py: { xs: 1, md: 1.5 } }}
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={values.verificationCode.length === 6 ? false : true}
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
        <Link to={LOGIN_ROUTE} className={classes.signup}>
          Login
        </Link>
      </Box>
    </AuthLayout>
  );
}
