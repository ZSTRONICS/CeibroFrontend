import { Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import { RootState } from "../../redux/reducers";
import { socket } from "../../services/socket.services";
import "./sidebar.css";

function Sidebar() {
  const classes = useStyles();
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes
  );
  const [interval, setLocalInterval] = useState<NodeJS.Timer>();
  const navbarOpen = useSelector((store: RootState) => store.navigation.navbar);
  const { user, isLoggedIn } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const handleRouteClick = (config: SingleConfig) => {
    if (config.path !== "chat") {
      socket.setAppSelectedChat(null);
    }

    history.push(`/${config.path}`);
    // if (isTabletOrMobile && navbarOpen) {
    //   dispatch(appActions.setNavbarOpen(false));
    // }
  };

  // const getNavbarStyles = () => {
  //   let styles = {};
  //   if (isTabletOrMobile) {
  //     styles = {
  //       left: navbarOpen ? "0px" : "-300px",
  //     };
  //   }
  //   return styles;
  // };

  // const toggleSidebar = () => {
  //   dispatch(appActions.toggleNavbar());
  // };

  return (
    <>
      <div className={classes.menueWrapper}>
        {configs &&
          Object.values(configs).map((config: any) => {
            if (user && config.title === "Admin" && user.role !== "admin") {
              return <React.Fragment key={config.title} />;
            }

            return (
              <div
                key={config.title}
                className={`${classes.menue} ${
                  window.location.pathname.includes(config.path)
                    ? classes.active
                    : ""
                }`}
                onClick={() => handleRouteClick(config)}
              >
                <div className={classes.iconWrapper}>
                  <Box className={classes.icon}>
                    {config.icon}
                    {/* <img src={} className={classes.iconInner} alt={''} /> */}
                  </Box>
                </div>
                <Typography className={classes.title}>
                  {config.title}
                </Typography>
                <div className={classes.badge}>
                  {config.notification > 0 && (
                    <Badge
                      overlap="circular"
                      badgeContent={config.notification}
                      color="error"
                    ></Badge>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Sidebar;

const useStyles = makeStyles((theme) => ({
  sidebarWrapper: {
    background: colors.defaultGrey,
    boxShadow: "1px 0 4px -3px #888",
    // width: 200,
    // height: "100vh",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 4,
    },
  },

  menueWrapper: {
    // height: "calc(100vh - 200px)",
    overflowY: "auto",
    // marginTop: "28px",
  },
  menue: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    paddingRight: 0,
    borderBottom: `1px solid white`,
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
    gap: 13,
    "&:hover": {
      background:
        "white",
    },
  },
  iconWrapper: {
    flex: 1,
    display: "flex",
  },
  icon: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "white",
    color: colors.black,
  },
  title: {
    flex: 4,
    fontSize: 16,
    fontWeight: 500,
  },
  badge: {
    flex: 1,
  },
  active: {
    background:"white",
    color: `${colors.black} !important`,
  },
  help: {
    // height: '50px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  helpIcon: {
    color: colors.white,
    // fontSize: 25,
    position: "absolute",
    zIndex: 2,
    left: 45,
  },
  helpInnerWrapper: {
    background: colors.black,
    left: 65,
    position: "absolute",
    zIndex: 1,
    width: 10,
    height: 10,
  },
  helpText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
  },
  iconInner: {
    width: 12,
    heihgt: 12,
  },
}));
