import React from "react";
import { Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import assets from "../../assets/assets";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import { RootState } from "../../redux/reducers";
import { useMediaQuery } from "react-responsive";
import OutsideClickHandler from "react-outside-click-handler";
import appActions from "../../redux/action/app.action";
import "./sidebar.css";
import { socket } from "../../services/socket.services";
import {
  getAllProjects,
  getAllProjectsWithMembers,
} from "redux/action/project.action";

function Sidebar() {
  const classes = useStyles();
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes
  );
  const navbarOpen = useSelector((store: RootState) => store.navigation.navbar);
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const handleRouteClick = (config: SingleConfig) => {
    if (config.path !== "chat") {
      socket.setAppSelectedChat(null);
    }
    if (window.location.pathname.includes("projects")) {
      dispatch(getAllProjects());
      dispatch(getAllProjectsWithMembers());
    }
    history.push(`/${config.path}`);
    if (isTabletOrMobile && navbarOpen) {
      dispatch(appActions.setNavbarOpen(false));
    }
  };

  const getNavbarStyles = () => {
    let styles = {};
    if (isTabletOrMobile) {
      styles = {
        left: navbarOpen ? "0px" : "-300px",
      };
    }
    return styles;
  };

  const toggleSidebar = () => {
    dispatch(appActions.toggleNavbar());
  };

  return (
    <OutsideClickHandler
      onOutsideClick={toggleSidebar}
      disabled={!isTabletOrMobile || !navbarOpen}
    >
      <div
        className={`${classes.sidebarWrapper} sidebarWrapper`}
        style={getNavbarStyles()}
      >
        <div className={classes.logoWrapper}>
          <img src={assets.logo} alt="ceibro-logo" />
        </div>

        <div className={classes.menueWrapper}>
          {configs &&
            Object.values(configs).map((config: any) => {
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
                    <Typography className={classes.icon}>
                      {config.icon}
                      {/* <img src={} className={classes.iconInner} alt={''} /> */}
                    </Typography>
                  </div>
                  <Typography className={classes.title}>
                    {config.title}
                  </Typography>
                  <div className={classes.badge}>
                    {config.notification > 0 && (
                      <Badge
                        badgeContent={config.notification}
                        color="error"
                      ></Badge>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* <div className={classes.help}>
          <div className={classes.helpInnerWrapper}></div>
          <img src={assets.questionMarkIcon} className={classes.helpIcon} alt={''} />
          <Typography className={classes.helpText}>Help</Typography>
        </div> */}
      </div>
    </OutsideClickHandler>
  );
}

export default Sidebar;

const useStyles = makeStyles((theme) => ({
  sidebarWrapper: {
    background: colors.white,
    boxShadow: "1px 0 4px -3px #888",
    width: 200,
    height: "100vh",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 4,
    },
  },
  logoWrapper: {
    maxHeight: 150,
  },
  menueWrapper: {
    height: "calc(100vh - 200px)",
    overflowY: "auto",
    marginTop: "28px",
  },
  menue: {
    display: "flex",
    alignItems: "center",
    padding: "15px 10px",
    paddingRight: 0,
    borderBottom: `1px solid #dedede`,
    fontSize: 16,
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
    gap: 13,
    "&:hover": {
      background:
        "linear-gradient(264.75deg, rgba(0, 118, 200, 0.22) -4.37%, rgba(255, 255, 255, 0.22) 88.04%)",
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
    background: "#0076C8",
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
    background:
      "linear-gradient(264.75deg, rgba(0, 118, 200, 0.22) -4.37%, rgba(255, 255, 255, 0.22) 88.04%)",
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
