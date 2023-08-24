import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ContactBox from "components/Utills/ContactBox";
import SearchBox from "components/Utills/SearchBox";
import SelectedContactBox from "components/Utills/SelectedContactBox";
import { TASK_CONFIG } from "config";
import {
  AssignedUserState,
  Contact,
  InvitedNumber,
} from "constants/interfaces";
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
  closeModal: () => void;
}

const ForwardTask = ({
  taskId,
  assignedToState,
  invitedNumbers,
  closeModal,
}: IProps) => {
  const [isSelfAssign, setIsSelfAssign] = React.useState(false);
  const { userAllContacts, recentUserContact } = useSelector(
    (state: RootState) => state.user
  );
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
    recentUserContact.length < 1 && dispatch(userApiAction.getRecentContacts());
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
      setIsSelfAssign(
        assignedToState.some((contact: any) => contact.userId === user._id)
      );
    }
  }, [userAllContacts]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterData(
      handleGroupSearch(searchValue, sortedContacts, "contactFullName")
    );
    setSearchQuery(searchValue);
  };

  const handleSubmit = () => {
    let invitedUserNumbers: string[] = [];
    let updatedSelected: AssignedToStateType[] = [];
    selected.forEach((item) => {
      const isMatchContact = assignedToState.some(
        (user) => user.phoneNumber === item.phoneNumber
      );
      const isInvitedMember = invitedNumbers.some(
        (member) => member.phoneNumber === item.phoneNumber
      );
      if (!isMatchContact && !isInvitedMember) {
        if (!item.isCeiborUser && item.userCeibroData === null) {
          invitedUserNumbers.push(item.phoneNumber);
        } else {
          let payloadSelected: AssignedToStateType = {
            phoneNumber: "",
            userId: "",
            state: "",
          };
          if (item._id === user._id) {
            payloadSelected = {
              phoneNumber: user.phoneNumber,
              userId: user._id,
              state: "new",
            };
          } else {
            payloadSelected = {
              phoneNumber: item.phoneNumber,
              userId: item.userCeibroData?._id,
              state: "new",
            };
          }
          updatedSelected.push(payloadSelected);
        }
      }
    });
    dispatch(
      taskActions.forwardTask({
        other: { taskId: taskId },
        body: {
          assignedToState: updatedSelected,
          invitedNumbers: invitedUserNumbers,
          //todo comment empty for temp
          comment: "",
        },
        success: (res: any) => {
          if (res) {
            dispatch({
              type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
              payload: { task: res.data.newTask, eventType: "TASK_FORWARDED" },
            });
          }
          closeModal();
        },
      })
    );
  };

  const checkSelection = () => {
    let found = selected?.filter((selectUser) => {
      const isMatchContact = assignedToState.some(
        (user) =>
          user.phoneNumber === selectUser.phoneNumber && selectUser.isCeiborUser
      );
      const isInvitedMember = invitedNumbers.some(
        (member) => member.phoneNumber === selectUser.phoneNumber
      );
      return isMatchContact || isInvitedMember;
    });
    if (found.length === selected.length) {
      return true;
    } else {
      return false;
    }
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
          disabled={checkSelection()}
          searchBtnLabel="Forward"
          placeholder="Start typing name"
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box
        sx={{
          minHeight: "66px",
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
        {!checkSelection() && selected.length > 0 ? (
          selected.map((selectedContact: Contact) => {
            return (
              <SelectedContactBox
                isDisabled={filteredUsers.some(
                  (user: any) => user._id === selectedContact._id
                )}
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
              alignItems: "center",
            }}
          >
            No selected contacts
          </Typography>
        )}
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
          disabled={assignedToState.some(
            (contact: any) => contact.userId === user._id
          )}
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
        {recentUserContact.length > 0 &&
          recentUserContact.map((contact: Contact) => {
            return (
              <ContactBox
                isDisabled={filteredUsers.some(
                  (user: any) => user._id === contact._id
                )}
                contact={contact}
                handleSelectedList={handleSelectedList}
                selected={
                  !!selected.find(
                    (selectUser) => selectUser._id === contact._id
                  )
                }
              />
            );
          })}
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
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
