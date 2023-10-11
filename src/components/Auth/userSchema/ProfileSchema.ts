import { TFunction } from "i18next";
import * as yup from "yup";

const validateConsecutiveSpaces = (fieldName: string) => {
    return yup
        .string()
        .test('consecutive-spaces', 'Consecutive empty spaces are not allowed', function (value: any) {
            if (/\s{2,}/.test(value)) {
                return this.createError({
                    path: fieldName,
                    message: 'Consecutive empty spaces are not allowed',
                });
            }
            return true;
        });
};

export const setValidationSchema = (t: TFunction) => {
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const profileSchema = yup.object().shape({
        firstName: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`)
            .required("")
            .concat(validateConsecutiveSpaces('firstName')),
        surName: yup
            .string()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`)
            .required("")
            .concat(validateConsecutiveSpaces('surName')),
        email: yup
            .string()
            .email(`${t("auth.register.invalid_email")}`)
            .required("")
            .concat(validateConsecutiveSpaces('email')),
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