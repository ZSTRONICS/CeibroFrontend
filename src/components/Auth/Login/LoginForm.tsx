import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import TextField from "../../Utills/Inputs/TextField";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, verifyEmail } from "../../../redux/action/auth.action";
import { RootState } from "../../../redux/reducers";
import Loading from "../../Utills/Loader/Loading";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";

interface LoginForm {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const LoginForm: React.FC<LoginForm> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;

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
  const [verifyError, setVerifyError] = useState<boolean>(false);

  const handleSubmit = () => {
    setError(false);
    setVerifyError(false);
    const payload = {
      body: {
        email,
        password,
      },
      onFailAction: (err: any) => {
        console.log("error login", err.response);

        if (err.response.status === 406) {
          setVerifyError(true);
        } else {
          setError(true);

          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      },
      showErrorToast: true,
    };
    dispatch(loginRequest(payload));
  };

  const handleVerifyEmail = () => {
    const payload = {
      body: { email },
      success: () => {
        toast.success("Please check your email");

        history.push("/verify-email");
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

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Login</Typography>
      </div>

      <div className={classes.loginForm}>
        {verifyError && (
          <Alert severity="error" style={{ display: "flex" }}>
            <Typography
              className={`${classes.titles} ${classes.forget} ${classes.color} `}
              variant="body1"
              gutterBottom
              onClick={handleVerifyEmail}
            >
              Email not verified.
              <span className={classes.emailVerify}>
                {" "}
                {intl.formatMessage({ id: "input.verifyEmail" })} ?
              </span>
            </Typography>
          </Alert>
        )}

        {error && <Alert severity="error">Incorrect email or password</Alert>}
        <TextField
          placeholder={intl.formatMessage({ id: "input.Email" })}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder={intl.formatMessage({ id: "input.Password" })}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setPassword(e.target.value)}
        />
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
            disabled={loginLoading}
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
    ["@media (max-width:960px)"]: {
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
  inputs: {
    marginTop: 40,
    height: 5,
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
    paddingLeft: "6%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "12%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
