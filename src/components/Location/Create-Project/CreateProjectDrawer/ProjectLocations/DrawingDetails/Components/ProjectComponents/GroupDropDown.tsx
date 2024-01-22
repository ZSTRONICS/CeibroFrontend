import { MoreVert } from "@mui/icons-material";
import { Box, Menu, MenuItem, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { MUIInputLabel, RequiredFieldMark } from "components/CustomTags";
import { ChangeValueType, OptionType, Options } from "components/Tasks/type";
import ConfirmationDialog from "components/Utills/ConfirmationDialog";
import { ClearIconSvgGray } from "components/material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { handleGroupSearch } from "utills/common";

interface IProps {
  name: keyof any;
  label: string;
  options: Options;
  createCallback?: (type: string, label: string) => void;
  handleChangeValues: (value: ChangeValueType, name: keyof any) => void;
}

function GroupDropDown(props: IProps) {
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
    setTimeout(() => {
      setAllFilterData({
        all: sortedOptions,
        recent: options.recentOptions,
      });
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const filteredData: { [key: string]: OptionType[] } = {};
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        sx={{ marginTop: "14px", width: "100%", maxWidth: "100%" }}
      >
        {label === "Topic" && selected.length === 0 && (
          <RequiredFieldMark>*</RequiredFieldMark>
        )}
        <MUIInputLabel id="controlled-open-select-label">{label}</MUIInputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            fontFamily: "Inter",
            "& .MuiSelect-icon": {
              right: `${selected ? "40px" : 0}`,
            },
            svg: { color: "#000000" },
          }}
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          renderValue={renderValue}
          MenuProps={{
            autoFocus: false,
            disableAutoFocusItem: false,
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
          endAdornment={
            selected && (
              <IconButton
                size="small"
                aria-label="clear selection"
                onClick={handleClearClick}
              >
                <ClearIconSvgGray />
              </IconButton>
            )
          }
        >
          <Box
            style={{
              borderBottom: "1.9px solid #A0A0B0",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              placeholder="Start typing"
              value={searchQuery}
              onChange={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSearchChange(e);
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ flex: 1, marginLeft: "10px", fontFamily: "Inter" }}
              sx={{
                label: { color: "605b5c" },
              }}
              variant="standard"
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              error={searchQuery.length >= 100}
              helperText={`${
                searchQuery.length >= 100
                  ? "Topic max length is 100 characters"
                  : ""
              }`}
            />
            <>
              {searchQuery && searchQuery.length > 0 && isMatchFound ? (
                <Button
                  onClick={handleCancelClick}
                  sx={{ fontFamily: "Inter" }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={handleCreateClick}
                  disabled={searchQuery.length === 0}
                  sx={{ fontFamily: "Inter" }}
                >
                  Save
                </Button>
              )}
            </>
          </Box>

          {allFilterData.recent.length > 0 && (
            <Box sx={{ margin: "10px 10px", marginBottom: "0px" }}>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#818181",
                  lineHeight: "16px",
                }}
              >
                Recent used{" "}
                <span
                  style={{ textTransform: "lowercase" }}
                >{`${label}s`}</span>
              </Typography>
              {allFilterData.recent.map((item: OptionType, i: any) => {
                return (
                  <Box
                    key={`recent-${item.value + i}`}
                    sx={{
                      borderBottom: "1px solid #E0E0E0",
                      padding: "10px 0",
                      cursor: "pointer",
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>
          )}
          <Box sx={{ margin: "8px 10px", fontFamily: "Inter" }}>
            {Object.entries(allFilterData.all).map(
              ([groupLetter, groupOptions], i: any) => [
                // Wrap the list items in an array
                <Typography
                  sx={{
                    paddingTop: "20px",
                    color: "#000000",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "Inter",
                  }}
                >
                  {groupLetter}
                </Typography>,
                // Use map on the array to render the list items
                ...groupOptions.map((item, i) => (
                  <Box
                    key={`all-${item.value + i}`}
                    sx={{
                      borderBottom: "1px solid #E0E0E0",
                      padding: "8px 0",
                      cursor: "pointer",
                      display: "flex",
                      color: "#000000",
                      fontFamily: "Inter",
                      justifyContent: "space-between",
                    }}
                    onClick={() => handleMenuClick(item)}
                  >
                    <Typography
                      sx={{
                        color: "#0E0E0E",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                      }}
                    >
                      {item.label}
                    </Typography>
                    {label === "Topic" && (
                      <IconButton
                        edge="end"
                        sx={{
                          color: "#0075D0",
                          padding: "0",
                          "& .MuiSvgIcon-root": {
                            padding: "0",
                            height: "20px",
                          },
                        }}
                        onClick={(e) => handleInfoMenuClick(e, item)}
                      >
                        <MoreVert />
                      </IconButton>
                    )}
                    <Menu
                      sx={{
                        padding: 0,
                      }}
                      elevation={3}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      anchorEl={anchorEl}
                      open={
                        Boolean(anchorEl) && item.value === deleteItem?.value
                      }
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        sx={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          color: "#0E0E0E",
                          fontSize: "13px",
                          fontWeight: 600,
                          fontFamily: "Inter",
                        }}
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

export default GroupDropDown;
