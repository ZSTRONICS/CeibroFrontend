import React, { useRef, useState } from "react";
//formik
import { Formik, FormikProps, FormikValues } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// react router dom
import { useHistory } from "react-router-dom";

// material
import { Box, Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

// redux
import { useDispatch, useSelector } from "react-redux";
import { changeNumber } from "redux/action/auth.action";
import { RootState } from "redux/reducers";

//toastify

// component
import Loading from "components/Utills/Loader/Loading";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { UserInterface } from "constants/interfaces/user.interface";
import { handlePhoneChange } from "utills/formFunctions";
import { SigninSchemaValidation } from "../Auth/userSchema/AuthSchema";
import { toast } from "react-toastify";

interface Props {
  //   tokenLoading: boolean;
  //   showSuccess: boolean;
  //   showError: boolean;
  closeDialog: (text?: string) => void;
}

interface IInputValues {
  dialCode: string;
  phoneNumber: string;
  password: string;
}

const ChangeNumberForm: React.FC<Props> = (props) => {
  //   const { tokenLoading, showSuccess, showError } = props;
  let user: UserInterface = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  const signinSchema = SigninSchemaValidation(t);
  const [lockError, setLockError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const [incorrectPhoneOrPass, setIncorrectPhoneOrPass] =
    useState<boolean>(false);

  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  let [timer, setTimer] = useState("");
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const formikRef = useRef<
    FormikProps<FormikValues> | FormikProps<IInputValues> | undefined | any
  >();

  const handleSubmit = (values: IInputValues) => {
    setShowLoading(true);
    setIncorrectAuth(false);
    const { phoneNumber, password, dialCode } = values;
    const payload = {
      body: {
        newNumber: `${dialCode}${phoneNumber}`,
        countryCode: dialCode,
        password,
      },
      success: (res: any) => {
        toast.success(res.data.message);
        props.closeDialog(`${dialCode}${phoneNumber}`);
        // action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        setShowLoading(false);
        if (err.response.data.code === 400) {
          setIncorrectEmail(true);
          if (err.response.data.message === "Invalid password") {
            setIncorrectEmail(false);
            setIncorrectPhoneOrPass(true);
          }
        } else if (err.response.data.code === 404) {
          const remainingTime = (err.response.data?.message)
            .match(/^\d+|\d+\b|\d+(?=\w)/g)
            .join(" ")
            .slice(0, 2);
          setTimer(remainingTime);
          setIncorrectAuth(true);
        } else if (err.response.data.code === 406) {
          setVerifyError(true);
        } else if (err.response.data.code === 423) {
          const timer = (err.response.data?.message)
            .match(/^\d+|\d+\b|\d+(?=\w)/g)
            .join(" ")
            .slice(0, 2);
          setTimer(timer);
          setLockError(true);
        } else {
          // removed stored state
          props.closeDialog(`${dialCode}${phoneNumber}`);
          //   purgeStoreStates();
        }

        setTimeout(() => {
          setLockError(false);
          setVerifyError(false);
          setIncorrectAuth(false);
          setIncorrectEmail(false);
          setIncorrectPhoneOrPass(false);
        }, 5000);
      },
      showErrorToast: false,
    };
    dispatch(changeNumber(payload));
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

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            dialCode: "+372", //user?.countryCode,
            phoneNumber: "", // user?.phoneNumber.slice(user?.countryCode.length),
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
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              {/* {showError && (
                <Alert severity="error">{t("auth.link_expired")}</Alert>
              )} */}

              {incorrectPhoneOrPass && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  Incorrect phone number or password
                </Alert>
              )}
              {incorrectAuth && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  {t("auth.account_locked").replace("#", `${timer}`)}
                </Alert>
              )}
              {incorrectEmail && (
                <Alert style={{ margin: "2px 0" }} severity="error">
                  {t("auth.account_not_found").replace("#", `${timer}`)}
                </Alert>
              )}
              {lockError && (
                <Alert severity="error">
                  {t("auth.errorAlerts.account_locked_message").replace(
                    "#",
                    `${timer}`
                  )}
                </Alert>
              )}

              {/* {(showSuccess || tokenLoading) && (
                <Alert severity="success">
                  {tokenLoading
                    ? `${t("auth.successAlerts.verifying_email")}`
                    : `${t("auth.successAlerts.email_verified")}`}
                </Alert>
              )} */}
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
                  <Typography className={`error-text `}>
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
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", backgroundColor: "#0076C8", padding: 1 }}
                disabled={checkValidInputs(values) || showLoading}
              >
                {showLoading ? (
                  <Loading type="spin" color="white" height={14} width={14} />
                ) : (
                  t("auth.change_number")
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ChangeNumberForm;
