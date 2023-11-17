import { Box, Button, Typography } from "@mui/material";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Form, Formik, FormikProps } from "formik";
import useResponsive from "hooks/useResponsive";
import userAlertMessage from "hooks/userAlertMessage";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerRequest } from "redux/action/auth.action";
import { LOGIN_ROUTE } from "utills/axios";
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
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const registerPhoneNumberSchema = RegisterNumberSchema(t);
  const formikRef = useRef<FormikProps<FormValues | any>>(null);
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [isSumit, setIsSubmit] = useState<boolean>(false);
  const handleSubmit = (values: any, action: any) => {
    const { dialCode, phoneNumber } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    setIsSubmit(true);
    const payload = {
      body: {
        phoneNumber: dialCode + phoneNumber,
      },
      success: (res: any) => {
        history.push("/confirmation");
        action?.resetForm?.();
        setShowSuccessAlert(true);
        setIsSubmit(false);
        setAlertMessage(res.data.message);
      },
      onFailAction: (err: any) => {
        setAlertMessage(err.response.data.message);
        setIsSubmit(false);
      },
    };
    const checkPhoneNumber = checkValidPhoneNumber(`${dialCode}${phoneNumber}`);
    if (checkPhoneNumber?.isValid) {
      dispatch(registerRequest(payload));
    } else {
      setAlertMessage(checkPhoneNumber.msg);
    }
  };

  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <Box className={classes.registerNumberFormContainer}>
      <AuthLayout
        title={t("auth.get_started")}
        subTitle={t("auth.enter_your_phone_no")}
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
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
                    Continue
                  </Button>
                </div>
              </Form>
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
    </Box>
  );
}
