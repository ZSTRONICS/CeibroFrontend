import { createTheme } from "@material-ui/core/styles";
import colors from "./assets/colors";

export const theme = createTheme({
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
