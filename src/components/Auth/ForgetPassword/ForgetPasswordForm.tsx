import React, { useRef, useState } from "react";

import { Typography, Button, CircularProgress } from "@mui/material";
import colors from "../../../assets/colors";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/action/auth.action";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import { forgotPasswordSchemaValidation } from "../userSchema/AuthSchema";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { CBox } from "components/material-ui";
import { CustomStack } from "components/CustomTags";
import { handlePhoneChange } from "utills/formFunctions";

interface Props {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}
type FormValues = {
  dialCode: string;
  phoneNumber: string;
};
const ForgetPasswordForm: React.FC<Props> = (props) => {
  const { tokenLoading, showSuccess, showError } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const forgotPasswordSchema = forgotPasswordSchemaValidation(t);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailFoundErr, setEmailFound] = useState<boolean>(false);
  const isDisabled = !loading ? false : true;
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const history = useHistory();

  const handleKeyDown = (e: any, values: any) => {
    if (e.keyCode === 13) {
      handleSubmit(values);
    }
  };

  const handleSubmit = (values: any) => {
    const { phoneNumber, dialCode } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    const payload = {
      body: { phoneNumber: `${dialCode}${phoneNumber}` },
      success: (res: any) => {
        toast.success(res.data.message);
        history.push("/forget-confirmation");
      },
      onFailAction: (err: any) => {},
      finallyAction: () => {
        setLoading(false);
      },
    };

    setTimeout(() => {
      setEmailFound(false);
    }, 5000);

    setLoading(true);
    dispatch(forgetPassword(payload));
  };
  const checkValidInputs = (values: any) => {
    const { phoneNumber, dialCode } = values;
    if (phoneNumber && phoneNumber.length > 4) {
      return false;
    }
    return true;
  };
  return (
    <div>
      {(showSuccess || tokenLoading) && (
        <Alert severity="success">
          {tokenLoading
            ? `${t("auth.forgot_pass.verifying")}`
            : `${t("auth.forgot_pass.email_verify_successfully")}`}
        </Alert>
      )}
      {/* {emailFoundErr && (
        <Alert style={{ margin: "2px 0" }} severity="error">
          {t("auth.noUserFound_with_email")}
        </Alert>
      )} */}

      {showError && <Alert severity="error">{t("auth.link_expired")}</Alert>}
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
          <Form onSubmit={handleSubmit}>
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
            <CustomStack pt={2.4}>
              <Button
                type="submit"
                // className={classes.loginButton}
                variant="contained"
                color="primary"
                disabled={checkValidInputs(values)}
              >
                {isDisabled && loading && (
                  <CircularProgress
                    size={20}
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
              <span style={{ paddingLeft: 15, fontSize: 14, fontWeight: 600 }}>
                {t("auth.Remember")}
                <Link to={"/login"}>{t("auth.login")}</Link>
              </span>
            </CustomStack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPasswordForm;
