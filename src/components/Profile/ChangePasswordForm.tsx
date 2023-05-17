import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import assets from "assets/assets";
import colors from "assets/colors";
import TextField from "components/Utills/Inputs/TextField";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetPassword } from "redux/action/auth.action";
import { RootState } from "redux/reducers";
import Loading from "components/Utills/Loader/Loading";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import queryString from "query-string";
import CustomImg from "components/CustomImg";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";

interface IProps {
  closeDialog: (text?: string) => void;
}

const ChangePasswordForm = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const isDisabled = !loading ? false : true;

  const handleSubmit = (values: any, action: any) => {
    const { newPassword, oldPassword } = values;
    const payload = {
      body: { newPassword, oldPassword },
      success: (res: any) => {
        setLoading(false);
        props.closeDialog();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 401) {
          setError(true);
        }
        setTimeout(() => {
          setError(false);
        }, 10000);
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(changePassword(payload));
  };

  // const resetPasswordSchema = resetPasswordSchemaValidation(t);

  return (
    <div className={`form-container ${classes.wrapper} hide-scrollbar`}>
      <div className={classes.loginForm}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          // validationSchema={resetPasswordSchema}
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
              {(success || loading) && (
                <Alert severity="success">
                  {loading
                    ? `${t("auth.forgot_pass.verifying")}`
                    : `${t("auth.password_reset_successfully")}`}
                </Alert>
              )}

              {error && (
                <Alert severity="error">
                  {t("auth.password_reset_failed")}
                </Alert>
              )}
              <CBox mb={2.7}>
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
                  <Typography className={`error-text ${classes.errorText}`}>
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
                  <Typography className={`error-text ${classes.errorText}`}>
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
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </Typography>
              )}

              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  //   disabled={!isValid || registerLoading}
                  disabled={isDisabled}
                >
                  {isDisabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  {t("auth.confirm")}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

const useStyles = makeStyles({
  positionEnd: {
    marginLeft: "-50px",
  },
  endAornmnetBtn: {
    marginRight: 0,
  },
  wrapper: {
    minHeight: "94%",
    overflowY: "auto",
    marginBottom: 20,
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: "Inter",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: 0,
    padding: "10px 13%",
    "@media (max-width:960px)": {
      padding: "10 13%",
    },
  },
  remember: {
    marginTop: 25,
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
  },
  inputs: {
    marginTop: 30,
    height: 8,
    width: "100%",
  },
  loginButton: {
    height: 40,
    fontSize: 13,

    fontWeight: 500,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "7%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "12.5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
