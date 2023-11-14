import {
  Box,
  Divider,
  FormControl,
  Input,
  Select,
  Typography,
} from "@mui/material";
import { MUIInputLabel, SubLabelTag } from "components/CustomTags";
import SelectedContactBox from "components/Utills/SelectedContactBox";
import { TASK_CONFIG } from "config";
import {
  AssignedUserState,
  Contact,
  InvitedNumber,
} from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions, userApiAction } from "redux/action";
import { RootState } from "redux/reducers";
import { handleGroupSearch } from "utills/common";
import Footer from "../Create-Task/Footer";
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
  const [comment, setComment] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);
  const { userAllContacts, recentUserContact } = useSelector(
    (state: RootState) => state.user
  );
  const {
    isOpen,
    openModal,
    closeModal: closeModalLocal,
  } = useOpenCloseModal();
  const [filteredRecentUserContact, setFilteredRecentUserContact] =
    React.useState<Contact[]>(recentUserContact);
  // const [isSelfAssign, setIsSelfAssign] = useState(false);

  const [allContactsList, setAllContactsList] =
    useState<ContactsState>(initialState);
  const [sortedContacts, setSortedContacts] =
    useState<ContactsState>(initialState);
  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    },
    [setComment]
  );

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
  let invitedUserNumbers: string[] = [];
  let updatedSelected: AssignedToStateType[] = [];

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

  const isMatchPhoneNumber = (phoneNumber: any, assignedToState: any) =>
    assignedToState.some((item: any) => item.phoneNumber === phoneNumber);

  const checkSelection = () => {
    const isUserInAssignedState = (selectUser: any) =>
      assignedToState.some(
        (user) =>
          user.phoneNumber === selectUser.phoneNumber && selectUser.isCeiborUser
      );
    const isUserInvited = (selectUser: any) =>
      invitedNumbers.some(
        (member) => member.phoneNumber === selectUser.phoneNumber
      );

    selected.forEach((item) => {
      const isMatchContact = isMatchPhoneNumber(
        item.phoneNumber,
        assignedToState
      );
      const isInvitedMember = isMatchPhoneNumber(
        item.phoneNumber,
        invitedNumbers
      );

      if (!isMatchContact && !isInvitedMember) {
        if (!item.isCeiborUser && !item.userCeibroData) {
          invitedUserNumbers.push(item.phoneNumber);
        } else {
          const payloadSelected = {
            phoneNumber:
              item._id === user._id ? user.phoneNumber : item.phoneNumber,
            userId: item._id === user._id ? user._id : item.userCeibroData?._id,
            state: "new",
          };
          updatedSelected.push(payloadSelected);
        }
      }
    });

    const found = selected.filter(
      (selectUser) =>
        isUserInAssignedState(selectUser) || isUserInvited(selectUser)
    );

    return found.length === selected.length;
  };

  const renderValue = () => {
    if (selected.length > 0) {
      const fullNames = selected
        .filter(
          (userContact) =>
            !isMatchPhoneNumber(userContact.phoneNumber, selectedUsers)
        )
        .map((item: any) => {
          if (item.contactFullName) {
            return item.contactFullName;
          } else if (item.firstName) {
            return `${item.firstName} ${item.surName}`;
          }
          return "";
        });
      return fullNames.join(", ");
    } else {
      return "Forward To";
    }
  };

  const handleSubmit = () => {
    dispatch(
      taskActions.forwardTask({
        other: { taskId: taskId },
        body: {
          assignedToState: updatedSelected,
          invitedNumbers: invitedUserNumbers,
          comment: comment,
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

  const handleClearClick = () => {
    const clearSelectedContacts = selected.filter(
      (contactLocal: any) =>
        !isMatchPhoneNumber(contactLocal.phoneNumber, selectedUsers)
    );
    setSelected(clearSelectedContacts);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <SubLabelTag sx={{ pr: 1, display: { md: "none", lg: "block" } }}>
          Forward
        </SubLabelTag>

        <FormControl
          variant="standard"
          sx={{
            marginTop: "8px",
            width: "100%",
            maxWidth: "100%",
            pl: 1,
            borderLeft: "1px solid #818181",
          }}
        >
          {/* <MUIInputLabel
            id="controlled-open-select-label"
            sx={{
              pl: "1rem",
              top: "-50%",
              display: {
                md: "block",
                lg: selected.length === 0 && !isOpen ? "block" : "none",
              },
            }}
          >
            Forward to
          </MUIInputLabel> */}
          <Select
            className="custom-select"
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            sx={{
              "&.custom-select": {
                mt: 0,
                // pr: 2,
              },
              "& .MuiSelect-icon": {
                right: 0,
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
            open={isOpen}
            onClose={closeModalLocal}
            onOpen={openModal}
            value={selected}
            renderValue={renderValue}
            // endAdornment={
            //   selected.length > 0 && (
            //     <IconButton
            //       sx={{ display: "none" }}
            //       size="small"
            //       aria-label="clear selection"
            //       // onClick={handleClearClick}
            //     >
            //       <ClearIconSvgGray />
            //     </IconButton>
            //   )
            // }
          >
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
          </Select>
        </FormControl>
      </Box>

      {/* comment Box */}
      <Box
        sx={{
          height: "auto",
          padding: "2px 2px",
          mt: 0.5,
        }}
      >
        <FormControl
          variant="standard"
          sx={{ width: "100%", fontFamily: "Inter" }}
        >
          <MUIInputLabel htmlFor="comment">Comment</MUIInputLabel>
          <Input
            name="comment"
            id="comment"
            required
            autoFocus
            multiline
            maxRows={10}
            value={comment}
            sx={{ width: "100%" }}
            onChange={handleDescriptionChange}
          />
        </FormControl>
      </Box>

      <Footer
        isCommentUi={true}
        isForwardUi={true}
        isSubmitted={false}
        disabled={false}
        handleClose={closeModal}
        showHeader={false}
        handleSubmitForm={handleSubmit}
        handleAttachImageValue={() => {}}
        handleSelectDocumentValue={() => {}}
      />
    </Box>
  );
};

export default ForwardTask;
