import { MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SortByDropdown = () => {
  return (
    <>
      <Box sx={{ maxWidth: "114px", width: "100%" }}>
        <FormControl
          variant="standard"
          size="small"
          sx={{ width: "100%", backgroundColor: "#fff !important" }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Sort by
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="Age"
            sx={{
              "& .MuiSelect-select-MuiInputBase-input-MuiInput-input:focus": {
                backgroundColor: "#fff !important",
              },
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
