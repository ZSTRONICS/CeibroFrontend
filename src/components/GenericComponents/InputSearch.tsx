import { InputBase } from "@mui/material";
import assets from "assets";
import React from "react";

interface InputSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  value,
  placeholder = "Start typing to search",
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputBase
      type="search"
      value={value}
      placeholder={placeholder}
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
      onChange={handleInputChange}
    />
  );
};

export default InputSearch;
