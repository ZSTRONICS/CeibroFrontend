import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Paper, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Topic } from "constants/interfaces";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface TopicTagsFilterProps {
  TaskMain?: boolean;
  options: Topic[];
  selectedTopics: Topic[];
  setSelectedTopics: Dispatch<SetStateAction<Topic[]>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TopicTagsFilter = ({
  options,
  selectedTopics,
  setSelectedTopics,
  TaskMain,
}: TopicTagsFilterProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Topic[],
    reason: AutocompleteChangeReason
  ) => {
    switch (reason) {
      case "selectOption":
        setSelectedTopics(value);
        break;
      case "removeOption":
      case "clear":
        setSelectedTopics(value);
        break;
    }
  };
  return (
    <Autocomplete
      sx={{
        maxWidth: "240px",
        maxHeight: "40px",
        position: "relative",
        "& .MuiAutocomplete-inputRoot": {
          height: "36px",
        },
      }}
      limitTags={0}
      multiple
      id="checkboxes-tags"
      options={options}
      value={selectedTopics}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option: Topic) => option.topic}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.topic}
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
          label="Tags"
          //   placeholder="Start typing tags"
        />
      )}
      PaperComponent={({ children }) => (
        <Paper sx={{ minWidth: "300px" }}>{children}</Paper>
      )}
    />
  );
};

export default TopicTagsFilter;
