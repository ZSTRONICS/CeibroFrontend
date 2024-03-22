import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Paper, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface ProjectFilterProps {
  TaskMain?: boolean;
  options: Project[];
  selectedProjects: Project[];
  setSelectedProjects: Dispatch<SetStateAction<Project[]>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProjectFilter = ({
  options,
  selectedProjects,
  setSelectedProjects,
  TaskMain,
}: ProjectFilterProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Project[],
    reason: AutocompleteChangeReason
  ) => {
    switch (reason) {
      case "selectOption":
        setSelectedProjects(value);
        break;
      case "removeOption":
      case "clear":
        setSelectedProjects(value);
        break;
    }
  };
  return (
    <Autocomplete
      sx={{
        position: "relative",
        "& .MuiAutocomplete-inputRoot": {
          height: "36px", // Adjust the height as needed
        },
      }}
      limitTags={0}
      multiple
      id="checkboxes-tags"
      options={options}
      value={selectedProjects}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option: Project) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
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
          label="Project"
          // placeholder="Start typing tags project"
        />
      )}
      PaperComponent={({ children }) => (
        <Paper sx={{ minWidth: "300px" }}>{children}</Paper>
      )}
    />
  );
};

export default ProjectFilter;
