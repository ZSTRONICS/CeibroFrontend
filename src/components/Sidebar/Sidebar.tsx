import React from "react";
import { Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import { RootState } from "../../redux/reducers/appReducer";
import { socket } from "../../services/socket.services";
import "./sidebar.css";

function Sidebar() {
  const classes = useStyles();
  const selectedTab = useSelector(
    (store: RootState) => store.navigation.selectedTab
  );
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes[selectedTab].childTab
  );
  const { user } = useSelector((store: RootState) => store.auth);
  const history = useHistory();

  const handleRouteClick = (config: SingleConfig) => {
    // if (config.getPath("") !== "chat") {
    //   socket.setAppSelectedChat(null);
    // }
    // history.push(`/${config.getPath("")}`);
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
                className={`${classes.menue}`}
                //  ${
                //   window.location.pathname.includes(config.getPath(""))
                //     ? classes.active
                //     : ""
                // }`}
                onClick={() => handleRouteClick(config)}
              >
                <div className={classes.iconWrapper}>
                  <Box className={classes.icon}>
                    <img src={config.icon} />

                    {/* <img src={} className={classes.iconInner} alt={''} /> */}
                  </Box>
                </div>
                <Typography className={classes.title}>
                  {config.title}
                </Typography>
                <div className={classes.badge}>
                  {config?.notification > 0 && (
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
    overflowY: "auto",
    marginTop: "136px",
    position: "absolute",
    width: "100%",
    gap: 20,
  },
  menue: {
    // display: "flex",
    textAlign: "center",
    padding: "16px 6px",
    borderBottom: `1px solid white`,
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
    gap: 13,
    "&:hover": {
      background: "white",
    },
  },
  iconWrapper: {
    // flex: 1,
    // display: "flex",
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
    fontSize: 10,
    fontWeight: 500,
  },
  badge: {
    flex: 1,
  },
  active: {
    background: "white",
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
