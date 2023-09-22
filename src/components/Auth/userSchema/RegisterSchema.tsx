import { TFunction } from "i18next";
import * as yup from "yup";

export const setValidationSchema = (t: TFunction) => {
  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(1, `${t("auth.tooShort")}`)
      .max(50, `${t("auth.tooLong")}`)
      .required(``),
    surName: yup
      .string()
      .trim()
      .min(1, `${t("auth.tooShort")}`)
      .max(50, `${t("auth.tooLong")}`)
      .required(``),
    jobTitle: yup
      .string()
      .trim()
      .min(1, `${t("auth.tooShort")}`)
      .max(100, `${t("auth.tooLong")}`),
    companyName: yup
      .string()
      .trim()
      .min(1, `${t("auth.tooShort")}`)
      .max(100, `${t("auth.tooLong")}`),
    // .matches(/^(?![0-9_])[a-zA-Z0-9]*$/, `${t("auth.name_should_have")}`)
    email: yup
      .string()
      .email(`${t("auth.register.invalid_email")}`)
      .required(``)
      .matches(
        /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        `${t("auth.register.invalid_email")}`
      ),
    password: yup
      .string()
      .required(``)
      .matches(
        /^(?=.*?[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        `${t("auth.pass_must_Contain")}`
      ),
    confirmPassword: yup
      .string()
      .required(``)
      .oneOf([yup.ref("password")], `${t("auth.pass_not_match")}`),
  });
  return registerSchema;
};
