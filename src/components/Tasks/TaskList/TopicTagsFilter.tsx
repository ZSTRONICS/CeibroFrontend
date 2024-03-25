import { Button } from "@mui/base";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox, TextField } from "@mui/material";
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
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0px solid",
        },
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
      PaperComponent={({ children }) => (
        <Box
          sx={{
            backgroundColor: "white",
            minWidth: "250px",
            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <input
              placeholder="searching"
              style={{
                width: "55%",
                marginLeft: "7%",
                border: "none",
                // marginTop: "10px",
                borderBottom: "1px solid #818181",
              }}
            />
            <Button
              style={{
                backgroundColor: "white",
                color: "#818181",
                border: "1px solid #818181",
                cursor: "pointer",
                padding: "6px 12px 6px 12px",
                borderRadius: "5px",
                marginRight: "7%",
              }}
            >
              Done
            </Button>
          </Box> */}
          <ul>{children}</ul>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #818181",
            }}
            p={2}
            bgcolor="background.paper"
          >
            <Button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#0076C8",
                cursor: "pointer",
              }}
            >
              Clear all
            </Button>
            <Button
              style={{
                backgroundColor: "#0076C8",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "6px 12px 6px 12px",
                borderRadius: "5px",
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          sx={{
            // position: "absolute",
            zIndex: "500",
            minWidth: "100px",
            maxWidth: "max-content",
            backgroundColor: !TaskMain ? "white" : "#F4F4F4",
          }}
          {...params}
          label="Tags"
          //   placeholder="Start typing tags"
        />
      )}
      // PaperComponent={({ children }) => (
      //   <Paper sx={{ minWidth: "300px" }}>{children}</Paper>
      // )}
    />
  );
};

export default TopicTagsFilter;
