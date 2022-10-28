import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { makeStyles } from "@material-ui/core";

const RollOver = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <OutsideClickHandler onOutsideClick={props.handleToggle}>
        <div className={`dropdown-content ${classes.dropdownContent}`}>
          {props.children}
        </div>
      </OutsideClickHandler>
    </>
  );
};
export default RollOver;

const useStyles = makeStyles({
  dropdownContent: {
    minWidth: 157,
    display: "block",
  },
});
