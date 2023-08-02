import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField"; // Import the TextField from MUI
import { ChangeValueType, CreateNewTaskFormType } from "components/Tasks/type";
import { useState } from "react";

interface CustomeDatePickerProps {
  name: string;
  label: string;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

const CustomDatePicker = ({
  label,
  name,
  handleChangeValues,
}: CustomeDatePickerProps) => {
  const [value, setValue] = useState<string>(new Date().toLocaleDateString());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString();
      handleChangeValues(formattedDate, "dueDate");
      setValue(formattedDate);
    } else {
      console.log("No date selected.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          key={name}
          label={label}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              sx={{
                width: "100%",
                // ...(params.error && {
                //   "& .MuiInputBase-root": { color: "black" },
                // }),
              }}
            />
          )}
          onChange={handleDateChange}
          value={value}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
