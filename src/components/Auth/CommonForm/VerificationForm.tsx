import { Box, Button, Typography } from "@mui/material";
import MessageAlert from "components/MessageAlert/MessageAlert";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "../Register/RegisterStyles";

interface VerificationFormProps {
  onSubmit: (values: { verificationCode: string }, actions: any) => void;
  counter: number;
  handleResend: () => void;
  showSuccess: boolean;
  showAlert: boolean;
  alertMessage: string;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  onSubmit,
  counter,
  handleResend,
  showSuccess,
  showAlert,
  alertMessage,
}) => {
  const { t }: any = useTranslation<any>();
  const classes = useStyles();

  const initialValues = {
    verificationCode: "",
  };

  const validate = (values: { verificationCode: string }) => {
    const errors: { verificationCode?: string } = {};
    if (!values.verificationCode) {
      errors.verificationCode = t("");
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
              inputVariant="outlined"
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
          <Box sx={{ marginBottom: { md: "26px", xs: 0 } }}>
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
            {/* {incorrectAuth && (
              <Typography className={`error-text ${classes.errorText}`}>
                {t("auth.incorrect_verification_code")}
              </Typography>
            )} */}
          </Box>
          <MessageAlert
            message={alertMessage}
            severity={showSuccess === true ? "success" : "error"}
            showMessage={showAlert}
          />
          <div className={classes.actionWrapper}>
            <Button
              sx={{ py: { xs: 0.5, md: 1.5 } }}
              className={classes.loginButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={values.verificationCode.length !== 6}
            >
              continue
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VerificationForm;
