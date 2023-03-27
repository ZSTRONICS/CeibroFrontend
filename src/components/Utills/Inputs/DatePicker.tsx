import React from "react";
import { makeStyles } from "@material-ui/core";
import InputHOC from "./InputHOC";
import colors from "assets/colors";

interface DatePickerInt {
  onChange?: (e: any) => void;
  value?: any;
  disabled?: boolean;
  min?: string;
  max?: string;
  Datetitle?: string | any;
}

const DatePicker: React.FC<DatePickerInt> = (props) => {
  const classes = useStyles();

  const handleChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <InputHOC title={props.Datetitle || "Due date"}>
      <input
        min={props?.min}
        max={props?.max}
        // placeholder="dd/mm/yyyy"
        disabled={props.disabled}
        onChange={handleChange}
        value={props.value}
        className={classes.dateInput}
        type="date"
      />
    </InputHOC>
  );
};

export default DatePicker;

const useStyles = makeStyles({
  dateInput: {
    border: "none",
    color: `#AEADBD !important`,
    fontSize: 14,
    fontWeight: 500,
    // paddingLeft: 10,
    padding: "9px 10px",
    background: "transparent",
    flex: 3,
    "&:focus": {
      border: "transparent",
    },
    "&:active": {
      border: "transparent",
    },
    "&:focus-visible": {
      outline: "transparent",
    },
  },
});
