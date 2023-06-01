import React from "react";

// material
import {  makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";

// redux
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/action/app.action";
import { RootState } from "../../redux/reducers";

// router-dom
import { useHistory } from "react-router";

// components
import colors from "../../assets/colors";
import "./topbar.css";
import Title from "./Title";
import UserMenu from "./UserMenu";
import Notification from "components/Notification/Notification";
import useResponsive from "hooks/useResponsive";
import { AddStatusTag } from "components/CustomTags";

const Topbar = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isTabletOrMobile = useResponsive('down', "md", "");
  const { user } = useSelector((state: RootState) => state.auth);
  const xsPoint = 1.5;
  const toggleNavbar = () => {
    dispatch(appActions.toggleNavbar());
  };

  return (
    <div className={`topbar ${classes.topNavbarWrapper}`}>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.container}
      >
        {isTabletOrMobile && (
          <Grid item xs={xsPoint} className={classes.menuIconWrapper}>
            <MenuIcon onClick={toggleNavbar} />
          </Grid>
        )}

        <Grid
          item
          xs={4}
          md={history.location.pathname.includes("chat") ? 5 : 4}
          className={classes.titleContainer}
        >
          <Title />
        </Grid>

        {!isTabletOrMobile && (
          <Grid
            item
            xs={1}
            md={history?.location.pathname.includes("chat") ? 2 : 3}
          ></Grid>
        )}

        <Grid
          xs={6}
          md={5}
          item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >

          <div className={classes.nameWrapper}>
            <AddStatusTag>
              {user.firstName||""}
            </AddStatusTag>
            <AddStatusTag>
            {user.surName||""}
            </AddStatusTag>
          </div>

          <UserMenu />

          <Notification value={""} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;

const useStyles = makeStyles((theme) => ({
  topNavbarWrapper: {
    height: 60,
    paddingRight: 20,
    background: colors.white,
  },
  notification: {
    alignSelf: "center",
  },
  menuIconWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  },
  container: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      rowGap: "0",
      columnGap: "5px",
    },
  },
  searchInput: {
    height: 12,
    marginRight: 30,
  },
  bell: {
    // color: colors.white,
    fontSize: 20,
  },
  titleContainer: {
    display: "flex",
    // justifyContent: "space-evenly",
    // ["@media (max-width:960px)"]: {
    //   justifyContent: "space-between",
    // },
  },
  nameWrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    fontSize: 14,
    fontWeight: 500,
    "@media (max-width:375px)": {
      display: "none",
    },
  },

}));
