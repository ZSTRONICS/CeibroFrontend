import { Box, Typography } from "@mui/material";
import ContactBox from "components/Utills/ContactBox";
import SearchBox from "components/Utills/SearchBox";
import SelectedContactBox from "components/Utills/SelectedContactBox";
import {
  AssignedUserState,
  Contact,
  InvitedNumber,
} from "constants/interfaces";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { handleGroupSearch } from "utills/common";
import { AssignedToStateType } from "../type";

interface IProps {
  taskId: string;
  assignedToState: AssignedUserState[];
  invitedNumbers: InvitedNumber[];
}

const ForwardTask = ({ taskId, assignedToState, invitedNumbers }: IProps) => {
  const { userAllContacts } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterData, setFilterData] = React.useState<{
    [key: string]: any[];
  }>({});
  const [sortedContacts, setSortedContacts] = React.useState<{
    [key: string]: any[];
  }>({});

  const filteredUsers = userAllContacts.filter((contact: Contact) => {
    const isMatchContact = assignedToState.some(
      (user) => user.phoneNumber === contact.phoneNumber && contact.isCeiborUser
    );
    const isInvitedMember = invitedNumbers.some(
      (member) => member.phoneNumber === contact.phoneNumber
    );
    const shouldInclude = isMatchContact || isInvitedMember;

    return shouldInclude;
  });

  const [selected, setSelected] = React.useState<any[]>(filteredUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      other: { userId: user._id },
    };
    userAllContacts.length < 1 &&
      dispatch(userApiAction.getUserContacts(payload));
  }, []);

  useEffect(() => {
    if (userAllContacts && userAllContacts.length > 0) {
      const sortedContacts = userAllContacts.sort((a: any, b: any) =>
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
      setSelected(filteredUsers);
    }
  }, [userAllContacts]);

  const handleSelectedList = (contact: object, checked: boolean) => {
    if (checked) {
      let updatedSelected = [...selected, contact];
      setSelected(updatedSelected);
    } else {
      setSelected(
        _.remove(selected, (item: object) => {
          return contact._id != item._id;
        })
      );
    }
  };

  console.log("filteredUsers", filteredUsers);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterData(
      handleGroupSearch(searchValue, sortedContacts, "contactFullName")
    );
    setSearchQuery(searchValue);
  };

  const handleSubmit = () => {
    let updatedSelected: AssignedToStateType[] = selected.map((item) => {
      let payloadSelected: AssignedToStateType = {
        phoneNumber: item.phoneNumber,
        userId: item.userId,
        state: "new",
      };
      return payloadSelected;
    });
    dispatch(
      taskActions.forwardTask({
        other: { taskId: taskId },
        body: {
          assignedToState: updatedSelected,
          invitedNumbers: [],
        },
      })
    );
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "56px",
        }}
      >
        <SearchBox
          searchBtnLabel="Forward"
          placeholder="Start typing name"
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingLeft: "12px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            height: "0.4rem",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            borderRadius: "0.2rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
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
      <Box sx={{ margin: "8px 16px" }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          Suggested users
        </Typography>
      </Box>
      <Box
        className="custom-scrollbar"
        sx={{
          margin: "8px 16px",
          height: "calc(100vh - 398px )",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            height: "0.4rem",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            borderRadius: "0.2rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
        {Object.entries(filterData).map(([groupLetter, groupOptions]) => [
          <Typography>{groupLetter}</Typography>,
          // Use map on the array to render the list items
          ...groupOptions.map((item) => (
            <ContactBox
              isDisabled={filteredUsers.some(
                (user: any) => user._id === item._id
              )}
              contact={item}
              handleSelectedList={handleSelectedList}
              selected={!!selected.find((contact) => contact._id === item._id)}
            />
          )),
        ])}
      </Box>
    </Box>
  );
};

export default ForwardTask;
