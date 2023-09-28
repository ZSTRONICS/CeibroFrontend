import { useState } from "react";

// material & react-icon
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "redux/action/auth.action";
import { RootState } from "redux/reducers/appReducer";

import colors from "../../assets/colors";

// formik and yup
import Divider from "@mui/material/Divider";
import { setValidationSchema } from "components/Auth/userSchema/ProfileSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
// i18next
import CustomModal from "components/Modal";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { UserInterface } from "constants/interfaces/user.interface";
import { useTranslation } from "react-i18next";
import ChangeNumberForm from "./ChangeNumberForm";
import ChangePasswordForm from "./ChangePasswordForm";
import NumberConfirmationForm from "./NumberConfirmationForm";

const ProfileForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  let user: Partial<UserInterface> | any = useSelector(
    (state: RootState) => state.auth.user
  );
  const isDisabled = !loading ? false : true;
  const profileSchema = setValidationSchema(t);
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<JSX.Element | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [onUpdate, setOnUpdate] = useState(false);
  const {
    phoneNumber,
    countryCode,
    firstName,
    surName,
    email,
    jobTitle,
    companyName,
  } = user ?? {};

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

  const userPhoneNumber = String(phoneNumber)?.slice(countryCode?.length);
  const formik: any = useFormik({
    initialValues: {
      firstName: firstName || "",
      surName: surName || "",
      email: email || "",
      jobTitle: jobTitle || "",
      dialCode: countryCode || "",
      phoneNumber: userPhoneNumber || "",
      companyName: companyName || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function checkOnUpdateData(e: any) {
    const hasChanges = Object.keys(formik.values).some((key: string) => {
      const formikValue: any = formik.values[key];
      const userValue = user[key];
      if (key === "phoneNumber" || key === "dialCode") {
        return false;
      }
      return formikValue !== userValue;
    });

    if (hasChanges) {
      setOnUpdate(hasChanges);
    } else {
      setOnUpdate(false);
    }
  }

  const closeDialog = (number?: string) => {
    if (number && number !== "") {
      setNewNumber(number);
      setModalTitle("Phone confirmation");
      setModalChildren(
        <NumberConfirmationForm closeDialog={closeDialog} newNumber={number} />
      );
    } else {
      setIsOpen(false);
      toast.success(`${modalTitle} successfully`);
    }
  };

  type ModalType = "change-password" | "change-number";

  const handleModal = (type: ModalType) => {
    setIsOpen(true);

    const modalOptions: Record<
      ModalType,
      { title: string; children: JSX.Element }
    > = {
      "change-password": {
        title: "Change password",
        children: <ChangePasswordForm closeDialog={closeDialog} />,
      },
      "change-number": {
        title: "Change phone number",
        children: <ChangeNumberForm closeDialog={closeDialog} />,
      },
    };

    const { title, children } = modalOptions[type];

    setModalTitle(title);
    setModalChildren(children);
  };

  return (
    <>
      <Grid container item xs={12} md={6}>
        <Grid item>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12} md={6} style={{ maxWidth: "100%" }}>
              <Grid item container>
                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    required
                    className={classes.inputBg}
                    sx={{ background: "white" }}
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
                    onBlur={checkOnUpdateData}
                    helperText={formik.errors.firstName as string}
                  />
                </Grid>

                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    required
                    className={classes.inputBg}
                    sx={{ background: "white" }}
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
                    onBlur={checkOnUpdateData}
                    helperText={formik.errors.surName as string}
                  />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                  <TextField
                    required
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    onBlur={checkOnUpdateData}
                    helperText={formik.errors.email as string}
                  />
                </Grid>

                <Grid item xs={12} md={12} className={classes.rowWrapper}>
                  <TextField
                    className={classes.inputBg}
                    sx={{ background: "white" }}
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={checkOnUpdateData}
                    error={
                      formik.touched.companyName &&
                      Boolean(formik.errors.companyName)
                    }
                    helperText={formik.errors.companyName as string}
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
                    onBlur={checkOnUpdateData}
                  />
                </Grid>
                <Grid item xs={12} md={7} className={classes.rowWrapper}>
                  <CustomMuiTextField
                    typeName="phone-number"
                    name="phoneNumber"
                    inputValue={{
                      phoneNumber: formik.values.phoneNumber,
                      dialCode: formik.values.dialCode,
                    }}
                    onChange={formik.handleChange}
                    onBlur={checkOnUpdateData}
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
                      paddingLeft: "20px",
                      width: "max-content",
                    }}
                    onClick={() => handleModal("change-number")}
                  >
                    Change phone number
                  </Typography>
                </Grid>
                <Grid container my={2}>
                  <Grid item xs={12}>
                    <Divider />
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
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <Button
              sx={{ ml: 3 }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                isDisabled ||
                !onUpdate ||
                formik.values.firstName.length === 0 ||
                formik.values.surName.length === 0 ||
                formik.values.email.length === 0
              }
            >
              Update
              {isDisabled && loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
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
