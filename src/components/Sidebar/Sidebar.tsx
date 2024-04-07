import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import {
  FromMEIcon,
  HiddenIcon,
  MainLogo,
  ToMeIcon,
  UnseenFromMe,
  UnseenHidden,
  UnseenToMe,
} from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import appActions from "redux/action/app.action";
import { selectedTaskFilterType } from "redux/type";
import { openFormInNewWindow } from "utills/common";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import { RootState } from "../../redux/reducers/appReducer";
import "./sidebar.css";

function Sidebar(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [selectedChildTab, setSelectedChildTab] =
    useState<selectedTaskFilterType>();
  const { user } = useSelector((store: RootState) => store.auth);
  const task: any = useSelector((state: RootState) => state.task);
  const { RECENT_TASK_UPDATED_TIME_STAMP, unSeenTasks } = task;
  const { selectedTab, sidebarRoutes } = useSelector(
    (store: RootState) => store.navigation
  );
  const configs = sidebarRoutes[selectedTab]?.childTab;
  const splitedPath = location.pathname.split("/");
  useEffect(() => {
    const mainTab: selectedTaskFilterType =
      splitedPath[1] as selectedTaskFilterType;
    if (mainTab !== selectedTab) {
      dispatch(appActions.setSelectedTab(mainTab));
    }
    const subtask: selectedTaskFilterType =
      splitedPath[2] as selectedTaskFilterType;
    subtask ? setSelectedChildTab(subtask) : setSelectedChildTab(undefined);
  }, [location.pathname, selectedTab]);

  const handleRouteClick = (config: SingleConfig) => {
    props.onClose();
    if (config.key === "newTask") {
      openFormInNewWindow("/create-new-task", "Create New Task");
    } else {
      setSelectedChildTab(config.key);
      history.push(`/tasks/${config.key}`);
    }
  };
  useEffect(() => {
    if (selectedTab === "tasks" && configs && selectedChildTab) {
      const tabMappings: any = {
        allTaskToMe: "isTomeUnseen",
        allTaskFromMe: "isFromMeUnseen",
        allTaskHidden: "isHiddenUnseen",
      };
      const selectedTabKey = tabMappings[selectedChildTab];
      if (selectedTabKey !== undefined) {
        const updatedState = {
          ...unSeenTasks,
          [selectedTabKey]: false,
        };
        dispatch({
          type: TASK_CONFIG.TASK_UNSEEN_TABS,
          payload: updatedState,
        });
      }
    }
  }, [RECENT_TASK_UPDATED_TIME_STAMP, location.pathname]);

  if (selectedTab === "tasks" && configs && unSeenTasks) {
    const { isFromMeUnseen, isTomeUnseen, isHiddenUnseen } = unSeenTasks;
    const { allTaskFromMe, allTaskToMe, allTaskHidden } = configs;
    allTaskFromMe.icon = isFromMeUnseen ? UnseenFromMe : FromMEIcon;
    allTaskToMe.icon = isTomeUnseen ? UnseenToMe : ToMeIcon;
    allTaskHidden.icon = isHiddenUnseen ? UnseenHidden : HiddenIcon;
  }

  return (
    <>
      <Box
        sx={{
          display: "none",
          width: "72px",
          maxWidth: "90px",
          padding: "6px 20px 5px 20px",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          "@media screen and (max-width: 899px)": {
            display: "flex", // Hide the box when the screen width is 1024px or less
          },
        }}
      >
        <MainLogo />
      </Box>
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
                <Typography
                  sx={{ fontSize: 10, fontWeight: 600, color: colors.primary }}
                >
                  {config.title}
                </Typography>
                {/* <div className={classes.badge}>
                  {config?.notification > 0 && (
                    <Badge
                      overlap="circular"
                      badgeContent={config.notification}
                      color="error"
                    ></Badge>
                  )}
                </div> */}
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
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 4,
    },
  },

  menueWrapper: {
    overflowY: "auto",
    top: "16%",
    position: "absolute",
    width: "100%",
    gap: 20,
  },
  menue: {
    textAlign: "center",
    padding: "10px 6px",
    cursor: "pointer",
    gap: 20,
    margin: "10px 0",
    "&:hover": {
      background: "white",
    },
  },

  active: {
    background: "white",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    color: colors.primary,
    borderBottom: "1px solid #0076C8",
  },
}));
