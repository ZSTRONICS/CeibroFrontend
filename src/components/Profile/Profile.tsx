import { Grid } from "@mui/material";

// redux
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";

// components
import useResponsive from "hooks/useResponsive";
import Connections from "./Connections";
import ProfileForm from "./ProfileForm";
import ProfileImagePicker from "./ProfileImagePicker";

const Profile = () => {
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { user, profilePicUploading } = useSelector(
    (state: RootState) => state.auth
  );

  const ConnectionView = (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        "@media (max-width:899px)": {
          padding: "10px 20px",
        },
      }}
    >
      <Connections />
    </Grid>
  );

  return (
    <Grid container justifyContent="center" sx={{ padding: "8px" }}>
      <ProfileImagePicker
        profilePic={user.profilePic}
        profilePicUploading={profilePicUploading}
      />
      {isTabletOrMobile && ConnectionView}
      <ProfileForm user={user} />
      {!isTabletOrMobile && ConnectionView}
    </Grid>
  );
};

export default Profile;
