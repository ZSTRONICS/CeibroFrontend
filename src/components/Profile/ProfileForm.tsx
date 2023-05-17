import { useRef, useState } from "react";

// material & react-icon
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { BiTrash } from "react-icons/bi";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "redux/action/auth.action";
import { RootState } from "redux/reducers";

import colors from "../../assets/colors";

// formik and yup
import Divider from "@mui/material/Divider";
import { setValidationSchema } from "components/Auth/userSchema/ProfileSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
// i18next
import { UserInterface } from "constants/interfaces/user.interface";
import { useTranslation } from "react-i18next";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import CustomModal from "components/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeNumberForm from "./ChangeNumberForm";
import NumberConfirmationForm from "./NumberConfirmationForm";

const ProfileForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let user: UserInterface = useSelector((state: RootState) => state.auth.user);
  const isDisabled = !loading ? false : true;
  const profileSchema = setValidationSchema(t);
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<JSX.Element | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (values: any) => {
    setLoading(true);
    const { firstName, surName, email, companyName, jobTitle } = values;
    const payload = {
      body: {
        firstName,
        surName,
        email,
        companyName,
        jobTitle,
      },
      success: () => {
        toast.success("Profile updated successfully");
        setLoading(false);
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    dispatch(updateMyProfile(payload));
  };
  // todo countryCode is missing in user object
  const {
    phoneNumber,
    countryCode,
    firstName,
    surName,
    email,
    jobTitle,
    companyName,
  } = user ?? {};
  
  const userPhoneNumber = String(phoneNumber)?.slice(countryCode?.length);
  const formik = useFormik({
    initialValues: {
      firstName: firstName ?? "",
      surName: surName ?? "",
      email: email ?? "",
      jobTitle: jobTitle ?? "",
      dialCode: countryCode ?? "",
      phoneNumber: userPhoneNumber ?? "",
      companyName: companyName ?? "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const closeDialog = (number?: string) => {
    if (number && number != "") {
      setNewNumber(number);
      setModalTitle("Confirmation number");
      setModalChildren(
        <NumberConfirmationForm closeDialog={closeDialog} newNumber={number} />
      );
    } else {
      setIsOpen(false);
      toast.success(`${modalTitle} successfully`);
    }
  };

  const handleModal = (type: "change-password" | "change-number") => {
    setIsOpen(true);
    switch (type) {
      case "change-password":
        setModalTitle("Change password");
        setModalChildren(<ChangePasswordForm closeDialog={closeDialog} />);
        break;
      case "change-number":
        setModalTitle("Change number");
        setModalChildren(<ChangeNumberForm closeDialog={closeDialog} />);
        break;
    }
  };

  return (
    <>
      <Grid container xs={12} md={6}>
        <Grid item className={classes.mainContainer}>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12} md={6} style={{ maxWidth: "100%" }}>
              <Grid item container>
                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={formik.errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="Surname"
                    variant="outlined"
                    name="surName"
                    value={formik.values.surName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.surName && Boolean(formik.errors.surName)
                    }
                    helperText={formik.errors.surName}
                  />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                  <TextField
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onFocus={(e: any) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.errors.email}
                  />
                </Grid>

                {/* <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Contact number"
                  variant="outlined"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.errors.phone}
                />
              </Grid> */}

                {/* <Grid item xs={12}
                className={`${classes.rowWrapper} ${classes.passwordRow}`}
              >
                <TextField
                  autoComplete="new-password"
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // disabled={true}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.errors.password}
                />
              </Grid> */}

                {/* <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  autoComplete="new-password"
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="password"
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Confirm password"
                  variant="outlined"
                  name="confirmPassword"
                  value={formik.values.confirmPassword || ""}
                  onChange={formik.handleChange}
                  inputRef={confirmPassRef}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={formik.errors.confirmPassword}
                />
              </Grid> */}

                {/* <Grid
                item
                xs={12}
                className={classes.rowWrapper}
              >
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid> */}
                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyName &&
                      Boolean(formik.errors.companyName)
                    }
                    helperText={formik.errors.companyName}
                  />
                </Grid>

                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <CustomMuiTextField
                    typeName="text-field"
                    name="jobTitle"
                    label="Job title"
                    placeholder={t("auth.register.job_title")}
                    inputValue={formik.values.jobTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* {errors.jobTitle && (
                  <Typography className={`error-text ${classes.errorText}`}>
                    {errors.jobTitle && touched.jobTitle && errors.jobTitle}
                  </Typography>
                )} */}
                </Grid>

                <Grid container spacing={2} className={classes.rowWrapper}>
                  <Grid item xs={12}>
                    <CustomMuiTextField
                      typeName="phone-number"
                      name="phoneNumber"
                      inputValue={{
                        phoneNumber: formik.values.phoneNumber,
                        dialCode: formik.values.dialCode,
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#0076C8",
                        marginTop: "-20px",
                      }}
                      onClick={() => handleModal("change-number")}
                    >
                      Change phone number
                    </Typography>
                  </Grid>
                </Grid>

                <div
                  className={classes.rowWrapper}
                  style={{ color: "#0076C8", textTransform: "capitalize" }}
                >
                  <Button
                    variant="text"
                    sx={{ border: "1px solid" }}
                    size="medium"
                    onClick={() => handleModal("change-password")}
                  >
                    Change Password
                  </Button>
                </div>

                {/* <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Contact number"
                  variant="outlined"
                  name="companyPhone"
                  value={formik.values.companyPhone}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyPhone &&
                    Boolean(formik.errors.companyPhone)
                  }
                  helperText={formik.errors.companyPhone}
                />
              </Grid> */}

                {/* <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Work email"
                  variant="outlined"
                  name="workEmail"
                  value={formik.values.workEmail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.workEmail && Boolean(formik.errors.workEmail)
                  }
                  helperText={formik.errors.workEmail}
                />
              </Grid> */}

                <Grid
                  item
                  xs={12}
                  className={`${classes.rowWrapper} ${classes.btnWrapper}`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "30px",
                    marginTop: "25px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isDisabled}
                  >
                    Update
                    {isDisabled && loading && (
                      <CircularProgress
                        size={20}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  {/* <Button
                    variant="text"
                    sx={{ color: "red", border: "1px solid" }}
                    size="medium"
                  >
                    <BiTrash className={classes.deleteIcon} /> Delete Account
                  </Button> */}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <CustomModal
        isOpen={isOpen}
        handleClose={function (e: any): void {
          setIsOpen(false);
        }}
        title={modalTitle}
        children={modalChildren}
        showCloseBtn={true}
      />
    </>
  );
};
export default ProfileForm;

const useStyles = makeStyles({
  inputBg: {
    "& .MuiInputBase-input-MuiOutlinedInput-input": {},
    "& .MuiFormHelperText-root": {
      background: "#f5f7f8",
      color: "red",
      margin: 0,
      pl: 1.4,
      pt: 0.4,
    },
  },
  mainContainer: {
    // paddingTop: "10px",
  },
  btnWrapper: {
    gap: "30px",
    marginTop: "30px",
  },
  rowWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 20px",
  },
  delete: {
    color: colors.btnRed,
    border: `1px solid ${colors.btnRed}`,
    padding: "2px 5px",
  },
  deleteIcon: {
    fontSize: 20,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.white}`,
  },
  imageWrapper: {},
  userImage: {
    width: "100%",
    borderRadius: 5,
  },
  imageInnerWrapper: {
    position: "relative",
  },
  imageIconWrapper: {
    position: "absolute",
    bottom: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  editPic: {
    background: colors.primary,
    color: colors.white,
    fontSize: 18,
  },

  trashPic: {
    background: colors.btnRed,
    color: colors.white,
    fontSize: 18,
  },
  passwordRow: {
    marginTop: 10,
  },
  root: {
    color: colors.darkYellow,
    "&$checked": {
      color: colors.darkYellow,
    },
  },
  checked: {},
  errorText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    // marginLeft: "auto",
    // marginRight: "auto"
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  placehol: {
    fontWeight: 500,
    fontSize: 12,
  },
});
