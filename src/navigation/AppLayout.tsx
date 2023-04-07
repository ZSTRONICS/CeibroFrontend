import { makeStyles } from "@material-ui/core";
import React from "react";
import colors from "../assets/colors";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { RootState } from "../redux/reducers/index";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";

interface AppLayoutInterface {}

const AppLayout: React.FC<AppLayoutInterface> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const navbarOpen = useSelector((state: RootState) => state.navigation.navbar);
  const { sidebarOpen } = useSelector((state: RootState) => state.chat);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const getChildrenStyles = () => {
    return {
      paddingRight: history.location.pathname.includes("chat")
        ? sidebarOpen && !isTabletOrMobile
          ? 270
          : 60
        : 20,
    };
  };

  const profileView = history.location.pathname.includes("profile");
  return (
    // <>
    //   <Grid container className={classes.mainContainer} justifyContent='space-between'>
    //     <Grid item className={classes.sidebarContainer}>
    //       {/* sidebar */}
    //       <Sidebar />
    //     </Grid>

    //       <Grid item container  className={classes.bodyContainer}>
    //         <Grid item className={classes.headerContainer}>
    //           {/* topbar header */}
    //           <Topbar />
    //         </Grid>
    //         <Grid item className={classes.content}>
    //           {/* body content */}
    //           {children}
    //         </Grid>
    //       </Grid>
    //   </Grid>
    // </>
    <div
      className={`${classes.wrapper} ${
        profileView ? classes.profileWrapper : ""
      }`}
    >
      <Sidebar />
      {navbarOpen && isTabletOrMobile && (
        <div className={classes.blackWrapper}></div>
      )}
      <div className={classes.content}>
        <Topbar />
        <div className={classes.children} style={getChildrenStyles()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

const useStyles = makeStyles((theme) => ({
  mainContainer:{
    maxWidth:'1920px',
    width:'100%',
    maxHeight:'100%',
    overflow: "hidden",
    margin:'0 auto',
  },
  sidebarContainer:{
    maxWidth:'20%',
    "@media (max-width:1024px)": {
      
    },
  },

  bodyContainer:{
    maxWidth:'calc(100vw - 200px)',
    overflow: "hidden",
  },
  headerContainer:{
    height:'70px',
    width:'100%',

  },
  contentContainer:{
    width:'100%',
    height: 'calc(100vh - 70px)',
    overflow:'auto',
  },
  
  wrapper: {
    maxWidth:'1920px',
    width:'100%',
    maxHeight:'100%',
    overflow: "hidden",
    margin:'0 auto',
    "@media (max-width:600px)": {
      overflowX: "hidden",
    },
  },
  profileWrapper: {
  //   overflowY: "auto",
  },
  content: {
    marginLeft: 200,
    // overflow: "hidden",
    height: "100%",
    background: colors.lightGrey,
    "@media (max-width:960px)": {
      marginLeft: 0,
      padding: 0,
    },
    // "@media (max-width:600px)": {
    //   overflow: "auto",
    //   // height: "calc(100vh)",
    // },
  },
  children: {
    // overflow: "auto",o
    padding: "12px 12px",
    "@media (max-width:960px)": {
      padding: "10px 10px",
    },
    "@media (max-width:1280px)": {
      padding: "10px 10px",
    },
  },
  blackWrapper: {
    position: "absolute",
    background: colors.black,
    opacity: 0.3,
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
}));
