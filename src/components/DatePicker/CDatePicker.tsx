import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import de from 'date-fns/locale/de'

function CDatePicker(props:any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
      <DatePicker
      {...props}
        label='Due date'
        // mask="__-__-____"
        // value={showDate}
        // inputFormat={"dd-MM-yyyy"}
        disablePast={true}
        minDate={new Date().toISOString().slice(0, 10)}
        // onChange={(newValue: any) => setShowDate(newValue)}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default CDatePicker;
