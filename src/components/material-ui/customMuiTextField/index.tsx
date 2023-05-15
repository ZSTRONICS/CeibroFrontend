import React from "react";
import { PhoneNumberTextField } from "./phoneNumberTextField";
import { PasswordTextField } from "./paaswordTextField";
import { SimpleTextField } from "./simpleTextField";
import { IAutoCompleteProps, IPasswordProps, IPhoneNumber, IPhoneNumberProps, ITextFieldProps } from "./types";

type Props =
  | IPhoneNumberProps
  | IPasswordProps
  | ITextFieldProps
  | IAutoCompleteProps

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
