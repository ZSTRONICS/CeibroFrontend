import React, { useState } from "react";
import {
  Autocomplete,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import dialCode from "./dialCode.json";
import { IPhoneNumber } from "./types";

interface IProps {
  name: string;
  placeholder?: string;
  inputValue: IPhoneNumber;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | SelectChangeEvent<unknown>
      | React.SyntheticEvent<Element, Event>,
    value?: string
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

export const PhoneNumberTextField = (props: IProps) => {
  const { name, placeholder, inputValue, onChange, onBlur } = props;
  const [countryCode, setCountryCode] = useState<string>(inputValue.dialCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]{0,11}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      onChange(e);
    }
  };
  const handleCountryCodeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setCountryCode(value);
    onChange(event, value);
  };

  return (
    <OutlinedInput
      name={name}
      size="small"
      placeholder="Phone number"
      sx={{
        "& #outlined-adornment-phone-no": {
          paddingLeft: 1,
        },
        paddingLeft: 0,
        width: "100%",
      }}
      value={inputValue.phoneNumber}
      onChange={handleChange}
      onBlur={onBlur}
      inputMode="text"
      id="outlined-adornment-phone-no"
      startAdornment={
        <Autocomplete
          id="dialCode"
          disableClearable
          options={dialCode.map((code) => code.dial_code)}
          size="small"
          value={countryCode}
          getOptionLabel={(option) => option}
          onChange={(e, value) => handleCountryCodeChange(e, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                autoComplete: "off",
                autoCorrect: "off",
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  paddingLeft: "4px !important",
                },
              }}
            />
          )}
          sx={{
            width: "115px",
            borderTopRightRadius: "0 !important",
            "& .MuiInputBase-sizeSmall": {
              borderBottomRightRadius: 0,
              borderTopRightRadius: "0 !important",
            },
          }}
        />
      }
    />
  );
};
