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
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

export const PhoneNumberTextField = (props: IProps) => {
  const { name, placeholder, inputValue, onChange, onBlur } = props;
  const [countryCode, setCountryCode] = useState<any>({
    name: 'Estonia',
    dial_code: `+372`,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]{0,11}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      onChange(e);
    }
  };
  const handleCountryCodeChange = (event: SelectChangeEvent<unknown>, value:any) => {
    console.log('value', value)
    // value.name=""
    setCountryCode(value)
    onChange(event);
  };

  return (
    <OutlinedInput
      name={name}
      size="small"
      placeholder="Phone number"
      sx={{
        '& #outlined-adornment-phone-no':{
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
         disableClearable
        options={dialCode}
        value={countryCode}
        sx={{'& .MuiOutlinedInput-root':{
          paddingRight:'10px !important',
          paddingTop:'7px',
          paddingBottom:'7px'
        }}}
        onChange={(e:any, value:any)=>handleCountryCodeChange(e, value)}
        getOptionLabel={(option) => `${option.dial_code}`}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              autoComplete: "off",
              autoCorrect: "off",
            }}
          />
        )}
        style={{ width: 200 }}
      />
      }
    />
  );
};
