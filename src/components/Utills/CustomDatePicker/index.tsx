import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ChangeValueType, CreateNewTaskFormType } from "components/Tasks/type";
import moment from "moment-timezone";
import { useState } from "react";
interface CustomeDatePickerProps {
  name: string;
  label: string;
  locationimageDetails?: boolean;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

const CustomDatePicker = ({
  label,
  name,
  locationimageDetails,
  handleChangeValues,
}: CustomeDatePickerProps) => {
  const [value, setValue] = useState<any>(null);
  const [open, setOpen] = useState(false);

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
          sx={{
            fieldset: {
              borderWidth: "0px",
              borderRadius: "0px",
              borderBottom: "1px solid #949494",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              borderColor: "black",
            },
            "& .MuiInputBase-root": {
              height: locationimageDetails ? "38px" : "",
              marginTop: locationimageDetails ? "-13px" : "",
              minWidth: locationimageDetails ? "100px" : "",
            },
            "& .MuiInputLabel-root": {
              marginTop: locationimageDetails ? "-20px" : "",
            },
          }}
          key={name}
          label={label}
          format="DD.MM.YYYY"
          slotProps={{
            actionBar: {
              actions: ["clear"],
              onClick: () => {
                setValue(null);
              },
            },
          }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          // minDate={new Date()}
          // PopperProps={{
          //   sx: { marginLeft: "-35px !important" },
          //   placement: "auto-start",
          // }}
          // renderInput={(params) => (
          //   <TextField
          //     {...params}
          //     variant="standard"
          //     sx={{
          //       width: "100%",
          //       label: {
          //         color: "#757575",
          //         fontWeight: 600,
          //         fontSize: "16px",
          //       },
          //     }}
          //     onClick={() => setOpen(true)}
          //   />
          // )}
          onChange={handleDateChange}
          value={value}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
