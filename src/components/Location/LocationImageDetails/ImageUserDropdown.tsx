import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import SearchWithButton from "./SearchWithButton";
import UserImageCard from "./UserImageCard";

interface ImageUserDropdownProps {
  maxWidth: string;
  label: string;
  type: "user" | "tag";
}

const ImageUserDropdown = ({
  maxWidth,
  label,
  type,
}: ImageUserDropdownProps) => {
  const [User, setUser] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    // setUser(event.target.value as string);
  };

  const handleSearch = (searchText: string) => {};

  const temArray = ["Talha", "Ali", "Ahsan", "Ibrahim"];

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: maxWidth }}>
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          >
            <SearchWithButton
              handleSearch={handleSearch}
              searchText=""
              handleDone={() => {}}
            />
            {type === "user" &&
              temArray.map((item) => {
                return (
                  <UserImageCard
                    user={item}
                    handleSelectedList={() => {}}
                    selected={false}
                    showImage={true}
                  />
                );
              })}
            {type === "tag" &&
              temArray.map((item) => {
                return (
                  <UserImageCard
                    user={item}
                    handleSelectedList={() => {}}
                    selected={false}
                    showImage={false}
                  />
                );
              })}
            {/* <MenuItem value={10}>Select User</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ImageUserDropdown;
