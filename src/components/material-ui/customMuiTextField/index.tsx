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

interface IPhoneNumberProps {
  typeName: 'phone-number';
  name: string;
  inputValue: IPhoneNumber;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

interface IPasswordProps {
  typeName: 'password';
  name: string;
  label: string;
  placeholder: string;
  password: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

interface ITextFieldProps {
  typeName: 'text-field';
  subType?: string;
  name: string;
  required?:boolean;
  label: string;
  placeholder: string;
  inputValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

interface IAutoCompleteProps {
  typeName: 'auto-complete';
  name: string;
  label: string;
  inputValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

type Props =
  | IPhoneNumberProps
  | IPasswordProps
  | ITextFieldProps
  | IAutoCompleteProps;

export const CustomMuiTextField: React.FC<Props> = (props) => {
  switch (props.typeName) {
    case "phone-number":
      return (
        <PhoneNumberTextField
          name={props.name}
          onChange={(e: any) => props.onChange(e)}
          inputValue={props.inputValue as IPhoneNumber}
          onBlur={props.onBlur}
        />
      );
    case "password":
      return (
        <PasswordTextField
          name={props.name}
          
          label={props.label}
          password={props.password as string}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      );

    case "text-field":
      return (
        <SimpleTextField
        required={props.required}
          name={props.name}
          label={props.label}
          type={props.subType}
          placeholder={props.placeholder}
          onChange={props.onChange}
          inputValue={props.inputValue as string}
          onBlur={props.onBlur}
        />
      );
      default: {
        return <> </>
      }
    // case "auto-complete":
    //   return (
    //     <SimpleTextField
    //       name={props.name}
    //       label={props.label}
    //       type={props.textType}
    //       placeholder={props.placeholder}
    //       onChange={props.onChange}
    //       inputValue={props.inputValue as string}
    //       onBlur={props.onBlur}
    //     />
    //   );
  }
};
