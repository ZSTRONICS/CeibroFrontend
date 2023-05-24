import React, { useRef, useState } from "react";
//formik
import { Formik, FormikProps, FormikValues } from "formik";

// i18next
import { useTranslation } from "react-i18next";

// material
import { Box, Button, Typography } from "@mui/material";

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
import { SubLabelTag } from "components/CustomTags";
import MessageAlert from "components/MessageAlert/MessageAlert";
import userAlertMessage from "hooks/userAlertMessage";

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
interface CustomErrorMessages {
  [key: string]: string;
}

const ChangeNumberForm: React.FC<Props> = (props) => {
  const { alertMessage, setAlertMessage, showAlert } = userAlertMessage();
  const { t } = useTranslation();
  const signinSchema = SigninSchemaValidation(t);

  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const formikRef = useRef<
    FormikProps<FormikValues> | FormikProps<IInputValues> | undefined | any
  >();

  const handleSubmit = (values: IInputValues) => {
    setShowLoading(true);
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
        const errorMessage: string = err.response.data.message;
        const customErrorMesg:CustomErrorMessages={
          "Invalid password": "Incorrect password or invalid phone number",
          "Password must contain one uppercase letter and one number": "Incorrect password or invalid phone number",
          "password must be at least 8 characters": "Incorrect password or invalid phone number",
        }
        setAlertMessage(customErrorMesg[errorMessage]|| errorMessage);
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

              <SubLabelTag sx={{ fontSize: 14 }}>
                Entering your new phone number
              </SubLabelTag>

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
              <MessageAlert
                message={alertMessage}
                severity={"error"}
                showMessage={showAlert}
              />
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
