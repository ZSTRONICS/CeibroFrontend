import { Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectedTaskFilterType } from "redux/type";
import { openFormInNewWindow } from "utills/common";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import { RootState } from "../../redux/reducers/appReducer";
import "./sidebar.css";

function Sidebar(props: any) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [selectedChildTab, setSelectedChildTab] =
    useState<selectedTaskFilterType>();
  const selectedTab = useSelector(
    (store: RootState) => store.navigation.selectedTab
  );
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes[selectedTab].childTab
  );
  const { user } = useSelector((store: RootState) => store.auth);
  // const { selectedTaskFilter } = useSelector((store: RootState) => store.task);
  useEffect(() => {
    const subtask: selectedTaskFilterType = location.pathname.split(
      "/"
    )[2] as selectedTaskFilterType;
    subtask ? setSelectedChildTab(subtask) : setSelectedChildTab(undefined);
  }, [location.pathname]);

  const handleRouteClick = (config: SingleConfig) => {
    props.onClose();
    if (config.key === "newTask") {
      openFormInNewWindow("/create-new-task", "Create New Task");
    } else {
      setSelectedChildTab(config.key);
      history.push(`/tasks/${config.key}`);
    }
  };

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
                  selectedChildTab === config.key ? classes.active : ""
                }`}
                onClick={() => handleRouteClick(config)}
              >
                <Box>
                  <config.icon />
                </Box>
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
    marginTop: "30px",
    position: "absolute",
    width: "100%",
    gap: 20,
  },
  menue: {
    // display: "flex",
    textAlign: "center",
    padding: "10px 6px",
    borderBottom: `1px solid white`,
    color: colors.primary,
    cursor: "pointer",
    gap: 13,
    margin: "10px 0",
    "&:hover": {
      background: "white",
    },
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
    boxShadow: "0px 2px 2px 0px #3b95d3",
  },
}));
