import { AutocompleteProps } from "@mui/material";

export interface IPhoneNumber {
  dialCode: string;
  phoneNumber: string;
}

export type ICountryData = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

export type inputType = "phone-number" | "email" | "password" | "regular";

interface Common {
  name: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.SyntheticEvent<Element, Event>,
    value?: ICountryData | undefined
  ) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  disabled?: boolean;
}

export interface IPhoneNumberProps extends Common {
  typeName: "phone-number";
  inputValue: IPhoneNumber;
  readOnly?: boolean;
}

export interface IPasswordProps extends Common {
  typeName: "password";
  label: string;
  placeholder: string;
  password: string;
  inputValue: string;
}

export interface ITextFieldProps extends Common {
  typeName: "text-field";
  subType?: string;
  required?: boolean;
  label: string;
  placeholder: string;
  inputValue: string;
}

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface GenericAutocompleteProps<T extends AutocompleteOption>
  extends Omit<AutocompleteProps<T, false, false, false>, "renderInput"> {
  options: T[];
  label: string;
  showSideLabel?:boolean
  placeholder: string;
}
export interface IAutoCompleteProps extends Common {
  typeName: "auto-complete";
  label: string;
  inputValue: string;
}
