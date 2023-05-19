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
import { RegisterNumberSchema } from "../userSchema/AuthSchema";
import { ICountryData } from "components/material-ui/customMuiTextField/types";
import { handlePhoneChange } from "../../../utills/formFunctions";

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
  const registerPhoneNumberSchema = RegisterNumberSchema(t);
  const formikRef = useRef<FormikProps<FormValues|any>>(null);

  const handleSubmit = (values: any, action: any) => {
    const { dialCode, phoneNumber } = values;
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("dialCode", dialCode);
    const payload = {
      body: {
        phoneNumber: dialCode + phoneNumber,
      },
      success: (res: any) => {
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
            {({
              values,
              errors,
              touched,
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
                <div className={classes.actionWrapper}>
                  <Button
                  sx={{  py:{xs:0.5, md:1.5}}}
                    className={classes.loginButton}
                    disabled={values.phoneNumber.length > 0 ? false : true}
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
