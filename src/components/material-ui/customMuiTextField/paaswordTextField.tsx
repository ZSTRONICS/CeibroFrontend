import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

export const PasswordTextField = (props: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { name, label, placeholder, password, onChange, onBlur } = props;
  const id = label.replace(/\s+/g, "-");

  return (
    <>
      <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
        <InputLabel htmlFor={"pwd"}>{label}</InputLabel>
        <OutlinedInput
          autoComplete="off"
          inputProps={{
            autoComplete:"off"
          }}
          id={"pwd"}
          name={name}
          type={showPassword ? "text" : "password"}
          label={label}
          placeholder={placeholder ?? placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={password ? password : undefined}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};
