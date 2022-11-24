import * as yup from 'yup'
import { TFunction } from 'i18next'

export const setValidationSchema = (t:TFunction) =>{
    const registerSchema = yup.object().shape({
        firstName: yup.string().min(2, `${t('auth.tooShort')}`).max(50, `${t('auth.tooLong')}`).required(`${t('auth.required')}`),
        surName: yup.string().min(2, `${t('auth.tooShort')}`).max(50,  `${t('auth.tooLong')}`).required(`${t('auth.required')}`),
        email: yup.string().email(`${t('auth.register.invalid_email')}`).required(`${t('auth.required')}`),
        password: yup.string()
          .required(`${t('auth.plz_Enter_pass')}`)
          .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/,
            `${t('auth.pass_must_Contain')}`
          ),
        confirmPassword: yup.string()
          .required(`${t('auth.plz_confirm_pass')}`)
          .oneOf([yup.ref('password'), null], `${t('auth.pass_not_match')}`),
      })
return registerSchema
}
