import React from "react";
import { Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import useStyles from "../Register/RegisterStyles";
import { CBox } from "components/material-ui";

interface VerificationFormProps {
  onSubmit: (values: { verificationCode: string }, actions: any) => void;
  counter: number;
  handleResend: () => void;
  incorrectAuth: boolean;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  onSubmit,
  counter,
  handleResend,
  incorrectAuth,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const initialValues = {
    verificationCode: "",
  };

  const validate = (values: { verificationCode: string }) => {
    const errors: { verificationCode?: string } = {};
    if (!values.verificationCode) {
      errors.verificationCode = t("auth.code_required");
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form style={{ width: "100%" }}>
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
          <div style={{ marginBottom: "26px" }}>
            {counter > 0 ? (
              <Typography>
                {t("auth.didnot_receive_code")}{" "}
                <span style={{ color: "grey" }}>
                  {`${counter} ${t("auth.seconds_left")}`}
                </span>
              </Typography>
            ) : (
              <Typography>
                {t("auth.didnot_receive_code")}{" "}
                <span className={classes.signup} onClick={handleResend}>
                  {t("auth.send_again")}
                </span>
              </Typography>
            )}
            {incorrectAuth && (
              <Typography className={`error-text ${classes.errorText}`}>
                {t("auth.incorrect_verification_code")}
              </Typography>
            )}
          </div>
          <div className={classes.actionWrapper}>
            <Button
              sx={{ py: { xs: 0.5, md: 1.5 } }}
              className={classes.loginButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={values.verificationCode.length < 1}
            >
              {t("auth.continue")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VerificationForm;
