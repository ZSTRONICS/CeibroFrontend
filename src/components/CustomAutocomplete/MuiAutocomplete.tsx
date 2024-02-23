import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { OptionType } from "components/Tasks/type";
import * as React from "react";

const filter = createFilterOptions<OptionType>();
interface IProps {
  inputLabel: string;
  placeholder: string;
  options: OptionType[] | null;
  onChangeValues: (value: any | OptionType[]) => void;
}
export default function MuiAutocomplete(props: IProps) {
  const { inputLabel, options, onChangeValues, placeholder } = props;
  const [value, setValue] = React.useState<OptionType | null>(null);

  return (
    <Autocomplete
      size="small"
      multiple
      limitTags={2}
      onChange={(event, newValue) => {
        onChangeValues(newValue);
        // if (typeof newValue === "string") {
        //   setValue({
        //     label: newValue,
        //     value: newValue,
        //   });
        // }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.label
        );
        // if (inputValue !== "" && !isExisting) {
        //   filtered.push({
        //     // inputValue,
        //     label: `Add "${inputValue}"`,
        //     value: inputValue,
        //   });
        // }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="tags-standard"
      options={options ? options : []}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.label) {
          return option.label;
        }
        return option.label;
      }}
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
      sx={{ width: "95%", m: 1 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          inputProps={{ ...params.inputProps, maxLength: 100 }}
          placeholder={placeholder}
        />
      )}
    />
  );
}
