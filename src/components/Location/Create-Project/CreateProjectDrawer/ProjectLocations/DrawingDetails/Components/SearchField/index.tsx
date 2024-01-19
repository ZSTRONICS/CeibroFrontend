import { Box, InputBase } from "@mui/material";
import assets from "assets";
import { ChangeEventHandler } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "400px",
  borderBottom: "1px solid #ccc",
};

const inputStyle = {
  flex: 1,
  padding: "5px",
  border: "none",
  outline: "none",
};

interface SearchFieldProps {
  handleSearch:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  searchText: string;
}

const SearchField = (props: SearchFieldProps) => {
  const { handleSearch, searchText } = props;
  return (
    <Box
      sx={{
        pt: 1.25,
      }}
    >
      <InputBase
        type="search"
        value={searchText}
        placeholder="Start typing to search"
        sx={{
          pl: 4,
          height: "40px",
          borderWidth: "0px 0px 1px 0px",
          borderColor: "#818181",
          borderStyle: "solid",
          width: "100%",
          background: `url(${assets.searchSvgIcon})no-repeat`,
          backgroundPosition: "5px center",
        }}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchField;
