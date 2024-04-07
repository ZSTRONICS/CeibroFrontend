import { MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface Props {
  ShowPop?: Boolean;
}

const SortByDropdown = ({ ShowPop }: Props) => {
  return (
    <>
      <Box
        sx={{
          marginLeft: "-35px",
          minWidth: "90px",
          maxWidth: "90px",
          transform: ShowPop ? "translateX(-5px)" : null,
        }}
      >
        <FormControl
          variant="standard"
          size="small"
          sx={{ width: "100%", backgroundColor: "#fff !important" }}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ top: "-8px" }}
          >
            Sort by
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="sortby"
            sx={{
              "& .MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "#fff !important",
              },
              marginTop: "8px !important",
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Yesterday</MenuItem>
            <MenuItem value={2}>Today</MenuItem>
            <MenuItem value={3}>Tomarrow</MenuItem>
            <MenuItem value={4}>This week</MenuItem>
            <MenuItem value={5}>This month</MenuItem>
            <MenuItem value={6}>Last month</MenuItem>
            <MenuItem value={7}>this year</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SortByDropdown;
