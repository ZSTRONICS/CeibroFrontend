import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";

const useStyles = makeStyles({
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 2,
    alignItems: "center",
  },
  wrapper: {
    width: 390,
  },
  imgWrapper: {
    maxWidth: 80,
    maxHeight: 80,
  },
  img: {
    width: "100%",
  },
  close: {
    color: colors.primary,
    cursor: "pointer",
  },
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    "@media (max-width:960px)": {
      width: "100%",
      marginTop: 10,
    },
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: `25px 0px`,
    "@media (max-width:960px)": {
      flexDirection: "column",
    },
  },
  detailRow: {
    display: "flex",
    paddingTop: 5,
    gap: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
  },
  companyRow: {
    paddingTop: 40,
  },
  email: {
    color: colors.textPrimary,
  },
});

export default useStyles