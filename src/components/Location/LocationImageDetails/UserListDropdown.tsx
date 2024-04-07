import { TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import UserImageCard from "./UserImageCard";

interface userListDropdownProps {
  TaskMain?: boolean;
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
  TaskMain,
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
      sx={{
        maxWidth: "240px",
        minWidth: "100px",
        zIndex: "50",
        position: "relative",
      }}
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
          sx={{
            position: "absolute",
            zIndex: "500",
            backgroundColor: !TaskMain ? "white" : "#F4F4F4",
          }}
          {...params}
          label={isSmall ? "Users" : "Select User"}
          placeholder="Start typing name"
        />
      )}
    />
  );
};

export default UserListDropdown;
