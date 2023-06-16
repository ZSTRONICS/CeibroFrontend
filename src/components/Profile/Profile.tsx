import React from "react";
import { Grid } from "@material-ui/core";

// redux
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";

// components
import ProfileForm from "./ProfileForm";
import ProfileImagePicker from "./ProfileImagePicker";
import Requests from "./Requests";
import useResponsive from "hooks/useResponsive";

const Dashboard = () => {

  const isTabletOrMobile = useResponsive("down", 'md', "")
  const { user } = useSelector((localState: RootState) => localState.auth);

  return (
    <Grid container justifyContent="center">
      <ProfileImagePicker profilePic={user?.profilePic} />
      {isTabletOrMobile && 
        <Requests />}
      <ProfileForm />
      {!isTabletOrMobile && <Requests />}
    </Grid>
  );
};

export default Dashboard;
