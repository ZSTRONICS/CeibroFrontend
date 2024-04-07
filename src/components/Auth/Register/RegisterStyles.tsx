import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    langContainer: {
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      marginBottom: 20,
      paddingRight: 28,
      width: "100%",
      "@media (max-width:960px)": {
        color: "#fff",
      },
    },
    register: {
      display: "flex",
      "@media (max-width:960px)": {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      overflowY: "auto",
      paddingBottom: 10,
    },

    dontHave: {
      fontSize: 14,
      fontWeight: 500,
      position: "absolute",
      bottom: "6%",
      "@media (max-width:960px)": {
        textAlign: "center",
        position: "relative",
        paddingTop: "1rem",
      },
    },
    signup: {
      color: colors.textPrimary,
      textDecoration: "none",
      cursor: "pointer",
    },
    errorText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: 400,
    },
    actionWrapper: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      "@media (max-width:960px)": {
        padding: "0",
      },
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
    description: {
      marginTop: 0,
      color: "#605C5C",
      fontSize: 16,
      marginBottom: 16,
    },
    registerNumberForm: {
      display: "flex",
      flexDirection: "column",
      marginTop: 40,
      "@media (max-width:960px)": {
        padding: "0 3%",
        marginTop: "2%",
      },
      "& .inputs": {
        marginTop: "0px !important",
      },
    },
    registerNumberFormProfile: {
      paddingLeft: "0",
    },

    loginButton: {
      fontSize: 14,
      background: "#0075D0",
      width: "100%",
      textTransform: "capitalize",
    },
    logoWrapper: {
      paddingTop: "4%",
      maxWidth: "160px",
      width: "100%",
      "@media (max-width:899px)": {
        paddingLeft: "2%",
      },
    },
    titleWrapper: {
      margin: "45px 0px 15px 0px",
      "@media (max-width:899px)": {
        margin: "0",
        background: `url(${assets.visualWebp})`,
        height: "calc( 100vh - 310px)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
      },
    },
    titleWrapperWithRoute: {
      "@media (max-width:899px)": {
        height: "calc( 100vh - 360px)",
      },
    },
    titleWrapperbg: {
      "@media (max-width:899px)": {
        height: "100%",
        background: "none",
      },
    },
    registerNumberFormContainer: {},

    titleText: {
      "@media (max-width:899px)": {
        visibility: "hidden",
      },
    },
    contentContainer: {
      padding: "0px 10px 6px 0px",
      "@media (max-width:899px)": {
        margin: "0 10px",
        paddingLeft: "7px",
        position: "absolute",
        bottom: "2%",
        left: "2%",
        right: "2%",
      },
    },
    contentContainerWithRoute: {
      "@media (max-width:899px)": {
        margin: "0",
        position: "absolute",
        bottom: "6%",
        left: "0%",
        right: "0%",
      },
    },
    contentContainerPosition: {
      padding: "0",
      "@media (max-width:899px)": {
        margin: "0",
        padding: "0 7px",
        position: "relative",
        left: "0%",
        right: "0%",
      },
    },
    inputs: {
      width: "100%",
      maxWidth: 376,
    },
    termsConditions: {
      fontFamily: "Inter !important",
      fontStyle: "normal !important",
      fontWeight: 500,
      fontSize: "16px !important",
      lineHeight: "24px !important",
      color: "#605C5C !important",
      marginBottom: "16px !important",
    },
  })
);

export default useStyles;
