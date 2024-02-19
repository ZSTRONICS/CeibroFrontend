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
  ShowPop?: Boolean;
}

const ImageUserDropdown = ({
  maxWidth,
  label,
  type,
  ShowPop,
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
          <InputLabel id="demo-simple-select-label">
            {type === "user" ? "Select User" : "Select Tag"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            sx={{
              color: "black",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                border: ShowPop ? "none !important" : "",
              },
            }}
          >
            <SearchWithButton
              handleSearch={handleSearch}
              searchText=""
              handleDone={() => {}}
            />
            {type === "user" &&
              temArray.map((item, index) => {
                return (
                  <UserImageCard
                    key={`img-use-card${index}`}
                    user={item}
                    handleSelectedList={() => {}}
                    selected={false}
                    showImage={true}
                  />
                );
              })}
            {type === "tag" &&
              temArray.map((item, index) => {
                return (
                  <UserImageCard
                    key={`img-tag-card${index}`}
                    user={item}
                    handleSelectedList={() => {}}
                    selected={false}
                    showImage={false}
                  />
                );
              })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ImageUserDropdown;
