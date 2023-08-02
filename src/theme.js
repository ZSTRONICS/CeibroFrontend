import { createTheme } from "@material-ui/core/styles";
import colors from "./assets/colors";

export const theme = createTheme({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      borderRadius: "0.2rem",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(244,244,244,.1)",
      outline: "1px solid slategrey",
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondaryBlue,
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    button: {
      textTransform: "none",
      fontSize: 12,
      fontWeight: "bold",
    },
  },
});
