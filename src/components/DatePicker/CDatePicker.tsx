import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import de from "date-fns/locale/de";
// import useStyles from "components/Tasks/SubTasks/CreateSubTaskStyles";
// import { } from "/styles";
import { makeStyles } from "@material-ui/styles";
import { colors } from "@material-ui/core";

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
            <div>
              <DatePicker
                {...props}
                label={props.showLabel === true ? "" : "Due date"}
                // mask="__-__-____"
                // value={showDate}
                inputFormat={"dd.MM.yyyy"}
                disablePast={true}
                minDate={new Date().toISOString().slice(0, 10)}
                // onChange={(newValue: any) => setShowDate(newValue)}
                renderInput={(params: any) => (
                  <TextField
                    // disableUnderline={true}
                    border="none"
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
                {...params}
                error={false}
                sx={{
                  ".MuiInputBase-input": {
                    // padding: "10px 14px",
                  },
                }}
              />
            )}
          />
        )}
      </div>
    </LocalizationProvider>
  );
}
const useStyles = makeStyles({
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
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before":
      {
        borderBottom: "none",
      },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:after": {
      borderBottom: "none",
    },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:before": {
      borderBottom: "none",
    },
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
});
export default CDatePicker;
