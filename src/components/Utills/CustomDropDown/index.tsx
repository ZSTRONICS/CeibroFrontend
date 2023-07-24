import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, ListSubheader, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

interface Option {
  label: string;
  value: string;
}
interface IProps {
  label: string;
  options: Option[];
  createCallback?: (type: string, label: string) => void;
}

function CustomDropDown(props: IProps) {
  const { label, options, createCallback } = props;
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterData, setFilterData] = React.useState<{
    [key: string]: Option[];
  }>({});

  useEffect(() => {
    const sortedOptions = options.sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    const groupedData: { [key: string]: { label: string; value: string }[] } =
      {};

    sortedOptions.forEach((option) => {
      const firstLetter = option.label[0].toUpperCase();
      if (!groupedData[firstLetter]) {
        groupedData[firstLetter] = [];
      }
      groupedData[firstLetter].push(option);
    });

    setFilterData(groupedData);
  }, [options]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    console.log(event.target.value, "change events");
    setSelected(event.target.value);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateClick = () => {
    if (searchQuery.trim() === "") return; // Check for empty searchQuery before proceeding
    const newItem = {
      label: searchQuery,
      value: searchQuery,
    };
    // setFilterData((prevData) => [...prevData, newItem]);
    setSelected(searchQuery);
    createCallback && createCallback(label, searchQuery);
    handleClose();
  };

  const handleCancelClick = () => {
    setSearchQuery("");
    setSelected("");
    handleClose();
  };

  const handleClearClick = () => {
    setSearchQuery("");
    setSelected("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl
        variant="standard"
        sx={{ m: 1, width: "100%", maxWidth: "100%" }}
      >
        <InputLabel id="controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            "& .MuiSelect-icon": {
              right: `${selected ? "45px" : 0}`,
            },
          }}
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          onChange={handleChange}
          endAdornment={
            selected && (
              <IconButton
                size="small"
                aria-label="clear selection"
                onClick={handleClearClick}
              >
                <ClearIcon
                  sx={{
                    height: "24px",
                    color: "#605C5C",
                    borderRadius: "12px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "#605C5C",
                  }}
                />
              </IconButton>
            )
          }
        >
          <ListSubheader
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <TextField
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flex: 1 }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
            {filterData[searchQuery?.[0]?.toUpperCase() || ""] ? (
              <Button onClick={handleCancelClick}>Cancel</Button>
            ) : (
              <Button onClick={handleCreateClick}>Create</Button>
            )}
          </ListSubheader>
          {options.length > 0 && (
            <MenuItem disabled>
              <Typography>Recent used {label}</Typography>
            </MenuItem>
          )}
          {Object.entries(filterData).map(([groupLetter, groupOptions]) => [
            // Wrap the list items in an array
            <MenuItem key={groupLetter} disabled>
              <Typography>{groupLetter}</Typography>
            </MenuItem>,
            // Use map on the array to render the list items
            ...groupOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomDropDown;
