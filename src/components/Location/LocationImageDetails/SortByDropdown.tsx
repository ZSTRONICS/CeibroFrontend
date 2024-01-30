import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

const SortByDropdown = () => {
  return (
    <>
      <Box sx={{ maxWidth: "114px", width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Sort By
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "sort",
              id: "uncontrolled-native",
            }}
          >
            <option value={1}>Yesterday</option>
            <option value={2}>Today</option>
            <option value={3}>Tomarrow</option>
            <option value={4}>This week</option>
            <option value={5}>This month</option>
            <option value={6}>Last month</option>
            <option value={7}>this year</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </>
  );
};

export default SortByDropdown;
