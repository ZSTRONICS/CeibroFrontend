import { Button } from "@mui/base";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";

interface ProjectFilterProps {
  TaskMain?: boolean;
  options: Project[];
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProjectFilter = ({ options, TaskMain }: ProjectFilterProps) => {
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProjects } = useSelector((state: RootState) => state.task);
  const [localSelectedProjects, setLocalSelectedProjects] = useState<Project[]>(
    selectedProjects ?? []
  );

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    //@ts-ignore
    if (autocompleteRef.current && !autocompleteRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Project[],
    reason: AutocompleteChangeReason
  ) => {
    event.stopPropagation();
    switch (reason) {
      case "selectOption":
        setLocalSelectedProjects(value);
        break;
      case "removeOption":
      case "clear":
        setLocalSelectedProjects(value);
        dispatch(taskActions.setSelectedProjects([]));
        break;
    }
  };

  const handleApply = () => {
    dispatch(taskActions.setSelectedProjects(localSelectedProjects));
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalSelectedProjects([]);
    dispatch(taskActions.setSelectedProjects([]));
    setIsOpen(false);
  };

  return (
    <Autocomplete
      ref={autocompleteRef}
      open={isOpen}
      onOpen={(e) => {
        e.stopPropagation();
        setIsOpen(true);
      }}
      onClose={(event, reason) => {
        event.stopPropagation();
        setIsOpen(false);
      }}
      sx={{
        position: "relative",
        "& .MuiAutocomplete-inputRoot": {
          height: "36px", // Adjust the height as needed
        },
      }}
      limitTags={0}
      multiple
      id="checkboxes-projects"
      options={options}
      value={localSelectedProjects}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option: Project) => option.title}
      renderOption={(props, option, { selected }) => (
        <>
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        </>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          sx={{
            // position: "absolute",
            zIndex: "500",
            width: "100px",
            maxWidth: "max-content",
            backgroundColor: !TaskMain ? "white" : "#F4F4F4",
          }}
          {...params}
          label="Project"
        />
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
          {children}

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
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
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
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      )}
    />
  );
};

export default ProjectFilter;
