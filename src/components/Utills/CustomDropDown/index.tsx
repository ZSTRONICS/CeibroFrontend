import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, ListSubheader, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Options, OptionType } from "components/Tasks/type";

interface IProps {
  label: string;
  options: Options;
  createCallback?: (type: string, label: string) => void;
}

function CustomDropDown(props: IProps) {
  const { label, options, createCallback } = props;
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [allFilterData, setAllFilterData] = React.useState<{
    all: { [key: string]: OptionType[] };
    recent: OptionType[];
  }>({ all: {}, recent: [] });
  const [recentfilterData, setRecentFilterData] = React.useState<{
    [key: string]: OptionType[];
  }>({});

  // its use for all sorted array
  const [sortedOptions, setSortedOptions] = React.useState<{
    [key: string]: any[];
  }>({});

  const sortOptions = (options: OptionType[]) => {
    return options.sort((a, b) => a.label.localeCompare(b.label));
  };

  useEffect(() => {
    const sortedAllOptions = sortOptions(options.allOptions);
    const allGroupedData: {
      [key: string]: { label: string; value: string }[];
    } = {};

    sortedAllOptions.forEach((option: OptionType) => {
      const firstLetter = option.label[0].toUpperCase();
      if (!allGroupedData[firstLetter]) {
        allGroupedData[firstLetter] = [];
      }
      allGroupedData[firstLetter].push(option);
    });

    setAllFilterData({ all: allGroupedData, recent: options.recentOptions });
    setSortedOptions(allGroupedData);
  }, [options]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    console.log(event.target.value, "change events");
    setSelected(event.target.value);
    handleClose();
  };
  const handleMenuClick = (item: OptionType) => {
    console.log("skladklas", item.value);
    setSelected(item.value);
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
    const searchValue = event.target.value;
    setSearchQuery(searchValue);

    const filteredData: { [key: string]: OptionType[] } = {};

    Object.entries(sortedOptions).forEach(([groupLetter, groupOptions]) => {
      const filteredOptions = groupOptions.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredOptions.length > 0) {
        filteredData[groupLetter] = filteredOptions;
      }
    });
    console.log(filteredData, "filteredData");
    setAllFilterData({ all: filteredData, recent: options.recentOptions });
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
          // onChange={handleChange}
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
            {allFilterData.all[searchQuery?.[0]?.toUpperCase() || ""] ? (
              <Button onClick={handleCancelClick}>Cancel</Button>
            ) : (
              <Button onClick={handleCreateClick}>Create</Button>
            )}
          </ListSubheader>
          {options.recentOptions.length > 0 && (
            <Box sx={{ margin: "8px 16px" }}>
              <Typography>Recent used {label}</Typography>
              {allFilterData.recent.map((item: OptionType) => {
                return (
                  <Box
                    key={`recent-${item.value}`}
                    sx={{ margin: "8px 16px", cursor: "pointer" }}
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>
          )}
          <Box sx={{ margin: "8px 16px" }}>
            {Object.entries(allFilterData.all).map(
              ([groupLetter, groupOptions]) => [
                // Wrap the list items in an array
                <Typography>{groupLetter}</Typography>,
                // Use map on the array to render the list items
                ...groupOptions.map((item) => (
                  <Box
                    key={`all-${item.value}`}
                    sx={{ margin: "8px 16px", cursor: "pointer" }}
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.label}
                  </Box>
                )),
              ]
            )}
          </Box>
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomDropDown;
