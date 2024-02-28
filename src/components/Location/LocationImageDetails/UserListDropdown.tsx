import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";

interface userListDropdownProps {
  options: UserInfo[];
  isSmall?: boolean;
}

const UserListDropdown = ({ options, isSmall }: userListDropdownProps) => {
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
      sx={{ maxWidth: "190px", minWidth: "10px" }}
      multiple
      id="checkboxes-tags-demo"
      options={[]}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      // getOptionLabel={(option) => option.firstName}
      // renderOption={(props, option, { selected }) => (
      //   <li {...props}>
      //     <UserImageCard
      //       user={option}
      //       selected={selected}
      //       handleSelectedList={() => {}}
      //       showImage={true}
      //     />
      //   </li>
      // )}
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
