import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import { updateLocalStorageObject } from "components/Utills/Globals";
import {
  FromMEIcon,
  HiddenIcon,
  ToMeIcon,
  UnseenFromMe,
  UnseenHidden,
  UnseenToMe,
} from "components/material-ui/icons";
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
  const { RECENT_TASK_UPDATED_TIME_STAMP } = task;
  const { selectedTab, sidebarRoutes } = useSelector(
    (store: RootState) => store.navigation
  );
  const configs = sidebarRoutes[selectedTab]?.childTab;
  const splitedPath = location.pathname.split("/");
  let taskUnseenTabs = JSON.parse(localStorage.getItem("unSeenTasks") as any);
  const [isTaskTabSeen, setisTaskTabSeen] = useState(taskUnseenTabs);

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
    if (selectedTab === "tasks" && configs) {
      let updatedState: any = { ...taskUnseenTabs };
      if (selectedChildTab === "allTaskToMe") {
        updatedState = { ...taskUnseenTabs, isTomeUnseen: false };
      } else if (selectedChildTab === "allTaskFromMe") {
        updatedState = { ...taskUnseenTabs, isFromMeUnseen: false };
      } else if (selectedChildTab === "allTaskHidden") {
        updatedState = { ...taskUnseenTabs, isHiddenUnseen: false };
      }
      if (updatedState) {
        setTimeout(() => {
          const res = updateLocalStorageObject(updatedState);
          console.log(res);
          setisTaskTabSeen(res);
        }, 100);
      }
    }
  }, [RECENT_TASK_UPDATED_TIME_STAMP, selectedChildTab]);

  if (selectedTab === "tasks" && configs) {
    configs.allTaskFromMe.icon = isTaskTabSeen.isFromMeUnseen
      ? UnseenFromMe
      : FromMEIcon;
    configs.allTaskToMe.icon = isTaskTabSeen.isTomeUnseen
      ? UnseenToMe
      : ToMeIcon;
    configs.allTaskHidden.icon = isTaskTabSeen.isHiddenUnseen
      ? UnseenHidden
      : HiddenIcon;
  }

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
