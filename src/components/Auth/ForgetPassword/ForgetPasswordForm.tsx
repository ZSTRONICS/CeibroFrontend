// @ts-nocheck
import {
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import TextField from "../../Utills/Inputs/TextField";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/action/auth.action";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface ForgetPasswordForm {
  tokenLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
}

const ForgetPasswordForm: React.FC<ForgetPasswordForm> = (props) => {
  const classes = useStyles();
  const { tokenLoading, showSuccess, showError } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;
  
  const handleKeyDown= (e:any)=>{
    if(e.keyCode == 13){
      handleSubmit()
    }
  } 

  const checkValidInputs=()=>{
    if(email&& email.length>0){
      return false
    }
    return true
  }

  const handleSubmit = () => {
    const payload = {
      body: { email },
      success: (res: any) => {
        toast.success('Please check your email')
        setEmail("");
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(forgetPassword(payload));
  };

  return (
    <div className={`form-container ${classes.wrapper}`}>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>

      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Email</Typography>
      </div>

      <div className={classes.loginForm}>
        {(showSuccess || tokenLoading) && (
          <Alert severity="success">
            {tokenLoading
              ? "Verifying otp"
              : "Email verified successfully. Please sign in!"}
          </Alert>
        )}

        {showError && <Alert severity="error">Link expired</Alert>}
        <form onSubmit={handleSubmit}>
        <TextField
        onkeyDown={handleKeyDown}
          placeholder={intl.formatMessage({ id: "input.Email" })}
          className={classes.inputs}
          inputProps={{
            style: { height: 12 },
          }}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <div className={classes.actionWrapper}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            disabled={checkValidInputs() || isDiabled}
            onClick={handleSubmit}
          >
            {isDiabled && loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
            {/* Send */}
            {intl.formatMessage({ id: "input.send" })}
          </Button>
          <span className={classes.rememberText}> Remember!
          <Link to={'/login'} className={classes.rememberLogin}>Login</Link>
            </span>
        </div>
    
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;

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
    ["@media (max-width:960px)"]: {
      padding: "10 13%",
    },
  },
  remember: {
    marginTop: "35px !important",
    fontSize: 14,
    padding: 0,
  },
  rememberLogin:{
    paddingLeft: 5, 
    textDecoration: 'none'
  },
  rememberText: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: 600,
  },
  inputs: {
    // marginTop: 40,
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
  },
  logoWrapper: {
    paddingTop: "2%",
    paddingLeft: "7%",
  },
  titleWrapper: {
    paddingTop: "10%",
    paddingLeft: "12.5%",
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
