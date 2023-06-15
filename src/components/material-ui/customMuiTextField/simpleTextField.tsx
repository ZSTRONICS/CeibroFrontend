import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Autocomplete,
} from "@mui/material";
import { AutocompleteOption, GenericAutocompleteProps } from "./types";
import { styled } from "@mui/system";
import { DropDownSvg } from "../icons/CustomSvgIcon/dropDown";

interface IProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

export const SimpleTextField = (props: IProps) => {
  const {
    name,
    type,
    label,
    placeholder,
    required,
    inputValue,
    onChange,
    onBlur,
  } = props;
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

function AutocompleteField<T extends AutocompleteOption>({
  options,
  label,
  showSideLabel,
  placeholder,
  ...props
}: GenericAutocompleteProps<T>) {
  return (
    <AutocompleteContainer>
      {showSideLabel && (
        <CustomInputLabel className="custom-label">{label}</CustomInputLabel>
      )}
      <StyledAutocomplete
        {...props}
        options={options}
        id={'autocomplete-input'}
        popupIcon={DropDownSvg()}
        getOptionLabel={(option: any) => option.label}
        renderInput={(params: any) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            label={showSideLabel ? "" : label}
            fullWidth
          />
        )}
      />
    </AutocompleteContainer>
  );
}

export { AutocompleteField };

const StyledAutocomplete = styled<any>(Autocomplete)`
  position: relative;

  fieldset.MuiOutlinedInput-notchedOutline {
    border-width: 0px !important;
  }

  input#autocomplete-input {
    font-size: 15px !important;
    padding: 0 4px 0 5px !important;
  }
`;
const CustomInputLabel = styled(InputLabel)`
  background-color: white;
  padding: 0 14px 0 7px;
  font-size: 14px;
  border: 1px solid #c4c4c4;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  align-items: center;
`;
const AutocompleteContainer = styled("div")`
  display: flex;
  align-item: center;
  width: 100%;
`;
