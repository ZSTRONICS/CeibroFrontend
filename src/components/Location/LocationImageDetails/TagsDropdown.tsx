import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TagListDropdownProps {
  options: string[];
  labelName?: string;
  isSmall?: boolean;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

const TagListDropdown = ({
  options,
  isSmall,
  labelName,
  selectedTags,
  setSelectedTags,
}: TagListDropdownProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    switch (reason) {
      case "selectOption":
        setSelectedTags(value);
        break;
      case "removeOption":
      case "clear":
        setSelectedTags(value);
        break;
    }
  };

  return (
    <Autocomplete
      sx={{ maxWidth: "240px", position: "relative" }}
      multiple
      id="checkboxes-tags-demo"
      limitTags={1}
      value={selectedTags}
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
          sx={{
            position: "absolute",
            zIndex: "500",
            backgroundColor: "white",
          }}
          {...params}
          label={labelName ? labelName : isSmall ? "Tags" : "Select Tags"}
          placeholder="Start typing name"
        />
      )}
    />
  );
};

export default TagListDropdown;
