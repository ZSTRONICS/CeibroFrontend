import { Button, CircularProgress, Typography } from "@mui/material";
import colors from "assets/colors";
import { CustomStack } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import userAlertMessage from "hooks/userAlertMessage";
import queryString from "query-string";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { resetPassword } from "redux/action/auth.action";
import { LOGIN_ROUTE } from "utills/axios";
import { resetPasswordSchemaValidation } from "../userSchema/AuthSchema";

const ResetPasswordForm = () => {
  const { t }: any = useTranslation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { alertMessage, showAlert, setAlertMessage } = userAlertMessage();

  const isDiabled = !loading ? false : true;

  const handleSubmit = (values: any, action: any) => {
    const { password } = values;
    const queryParams = queryString.parse(history?.location?.search);
    let phoneNumber = localStorage.getItem("phoneNumber");
    let dialCode = localStorage.getItem("dialCode");
    let otp = localStorage.getItem("otp");
    const payload = {
      body: { password, phoneNumber: `${dialCode}${phoneNumber}`, otp },
      success: (res: any) => {
        setSuccess(res);
        if (res) {
          localStorage.clear();
          history.push(LOGIN_ROUTE);
        }
        // toast.success(`${t("auth.password_reset_successfully")}`);
        toast.success(`${t("Password Reset Successfully")}`);
        action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        setAlertMessage(err.response.data.message);
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: queryParams?.token,
    };
    setLoading(true);
    dispatch(resetPassword(payload));
  };

  const resetPasswordSchema = resetPasswordSchemaValidation(t);

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <CBox sx={{ mx: { xs: 1, md: 0 } }}>
              <CBox mb={2} pt={2}>
                <CustomMuiTextField
                  inputValue={values.password}
                  password={values.password}
                  typeName="password"
                  name="password"
                  label={t("auth.password")}
                  placeholder={t("auth.password")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <Typography className={`error-text`}>
                    {errors.password && touched.password && errors.password}
                  </Typography>
                )}
              </CBox>

              <CBox mb={1}>
                <CustomMuiTextField
                  password={values.confirmPassword}
                  name="confirmPassword"
                  label={t("auth.confirm_password")}
                  placeholder={t("auth.confirm_password")}
                  typeName="password"
                  inputValue={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && (
                  <Typography className={`error-text`}>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </Typography>
                )}
              </CBox>

              <MessageAlert
                message={alertMessage}
                severity={success === true ? "success" : "error"}
                showMessage={showAlert}
              />
              <CustomStack>
                <Button
                  sx={{ width: "100%", py: { xs: 1, md: 1.5 } }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    values.password.length < 6 ||
                    values.confirmPassword.length < 6 ||
                    loading
                  }
                >
                  {isDiabled && loading && (
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
                  {t("auth.reset_password")}
                </Button>
              </CustomStack>
            </CBox>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
