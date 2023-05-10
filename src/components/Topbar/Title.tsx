
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import projectActions from "../../redux/action/project.action";
import taskActions from "../../redux/action/task.action";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { useMediaQuery } from "react-responsive";
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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

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
    <ArrowBack  className={classes.backIcon} onClick={goBack} />
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
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Project
          </TopBarTitle>
          <CButton
             startIcon={<AddIcon/>}
                onClick={openTaskModal}
                  label='New'
                  variant="contained"
                  sx={{padding:'6px 5px', fontWeight:'700', minWidth:{xs:"70px", sm:'80px'}, fontSize:{xs:12,sm:13}}} />
          </div>
        </>
      );

    if (location.pathname.includes("task"))
      return (
        <>
          <div className={classes.taskTitle}>
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
            Task
            </TopBarTitle>
            <CButton
             startIcon={<AddIcon/>}
                onClick={openTaskModal}
                  label='New'
                  variant="contained"
                  sx={{padding:'6px 5px', fontWeight:'700', minWidth:{xs:"70px", sm:'80px'}, fontSize:{xs:12,sm:13}}} />
          </div>
        </>
      );

    if (location.pathname.includes("dashboard"))
      return (
        <>
          <div className={classes.dashboardTitle}>
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Dashboard
          </TopBarTitle>
          </div>
        </>
      );
    if (location.pathname.includes("admin"))
      return (
        <>
          <div className={classes.dashboardTitle}>
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Admin
          </TopBarTitle>
          </div>
        </>
      );

    if (location.pathname.includes("chat"))
      return (
        <>
          <div className={`${classes.chatTitle} ${classes.chatBtn}`}>
          <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500}}>
          Chat
          </TopBarTitle>
          </div>
          {!isTabletOrMobile && (
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <CreateChat />
            </div>
          )}
        </>
      );

    if (location.pathname.includes("connections"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500,paddingLeft:'10px'}}>
            My Connections
          </TopBarTitle>
          </div>
        </>
      );

    if (location.pathname.includes("profile"))
      return (
        <>
          <div className={classes.chatTitle}>
            <BackIcon />
            <TopBarTitle sx={{fontSize:titleFontSize,fontWeight:500, paddingLeft:'10px'}}>
            Profile
          </TopBarTitle>
          </div>
        </>
      );
  };

  return <>{getTitle()}</>;
};

export default Title;

const useStyles =  makeStyles((theme) => ({
  login: {
    color: colors.white,
    textDecoration: "none",
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: 500,
    marginLeft: 10,
  },
  chatBtn:{
    paddingRight: 20
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
  dashboardTitleText: {
    fontSize: 30,
    fontWeight: 500,
    "@media (max-width:960px)":{
      fontSize: 22,
    }
  },
}));
