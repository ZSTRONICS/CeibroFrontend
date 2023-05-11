import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import colors from "../../../assets/colors";
import assets from "../../../assets/assets";
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

      // padding: "10px 13%",
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
      overflowY: "scroll",
      paddingBottom: 10,
    },

    tileWrapper: {
      position: "relative",
    },
    dontHave: {
      fontSize: 14,
      fontWeight: 500,
    },
    signup: {
      color: colors.textPrimary,
      textDecoration: "none",
      cursor: "pointer",
    },
    // formTile: {
    //     display: 'inline-block',
    //     margin: 'auto',
    //     textAlign: 'center'
    // }

    errorText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: 400,
    },
    actionWrapper: {
      display: "flex",
      alignItems: "center",
      "@media (max-width:960px)": {
        paddingTop: "15%",
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
      marginTop: 20,
      "@media (max-width:960px)": {
        padding: "10 13%",
      },
      "& .inputs": {
        marginTop: "0px !important",
      },
    },
    loginButton: {
      height: "41px",
      fontSize: 14,
      background: "#0076C8",
      width: "100%",
      textTransform: "capitalize",
    },
    logoWrapper: {
      paddingTop: "4%",
      maxWidth: "160px",
      width: "100%",
    },
    titleWrapper: {
      margin: "45px 0px 15px 0px",
      "@media (max-width:899px)": {
        margin: "0",
        background: `url(${assets.mobileVisual})`,
        height: "calc( 100vh - 291px)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      },
      // "& .MuiTypography-root": {
      //   fontWeight: "500",
      // },
    },
    titleText: {
      "@media (max-width:899px)": {
        visibility: "hidden",
      },
    },
    contentContainer: {
      "@media (max-width:899px)": {
        margin: "0 10px",
        position: "absolute",
        bottom: "2%",
        left: "2%",
        right: "2%",
      },
    },
    inputs: {
      // marginBottom: 25,
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
