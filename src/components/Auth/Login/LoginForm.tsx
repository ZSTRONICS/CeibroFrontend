import React, { useRef, useState } from "react";
//formik
import { Formik, FormikProps, FormikValues } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// react router dom
import { useHistory } from "react-router-dom";

// material
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

// redux
import { useDispatch } from "react-redux";
import { loginRequest } from "redux/action/auth.action";

//toastify

// component
import { AddStatusTag, DocumentNameTag } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import Loading from "components/Utills/Loader/Loading";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import userAlertMessage from "hooks/userAlertMessage";
import { userApiAction } from "redux/action";
import { purgeStoreStates } from "redux/store";
import { checkValidPhoneNumber, handlePhoneChange } from "utills/formFunctions";
import { SigninSchemaValidation } from "../userSchema/AuthSchema";

interface Props {
  tokenLoading: boolean;
  showSuccess: boolean;
}

interface IInputValues {
  dialCode: string;
  phoneNumber: string;
  password: string;
}

const LoginForm: React.FC<Props> = (props) => {
  const { showSuccess } = props;
  const { t } = useTranslation();
  const signinSchema = SigninSchemaValidation(t);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const formikRef = useRef<FormikProps<FormikValues | any>>(null);
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();

  const handleSubmit = (
    values: IInputValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { phoneNumber, password, dialCode } = values;
    if (phoneNumber.length === 0) {
      setAlertMessage("Phone number is not allowed to be empty");
      return;
    }
    if (password.length === 0) {
      setAlertMessage("Password is not allowed to be empty");
      return;
    }

    const payload = {
      body: {
        phoneNumber: `${dialCode}${phoneNumber}`,
        password,
      },

      onFailAction: (err: any) => {
        setShowLoading(false);
        if (err) {
          setAlertMessage(
            err.response.data.message === "Invalid password"
              ? "Incorrect password or invalid phone number"
              : err.response.data.message
          );
        } else {
          // removed stored state
          purgeStoreStates();
        }
      },
      success: (res: any) => {
        dispatch(userApiAction.getUserContacts());
      },
      showErrorToast: false,
    };
    setShowLoading(true);
    const checkPhoneNumber = checkValidPhoneNumber(`${dialCode}${phoneNumber}`);
    if (checkPhoneNumber?.isValid) {
      dispatch(loginRequest(payload));
    } else {
      setAlertMessage(checkPhoneNumber.msg);
      setShowLoading(false);
    }
  };

  const checkValidInputs = (values: any) => {
    const { phoneNumber, password } = values;
    if (
      phoneNumber &&
      phoneNumber.length > 3 &&
      password &&
      password.length > 2
    ) {
      return false;
    }
    return true;
  };

  const handlePasswordForget = () => {
    history.push("/forgot-password");
  };

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            dialCode: "+372",
            phoneNumber: "",
            password: "",
          }}
          validationSchema={signinSchema}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              <CBox mb={2.5} pt={2}>
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
                    {errors.phoneNumber}
                  </Typography>
                )}
              </CBox>
              <CBox mb={2.7}>
                <CustomMuiTextField
                  password={values.password}
                  placeholder="Password"
                  name="password"
                  label="Password"
                  typeName="password"
                  inputValue={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <Typography className={`error-text`}>
                    {errors.password}
                  </Typography>
                )}
              </CBox>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel
                  sx={{ gap: 1 }}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="checkedB"
                      color="primary"
                      style={{ padding: 0 }}
                    />
                  }
                  style={{ padding: 0 }}
                  label={
                    <DocumentNameTag>{t("auth.RememberMe")}</DocumentNameTag>
                  }
                />
                <AddStatusTag
                  sx={{
                    marginBottom: 0,
                    color: "#0075D0",
                    cursor: "pointer",
                  }}
                  onClick={handlePasswordForget}
                >
                  {t("auth.ForgetPassword")}
                </AddStatusTag>
              </div>
              <MessageAlert
                message={alertMessage}
                severity={showSuccess === true ? "success" : "error"}
                showMessage={showAlert}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // paddingTop: "30px",
                  "@media (max-width:960px)": {
                    // margin: "1% 0",
                  },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#0075D0",
                    py: { xs: 1, md: 1.5 },
                  }}
                  disabled={checkValidInputs(values) || showLoading}
                >
                  {showLoading ? (
                    <Loading type="spin" color="white" height={14} width={14} />
                  ) : (
                    t("auth.login")
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default LoginForm;
