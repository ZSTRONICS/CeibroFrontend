import { Typography, Button, FormControlLabel, Checkbox, CircularProgress, InputAdornment, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useHistory } from 'react-router'
import assets from 'assets/assets'
import colors from 'assets/colors'
import TextField from 'components/Utills/Inputs/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from 'redux/action/auth.action'
import { RootState } from 'redux/reducers'
import Loading from 'components/Utills/Loader/Loading'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Alert } from '@material-ui/lab'
import queryString from 'query-string'
import CustomImg from 'components/CustomImg'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { resetPasswordSchemaValidation } from '../userSchema/AuthSchema'

const ResetPasswordForm = () => {

  const {t} = useTranslation()
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>()
  const [error, setError] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const isDiabled = !loading ? false : true

  const handleSubmit = (values: any, action: any) => {
    const { password } = values
    const queryParams = queryString.parse(history?.location?.search)
    
    const payload = {
      body: { password, token: queryParams.token },
      success: (res: any) => {
        setSuccess(res)
        if (res) {
          history.push('/login')
        }
        toast.success(`${t('auth.password_reset_successfully')}`)
        action?.resetForm?.()
      },
      onFailAction: (err: any) => {
        if (err.response.data.code === 401) {
          setError(true)
          
        }
        setTimeout(() => {
          setError(false)
        }, 3000)
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false)
      },
      other: queryParams?.token,
    }
    setLoading(true)
    dispatch(resetPassword(payload))
  }

  const resetPasswordSchema = resetPasswordSchemaValidation(t)

  return (
    <div className={`form-container ${classes.wrapper} hide-scrollbar`}>
      <div className={classes.logoWrapper}>
        <CustomImg src={assets.logo} alt="ceibro-logo" className=''  />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{t('auth.reset_password')}</Typography>
      </div>

      <div className={classes.loginForm}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              {(success || loading) && (
                <Alert severity="success">
                  {loading ? `${t('auth.forgot_pass.verifying')}` : `${t('auth.password_reset_successfully')}`}
                </Alert>
              )}

              {error && <Alert severity="error">{t('auth.password_reset_failed')}</Alert>}

              <TextField
                type={showPassword ? "text" : "password"}
                placeholder={t('auth.Password')}
                className={classes.inputs}
                name="password"
                value={values.password}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFill={false}
                endAdornment={
                  <InputAdornment position="end" className={classes.positionEnd}>
                    <IconButton
                      className={classes.endAornmnetBtn}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.password && touched.password && errors.password}
                </Typography>
              )}

              <TextField
                type={confirmPass ? "text" : "password"}
                placeholder={`${t('auth.confirm_password')}`}
                name="confirmPassword"
                value={values.confirmPassword}
                className={classes.inputs}
                inputProps={{
                  style: { height: 12 },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={<InputAdornment position="end" className={classes.positionEnd}>
                      <IconButton
                      className={classes.endAornmnetBtn}
                        aria-label="toggle password visibility"
                        onClick={()=>setConfirmPass(prev=> !prev)}
                        edge="end"
                      >
                        {confirmPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>}
              />
              {errors.confirmPassword && (
                <Typography className={`error-text ${classes.errorText}`}>
                  {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                </Typography>
              )}

              <div className={classes.actionWrapper}>
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  //   disabled={!isValid || registerLoading}
                  disabled={isDiabled}
                >
                 
                  {isDiabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  {t('auth.reset_password')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPasswordForm

const useStyles = makeStyles({
  positionEnd:{
    marginLeft:"-50px"
  },
  endAornmnetBtn:{
    marginRight:0
  },
  wrapper: {
    minHeight: '94%',
    overflowY: 'auto',
    marginBottom: 20,
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    padding: '10px 13%',
    '@media (max-width:960px)': {
      padding: '10 13%',
    },
  },
  remember: {
    marginTop: 25,
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
  },
  inputs: {
    marginTop: 30,
    height: 8,
    width: '100%',
  },
  loginButton: {
    height: 40,
    fontSize: 13,

    fontWeight: 500,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },
  logoWrapper: {
    paddingTop: '2%',
    paddingLeft: '7%',
  },
  titleWrapper: {
    paddingTop: '10%',
    paddingLeft: '12.5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  progress: {
    color: colors.primary,
    position: 'absolute',
    zIndex: 1,
    margin: 'auto',
    left: 0,
    right: 0,
    top: 10,
    textAlign: 'center',
  },
})
