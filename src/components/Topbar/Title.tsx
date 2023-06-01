import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import projectActions from "../../redux/action/project.action";
import taskActions from "../../redux/action/task.action";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { ArrowBack } from "@material-ui/icons";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";
// import CreateChat from "./CreateChat";
import CButton from "components/Button/Button";
import { CustomStack, TopBarTitle } from "components/CustomTags";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import assets from "assets/assets";
import { styled } from "@mui/system";

const Title = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = useHistory();
  const classes = useStyles();

  const ProjectName = [
    { label: "The Redemption", value: 1 },
    { label: "The Constructin", value: 2 },
    { label: "Park", value: 3 },
  ];

  const openProjectDrawer = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
    dispatch(projectActions.openDrawer());
  };

  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const BackIcon = () => (
    <ArrowBack className={classes.backIcon} onClick={goBack} />
  );

  const titleFontSize = {
    xs: 16,
    sm: 24,
    md: 32,
  };
  const getTitle = () => {
    const titleData = [
      {
        path: "project",
        title: "Project",
        className: classes.projectTitle,
        additionalComponent: (
          <CButton
            startIcon={<AddIcon />}
            onClick={openProjectDrawer}
            label="New"
            variant="contained"
            sx={{
              padding: "6px 5px",
              fontWeight: "700",
              minWidth: { xs: "70px", sm: "80px" },
              fontSize: { xs: 12, sm: 13 },
            }}
          />
        ),
      },
      {
        path: "task",
        title: "Task",
        className: classes.taskTitle,
        additionalComponent: (
          <CButton
            startIcon={<AddIcon />}
            onClick={openTaskModal}
            label="New"
            variant="contained"
            sx={{
              padding: "6px 5px",
              fontWeight: "700",
              minWidth: { xs: "70px", sm: "80px" },
              fontSize: { xs: 12, sm: 13 },
            }}
          />
        ),
      },
      // {
      //   path: "dashboard",
      //   title: "Dashboard",
      //   className: classes.dashboardTitle,
      // },
      // {
      //   path: "admin",
      //   title: "Admin",
      //   className: classes.dashboardTitle,
      // },
      // {
      //   path: "chat",
      //   title: "Chat",
      //   className: `${classes.chatTitle} ${classes.chatBtn}`,
      //   additionalComponent: !isTabletOrMobile && (
      //     <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      //       <CreateChat />
      //     </div>
      //   ),
      // },
      {
        path: "connections",
        title: "My Connections",
        className: classes.chatTitle,
        additionalComponent: <BackIcon />,
        additionalComponentPosition: "start",
      },
      {
        path: "profile",
        title: "Profile",
        className: classes.chatTitle,
        additionalComponent: <BackIcon />,
        additionalComponentPosition: "start",
      },
      {
        path: "drawing",
        title: (
          <CustomAutocomplete
            disablePortal
            disableClearable
            filterSelectedOptions
            id="project-names"
            popupIcon={<assets.ExpandMoreIcon />}
            options={ProjectName}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
        ),
        additionalComponent: (
          <CButton
            startIcon={<AddIcon />}
            // onClick={openLocationModal}
            label="Floor"
            variant="contained"
            sx={{
              padding: "6px 8px",
              fontWeight: "700",
              minWidth: { xs: "70px", sm: "80px" },
              fontSize: { xs: 12, sm: 13 },
            }}
          />
        ),
        isDynamic: true,
      },
      {
        path: "drawingDetail",
        title: "Drawing detail",
        isDynamic: true,
        additionalComponent: <BackIcon />,
        additionalComponentPosition: "start",
      },
    ];

    const currentPath = titleData.find((data) => {
      if (data.isDynamic) {
        const pathRegex = new RegExp(`^/${data.path}/[a-zA-Z0-9-_]+$`);
        return pathRegex.test(location.pathname);
      } else {
        return location.pathname.includes(data.path);
      }
    });
  
    if (currentPath) {
      const {
        title,
        className,
        additionalComponent,
        additionalComponentPosition = "end",
      } = currentPath;

      return (
        <>
          <CustomStack
            sx={{ width: "100%", gap: "20px" }}
            className={className}
          >
            {additionalComponentPosition === "start" && additionalComponent}
            <TopBarTitle sx={{ fontSize: titleFontSize, fontWeight: 500 }}>
              {title}
            </TopBarTitle>
            {additionalComponentPosition === "end" && additionalComponent}
          </CustomStack>
        </>
      );
    }

    return <></>;
  };

  return <>{getTitle()}</>;
};

export default Title;

const useStyles = makeStyles((theme) => ({
  chatBtn: {
    paddingRight: 20,
  },
  chatTitle: {
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    "@media (max-width:960px)": {
      paddingLeft: 0,
      // minWidth: 300,
    },
  },
  backIcon: {
    color: colors.primary,
    cursor: "pointer",
  },
  projectTitle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingLeft: 8,
    gap: 15,
    "@media (max-width:960px)": {
      gap: 10,
    },
  },

  taskTitle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 20,
    gap: 20,
    alignItems: "center",
    [theme.breakpoints.down(769)]: {
      paddingLeft: 6,
      gap: 10,
    },
  },
  dashboardTitle: {
    display: "flex",
    paddingLeft: 24,
    width: "100%",
    "@media (max-width:960px)": {
      justifyContent: "space-between",
      paddingLeft: 0,
    },
  },
}));

const CustomAutocomplete = styled(Autocomplete)`
  padding: 0px;
  .MuiAutocomplete-input {
    background-color: white;
    border: none;
    outline: none;
    padding: 2px;
    color: black;
  }
  .MuiAutocomplete-option {
    background-color: lightblue;
    color: red;
  }
  .MuiOutlinedInput-root {
    padding: 4px;
    border-width: 0px;
  }
`;
