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
      "@media (max-width:960px)": {
        // background: `url(${assets.visual})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
      },
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
      paddingTop: "2%",
      // paddingLeft: "7%",
    },
    titleWrapper: {
      margin: "45px 0px 15px 0px",
      // "& .MuiTypography-root": {
      //   fontWeight: "500",
      // },
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
