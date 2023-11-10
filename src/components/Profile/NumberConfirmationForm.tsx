import { Button, Typography } from "@mui/material";
import { SubLabelTag } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import userAlertMessage from "hooks/userAlertMessage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  authApiAction,
  logoutUser,
  verifyChangeNumber,
} from "redux/action/auth.action";
import { LOGIN_ROUTE } from "utills/axios";
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

  const handleResend = (values: any) => {
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
    <div>
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
