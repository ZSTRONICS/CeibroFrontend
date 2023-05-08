import React from "react";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import colors from "assets/colors";
import assets from "assets/assets";
import { makeStyles } from "@mui/styles";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { useTranslation } from "react-i18next";
import useStyles from "./RegisterStyles";
import Setting from "components/Setting";

export default function RegisterConfirmationForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>
          Phone number confirmation
        </Typography>
        <p className={classes.description}>by entering your phone number</p>
      </div>
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
      >
        <Grid item>
          <Typography className={classes.dontHave}>
            {t("auth.back_to")}{" "}
            <Link to="/login" className={classes.signup}>
              {t("auth.register.signIn")}
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Setting />
        </Grid>
      </Grid>
    </div>
  );
}
