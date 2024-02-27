import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TagListDropdownProps {
  options: string[];
  isSmall?: boolean;
}

const TagListDropdown = ({ options, isSmall }: TagListDropdownProps) => {
  return (
    <Autocomplete
      sx={{ maxWidth: "190px" }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      size="small"
      disableCloseOnSelect
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
