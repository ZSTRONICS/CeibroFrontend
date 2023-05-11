import { Button, Grid, Typography } from "@mui/material";
import Setting from "components/Setting";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./RegisterStyles";
import AuthLayout from "../AuthLayout/AuthLayout";

export default function RegisterConfirmationForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  return (
      <AuthLayout title = {t("auth.phone_number_confirmation")} subTitle={t("auth.enter_your_phone_no")}>
      <div className={classes.registerNumberForm}>
         <Formik
          initialValues={{
            verificationCode: "",
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
                  name="verificationCode"
                  typeName="text-field"
                  label="Enter your code"
                  placeholder="Enter your code"
                  inputValue={values.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.verificationCode && touched.verificationCode && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.verificationCode}
                  </Typography>
                )}
              </CBox>
              <div style={{ marginBottom: "24px" }}>
                <Typography className={classes.dontHave}>
                  {t("auth.didnot_receive_code")}{" "}
                  <Link to="/login" className={classes.signup}>
                    {t("auth.send_again")}
                  </Link>
                </Typography>
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={()=>history.push("/t&c")}

                >
                  Continue
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Grid
        container
        item
        className={classes.langContainer}
        justifyContent="space-between"
        pt={2}
      >
        <Grid item>
          <Typography className={classes.dontHave}>
            {t("auth.back_to")}{" "}
            <Link to="/login" className={classes.signup}>
              {t("auth.register.signIn")}
            </Link>
          </Typography>
        </Grid>
        {/* <Grid item>
          <Setting />
        </Grid> */}
      </Grid>
      </AuthLayout>
  );
}
