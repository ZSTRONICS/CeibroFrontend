import { Grid } from "@material-ui/core";

// redux
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";

// components
import useResponsive from "hooks/useResponsive";
import ProfileForm from "./ProfileForm";
import ProfileImagePicker from "./ProfileImagePicker";
import Requests from "./Requests";

const Dashboard = () => {
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { user } = useSelector((localState: RootState) => localState.auth);
  console.log("profile rendering");
  return (
    <Grid container justifyContent="center">
      <ProfileImagePicker profilePic={user?.profilePic} />
      {isTabletOrMobile && <Requests />}
      <ProfileForm />
      {!isTabletOrMobile && <Requests />}
    </Grid>
  );
};

export default Dashboard;
