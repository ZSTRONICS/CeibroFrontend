import { Button, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import { otpVerify } from "../../../redux/action/auth.action";
import TextField from "../../Utills/Inputs/TextField";

const VerifyEmailForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  const isDiabled = !loading ? false : true;

  const handleSubmit = () => {
    setError(false);

    const payload = {
      other: otp,
      success: (res: any) => {
        setSuccess(res);
        setOtp("");
        toast.success(`${t("auth.email_verified")}`);
        history.push("/private-login");
      },
      onFailAction: (err: any) => {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 10000);
      },
      showErrorToast: false,

      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(otpVerify(payload));
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>OTP</Typography>
      </div>

      <div className={classes.loginForm}>
        {(success || loading) && (
          <Alert icon={!loading} severity="success">
            {loading ? "Verifying email..." : "Register User Successfully"}
          </Alert>
        )}

        {/* {error && <Alert severity="error">Invalid OTP</Alert>} */}

        <TextField
          placeholder={"otp"}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setOtp(e.target.value)}
        />

        <div className={classes.actionWrapper}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            disabled={isDiabled}
            onClick={handleSubmit}
          >
            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
            {"verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;

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
  inputs: {
    marginTop: 40,
    height: 5,
  },
  loginButton: {
    height: 32,
    width: 21,
    fontSize: 14,
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
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
