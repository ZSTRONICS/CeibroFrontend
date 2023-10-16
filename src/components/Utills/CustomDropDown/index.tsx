import { MoreVert } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Divider,
  ListSubheader,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {
  ChangeValueType,
  CreateNewTaskFormType,
  OptionType,
  Options,
} from "components/Tasks/type";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { handleGroupSearch } from "utills/common";
import ConfirmationDialog from "../ConfirmationDialog";

interface IProps {
  name: keyof CreateNewTaskFormType;
  label: string;
  options: Options;
  createCallback?: (type: string, label: string) => void;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

function CustomDropDown(props: IProps) {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState<OptionType | null>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { label, options, createCallback, handleChangeValues, name } = props;
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [allFilterData, setAllFilterData] = React.useState<{
    all: { [key: string]: OptionType[] };
    recent: OptionType[];
  }>({ all: {}, recent: [] });
  // const [recentfilterData, setRecentFilterData] = React.useState<{
  //   [key: string]: OptionType[];
  // }>({});
  // its use for all sorted array
  const [sortedOptions, setSortedOptions] = React.useState<{
    [key: string]: any[];
  }>({});

  const sortOptions = (options: OptionType[]) => {
    return options
      ? options.sort((a, b) => a.label.localeCompare(b.label))
      : [];
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
    if (selected) {
      let updatedSelected = options.allOptions.find(
        (item) => item.label === selected
      );
      handleChangeValues(updatedSelected?.value, name);
    }
    setAllFilterData({ all: allGroupedData, recent: options.recentOptions });
    setSortedOptions(allGroupedData);
  }, [options]);

  // const handleChange = (event: SelectChangeEvent<typeof selected>) => {
  //   setSelected(event.target.value);
  //   handleClose();
  // };
  const handleMenuClick = (item: OptionType) => {
    setSelected(item.label);
    handleChangeValues(item.value, name);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setOpen(false);
    setAllFilterData({
      all: sortedOptions,
      recent: options.recentOptions,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const filteredData: { [key: string]: OptionType[] } = {};
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
    setAllFilterData({
      all: handleGroupSearch(searchValue, sortedOptions, "label"),
      recent: options.recentOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    });
  };

  const handleCreateClick = () => {
    if (searchQuery.trim() === "") return; // Check for empty searchQuery before proceeding
    // const newItem = {
    //   label: searchQuery,
    //   value: searchQuery,
    // };
    // setFilterData((prevData) => [...prevData, newItem]);
    setSelected(searchQuery);
    createCallback && createCallback(label, searchQuery);
    setAllFilterData({ all: filteredData, recent: options.recentOptions });
    handleClose();
  };

  const handleCancelClick = () => {
    setSearchQuery("");
    setSelected("");
    handleClose();
  };

  const handleClearClick = () => {
    handleChangeValues(undefined, name);
    setSearchQuery("");
    setSelected("");
  };

  const renderValue = () => {
    return selected;
  };
  const handleDialogState = () => {
    setOpenDialog(!openDialog);
    if (openDialog) {
      setDeleteItem(null);
    }
  };

  const handleDeleteItem = (option: OptionType) => {
    if (label === "Topic") {
      dispatch(
        taskActions.deleteTopic({
          other: { topicId: option.value },
          success: (res: any) => {
            dispatch(taskActions.getAllTopic());
            if (option.label === selected) {
              setSelected("");
              setSearchQuery("");
            }
          },
        })
      );
    }
  };

  const firstSearchQuery = searchQuery?.[0]?.toUpperCase() || "";
  const isMatchFound = !!allFilterData.all[firstSearchQuery];

  const handleInfoMenuClick = (event: any, item: OptionType) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setDeleteItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (item: OptionType) => {
    setDeleteItem(item);
    handleCloseMenu();
    handleDialogState();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl
        variant="standard"
        sx={{ marginTop: "8px", width: "100%", maxWidth: "100%" }}
      >
        <InputLabel id="controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            "& .MuiSelect-icon": {
              right: `${selected ? "40px" : 0}`,
            },
          }}
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          renderValue={renderValue}
          MenuProps={{
            autoFocus: true,
            disableAutoFocusItem: true,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: "calc(100vh - 240px)",
              },
            },
          }}
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
            <>
              {searchQuery && searchQuery.length > 0 && isMatchFound ? (
                <Button onClick={handleCancelClick}>Cancel</Button>
              ) : (
                <Button
                  onClick={handleCreateClick}
                  disabled={searchQuery.length === 0}
                >
                  Save
                </Button>
              )}
            </>
          </ListSubheader>
          {allFilterData.recent.length > 0 && (
            <Box sx={{ margin: "10px 16px" }}>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#818181",
                  lineHeight: "16px",
                }}
              >
                Recent used topics
              </Typography>
              {allFilterData.recent.map((item: OptionType, i: any) => {
                return (
                  <Box
                    key={`recent-${item.value + i}`}
                    sx={{
                      margin: "8px 16px",
                      cursor: "pointer",
                      fontWeight: 400,
                    }}
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.label}
                  </Box>
                );
              })}
              <Divider
                sx={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  pointerEvents: "none",
                }}
              />
            </Box>
          )}
          <Box sx={{ margin: "8px 16px" }}>
            {Object.entries(allFilterData.all).map(
              ([groupLetter, groupOptions], i: any) => [
                // Wrap the list items in an array
                <Typography>{groupLetter}</Typography>,
                // Use map on the array to render the list items
                ...groupOptions.map((item, i) => (
                  <Box
                    key={`all-${item.value + i}`}
                    sx={{
                      margin: "8px 16px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => handleMenuClick(item)}
                  >
                    <Typography>{item.label}</Typography>
                    <IconButton
                      edge="end"
                      sx={{
                        color: "#0076C8",
                        "& .MuiSvgIcon-root": {
                          width: "20px",
                          height: "20px",
                        },
                      }}
                      onClick={(e) => handleInfoMenuClick(e, item)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={
                        Boolean(anchorEl) && item.value === deleteItem?.value
                      }
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteClick(item);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                )),
              ]
            )}
          </Box>
        </Select>
      </FormControl>
      {deleteItem && (
        <ConfirmationDialog
          item={deleteItem}
          handleDeleteItem={handleDeleteItem}
          open={openDialog}
          handleDialogState={handleDialogState}
        />
      )}
    </div>
  );
}

export default CustomDropDown;
