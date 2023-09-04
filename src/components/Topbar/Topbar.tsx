import { Badge, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import appActions from "../../redux/action/app.action";
import { RootState } from "../../redux/reducers/appReducer";

const Main = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));
const useStyles = makeStyles((theme) => ({
  topMenu: {
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    paddingLeft: "3px",
    borderBottom: `1px solid white`,
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Inter",
    color: colors.primary,
    cursor: "pointer",
    gap: 10,
    borderRadius: "8px",
    "&:hover": {
      background: "white",
      color: `${colors.black} !important`,
    },
  },
  topIcon: {
    padding: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
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
    <Main>
      {configs &&
        Object.values(configs).map((config: any) => {
          if (user && config.title === "Admin" && user.role !== "admin") {
            return null;
          }
          return (
            <Box
              key={config.title}
              className={`${classes.topMenu} ${
                window.location.pathname.includes(config.getPath(""))
                  ? classes.active
                  : ""
              }`}
              onClick={() => handleRouteClick(config)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0.5,
                  gap: 1,
                }}
              >
                <config.icon />
                <Typography className={classes.topTitle}>
                  {config.title}
                </Typography>
              </Box>
              {config?.notification > 0 && (
                <div className={classes.topBadge}>
                  <Badge
                    overlap="circular"
                    badgeContent={config.notification}
                    color="error"
                  ></Badge>
                </div>
              )}
            </Box>
          );
        })}
    </Main>
  );
}

export default Topbar;
