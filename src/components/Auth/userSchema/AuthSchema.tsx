import * as yup from 'yup'
import { TFunction } from 'i18next'

export const SigninSchemaValidation = (t:TFunction) =>{
    const signinSchema = yup.object().shape({
        email: yup.string().email(`${t('auth.register.invalid_email')}`).required(`${t('auth.required')}`),
        password: yup.string()
          .required(`${t('auth.plz_Enter_pass')}`)
          .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/,
            `${t('auth.pass_must_Contain')}`
          ),
      })
return signinSchema
}

export const forgotPasswordSchemaValidation = (t:TFunction) =>{
    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().email(`${t('auth.register.invalid_email')}`).required(`${t('auth.required')}`),
      })
return forgotPasswordSchema
}
