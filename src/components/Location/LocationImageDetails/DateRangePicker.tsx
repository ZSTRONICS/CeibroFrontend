import ClearIcon from "@mui/icons-material/Clear";
import { Box, TextField } from "@mui/material";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

interface DateProps {
  ImageDetail: Boolean;
  ShowPop?: Boolean;
}

const CustomDateRangePicker = ({ ImageDetail, ShowPop }: DateProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleInputChange = () => {
    setDatePickerVisible(true);
  };

  const handleDateSelect = (item: any) => {
    setSelectedRange([item.selection]);
  };

  const handleDatePickerClose = () => {
    setDatePickerVisible(false);
  };
  return (
    <Box
      sx={{
        maxWidth: "180px",
        minWidth: "max-content",
      }}
    >
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: ShowPop ? "none" : null,
            },
          },
        }}
        label="Select Date Range"
        size="small"
        value={`${selectedRange[0].startDate.toDateString()} - ${selectedRange[0].endDate.toDateString()}`}
        onClick={handleInputChange}
        // readOnly
        // fullWidth
      />
      {datePickerVisible && (
        <Box className="datepicker">
          <Box component="span" onClick={handleDatePickerClose}>
            <ClearIcon
              sx={{
                position: "absolute",
                right: "-10px",
                top: "-5px",
                zIndex: "23",
                background: "#fff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                padding: "2px",
                border: "1px solid #000",
                cursor: "pointer",
                // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
              }}
            />
          </Box>
          <DateRangePicker
            onChange={handleDateSelect}
            moveRangeOnFirstSelection={true}
            months={2}
            locale={enUS}
            ranges={selectedRange}
            direction="horizontal"
          />
          <Box
            component="span"
            sx={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
              fontSize: "14px",
              lineHeight: "21px",
              color: "rgb(0, 118, 200)",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={handleDatePickerClose}
          >
            Apply
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomDateRangePicker;
