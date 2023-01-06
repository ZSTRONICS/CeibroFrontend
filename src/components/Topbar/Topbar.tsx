import React from "react";
import { useMediaQuery } from "react-responsive";

// material
import { Badge, makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";

// redux
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/action/app.action";
import { RootState } from "../../redux/reducers";

// router-dom
import { useHistory } from "react-router";

// components
import assets from "assets/assets";
import colors from "../../assets/colors";
import "./topbar.css";
import Title from "./Title";
import TopBarSearch from "./TopBarSearch";
import ProfileView from "./ProfileView";

const Topbar = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
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
          {/* {!isTabletOrMobile && */}

          <div className={classes.searchInputWraper}>
            {!window?.location?.pathname?.includes(`chat`) && (
              <TopBarSearch onChange={(e: any) => {}} />
            )}
          </div>

          {/*  )} */}
          {/* {isTabletOrMobile && ( */}
          <div className={classes.nameWrapper}>
            <Typography className={classes.username}>
              {user?.firstName}
            </Typography>
            <Typography className={classes.username}>
              {user?.surName}
            </Typography>
          </div>
          {/* )} */}

          <ProfileView />

          {/* {!isTabletOrMobile && ( */}
          <Typography className={classes.notification}>
            <Badge badgeContent={4}>
              <img
                alt="notification"
                src={assets.notification}
                className={`${classes.bell} width-16`}
              />
            </Badge>
          </Typography>
          {/* )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;

const useStyles = makeStyles((theme) => ({
  topNavbarWrapper: {
    height: 70,
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
    // justifyContent: 'space-evenly',
    // ['@media (max-width:960px)']: {
    justifyContent: "space-between",
    // }
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
  searchInputWraper:{
    "@media (max-width:600px)": {
      display: "none",
    },
  },
  username: {
    fontSize: 14,
    fontWeight: 500,
  },
}));
