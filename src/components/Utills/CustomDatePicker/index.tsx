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
  NewTask?: boolean;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

const CustomDatePicker = ({
  label,
  name,
  locationimageDetails,
  NewTask,
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
              // "& .MuiOutlinedInput-root.Mui-focused": {
              //   border: "none",
              //   outline: "none",
              // },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              outline: "none",
              border: "none !important",
              borderBottom: "1px solid #3f51b5",
            },
            "& .MuiInputBase-root": {
              height: NewTask ? "42px" : locationimageDetails ? "38px" : "",
              marginTop: locationimageDetails ? "-13px" : "",
              minWidth: locationimageDetails ? "100px" : "",
              fontFamily: "Inter",
            },
            "& .MuiInputLabel-root": {
              marginLeft: "-12px",
              fontWeight: "500 !important ",
              fontSize: "14px",
              color: "#605b5c",
              marginTop: locationimageDetails ? "-20px" : "",
            },
            "& .MuiInput-underline.Mui-disabled:before": {},
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
