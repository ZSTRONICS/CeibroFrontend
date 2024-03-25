import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { MUIInputLabel, RequiredFieldMark } from "components/CustomTags";
import GroupContactList from "components/Tasks/Forward-Task/GroupContactList";
import {
  AssignedToStateType,
  ChangeValueType,
  CreateNewTaskFormType,
} from "components/Tasks/type";
import { ClearIconSvgGray } from "components/material-ui/icons";
import { Contact } from "constants/interfaces";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { handleGroupSearch } from "utills/common";
import SelectedContactBox from "../SelectedContactBox";

interface IProps {
  name: keyof CreateNewTaskFormType;
  label: string;
  isTaskFilter?: boolean;
  contacts: Contact[];
  recentUserContact: Contact[];
  tasktilters?: boolean;
  createCallback?: (type: string, label: string) => void;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

function UserDropDown(props: IProps) {
  const [isSelfAssign, setIsSelfAssign] = useState(false);
  const {
    name,
    isTaskFilter,
    label,
    contacts,
    handleChangeValues,
    recentUserContact,
    tasktilters,
  } = props;
  const [filteredRecentUserContact, setFilteredRecentUserContact] =
    React.useState<Contact[]>(recentUserContact);
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
    setFilteredRecentUserContact(recentUserContact);
  }, [recentUserContact]);

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      const sortedContacts = contacts.sort((a, b) =>
        a.contactFirstName.localeCompare(b.contactFirstName)
      );

      const groupedData: { [key: string]: { label: string; value: string }[] } =
        {};

      sortedContacts.forEach((contact: any) => {
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

  const handleClose = () => {
    let invitedNumbers: string[] = [];
    let updatedSelected: AssignedToStateType[] = [];
    if (isSelfAssign === true) {
      updatedSelected.push({
        phoneNumber: user.phoneNumber,
        userId: user._id,
        state: "new",
      });
    }
    selected
      .filter((item: any) => item._id !== user._id)
      .map((item) => {
        if (!item.isCeiborUser && item.userCeibroData === null) {
          invitedNumbers.push(item.phoneNumber);
        } else {
          let payloadSelected: AssignedToStateType = {
            phoneNumber: item.phoneNumber,
            userId: item.userCeibroData?._id,
            state: "new",
          };
          updatedSelected.push(payloadSelected);
        }
      });
    handleChangeValues(updatedSelected, name);
    handleChangeValues(invitedNumbers, "invitedNumbers");
    setSearchQuery("");
    setOpen(false);
    setFilterData(handleGroupSearch("", sortedContacts, "contactFullName"));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterData(
      handleGroupSearch(searchValue, sortedContacts, "contactFullName")
    );
    const recentFilteredData = recentUserContact.filter((Option) =>
      Option["contactFullName"]
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredRecentUserContact(recentFilteredData);
    setSearchQuery(searchValue);
  };

  // const handleCancelClick = () => {
  //   setSearchQuery("");
  //   setSelected([]);
  //   handleClose();
  // };

  const handleClearClick = () => {
    handleChangeValues(undefined, "assignedToState");
    handleChangeValues(undefined, "invitedNumbers");
    setIsSelfAssign(false);
    setSearchQuery("");
    setSelected([]);
  };

  const handleSelectedList = (contact: Contact, checked: boolean) => {
    if (checked) {
      let updatedSelected = [...selected, contact];
      setSelected(updatedSelected);
    } else {
      let allSelected = [...selected];
      if (contact._id === user._id) {
        setIsSelfAssign(checked);
      }
      setSelected(allSelected.filter((item: any) => item._id !== contact._id));
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
    if (selected.length > 0) {
      const fullNames = selected.map((item) => {
        if (item._id === user._id) {
          return "Me";
        }
        if (item.contactFullName) {
          return item.contactFullName;
        } else if (item.firstName) {
          return `${item.firstName} ${item.surName}`;
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
        sx={{
          marginTop: isTaskFilter ? "0" : "1px",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100px",
          backgroundColor: "#F4F4F4",
        }}
      >
        {label === "Assign to" && selected.length === 0 && (
          <RequiredFieldMark>*</RequiredFieldMark>
        )}
        <MUIInputLabel id="controlled-open-select-label">{label}</MUIInputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            "& .MuiSelect-icon": {
              right: `${selected.length > 0 ? "40px" : 0}`,
            },
            svg: { color: "#000000" },
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
                maxHeight: "calc(100vh - 100px)",
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
          endAdornment={
            selected.length > 0 && (
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
          <ListSubheader
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "5px",
            }}
          >
            <TextField
              type="search"
              placeholder="Start typing name"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                // width: "200px",

                flex: 1,
                borderBottomWidth: "1px",
                borderColor: "#818181",
                borderStyle: "solid",
                marginRight: "8px",
              }}
              variant="standard"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <CustomButton variant="outlined" onClick={handleClose}>
              Done
            </CustomButton>
          </ListSubheader>
          <Box
            sx={{
              minHeight: "66px",
              display: "flex",
              padding: "6px 7px",
              maxWidth: `${isTaskFilter ? "300px" : "100%"}`,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                height: "0.4rem",
              },
              "&::-webkit-scrollbar-track": {
                WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                borderRadius: "0.2rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
              },
            }}
          >
            {selected.length > 0 ? (
              selected.map((selectedContact: object) => {
                return (
                  <SelectedContactBox
                    isDisabled={false}
                    contact={selectedContact}
                    handleSelectedList={handleSelectedList}
                  />
                );
              })
            ) : (
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                Select {isTaskFilter ? "users" : "task assignee(s)"}
              </Typography>
            )}
          </Box>
          {!isTaskFilter && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: "0px 8px 0px",
              }}
            >
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
          )}
          <Box sx={{ margin: "0px 16px" }}>
            <Divider sx={{ marginTop: "8px", marginBottom: "20px" }} />
            <GroupContactList
              filterData={filterData}
              selected={selected}
              recentData={{ "Suggested Users": filteredRecentUserContact }}
              handleSelectedList={handleSelectedList}
            />
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
