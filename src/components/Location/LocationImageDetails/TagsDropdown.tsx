import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TagListDropdownProps {
  options: any[];
  isSmall?: boolean;
}

const TagListDropdown = ({ options, isSmall }: TagListDropdownProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    switch (reason) {
      case "selectOption":
        console.log(value, "value:::::::::::::");
        break;
      case "removeOption":
        console.log(value, "value^^^^^^^^^^^^^^^");
        break;
    }
  };

  return (
    <Autocomplete
      sx={{ maxWidth: "190px" }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={isSmall ? "Tags" : "Select Tags"}
          placeholder="Start typing name"
        />
      )}
    />
  );
};

export default TagListDropdown;
