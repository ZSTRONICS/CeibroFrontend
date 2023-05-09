import { SelectChangeEvent } from "@mui/material";

export interface IPhoneNumber {
    dialCode: string,
    phoneNumber: string
}

export type inputType = "phone-number" | "email" | "password" | "regular"


interface Common {
    name: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
    ) => void;
    onBlur?: {
      (e: React.FocusEvent<any, Element>): void;
      <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
  }
  
 export interface IPhoneNumberProps extends Common{
    typeName: 'phone-number';
    inputValue: IPhoneNumber;
  }
  
  export interface IPasswordProps  extends Common{
    typeName: 'password';
    label: string;
    placeholder: string;
    password: string;
    inputValue: string;
  }
  
  export interface ITextFieldProps  extends Common{
    typeName: 'text-field';
    subType?: string;
    required?:boolean;
    label: string;
    placeholder: string;
    inputValue: string;
  }
  
  export interface IAutoCompleteProps  extends Common {
    typeName: 'auto-complete';
    label: string;
    inputValue: string;
  }