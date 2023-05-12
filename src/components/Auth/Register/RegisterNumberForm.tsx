import { Box, Button, Grid, Typography } from "@mui/material";
import Setting from "components/Setting";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";
import AuthLayout from "../AuthLayout/AuthLayout";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";

export default function RegisterNumberForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <Box className={classes.registerNumberFormContainer}>
 <AuthLayout  title = {t("auth.get_started")} subTitle={t("auth.enter_your_phone_no")}>
 <div className={classes.registerNumberForm}>
 {isTabletOrMobile&&
   <div>
   <TopBarTitle  sx={{ fontSize: 28, }}>Get started</TopBarTitle>
     <SubLabelTag sx={{ fontSize: 16, pb:2 }}>by entering your phone number</SubLabelTag>
 </div>}
        <Formik
          initialValues={{
            dialCode: "",
            phoneNumber: "",
          }}
          // validationSchema={registerSch}
          onSubmit={() => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <CBox mb={3.1}>
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
                  {/* <div className="">
                 <PhoneNumberInput onSelect={handlePhoneNumberSelect}/>
    </div> */}
                {/* {errors.phoneNumber && touched.phoneNumber && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.phoneNumber}
                  </Typography>
                )} */}
              </CBox>
              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={()=>history.push("/confirmation")}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div> 
     
      <Box className={classes.dontHave} sx={{ color:'#131516'}}>
      {t("auth.back_to")}{" "}
            <Link to="/login" className={classes.signup}>
             Login
            </Link>
                </Box>
      </AuthLayout>
    </Box>
  );
}
