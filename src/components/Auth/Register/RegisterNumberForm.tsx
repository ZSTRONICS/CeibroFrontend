import React from "react";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import colors from "assets/colors";
import assets from "assets/assets";
import { makeStyles } from "@mui/styles";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import useStyles from "./RegisterStyles";
import Setting from "components/Setting";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterNumberForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Get started</Typography>
        <p className={classes.description}>by entering your phone number</p>
      </div>
      <div className={classes.registerNumberForm}>
        <Formik
          initialValues={{
            dialCode: "+372",
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
                  name="phoneNumber"
                  label="Phone number"
                  textType="phone-number"
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
