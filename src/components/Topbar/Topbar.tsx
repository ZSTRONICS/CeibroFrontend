import { Badge, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import appActions from "../../redux/action/app.action";
import { RootState } from "../../redux/reducers/appReducer";

const useStyles = makeStyles((theme) => ({
  topMenuWrapper: {
    overflowY: "auto",
    display: "flex",
    height: "40px",
    width: "-webkit-fill-available",
  },
  topMenu: {
    display: "flex",
    width: "135px",
    alignItems: "center",
    padding: "0px 5px",
    paddingRight: 0,
    borderBottom: `1px solid white`,
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Inter",
    color: colors.primary,
    cursor: "pointer",
    gap: 10,
    borderRadius: "8px",
    // height: "50px",
    "&:hover": {
      background: "white",
      color: `${colors.black} !important`,
    },
  },
  topIconWrapper: {
    flex: 1,
    display: "flex",
  },
  topIcon: {
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "white",
    color: colors.black,
  },
  topTitle: {
    flex: 4,
    fontSize: 16,
    fontWeight: 500,
  },
  topBadge: {
    flex: 1,
  },
  active: {
    background: "#F4F4F4",
    // color: `${colors.black} !important`,
  },
}));

function Topbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes
  );
  const { user } = useSelector((store: RootState) => store.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(appActions.setSelectedTab("tasks"));
  }, []);

  const handleRouteClick = (config: SingleConfig) => {
    dispatch(appActions.setSelectedTab(config.key));
    history.push(`/${config.getPath("")}`);
  };

  return (
    <div className={classes.topMenuWrapper}>
      {configs &&
        Object.values(configs).map((config: any) => {
          if (user && config.title === "Admin" && user.role !== "admin") {
            return null;
          }

          return (
            <div
              key={config.title}
              className={`${classes.topMenu} ${
                window.location.pathname.includes(config.getPath(""))
                  ? classes.active
                  : ""
              }`}
              onClick={() => handleRouteClick(config)}
            >
              <div className={classes.topIconWrapper}>
                <Box className={classes.topIcon}>
                  <img src={config.icon} />
                </Box>
              </div>
              <Typography className={classes.topTitle}>
                {config.title}
              </Typography>
              {config?.notification > 0 && (
                <div className={classes.topBadge}>
                  <Badge
                    overlap="circular"
                    badgeContent={config.notification}
                    color="error"
                  ></Badge>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Topbar;
