import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import de from 'date-fns/locale/de'
import useStyles from "components/Tasks/SubTasks/CreateSubTaskStyles";

function CDatePicker(props:any) {
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
      <div className={classes.datePicker}>
        {/* custom lable for due date leftside */}
      <DatePicker
      {...props}
        label={props.showLabel===true?"":'Due date'}
        // mask="__-__-____"
        // value={showDate}
        inputFormat={"dd.MM.yyyy"}
        disablePast={true}
        minDate={new Date().toISOString().slice(0, 10)}
        // onChange={(newValue: any) => setShowDate(newValue)}
        renderInput={(params: any) => <TextField {...params} 
        error={false}
        // helperText="incorrect date"
        sx={{
          ".MuiInputBase-input": { padding: '10px 14px' },
        }}/>}
      />
      </div>
    </LocalizationProvider>
  );
}

export default CDatePicker;
