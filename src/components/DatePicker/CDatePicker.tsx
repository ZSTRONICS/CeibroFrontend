import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import de from "date-fns/locale/de";
import { makeStyles } from "@material-ui/core";
import InputHOC from "components/Utills/Inputs/InputHOC";
import "../../components/MuiStyles.css";

function CDatePicker(props: any) {
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale ={de}>
      {props.showLabel === true ? (
        <InputHOC title={props.dueDateLabel || "Due date"}>
          <DatePicker
            inputFormat="dd.MM.yyyy"
            className={`${classes.datePickerContainer} datePickerContainerOutline`}
            {...props}
            renderInput={(params: any) => (
              <TextField
                error={false}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "9px 14px",
                  },
                }}
                {...params}
              />
            )}
          />
        </InputHOC>
      ) : (
        <DatePicker
          inputFormat={"dd.MM.yyyy"}
          {...props}
          label={"Due date"}
          // disablePast={true}
          minDate={new Date().toISOString().slice(0, 10)}
          // onChange={(newValue: any) => setShowDate(newValue)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={false}
              sx={{
                ".MuiInputBase-input": {
                  padding: "9px 14px",
                },
              }}
            />
          )}
        />
      )}
    </LocalizationProvider>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      ".MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
    },
  },
  datePickerContainer: {
    width: "100%",
    background: "white",
    "& .MuiInputBase-root-MuiOutlinedInput-root .Mui-error .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "unset",
        border: "white",
      },
    "& .MuiInputBase-root-MuiInput-root:after": {
      border: "none",
    },
    "& .MuiInputBase-root-MuiInput-root:before": {
      borderBottom: "none",
    },
    "& .MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before":
      {
        borderBottom: "none",
      },
    "& .MuiInputBase-root-MuiInput-root.Mui-disabled:before": {
      borderBottomStyle: "none",
    },
  },
}));
export default CDatePicker;

// const ValidationTextField = styled(TextField)({
//   "& input:valid:hover + fieldset": {
//     border: "none !important"
//   },
//   "& input:valid:focus + fieldset": {
//     border: "none !important"
//   },
// })

// const CustomDatePicker = styled(DatePicker)({
//   "& .MuiInputBase-root": {
//     "&:hover": {
//       borderBottom: "none",
//     },
//     '& .MuiInput-root:hover:not(.Mui-disabled):before':{
//       background:'red'
//     },
//     "& .MuiInputBase-input": {
//       textAlign: "center",
//       "&::before": {
//         display: "none",
//       },
//       "&::after": {
//         display: "none",
//       },
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       border: "none",
//     },
//   },
//   "& .MuiInputBase-root .MuiInput-root:hover:not(.Mui-disabled):before": {
//     borderBottom: "none !important",
//   },
//   // Remove the default background color and border radius of the day cells
//   "& .MuiPickersDay-day": {
//     borderRadius: 0,
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//     "&.Mui-selected": {
//       backgroundColor: "blue",
//       color: "white",
//       fontWeight: "bold",
//     },
//   },
//   "& .MuiInputBase-input": {
//     letterSpacing: "0.1rem",
//   },
// });
