import * as yup from "yup";
import { TFunction } from "i18next";

export const setValidationSchema = (t: TFunction) => {
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const profileSchema = yup.object().shape({
        firstName: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        surName: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        email: yup
            .string()
            .email(`${t("auth.register.invalid_email")}`),
        workEmail: yup
            .string()
            .email("Invalid email"),
        companyName: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        companyVat: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        companyLocation: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Invalid phone number'),
        companyPhone: yup
            .string()
            .matches(phoneRegExp, 'Invalid phone number'),
    });

    return profileSchema
}