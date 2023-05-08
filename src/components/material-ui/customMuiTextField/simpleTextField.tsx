import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

interface IProps {
  name: string;
  label: string;
  type?: string;
  required?:boolean;
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

export const SimpleTextField = (props: IProps) => {
  const { name, type, label, placeholder,required, inputValue, onChange, onBlur } =
    props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  const id = label.replace(/\s+/g, "-");
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        required={required}
        id={id}
        name={name}
        type={type ? type : "text"}
        label={label}
        placeholder={placeholder ?? placeholder}
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </FormControl>
  );
};
