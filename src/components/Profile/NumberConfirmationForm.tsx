import { Button, Typography } from "@mui/material";
import axios from "axios";
import { SubLabelTag } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { encryptData } from "components/Utills/Globals";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import userAlertMessage from "hooks/userAlertMessage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuthApiToken,
  logoutUser,
  verifyChangeNumber,
} from "redux/action/auth.action";
import { RootState } from "redux/reducers";
import { LOGIN_ROUTE, SERVER_URL } from "utills/axios";
import { checkValidPhoneNumber } from "utills/formFunctions";
import useStyles from "../Auth/Register/RegisterStyles";

interface IProps {
  closeDialog: (text?: string) => void;
  newNumber: string;
}

export default function NumberConfirmationForm(props: IProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [counter, setCounter] = useState(60);
  let timer: false | NodeJS.Timer;
  const countryCodeName = useSelector(
    (state: RootState) => state.user.countryCodeName
  );
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
    const { verificationCode } = values;
    const payload = {
      body: {
        newNumber: props.newNumber,
        otp: verificationCode,
      },
      success: (res: any) => {
        props.closeDialog();
        dispatch(logoutUser());
        history.push(LOGIN_ROUTE);
      },
      onFailAction: (err: any) => {
        setAlertMessage(err.response.data.message);
      },
    };
    dispatch(verifyChangeNumber(payload));
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

  const handleResend = (values: any) => {
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
    <div style={{ padding: "7px 14px" }}>
      <SubLabelTag sx={{ fontSize: { xs: 12, md: 14 }, mb: 2 }}>
        Confirmation code sent to your phone
      </SubLabelTag>
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
            <div style={{ marginBottom: "24px" }}>
              {counter > 0 ? (
                <Typography>
                  {t("auth.didnot_receive_code")}{" "}
                  <span className={classes.signup} style={{ color: "grey" }}>
                    {`${counter} ${t("auth.seconds_left")}`}
                  </span>
                </Typography>
              ) : (
                <Typography>
                  {t("auth.didnot_receive_code")}{" "}
                  <span
                    className={classes.signup}
                    onClick={(values: any) => handleResend(values)}
                  >
                    {t("auth.send_again")}
                  </span>
                </Typography>
              )}
            </div>
            <MessageAlert
              message={alertMessage}
              severity={"error"}
              showMessage={showAlert}
            />
            <div className={classes.actionWrapper}>
              <Button
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
  );
}
