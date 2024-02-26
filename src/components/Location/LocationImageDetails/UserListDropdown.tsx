import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import UserImageCard from "./UserImageCard";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface userListDropdownProps {
  options: UserInfo[];
}

const UserListDropdown = ({ options }: userListDropdownProps) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      size="small"
      disableCloseOnSelect
      getOptionLabel={(option) => option.firstName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <UserImageCard
            user={option}
            selected={selected}
            handleSelectedList={() => {}}
            showImage={true}
          />
          {/* <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {`${option.firstName} ${option.surName}`} */}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select User"
          placeholder="Start typing name"
        />
      )}
    />
  );
};

export default UserListDropdown;
