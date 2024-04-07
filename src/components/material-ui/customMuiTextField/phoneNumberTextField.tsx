import { Autocomplete, OutlinedInput, TextField } from "@mui/material";
import { USER_CONFIG } from "config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dialCode from "./dialCode.json";
import { ICountryData, IPhoneNumberProps } from "./types";

export const PhoneNumberTextField = (props: IPhoneNumberProps) => {
  const { name, inputValue, onChange, onBlur, disabled } = props;
  const dispatch = useDispatch();
  const [country, setCountry] = useState<ICountryData>(
    dialCode.find((item) => item.dial_code === inputValue.dialCode)!
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]{0,11}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      onChange(e);
      dispatch({
        type: USER_CONFIG.COUNTRY_CODE_NAME,
        payload: country.code,
      });
    }
  };
  const handleCountryCodeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ICountryData
  ) => {
    setCountry(value);
    onChange(event, value);
  };

  return (
    <OutlinedInput
      autoComplete="off"
      inputProps={{
        autoComplete: "off",
        form: {
          autoComplete: "off",
        },
      }}
      disabled={disabled}
      name={name}
      size="small"
      placeholder="Phone number"
      sx={{
        "& #outlined-adornment-phone-no": {
          paddingLeft: 1,
        },
        paddingLeft: 0,
        width: "100%",
        "& .MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall":
          {
            paddingRight: "0px",
          },
      }}
      value={inputValue.phoneNumber}
      onChange={handleChange}
      onBlur={onBlur}
      inputMode="text"
      id="outlined-adornment-phone-no"
      startAdornment={
        <Autocomplete
          id="dialCode"
          autoComplete={false}
          disabled={disabled}
          disableClearable
          options={dialCode}
          size="small"
          value={country}
          getOptionLabel={(option) => option.dial_code}
          renderOption={(props, option, index) => {
            const key = `listItem-${index}-${option.code}`;
            return (
              <li {...props} key={key}>
                {option.dial_code}
              </li>
            );
          }}
          onChange={(e, value) => handleCountryCodeChange(e, value)}
          onKeyDown={(e) => handleCountryCodeChange(e, country)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                autoComplete: "new-password",
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
            minWidth: "85px",
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
