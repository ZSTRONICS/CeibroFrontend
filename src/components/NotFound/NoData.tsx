import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import colors from "../../assets/colors";

interface Props {
  title: string;
  icon?: any;
}

const NoData: React.FC<Props> = ({ title, icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {icon && icon}
      <Typography className={classes.message}>{title}</Typography>
    </div>
  );
};

export default NoData;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  message: {
    color: colors.lightBlack,
    position: "absolute",
    top: "35%",
  },
});