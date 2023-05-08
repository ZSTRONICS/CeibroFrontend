import React from "react";
import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { PhoneNumberTextField } from "./phoneNumberTextField";
import { PasswordTextField } from "./paaswordTextField";
import { SimpleTextField } from "./simpleTextField";
import { IPhoneNumber, inputType } from "./types";

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  inputValue: string | IPhoneNumber;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  textType?: inputType;
}

export const CustomMuiTextField = (props: IProps) => {
  const {
    name,
    label,
    placeholder,
    textType = "",
    onChange,
    inputValue = "",
    onBlur,
  } = props;
  {
    switch (textType) {
      case "phone-number":
        return (
          <PhoneNumberTextField
            name={name}
            onChange={onChange}
            inputValue={inputValue as IPhoneNumber}
            onBlur={onBlur}
          />
        );
      case "password":
        return (
          <PasswordTextField
            name={name}
            label={label}
            password={inputValue as string}
            placeholder={placeholder ?? placeholder}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
      case "email":
        return (
          <SimpleTextField
            name={name}
            label={label}
            type={textType}
            placeholder={placeholder ?? placeholder}
            onChange={onChange}
            inputValue={inputValue as string}
            onBlur={onBlur}
          />
        );
      default:
        return (
          <SimpleTextField
            name={name}
            label={label}
            placeholder={placeholder ?? placeholder}
            onChange={onChange}
            inputValue={inputValue as string}
            onBlur={onBlur}
          />
        );
    }
  }
};
