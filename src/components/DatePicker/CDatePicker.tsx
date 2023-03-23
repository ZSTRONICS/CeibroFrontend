import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import de from "date-fns/locale/de";
import { makeStyles } from "@material-ui/core";

function CDatePicker(props: any) {
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
      <div
      // className={classes.datePicker}
      >
        {props.showLabel === true ? (
          <div className={classes.outerWrapper}>
            <div className={classes.titleWrapper}>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 500,
                  fontFamily: "Inter",
                  width: "50px",
                  minWidth: "55px",
                  padding: "0",
                }}
              >
                Due date
              </Typography>
            </div>
            <div className={classes.datePickerContainer}>
              <DatePicker
                className={classes.root}
                {...props}
                label={props.showLabel === true ? "" : "Due date"}
                // mask="__-__-____"
                // value={showDate}
                inputFormat={"dd.MM.yyyy"}
                disablePast={props.IsdisablePast === false ? false : true}
                // minDate={new Date().toISOString().slice(0, 10)}
                minDate
                // onChange={(newValue: any) => setShowDate(newValue)}
                renderInput={(params: any) => (
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    variant="standard"
                    {...params}
                    error={false}
                    sx={{
                      borderLeft: "1px solid #dbdbe5",
                      ".MuiInputBase-input": {
                        padding: "9px 14px",
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        ) : (
          <DatePicker
            inputFormat={"dd.MM.yyyy"}
            {...props}
            label={props.showLabel === true ? "" : "Due date"}
            disablePast={true}
            minDate={new Date().toISOString().slice(0, 10)}
            // onChange={(newValue: any) => setShowDate(newValue)}
            renderInput={(params: any) => (
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                {...params}
                error={false}
                sx={{
                  "& fieldset": { border: "none" },
                }}
              />
            )}
          />
        )}
      </div>
    </LocalizationProvider>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    //for dev
    // "& .css-1vv4lmi:hover:not(.Mui-disabled)::before": {
    //   borderBottom: "none",
    // },
    // "& .css-1vv4lmi::after": {
    //   borderBottom: "none",
    // },
    // "& .css-1vv4lmi::before": {
    //   borderBottom: "none",
    // },
    // "& > *": {
    //   ".MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before": {
    //     borderBottom: "none",
    //   },
    // },
    // "& .MuiPickersDay-day:hover, & .Mui-selected:hover, & .Mui-selected.Mui-focusVisible":
    //   {
    //     borderBottom: "none",
    //   },
    // "& .Mui-selected, & .Mui-selected.Mui-focusVisible": {
    //   borderBottom: "none",
    // },
  },
  datePickerContainer: {
    // for local
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:after": {
      borderBottom: "none",
    },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:before": {
      borderBottom: "none",
    },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before":
      {
        borderBottom: "none",
      },
  },
  titleWrapper: {
    color: "#605C5C",
    fontFamily: "inter",
    paddingRight: "2px",
    // padding: 0,
    // minWidth: 65,
    // textAlign: "center",
    // borderRight: `1px solid ${colors.grey}`,
  },
  outerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: " 1.5px solid #dbdbe5",
    borderRadius: "4px",
    width: "100%",
    maxWidth: "330px",
    padding: "0 10px",
    backgroundColor: "white",
  },
}));
export default CDatePicker;
