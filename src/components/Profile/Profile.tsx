import React from "react";
import { Grid } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

// redux
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

// components
import ProfileForm from "./ProfileForm";
import ProfileImagePicker from "./ProfileImagePicker";
import Requests from "./Requests";

const Dashboard = () => {

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const { user } = useSelector((localState: RootState) => localState.auth);

  return (
    <Grid container>
      <ProfileImagePicker profilePic={user?.profilePic} />
      {isTabletOrMobile && <Requests />}
      <ProfileForm />
      {!isTabletOrMobile && <Requests />}
    </Grid>
  );
};

export default Dashboard;
