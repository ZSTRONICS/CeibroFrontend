import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import de from 'date-fns/locale/de'
// import { registerLocale } from "react-datepicker";
// registerLocale('de', de)



function CDatePicker() {
const [showDate, setShowDate]= useState<any>()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
      <DatePicker
        label='Date'
        // mask="__-__-____"
        value={showDate}
        // inputFormat={"dd-MM-yyyy"}
        minDate={new Date().toISOString().slice(0, 10)}
        onChange={(newValue: any) => setShowDate(newValue)}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default CDatePicker;
