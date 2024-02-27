import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import UserImageCard from "./UserImageCard";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface userListDropdownProps {
  options: UserInfo[];
  isSmall?: boolean;
}

const UserListDropdown = ({ options, isSmall }: userListDropdownProps) => {
  return (
    <Autocomplete
      sx={{ maxWidth: "190px", minWidth: "10px" }}
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
          // sx={{ width: "100px" }}
          {...params}
          label={isSmall ? "User" : "Select User"}
          placeholder="Start typing name"
        />
      )}
    />
  );
};

export default UserListDropdown;
