import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, ListSubheader, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";

interface IProps {
  label: string;
  options: { label: string; value: string }[];
  createCallback?: (type: string, label: string) => void;
}

function CustomDropDown(props: IProps) {
  const { label, options, createCallback } = props;
  const [selected, setSelected] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterData, setFilterData] = React.useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setFilterData(options);
  }, [options]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    setSelected(event.target.value);
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
    const newItem = {
      label: searchQuery,
      value: searchQuery,
    };
    setFilterData((prevData) => [...prevData, newItem]);
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
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%" }}>
        <InputLabel id="controlled-open-select-label">{label}</InputLabel>
        <Select
          required
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            "& .MuiSelect-icon": {
              right: "45px",
            },
          }}
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          onChange={handleChange}
        >
          <ListSubheader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <TextField
                placeholder="search"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ flex: 1 }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              {filterData.some((item) => item.label === searchQuery) ? (
                <Button onClick={handleCancelClick}>Cancel</Button>
              ) : (
                <Button onClick={handleCreateClick}>Create</Button>
              )}
            </div>
          </ListSubheader>

          {filterData &&
            filterData.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {selected && (
        <Box sx={{ marginRight: "28px", position: "absolute", right: "-16px" }}>
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
        </Box>
      )}
    </div>
  );
}

export default CustomDropDown;
