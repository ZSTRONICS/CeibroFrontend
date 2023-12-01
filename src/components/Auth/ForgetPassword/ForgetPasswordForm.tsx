import { useRef, useState } from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { CustomStack } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import CryptoJS from "crypto-js";
import { Formik, FormikProps } from "formik";
import userAlertMessage from "hooks/userAlertMessage";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "utills/axios";
import { handlePhoneChange } from "utills/formFunctions";
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

  const formikRef = useRef<FormikProps<FormValues>>(null);
  const forgotPasswordSchema = forgotPasswordSchemaValidation(t);
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const isDisabled = !loading ? false : true;
  const convertToBytes = (str: string) => CryptoJS.enc.Utf8.parse(str);
  const encryptData = (data: any) => {
    const apiKey: string = process.env.REACT_APP_SECRET_KEY || "";
    const baselV: string = process.env.REACT_APP_SECRET_IV || "";
    // if (apiKey !== "" && baselV !== "") {
    var sKey = convertToBytes("C++BR0@uthS@Cre+AUTHVYU*B++%I*%+").toString();
    var sIV = convertToBytes("C++BR0@uthS@Cre+").toString();
    const secretKey = CryptoJS.enc.Hex.parse(sKey);
    const secretIV = CryptoJS.enc.Hex.parse(sIV);
    const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
      iv: secretIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return encryptedHex;
    // }
  };

  const handleSubmit = (values: any) => {
    const { phoneNumber, dialCode } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    const encryptedHex = encryptData(`${dialCode}${phoneNumber}`);
    console.log(encryptedHex);
    const getAuthToken = {
      body: {
        clientId: encryptedHex,
      },
      success: async (res: any) => {
        console.log("res===>", res.data.access.token);
        try {
          const response = await axios
            .post(
              `${SERVER_URL}/v2/auth/forget-password`,
              { phoneNumber: encryptData(`${dialCode}${phoneNumber}`) },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${res.data.access.token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              history.push("/forget-confirmation");
            });
          console.log("Response:", response);
        } catch (error) {
          console.error("Error:", error);
        }
      },
      onFailAction: (err: any) => {
        setLoading(false);
      },
      finallyAction: () => {
        // const payload = {
        //   body: {
        //   },
        //   otpToken: localRes.data.access.token,
        //   success: (res: any) => {
        //     setShowSuccess(true);
        //     setAlertMessage(res.data.message);
        //     setTimeout(() => {
        //       setShowSuccess(false);
        //     }, 2000);
        //   },
        //   onFailAction: (err: any) => {
        //     setAlertMessage(err.response.data.message);
        //   },
        //   finallyAction: () => {
        //     setLoading(false);
        //   },
        // };
        // dispatch(forgetPassword(payload));
      },
    };
    dispatch(getAuthApiToken(getAuthToken));

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
                {isDisabled && loading && (
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
