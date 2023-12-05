import { useRef, useState } from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { CustomStack } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { encryptData } from "components/Utills/Globals";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik, FormikProps } from "formik";
import userAlertMessage from "hooks/userAlertMessage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/reducers";
import { SERVER_URL } from "utills/axios";
import { checkValidPhoneNumber, handlePhoneChange } from "utills/formFunctions";
import colors from "../../../assets/colors";
import { getAuthApiToken } from "../../../redux/action/auth.action";
import { forgotPasswordSchemaValidation } from "../userSchema/AuthSchema";

type FormValues = {
  dialCode: string;
  phoneNumber: string;
};

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const countryCodeName = useSelector(
    (state: RootState) => state.user.countryCodeName
  );
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const forgotPasswordSchema = forgotPasswordSchemaValidation(t);
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const getResetPassOtp = async (data: any) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/v2/auth/forget-password`,
        { phoneNumber: `${data.dialCode}${data.phoneNumber}` },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (response.data) {
        history.push("/forget-confirmation");
        setLoading(false);
        setShowSuccess(true);
        setAlertMessage(response.data.message);
        // console.log("Response:", response.data);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        setAlertMessage(error.message);
        // console.error("Server Error:", error);
      }
    }
  };

  const handleSubmit = (values: any) => {
    const { phoneNumber, dialCode } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    const encryptedHex = encryptData(`${dialCode}${phoneNumber}`);
    const getAuthToken = {
      body: {
        clientId: encryptedHex,
      },
      success: async (res: any) => {
        if (res) {
          getResetPassOtp({
            dialCode: dialCode,
            phoneNumber: phoneNumber,
            token: res.data.access.token,
          });
        }
      },
      onFailAction: (err: any) => {
        setLoading(false);
      },
      finallyAction: () => {},
    };
    const checkPhoneNumber = checkValidPhoneNumber(
      `${dialCode}${phoneNumber}`,
      countryCodeName
    );
    if (checkPhoneNumber?.isValid) {
      dispatch(getAuthApiToken(getAuthToken));
    } else {
      setAlertMessage(checkPhoneNumber.msg);
      setLoading(false);
    }
    if (phoneNumber.length <= 4) {
      setAlertMessage("Invalid phone number");
      return;
    }
  };
  const checkValidInputs = (values: any) => {
    const { phoneNumber, dialCode } = values;
    if (phoneNumber && phoneNumber.length > 4) {
      return false;
    }
    return true;
  };
  return (
    <Formik
      initialValues={{ phoneNumber: "", dialCode: "+372" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={handleSubmit}
      innerRef={formikRef}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          <Box
            sx={{
              "@media (max-width:760px)": {
                px: 1,
              },
            }}
          >
            <CBox mb={1.5} mt={3}>
              <CustomMuiTextField
                name="phoneNumber"
                typeName="phone-number"
                inputValue={{
                  phoneNumber: values.phoneNumber,
                  dialCode: values.dialCode,
                }}
                onChange={(e, value) => handlePhoneChange(e, formikRef, value)}
                onBlur={handleBlur}
              />
            </CBox>
            {errors.phoneNumber && touched.phoneNumber && (
              <Typography className={`error-text`}>
                {errors.phoneNumber}
              </Typography>
            )}
            <MessageAlert
              message={alertMessage}
              severity={showSuccess === true ? "success" : "error"}
              showMessage={showAlert}
            />

            <CustomStack pt={2.4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={checkValidInputs(values) || loading}
                sx={{ width: "100%" }}
              >
                {loading && (
                  <CircularProgress
                    size={15}
                    sx={{
                      color: colors.primary,
                      position: "absolute",
                      zIndex: 1,
                      margin: "auto",
                      left: 0,
                      right: 0,
                      top: 10,
                      textAlign: "center",
                    }}
                  />
                )}
                {t("auth.send")}
              </Button>
            </CustomStack>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;
