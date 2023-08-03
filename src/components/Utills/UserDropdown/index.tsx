import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SelectedContactBox from "../SelectedContactBox";
import ContactBox from "../ContactBox";
import _ from "lodash";
import {
  CreateNewTaskFormType,
  ChangeValueType,
  AssignedToStateType,
} from "components/Tasks/type";
import { handleGroupSearch } from "utills/common";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface Option {
  label: string;
  value: string;
}
interface IProps {
  name: keyof CreateNewTaskFormType;
  label: string;
  contacts: any[];
  createCallback?: (type: string, label: string) => void;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

function UserDropDown(props: IProps) {
  const [isSelfAssign, setIsSelfAssign] = useState(false);
  const { name, label, contacts, createCallback, handleChangeValues } = props;
  const [selected, setSelected] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortedContacts, setSortedContacts] = React.useState<{
    [key: string]: any[];
  }>({});
  const [filterData, setFilterData] = React.useState<{
    [key: string]: any[];
  }>({});
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      const sortedContacts = contacts.sort((a, b) =>
        a.contactFirstName.localeCompare(b.contactFirstName)
      );

      const groupedData: { [key: string]: { label: string; value: string }[] } =
        {};

      sortedContacts.forEach((contact) => {
        const firstLetter = contact.contactFirstName[0].toUpperCase();
        if (!groupedData[firstLetter]) {
          groupedData[firstLetter] = [];
        }
        groupedData[firstLetter].push(contact);
      });

      setFilterData(groupedData);
      setSortedContacts(groupedData);
    }
  }, [contacts]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    console.log(event, "change events");
    // setSelected(event.target.value);
    // handleClose();
  };

  const handleClose = () => {
    let invitedNumbers: string[] = [];
    let updatedSelected: AssignedToStateType[] = [];
    selected.map((item) => {
      if (!item.isCeiborUser) {
        invitedNumbers.push(item.phoneNumber);
      } else {
        let payloadSelected: AssignedToStateType = {
          phoneNumber: item.phoneNumber,
          userId: item._id,
          state: "new",
        };
        updatedSelected.push(payloadSelected);
      }
    });
    handleChangeValues(updatedSelected, name);
    handleChangeValues(invitedNumbers, "invitedNumbers");
    setSearchQuery("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterData(
      handleGroupSearch(searchValue, sortedContacts, "contactFullName")
    );
    setSearchQuery(searchValue);
  };

  const handleCreateClick = () => {
    if (searchQuery.trim() === "") return; // Check for empty searchQuery before proceeding
    const newItem = {
      label: searchQuery,
      value: searchQuery,
    };
    // setFilterData((prevData) => [...prevData, newItem]);
    setSelected([]);
    createCallback && createCallback(label, searchQuery);
    handleClose();
  };

  const handleCancelClick = () => {
    setSearchQuery("");
    setSelected([]);
    handleClose();
  };

  const handleClearClick = () => {
    setIsSelfAssign(false);
    setSearchQuery("");
    setSelected([]);
  };

  const handleSelectedList = (contact: object, checked: boolean) => {
    if (checked) {
      let updatedSelected = [...selected, contact];
      setSelected(updatedSelected);
    } else {
      let allSelected = [...selected];
      if (isSelfAssign) {
        allSelected.push(user);
        setIsSelfAssign(!isSelfAssign);
      }
      setSelected(allSelected.filter((item) => item._id !== contact._id));
    }
  };

  const handleSelfAssignChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    user["isCeiborUser"] = true;
    handleSelectedList(user, checked);
    setIsSelfAssign(checked);
  };

  const renderValue = () => {
    console.log(selected, "selected");
    if (selected.length > 0) {
      const fullNames = selected.map((item) => {
        if (item.contactFullName) {
          return item.contactFullName;
        } else if (item.firstName) {
          let name = `${item.firstName} ${item.surName}`;
          return name;
        }
        return "";
      });
      return fullNames.join(", ");
    } else {
      return "Select Contacts";
    }
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
              right: `${selected.length > 0 ? "40px" : 0}`,
            },
          }}
          MenuProps={{
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
          multiple
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          renderValue={renderValue}
          onChange={handleChange}
          endAdornment={
            selected.length > 0 && (
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
              placeholder="Start typing name"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                borderBottomWidth: "1px",
                borderColor: "#818181",
                borderStyle: "solid",
                marginRight: "8px",
              }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
            {filterData[searchQuery?.[0]?.toUpperCase() || ""] ? (
              <CustomButton variant="outlined" onClick={handleCancelClick}>
                Cancel
              </CustomButton>
            ) : (
              <CustomButton variant="outlined" onClick={handleClose}>
                Done
              </CustomButton>
            )}
          </ListSubheader>
          <Box sx={{ display: "flex" }}>
            {selected.length > 0 &&
              selected.map((selectedContact: object) => {
                return (
                  <SelectedContactBox
                    contact={selectedContact}
                    handleSelectedList={handleSelectedList}
                  />
                );
              })}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "16px 16px 0px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 500,
                color: "#818181",
                lineHeight: "16px",
              }}
            >
              Suggested users
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="self-assign"
                  checked={isSelfAssign}
                  onChange={handleSelfAssignChange}
                  size="small"
                  color="primary"
                  sx={{
                    ml: 1,
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#818181",
                    lineHeight: "16px",
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#605C5C",
                    lineHeight: "16px",
                  }}
                >
                  Self assign
                </Typography>
              }
            />
          </Box>
          <Box sx={{ margin: "8px 16px" }}>
            {Object.entries(filterData).map(([groupLetter, groupOptions]) => [
              <Typography>{groupLetter}</Typography>,
              // Use map on the array to render the list items
              ...groupOptions.map((item) => (
                <ContactBox
                  contact={item}
                  handleSelectedList={handleSelectedList}
                  selected={
                    !!selected.find((contact) => contact._id === item._id)
                  }
                />
              )),
            ])}
          </Box>
        </Select>
      </FormControl>
    </div>
  );
}

export default UserDropDown;

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  height: "28px",
  color: "#818181",
  borderColor: "#818181",
}));
