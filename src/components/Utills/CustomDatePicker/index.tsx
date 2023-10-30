import TextField from "@mui/material/TextField"; // Import the TextField from MUI
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ChangeValueType, CreateNewTaskFormType } from "components/Tasks/type";
import moment from "moment-timezone";
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
  const [value, setValue] = useState<any>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const newDate = moment(date).format("DD-MM-YYYY");
      handleChangeValues(newDate, "dueDate");
      setValue(date);
    } else {
      handleChangeValues("", "dueDate");
      console.log("No date selected.");
    }
  };
  // const locales = ['en-us', 'en-gb', 'zh-cn', 'de'];
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "16px" }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"de"}>
        <DatePicker
          key={name}
          label={label}
          inputFormat="DD.MM.YYYY"
          minDate={new Date()}
          InputAdornmentProps={{ position: "start" }}
          PopperProps={{
            sx: { marginLeft: "-35px !important" },
            placement: "auto-start",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              sx={{
                width: "100%",
                label: { color: "#605b5c", fontWeight: 500, fontSize: "14px" },
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
