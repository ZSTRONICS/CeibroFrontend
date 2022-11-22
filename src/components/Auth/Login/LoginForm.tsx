// @ts-nocheck
import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, verifyEmail } from "../../../redux/action/auth.action";
import { RootState } from "../../../redux/reducers";
import Loading from "../../Utills/Loader/Loading";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";
import { CSkeleton } from "components/material-ui";

interface LoginForm {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const LoginForm: React.FC<LoginForm> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading, authErrorMessage, authSuccessMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const history = useHistory();
  const [checked, setChecked] = useState(true);
  const intl = useIntl();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [lockError, setLockError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);

  const handleSubmit = () => {
    setError(false);
    setLockError(false);
    setVerifyError(false);
    const payload = {
      body: {
        email,
        password,
      },
      success: (_res: any) => {
        toast.success("logged in successfully");
      },
      onFailAction: (err: any) => {
        if (err) {
          setVerifyError(true);
        } else {
          if (err) {
            setLockError(true);
            setTimeout(() => {
              setLockError(false);
            }, 3000);
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          }
        }
      },
      showErrorToast: true,
    };

    dispatch(loginRequest(payload));
  };

  const checkValidInputs = () => {
    if (email && email.length > 0 && password && password.length > 0) {
      return false
    }
    return true
  }

  const handleVerifyEmail = () => {
    const payload = {
      body: { email },
      success: () => {
        toast.success("Please check your email");
        history.push("/login");
      },
    };
    dispatch(verifyEmail(payload));
  };

  const handlePasswordForget = () => {
    history.push("/forgot-password");
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>

      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>


      <div className={classes.loginForm}>
        <FormControl variant="outlined" >

          <OutlinedInput
            className={classes.inputOutline}
            placeholder={intl.formatMessage({ id: "input.Email" })}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.PassInput}>
          <OutlinedInput
            className={classes.inputOutline}
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            placeholder={intl.formatMessage({ id: "input.Password" })}
            onChange={(e: any) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="checkedB"
              color="primary"
              style={{ padding: 0 }}
            />
          }
          className={classes.remember}
          style={{ padding: 0 }}
          label={
            <Typography className={classes.rememberText}>
              {intl.formatMessage({ id: "input.RememberMe" })}
            </Typography>
          }
        />
        <div className={classes.actionWrapper}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            disabled={checkValidInputs() || loginLoading}
            onClick={handleSubmit}
          >

            {loginLoading ? (
              <Loading type="spin" color="white" height={14} width={14} />
            ) : (
              intl.formatMessage({ id: "input.Login" })
            )}
          </Button>
          <Typography
            className={`${classes.titles} ${classes.forget}`}
            variant="body1"
            gutterBottom
            onClick={handlePasswordForget}
          >
            {intl.formatMessage({ id: "input.ForgetPassword" })} ?
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

const useStyles = makeStyles({
  root: {
    "&:hover $notchedOutline": {
      borderColor: "orange",
    },
  },
  focused: {},
  notchedOutline: {},
  PassInput: {
    marginTop: "10px",
  },
  inputOutline: {
    height: "40px",
  },
  wrapper: {
    height: "94%",
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: "Inter",
    marginTop: -10,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    padding: "10px 13%",
    "@media (max-width:960px)": {
      padding: "10 13%",
    },
  },
  remember: {
    marginTop: "35px !important",
    fontSize: 14,
    padding: 0,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: 500,
  },
  loginButton: {
    height: 32,
    width: 21,
    fontSize: 14,
  },
  forget: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
    cursor: "pointer",
  },
  color: {
    color: "#611A15",
    padding: 0,
  },
  emailVerify: {
    textDecoration: "underline",

    "&:hover": {
      cursor: "pointer",
    },
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "8%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "13%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
