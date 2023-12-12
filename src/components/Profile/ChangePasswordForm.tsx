import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { changePasswordSchemaValid } from "components/Auth/userSchema/AuthSchema";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changePassword, logoutUser } from "redux/action/auth.action";
import { LOGIN_ROUTE } from "utills/axios";

interface IProps {
  closeDialog: (text?: string) => void;
}

const ChangePasswordForm = (props: IProps) => {
  const { t }: any = useTranslation<any>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = (values: any, action: any) => {
    const { newPassword, oldPassword } = values;
    const payload = {
      body: { newPassword, oldPassword },
      success: (res: any) => {
        setError(false);
        setSuccess(true);
        setLoading(false);
        props.closeDialog();
        dispatch(logoutUser());
        history.push(LOGIN_ROUTE);
      },
      onFailAction: (err: any) => {
        if (err.response.data.code >= 400) {
          setError(true);
          setErrorMsg(err.response.data.message);
        }
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 10000);
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false);
      },
    };
    // setLoading(true);
    dispatch(changePassword(payload));
  };

  function checkValidInputs(values: any) {
    if (
      values.oldPassword &&
      values.newPassword.length > 3 &&
      values.confirmPassword &&
      values.confirmPassword.length > 3
    ) {
      return false;
    }
    return true;
  }

  const resetPasswordSchema = changePasswordSchemaValid(t);

  return (
    <div className={`form-container hide-scrollbar`}>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
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
            {success && (
              <Alert severity="success">
                {`${t("auth.password_reset_successfully")}`}
              </Alert>
            )}

            {error && <Alert severity="error">{errorMsg}</Alert>}
            <CBox mb={2.7} pt={1.2}>
              <CustomMuiTextField
                password={values.oldPassword}
                placeholder="Password"
                name="oldPassword"
                label="Old password"
                typeName="password"
                inputValue={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.oldPassword && touched.oldPassword && (
                <Typography className={`error-text`}>
                  {errors.oldPassword}
                </Typography>
              )}
            </CBox>
            <CBox mb={2.7}>
              <CustomMuiTextField
                password={values.newPassword}
                placeholder="Password"
                name="newPassword"
                label="New password"
                typeName="password"
                inputValue={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.newPassword && touched.newPassword && (
                <Typography className={`error-text`}>
                  {errors.newPassword}
                </Typography>
              )}
            </CBox>

            <CBox mb={2.7}>
              <CustomMuiTextField
                password={values.confirmPassword}
                placeholder="Password"
                name="confirmPassword"
                label="Confirm new password"
                typeName="password"
                inputValue={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CBox>
            {errors.confirmPassword && (
              <Typography className={`error-text `}>
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%", backgroundColor: "#0075D0", padding: 1 }}
              disabled={checkValidInputs(values)}
            >
              {t("auth.confirm")}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
