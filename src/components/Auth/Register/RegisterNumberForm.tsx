import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik, FormikHelpers, FormikProps } from "formik";
import useResponsive from "hooks/useResponsive";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerRequest } from "redux/action/auth.action";
import AuthLayout from "../AuthLayout/AuthLayout";
import useStyles from "./RegisterStyles";

type FormValues = {
  dialCode: string;
  phoneNumber: string;
};

export default function RegisterNumberForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [incorrectAuth, setIncorrectAuth] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = (values: any, action: any) => {
    const { dialCode, phoneNumber } = values;
    const payload = {
      body: {
        phoneNumber: dialCode + phoneNumber,
      },
      success: (res: any) => {
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("dialCode", dialCode);
        history.push("/confirmation");
        action?.resetForm?.();
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 400) {
          setIncorrectAuth(true);
        }
      },
    };
    dispatch(registerRequest(payload));
    setTimeout(() => {
      setIncorrectAuth(false);
    }, 5000);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>,
    changeValue?: string
  ) => {
    console.log(changeValue, "changeValue");
    console.log(
      typeof e === "object" && e.hasOwnProperty("target"),
      "changeValue"
    );
    if (typeof e === "object" && e.hasOwnProperty("target")) {
      const { name, value } = e.target;
      formikRef.current?.setFieldValue(name, value);
    } else {
      formikRef.current?.setFieldValue("dialCode", changeValue);
    }
  };

  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <Box className={classes.registerNumberFormContainer}>
      <AuthLayout
        title={t("auth.get_started")}
        subTitle={t("auth.enter_your_phone_no")}
      >
        <div className={classes.registerNumberForm}>
          {isTabletOrMobile && (
            <div>
              <TopBarTitle sx={{ fontSize: 28 }}>Get started</TopBarTitle>
              <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
                by entering your phone number
              </SubLabelTag>
            </div>
          )}
        </div>

        <div className={classes.registerNumberForm}>
          <Formik
            initialValues={{
              dialCode: "+372",
              phoneNumber: "",
            }}
            // validationSchema={registerSch}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({
              values,
              errors,
              touched,
              handleChange = handlePhoneChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <CBox mb={3}>
                  <CustomMuiTextField
                    typeName="phone-number"
                    name="phoneNumber"
                    inputValue={{
                      phoneNumber: values.phoneNumber,
                      dialCode: values.dialCode,
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Typography className={`error-text ${classes.errorText}`}>
                      {errors.phoneNumber}
                    </Typography>
                  )}
                </CBox>
                <div className={classes.actionWrapper}>
                  <Button
                    className={classes.loginButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        <Box className={classes.dontHave} sx={{ color: "#131516" }}>
          {t("auth.back_to")}{" "}
          <Link to="/login" className={classes.signup}>
            Login
          </Link>
        </Box>
      </AuthLayout>
    </Box>
  );
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
