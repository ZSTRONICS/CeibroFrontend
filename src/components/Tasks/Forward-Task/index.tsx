import { Box, Divider, Typography } from "@mui/material";
import SearchBox from "components/Utills/SearchBox";
import SelectedContactBox from "components/Utills/SelectedContactBox";
import { TASK_CONFIG } from "config";
import {
  AssignedUserState,
  Contact,
  InvitedNumber,
} from "constants/interfaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { handleGroupSearch } from "utills/common";
import { AssignedToStateType } from "../type";
import GroupContactList from "./GroupContactList";

interface IProps {
  taskId: string;
  assignedToState: AssignedUserState[];
  invitedNumbers: InvitedNumber[];
  closeModal: () => void;
  isOpen: boolean;
}
type ContactsState = {
  [key: string]: any[];
};

const initialState: ContactsState = {};
const ForwardTask = ({
  taskId,
  assignedToState,
  invitedNumbers,
  closeModal,
}: IProps) => {
  const dispatch = useDispatch();
  const isRenderEffect = useRef<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userAllContacts, recentUserContact } = useSelector(
    (state: RootState) => state.user
  );
  const [filteredRecentUserContact, setFilteredRecentUserContact] =
    React.useState<Contact[]>(recentUserContact);
  // const [isSelfAssign, setIsSelfAssign] = useState(false);

  const [allContactsList, setAllContactsList] =
    useState<ContactsState>(initialState);
  const [sortedContacts, setSortedContacts] =
    useState<ContactsState>(initialState);

  useEffect(() => {
    if (!isRenderEffect.current) {
      userAllContacts.length < 1 && dispatch(userApiAction.getUserContacts());
      recentUserContact.length < 1 &&
        dispatch(userApiAction.getRecentContacts());
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  const selectedUsers = [...recentUserContact, ...userAllContacts].filter(
    (contact: Contact) => {
      const isMatchContact = assignedToState.some(
        (user) =>
          user.phoneNumber === contact.phoneNumber && contact.isCeiborUser
      );
      const isInvitedMember = invitedNumbers.some(
        (member) => member.phoneNumber === contact.phoneNumber
      );
      const shouldInclude = isMatchContact || isInvitedMember;

      return shouldInclude;
    }
  );

  const [selected, setSelected] = useState<any[]>(selectedUsers);

  useEffect(() => {
    if (userAllContacts && userAllContacts.length > 0) {
      const sorted = userAllContacts.sort((a: any, b: any) => {
        const nameA = a.contactFirstName.toLowerCase();
        const nameB = b.contactFirstName.toLowerCase();
        const startsWithNumberOrSpecialA = /^[0-9$#]/.test(nameA);
        const startsWithNumberOrSpecialB = /^[0-9$#]/.test(nameB);
        if (startsWithNumberOrSpecialA && startsWithNumberOrSpecialB) {
          return nameA.localeCompare(nameB);
        } else if (startsWithNumberOrSpecialA) {
          return 1;
        } else if (startsWithNumberOrSpecialB) {
          return -1;
        } else {
          return nameA.localeCompare(nameB);
        }
      });
      const localGroupContacts: ContactsState = {};
      sorted.forEach((contact: any) => {
        const firstLetter = contact.contactFirstName[0].toUpperCase();
        if (!localGroupContacts[firstLetter]) {
          localGroupContacts[firstLetter] = [];
        }
        localGroupContacts[firstLetter].push(contact);
      });
      setSortedContacts({
        ...localGroupContacts,
      });
      setAllContactsList({
        ...localGroupContacts,
      });

      // setIsSelfAssign(
      //   assignedToState.some((contact: any) => contact.userId === user._id)
      // );
    }
    setFilteredRecentUserContact(recentUserContact);
  }, [userAllContacts, recentUserContact]);

  const handleSelectedList = useMemo(() => {
    return (contact: any, checked: any) => {
      setSelected((prevSelected) => {
        if (checked) {
          return [...prevSelected, contact];
        } else {
          return prevSelected.filter((item) => item._id !== contact._id);
        }
      });
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchValue = event.target.value;
    setAllContactsList(
      handleGroupSearch(searchValue, sortedContacts, "contactFullName")
    );
    const recentFilteredData = recentUserContact.filter((Option: Contact) =>
      Option["contactFullName"]
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredRecentUserContact(recentFilteredData);
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
              payload: { task: res.data.data, eventType: "TASK_FORWARDED" },
            });
            closeModal();
          }
        },
        onFailAction: () => {
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
        }}
      >
        <SearchBox
          disabled={checkSelection()}
          searchBtnLabel="Forward"
          placeholder="Start typing name"
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSubmit}
        />
        <Box
          sx={{
            minHeight: "66px",
            display: "flex",
            paddingLeft: "12px",
            pb: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              height: "0.3rem",
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
          {!checkSelection() && selected.length > 0 ? (
            selected.map((selectedContact: Contact) => {
              return (
                <SelectedContactBox
                  isDisabled={selectedUsers.some(
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
                alignItems: "end",
              }}
            >
              Please select any task assignee
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          margin: "8px 16px",
        }}
      >
        <Divider sx={{ marginTop: "4px", marginBottom: "16px" }} />
        <GroupContactList
          filterData={allContactsList}
          filteredUsers={selectedUsers}
          selected={selected}
          recentData={{ "Suggested Users": filteredRecentUserContact }}
          handleSelectedList={handleSelectedList}
        />
      </Box>
    </Box>
  );
};

export default ForwardTask;
