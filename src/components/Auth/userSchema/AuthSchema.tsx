import * as yup from "yup";
import { TFunction } from "i18next";

const phRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export const SigninSchemaValidation = (t: TFunction) => {
  const signinSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phRegex, "Invalid phone number")
      .required("Phone number is required"),
    password: yup.string().required(`${t("auth.plz_Enter_pass")}`),
    // .matches(
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/,
    //   `${t("auth.pass_must_Contain")}`
    // ),
  });
  return signinSchema;
};

export const RegisterNumberSchema = (t: TFunction) => {
  const phoneNumberSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phRegex, "Invalid phone number")
      .required("Phone number is required"),
  });
  return phoneNumberSchema;
};

export const forgotPasswordSchemaValidation = (t: TFunction) => {
  const forgotPasswordSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phRegex, "Invalid phone number")
      .required("Phone number is required"),
  });
  return forgotPasswordSchema;
};

export const resetPasswordSchemaValidation = (t: TFunction) => {
  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required(`${t("auth.plz_Enter_pass")}`)
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/,
        `${t("auth.pass_must_Contain")}`
      ),
    confirmPassword: yup
      .string()
      .required(`${t("auth.plz_confirm_pass")}`)
      .oneOf([yup.ref("password")], "Passwords don't match."),
  });
  return resetPasswordSchema;
};
export const changePasswordSchemaValid = (t: TFunction) => {
  const changePasswordSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(`${t("auth.plz_Enter_pass")}`),
    newPassword: yup
      .string()
      .required(`${t("auth.plz_Enter_pass")}`)
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/,
        `${t("auth.pass_must_Contain")}`
      ),
    confirmPassword: yup
      .string()
      .required(`${t("auth.plz_confirm_pass")}`)
      .oneOf([yup.ref("newPassword")], "Passwords don't match."),
  });
  return changePasswordSchema;
};
