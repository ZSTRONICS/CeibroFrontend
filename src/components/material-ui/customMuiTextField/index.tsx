import React from "react";
import { PasswordTextField } from "./paaswordTextField";
import { PhoneNumberTextField } from "./phoneNumberTextField";
import { SimpleTextField } from "./simpleTextField";
import {
  IAutoCompleteProps,
  ICounterTextFieldProps,
  IPasswordProps,
  IPhoneNumber,
  IPhoneNumberProps,
  ITextFieldProps,
} from "./types";

type Props =
  | IPhoneNumberProps
  | IPasswordProps
  | ITextFieldProps
  | IAutoCompleteProps
  | ICounterTextFieldProps;

export const CustomMuiTextField: React.FC<Props> = (props) => {
  switch (props.typeName) {
    case "phone-number":
      return (
        <PhoneNumberTextField
          {...props}
          name={props.name}
          onChange={(e, value) => props.onChange(e, value)}
          inputValue={props.inputValue as IPhoneNumber}
          onBlur={props.onBlur}
          typeName={"phone-number"}
          disabled={props.disabled}
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
          inputVariant={props.inputVariant}
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
    case "counterText-field":
      return (
        <>
          <SimpleTextField
            multiline={props.multiline}
            inputVariant={props.inputVariant}
            required={props.required}
            name={props.name}
            label={props.label}
            type={props.subType}
            placeholder={props.placeholder}
            onChange={props.onChange}
            inputValue={props.inputValue as string}
            onBlur={props.onBlur}
            inputProps={props.inputProps as any}
            maxLength={props.maxLength}
            maxRows={props.maxRows}
          />
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "12px",
              fontWeight: 500,
              color: "#757575",
            }}
          >
            {`${props.inputValue.length}/${props.maxLength}`}
          </span>
        </>
      );
    default: {
      return <> </>;
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
