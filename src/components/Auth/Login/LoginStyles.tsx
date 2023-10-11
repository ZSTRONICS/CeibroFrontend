import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import colors from "../../../assets/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoTitleWrapper: {
      marginLeft: 45,
      height: "100vh",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
    },
    loginForm: {
      display: "flex",
      flexDirection: "column",
      marginTop: 20,
      padding: "10px 13%",
      "@media (max-width:960px)": {
        padding: "10 13%",
      },
      "& .MuiInputBase-input": {
        border: "1px solid #DBDBE5",
        padding: "10px 12px !important",
        position: "relative",
      },
    },
    PassInput: {
      marginTop: "10px",
    },

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
    wrapper: {
      height: "94%",
    },

    logoWrapper: {
      paddingTop: "2%",
      paddingLeft: "8%",
    },
    login: {
      display: "flex",
      "@media (max-width:960px)": {
        flexDirection: "column",
        height: "100vh",
      },
    },
    form: {
      height: "100vh",
      "@media (max-width:960px)": {
        backgroundSize: "100vw 100vh",
      },
    },
    tileWrapper: {
      position: "relative",
    },
    dontHave: {
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      position: "absolute",
      bottom: "6%",
      "@media (max-width:760px)": {
        position: "relative",
        textAlign: "center",
        marginTop: "20px",
      },
    },
    signup: {
      color: colors.textPrimary,
      textDecoration: "none",
    },
  })
);

export default useStyles;
