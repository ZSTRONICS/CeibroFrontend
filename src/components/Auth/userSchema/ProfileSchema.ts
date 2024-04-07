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
            .trim()
            .concat(validateConsecutiveSpaces('firstName')),
        surName: yup
            .string()
            .trim()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`)
            .required("")
            .concat(validateConsecutiveSpaces('surName')),
        email: yup
            .string()
            .trim()
            .email(`${t("auth.register.invalid_email")}`)
            .required("")
            .concat(validateConsecutiveSpaces('email')),
        jobTitle: yup
            .string()
            .trim()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`)
            .required("")
            .concat(validateConsecutiveSpaces('surName')),
        companyName: yup
            .string()
            .trim()
            .min(2, `${t("auth.tooShort")}`)
            .max(50, `${t("auth.tooLong")}`),
        phone: yup
            .string()
            .trim()
            .matches(phoneRegExp, 'Invalid phone number'),
    });

    return profileSchema
}