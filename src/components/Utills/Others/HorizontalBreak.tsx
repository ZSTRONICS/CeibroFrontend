import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../assets/colors";

interface BreakInterface {
  color?: string;
}

const HorizontalBreak: FC<BreakInterface> = ({ color }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.breakWrapper}
      style={{
        borderTop: `1px solid ${color ? color : colors.purpleGrey}`,
        marginTop: "10px",
      }}
    >
      <hr className={classes.break} />
    </div>
  );
};

export default HorizontalBreak;

const useStyles = makeStyles({
  breakWrapper: {
    width: "100%",
  },
  break: {
    border: 0,
  },
});
