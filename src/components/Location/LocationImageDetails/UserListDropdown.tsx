import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import UserImageCard from "./UserImageCard";

interface userListDropdownProps {
  options: UserInfo[];
  isSmall?: boolean;
  selectedUsers: UserInfo[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfo[]>>;
}

const UserListDropdown = ({
  options,
  isSmall,
  selectedUsers,
  setSelectedUsers,
}: userListDropdownProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: UserInfo[],
    reason: AutocompleteChangeReason
  ) => {
    switch (reason) {
      case "selectOption":
        setSelectedUsers(value);
        break;
      case "removeOption":
      case "clear":
        setSelectedUsers(value);
        break;
    }
  };
  return (
    <Autocomplete
      sx={{ maxWidth: "190px", minWidth: "10px" }}
      limitTags={1}
      multiple
      id="checkboxes-tags"
      options={options}
      value={selectedUsers}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option: UserInfo) => option.firstName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <UserImageCard
            user={option}
            selected={selected}
            handleSelectedList={() => {}}
            showImage={true}
          />
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
