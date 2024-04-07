import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { encryptData } from "components/Utills/Globals";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Form, Formik, FormikProps } from "formik";
import useResponsive from "hooks/useResponsive";
import userAlertMessage from "hooks/userAlertMessage";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAuthApiToken } from "redux/action/auth.action";
import { RootState } from "redux/reducers";
import { LOGIN_ROUTE, SERVER_URL } from "utills/axios";
import {
  checkValidPhoneNumber,
  handlePhoneChange,
} from "../../../utills/formFunctions";
import AuthLayout from "../AuthLayout/AuthLayout";
import { RegisterNumberSchema } from "../userSchema/AuthSchema";
import useStyles from "./RegisterStyles";

type FormValues = {
  dialCode: string;
  phoneNumber: string;
};

export default function RegisterNumberForm() {
  const { t }: any = useTranslation<any>();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const registerPhoneNumberSchema = RegisterNumberSchema(t);
  const countryCodeName = useSelector(
    (state: RootState) => state.user.countryCodeName
  );

  const formikRef = useRef<FormikProps<FormValues | any>>(null);
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [isSumit, setIsSubmit] = useState<boolean>(false);

  const getRegisterNumberOtp = async (data: any) => {
    setIsSubmit(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/v2/auth/register`,
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
      }
    } catch (error: any) {
      if (error.response) {
        handleError(error.response.data);
        console.error("Server Error:", error);
      }
    }
  };
  const handleSuccess = (data: any) => {
    history.push("/confirmation");
    setShowSuccessAlert(true);
    setIsSubmit(false);
    setAlertMessage(data.message);
  };

  const handleError = (error: any) => {
    setAlertMessage(error.message);
    setIsSubmit(false);
  };

  const handleSubmit = (values: any, action: any) => {
    const { dialCode, phoneNumber } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    const encryptedHex = encryptData(`${dialCode}${phoneNumber}`);
    const getAuthToken = {
      body: {
        clientId: encryptedHex,
      },
      success: async (res: any) => {
        if (res) {
          getRegisterNumberOtp({
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
      setIsSubmit(false);
    }
  };

  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <Box className={classes.registerNumberFormContainer}>
      <AuthLayout
        title={t("auth.get_started_heading")}
        subTitle={t("auth.enter_your_phone_number")}
      >
        {isTabletOrMobile && (
          <div className={classes.registerNumberForm}>
            <div>
              <TopBarTitle sx={{ fontSize: 28 }}>Get started</TopBarTitle>
              <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
                by entering your phone number
              </SubLabelTag>
            </div>
          </div>
        )}

        <div className={classes.registerNumberForm}>
          <Formik
            initialValues={{
              dialCode: "+372",
              phoneNumber: "",
            }}
            validationSchema={registerPhoneNumberSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ values, errors, touched, handleBlur, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <CBox mb={3}>
                  <CustomMuiTextField
                    typeName="phone-number"
                    name="phoneNumber"
                    inputValue={{
                      phoneNumber: values.phoneNumber,
                      dialCode: values.dialCode,
                    }}
                    onChange={(e, value) =>
                      handlePhoneChange(e, formikRef, value)
                    }
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Typography className={`error-text`}>
                      {errors.phoneNumber as string}
                    </Typography>
                  )}
                </CBox>
                <MessageAlert
                  message={alertMessage}
                  severity={showSuccessAlert === true ? "success" : "error"}
                  showMessage={showAlert}
                />
                <div className={classes.actionWrapper}>
                  <Button
                    sx={{ py: { xs: 1, md: 1.5 } }}
                    className={classes.loginButton}
                    disabled={values.phoneNumber.length === 0 || isSumit}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {t("auth.continue_heading")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <Box className={classes.dontHave} sx={{ color: "#131516" }}>
          {t("auth.back_to")}{" "}
          <Link to={LOGIN_ROUTE} className={classes.signup}>
            {t("auth.login")}
          </Link>
        </Box>
      </AuthLayout>
    </Box>
  );
}
