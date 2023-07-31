import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField"; // Import the TextField from MUI

const CustomDatePicker = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard" // Set the variant to "standard"
              sx={{ width: "100%" }}
            />
          )}
          onChange={function (
            value: unknown,
            keyboardInputValue?: string | undefined
          ): void {
            console.log("");
          }}
          value={undefined}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
