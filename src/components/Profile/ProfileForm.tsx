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

const ProfileForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let user: UserInterface = useSelector((state: RootState) => state.auth.user);
  const isDiabled = !loading ? false : true;
  const profileSchema = setValidationSchema(t);

  // useEffect(() => {
  //   dispatch(getMyProfile());
  // }, []);

  const handleSubmit = (values: any) => {
    setLoading(true);
    const {
      firstName,
      surName,
      workEmail,
      phone,
      companyName,
      companyPhone,
      // password,
      companyVat,
      companyLocation,
      // currentlyRepresenting,
    } = values;

    const payload = {
      body: {
        firstName,
        surName,
        workEmail,
        phone,
        companyPhone,
        // ...(password ? { password } : {}),
        // password,
        companyName,
        companyVat,
        companyLocation,
        currentlyRepresenting: false,
      },
      success: () => {
        toast.success("Profile updated successfully");
        // action?.setFieldValue("password", "");
        // action?.setFieldValue("confirmPassword", "");
        // if (passRef.current) {
        //   passRef.current.value = "";
        // }
        // if (confirmPassRef.current) {
        //   confirmPassRef.current.value = "";
        // }
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    dispatch(updateMyProfile(payload));
  };
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      surName: user.surName,
      email: user.email,
      workEmail: user.workEmail,
      password: "",
      confirmPassword: "",
      companyName: user.companyName,
      companyVat: user.companyVat,
      companyLocation: user.companyLocation,
      phone: user.phone,
      companyPhone: user.companyPhone,
      currentlyRepresenting: user.currentlyRepresenting,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Grid container xs={12} md={6}>
      <Grid item className={classes.mainContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12} md={6} style={{ maxWidth: "100%" }}>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
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
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.errors.firstName}
                />

              </Grid>

              <Grid item xs={12} md={6} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
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
                  error={formik.touched.surName && Boolean(formik.errors.surName)}
                  helperText={formik.errors.surName}
                />
              </Grid>

              <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
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

              <Grid item xs={12} className={classes.rowWrapper}>
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
              </Grid>

              <Grid
                item
                xs={12}
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
              </Grid>

              <Grid item xs={12} className={classes.rowWrapper}>
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
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.rowWrapper}
                // sx ={{ padding: "20px 0px" }}
              >
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
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

              <Grid item xs={12} md={6} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="VAT"
                  variant="outlined"
                  name="companyVat"
                  value={formik.values.companyVat}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyVat &&
                    Boolean(formik.errors.companyVat)
                  }
                  helperText={formik.errors.companyVat}
                />
              </Grid>

              <Grid item xs={12} className={classes.rowWrapper}>
                <TextField
                  className={classes.inputBg}
                  sx={{background: "white"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  name="companyLocation"
                  value={formik.values.companyLocation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyLocation &&
                    Boolean(formik.errors.companyLocation)
                  }
                  helperText={formik.errors.companyLocation}
                />
              </Grid>

              <Grid item xs={12} className={classes.rowWrapper}>
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
              </Grid>

              <Grid item xs={12} className={classes.rowWrapper}>
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
              </Grid>

              <Grid
                item
                xs={12}
                className={`${classes.rowWrapper} ${classes.btnWrapper}`}
                // sx={{
                //   marginTop: "25px",
                //   gap: "30px",
                // }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                  disabled={isDiabled}
                  // disabled={!isValid}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: "600" }}>
                    Update
                  </Typography>
                  {isDiabled && loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                </Button>
                <Button
                  variant="text"
                  // type="submit"
                 sx={{color:'red', border:'1px solid'}}
                  size="medium"
                >
                  <BiTrash className={classes.deleteIcon} /> Delete Account
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default ProfileForm;

const useStyles = makeStyles({
  inputBg: {
    '& .MuiInputBase-input-MuiOutlinedInput-input':{
       
    },
    '& .MuiFormHelperText-root':{
      background:'#f5f7f8',
      color:'red',
      margin:0,
      pl:1.4,
      pt:0.4
    },
   
  },
  mainContainer: {
    paddingTop: "10px",
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
