import { useState } from "react";

// material & react-icon
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// redux
import { useDispatch } from "react-redux";
import { updateMyProfile } from "redux/action/auth.action";

// formik and yup
import Divider from "@mui/material/Divider";
import { setValidationSchema } from "components/Auth/userSchema/ProfileSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
// i18next
import CustomModal from "components/Modal";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { UPDATE_MY_PROFILE } from "config";
import { UserInterface } from "constants/interfaces/user.interface";
import { useTranslation } from "react-i18next";
import ChangeNumberForm from "./ChangeNumberForm";
import ChangePasswordForm from "./ChangePasswordForm";
import NumberConfirmationForm from "./NumberConfirmationForm";

interface Props {
  user: Partial<UserInterface> | any;
}

const ProfileForm = ({ user }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isDisabled = !loading ? false : true;
  const profileSchema = setValidationSchema(t);
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<JSX.Element | null>(null);
  const [modalTitle, setModalTitle] = useState("");
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
      success: (res: any) => {
        dispatch({ type: UPDATE_MY_PROFILE, payload: res.data.user });
        toast.success("Profile updated successfully");
        setOnUpdate(false);
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
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function checkOnUpdateData(e: any) {
    const hasChanges = Object.keys(formik.values).some((key: string) => {
      const formikValue: any = e.target.value;
      const userValue = user[e.target.name];
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
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Grid
            item
            xs={12}
            md={6}
            style={{
              maxWidth: "100%",
              padding: "7px 20px",
              marginTop: "5px",
            }}
          >
            <Grid item container sx={{ gap: { md: 2, sm: 1 } }}>
              <TextField
                required
                sx={{ background: "white" }}
                fullWidth
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="firstName"
                value={formik.values.firstName}
                onChange={(e) => {
                  formik.handleChange(e);
                  checkOnUpdateData(e);
                }}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.errors.firstName as string}
              />

              <TextField
                required
                sx={{ background: "white" }}
                fullWidth
                size="small"
                id="outlined-basic"
                label="Surname"
                variant="outlined"
                name="surName"
                value={formik.values.surName}
                onChange={(e) => {
                  formik.handleChange(e);
                  checkOnUpdateData(e);
                }}
                error={formik.touched.surName && Boolean(formik.errors.surName)}
                helperText={formik.errors.surName as string}
              />
              <TextField
                required
                sx={{ background: "white" }}
                fullWidth
                size="small"
                id="outlined-basic"
                label="email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  checkOnUpdateData(e);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email as string}
              />

              <TextField
                sx={{ background: "white" }}
                fullWidth
                size="small"
                id="outlined-basic"
                label="Company"
                variant="outlined"
                name="companyName"
                value={formik.values.companyName}
                onChange={(e) => {
                  formik.handleChange(e);
                  checkOnUpdateData(e);
                }}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={formik.errors.companyName as string}
              />

              <CustomMuiTextField
                typeName="text-field"
                name="jobTitle"
                label="Job title"
                placeholder={t("auth.register.job_title")}
                inputValue={formik.values.jobTitle}
                onChange={(e) => {
                  formik.handleChange(e);
                  checkOnUpdateData(e);
                }}
              />

              <Grid item xs={12} md={7}>
                <CustomMuiTextField
                  typeName="phone-number"
                  name="phoneNumber"
                  inputValue={{
                    phoneNumber: formik.values.phoneNumber,
                    dialCode: formik.values.dialCode,
                  }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    checkOnUpdateData(e);
                  }}
                  disabled={true}
                />
              </Grid>
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
              <Grid container my={2}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <div style={{ color: "#0076C8", textTransform: "capitalize" }}>
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
              formik.values.email.length === 0 ||
              loading
            }
          >
            Update
            {isDisabled && loading && <CircularProgress size={20} />}
          </Button>
        </form>
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
