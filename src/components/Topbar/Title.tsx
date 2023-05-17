<<<<<<< HEAD
import React from "react";
=======

import React, { useCallback } from "react";
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import projectActions from "../../redux/action/project.action";
import taskActions from "../../redux/action/task.action";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { ArrowBack } from "@material-ui/icons";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";
import CreateChat from "./CreateChat";
import CButton from "components/Button/Button";
import { TopBarTitle } from "components/CustomTags";
import AddIcon from '@mui/icons-material/Add';

const Title = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = useHistory();
  const classes = useStyles();

  const openProjectDrawer = () => {
    dispatch(projectActions.setSelectedProject(null));
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
    dispatch(projectActions.openDrawer());
  };

  const openTaskModal = () => {
<<<<<<< HEAD
    dispatch(taskActions.openNewTaskModal());
  };

  const goBack = () => {
    history.goBack();
  };
=======
		dispatch(taskActions.openNewTaskModal());
	  };
	  
    const goBack = useCallback(() => {
      history.goBack();
    }, [history]);  
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc

  const BackIcon = () => (
    <ArrowBack className={classes.backIcon} onClick={goBack} />
  );

  const titleFontSize = {
    xs: 18,
    sm: 24,
    md: 32,
  };

  const getTitle = () => {
    if (location.pathname.includes("project"))
      return (
        <>
          <div className={classes.projectTitle}>
<<<<<<< HEAD
            <TopBarTitle
              sx={{ fontSize: { xs: 20, sm: 22, md: 30 }, fontWeight: 500 }}
            >
              Project
            </TopBarTitle>
            <CButton
              onClick={openProjectDrawer}
              label="Create new"
              variant="contained"
              sx={{
                padding: "6px 9px",
                fontWeight: "700",
                minWidth: "96px",
                fontSize: { xs: 12, sm: 13 },
              }}
            />
=======
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Project
          </TopBarTitle>
          <CButton
             startIcon={<AddIcon/>}
                onClick={openTaskModal}
                  label='New'
                  variant="contained"
                  sx={{padding:'6px 5px', fontWeight:'700', minWidth:{xs:"70px", sm:'80px'}, fontSize:{xs:12,sm:13}}} />
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );

    if (location.pathname.includes("task"))
      return (
        <>
          <div className={classes.taskTitle}>
<<<<<<< HEAD
            <TopBarTitle
              sx={{ fontSize: { xs: 15, sm: 22, md: 30 }, fontWeight: 500 }}
            >
              Task
            </TopBarTitle>
            <CButton
              onClick={openTaskModal}
              label="Create new"
              variant="contained"
              sx={{
                padding: "6px 9px",
                fontWeight: "700",
                minWidth: "96px",
                fontSize: { xs: 12, sm: 13 },
              }}
            />
=======
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
            Task
            </TopBarTitle>
            <CButton
             startIcon={<AddIcon/>}
                onClick={openTaskModal}
                  label='New'
                  variant="contained"
                  sx={{padding:'6px 5px', fontWeight:'700', minWidth:{xs:"70px", sm:'80px'}, fontSize:{xs:12,sm:13}}} />
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );

    if (location.pathname.includes("dashboard"))
      return (
        <>
          <div className={classes.dashboardTitle}>
<<<<<<< HEAD
            <TopBarTitle
              sx={{ fontSize: { xs: 15, sm: 22, md: 30 }, fontWeight: 500 }}
            >
              Dashboard
            </TopBarTitle>
=======
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Dashboard
          </TopBarTitle>
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );
    if (location.pathname.includes("admin"))
      return (
        <>
          <div className={classes.dashboardTitle}>
<<<<<<< HEAD
            <TopBarTitle
              sx={{ fontSize: { xs: 15, sm: 22, md: 30 }, fontWeight: 500 }}
            >
              Admin
            </TopBarTitle>
=======
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Admin
          </TopBarTitle>
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );

    if (location.pathname.includes("chat"))
      return (
        <>
          <div className={`${classes.chatTitle} ${classes.chatBtn}`}>
<<<<<<< HEAD
            <TopBarTitle
              sx={{ fontSize: { xs: 15, sm: 22, md: 30 }, fontWeight: 500 }}
            >
              Chat
            </TopBarTitle>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <CreateChat />
=======
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Chat
          </TopBarTitle>
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );

    if (location.pathname.includes("connections"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
<<<<<<< HEAD
            <TopBarTitle
              sx={{
                fontSize: { xs: 15, sm: 22, md: 24, lg: 30 },
                fontWeight: 500,
                paddingLeft: "10px",
              }}
            >
              My Connections
            </TopBarTitle>
=======
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500,paddingLeft:'10px'}}>
            My Connections
          </TopBarTitle>
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );

    if (location.pathname.includes("profile"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
<<<<<<< HEAD
            <TopBarTitle
              sx={{
                fontSize: { xs: 15, sm: 20, md: 30 },
                fontWeight: 500,
                paddingLeft: "10px",
              }}
            >
              Profile
            </TopBarTitle>
=======
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500, paddingLeft:'10px'}}>
            Profile
          </TopBarTitle>
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
          </div>
        </>
      );
  };

  return <>{getTitle()}</>;
};

export default Title;

const useStyles = makeStyles((theme) => ({
  login: {
    color: colors.white,
    textDecoration: "none",
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: 500,
    marginLeft: 10,
  },
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
<<<<<<< HEAD
      paddingLeft: 6,
=======
    paddingLeft: 6,
    gap: 10,

>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
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
  dashboardTitleText: {
    fontSize: 30,
    fontWeight: 500,
    "@media (max-width:960px)": {
      fontSize: 22,
<<<<<<< HEAD
    },
=======
    }
>>>>>>> 635dba97a16c691c7b5b2e77dfb80946dc8e6dbc
  },
}));
