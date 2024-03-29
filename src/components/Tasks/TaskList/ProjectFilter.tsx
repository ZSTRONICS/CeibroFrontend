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
  disabled?: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProjectFilter = ({ options, TaskMain, disabled }: ProjectFilterProps) => {
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
      setLocalSelectedProjects(selectedProjects);
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
    event.preventDefault();
    event.stopPropagation();
    switch (reason) {
      case "selectOption":
        setLocalSelectedProjects(value);
        break;
      case "removeOption":
        setLocalSelectedProjects(value);
        break;
      case "clear":
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
      disabled={disabled}
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
      disableClearable={true}
      sx={{
        position: "relative",
        // marginLeft: "10px",
        minWidth: "110px",
        maxWidth: "110px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        // marginRight: "5px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0px solid",
        },
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
          <li
            {...props}
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "0px",
            }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              sx={{ marginLeft: "5px" }}
            />
            <Box sx={{ marginTop: "8px" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "#131516",
                  overflowWrap: "break-word",
                  width: "160px",
                  fontWeight: 700,
                  minHeight: "max-content",
                  paddingBottom: "0px",
                }}
              >
                {option.title}
              </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#131516",
                      fontWeight: 500,
                    }}
                  >
                    {option.creator.firstName}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      marginLeft: "5px",
                      color: "#131516",
                      fontWeight: 500,
                    }}
                  >
                    {option.creator.surName}
                  </p>
                </Box>
                <p
                  style={{
                    fontSize: "12px",
                    marginLeft: "5px",
                    color: "#605C5C",
                    fontWeight: 500,
                  }}
                >
                  {option.creator.companyName}
                </p>
              </Box>
            </Box>
          </li>
        </>
      )}
      renderTags={() => {
        return TaskMain ? (
          <div style={{ display: "flex", marginTop: "4px" }}>
            {" "}
            <p
              style={{
                color: "#818181",
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "8px",
                marginTop: "-2px",
              }}
            >
              Project
            </p>
            <div
              style={{
                backgroundColor: "#818181",
                color: "white",
                borderRadius: "50%",
                height: "16px",
                width: "16px",
                textAlign: "center",
                fontSize: "11px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "4px",
                marginTop: "2px",
              }}
            >
              {localSelectedProjects.length}
            </div>
          </div>
        ) : null;
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& .MuiAutocomplete-input": {
              display: "none",
            },
            "& .MuiFormLabel-root": {
              fontSize: "14px",
              fontWeight: "500",
            },
            // position: "absolute",
            zIndex: "10",
            width: "110px",
            maxWidth: "110px",
            borderRadius: "5px",
            overflow: "hidden",
            backgroundColor: !TaskMain ? "white" : "#F4F4F4",
          }}
          label={localSelectedProjects?.length < 1 && "Projects"}
        />
      )}
      PaperComponent={({ children }) => (
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            minWidth: "275px",
            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Start searching"
              style={{
                marginTop: "15px",
                border: "none",
                paddingBottom: "10px",
                borderBottom: "1px solid #818181",
                marginLeft: "15px",
                width: "65%",
                paddingTop: "5px",
              }}
            />{" "}
            <Button
              style={{
                borderRadius: "4px",
                height: "28px",
                width: "50px",
                color: "#818181",
                backgroundColor: "transparent",
                border: "1px solid #818181",
                marginRight: "15px",
                cursor: "pointer",
              }}
            >
              Done
            </Button>{" "}
          </Box>
          {children}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #818181",
              height: "56px",
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
                borderRadius: "4px",
                height: "28px",
                width: "55px",
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
