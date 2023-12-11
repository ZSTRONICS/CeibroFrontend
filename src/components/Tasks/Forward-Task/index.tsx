import {
  Box,
  Divider,
  FormControl,
  Input,
  Select,
  Typography,
} from "@mui/material";
import {
  CustomDivider,
  MUIInputLabel,
  SubLabelTag,
} from "components/CustomTags";
import { hasOnlySpaces } from "components/Utills/Globals";
import SearchBox from "components/Utills/SearchBox";
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
      if (hasOnlySpaces(e.target.value)) {
        setComment("");
      } else {
        setComment(e.target.value);
      }
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
  const taskDragContHeight = useSelector(
    (store: RootState) => store.task.taskDragContHeight
  );
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
      return "";
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
  const beforeAfterStyles = {
    "&::before, &::after": {
      borderBottom: "none",
    },
  };
  const hasAssignTo = renderValue();
  return (
    <>
      <Box sx={{ height: "100%", overflow: "auto", pr: 1.5 }}>
        <CustomDivider key="bottom-divider2" sx={{ my: 1.25 }} />
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              height: "100%",
              flexWrap: "nowrap",
            }}
          >
            <SubLabelTag
              sx={{
                fontSize: "14px",
                pr: 1,
                // display: { md: "none", lg: "block" },
              }}
            >
              Forward
            </SubLabelTag>
            <FormControl
              variant="standard"
              sx={{
                marginTop: "8px",
                width: "100%",
                maxWidth: "100%",
                pl: 1,
                borderLeft: "1.9px solid #818181",
              }}
            >
              {selected.length === 0 && (
                <MUIInputLabel
                  id="controlled-open-select-label"
                  sx={{
                    "&.Mui-focused": { color: "transparent", display: "none" },
                    pl: "1rem",
                    top: { sm: "-45%", lg: "-40%" },
                    display: {
                      md: "block",
                      lg: selected.length === 0 && !isOpen ? "block" : "none",
                    },
                  }}
                >
                  Forward to
                </MUIInputLabel>
              )}
              <Select
                className="custom-select"
                labelId="controlled-open-select-label"
                id="controlled-open-select"
                sx={{
                  position: "relative",
                  width: "100%",
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "none !important",
                  },
                  ...beforeAfterStyles,
                  "&.custom-select": {
                    mt: 0,
                  },
                  "&.MuiSelect-select": {
                    p: 0,
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
                      maxHeight: "calc(100vh - 120px)",
                      width: `calc(100vw - 29.4rem)`,
                    },
                  },
                }}
                multiple
                variant="standard"
                open={isOpen}
                onClose={closeModalLocal}
                onOpen={() => {
                  setAllContactsList(
                    handleGroupSearch("", sortedContacts, "contactFullName")
                  );
                  openModal();
                }}
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
                    maxWidth: "98%",
                    overflow: "auto",
                    pr: 1,
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
                    margin: "3px 16px",
                  }}
                >
                  <Divider sx={{ marginTop: "4px", marginBottom: "16px" }} />
                  <GroupContactList
                    filterData={allContactsList}
                    filteredUsers={selectedUsers}
                    selected={selected}
                    recentData={{
                      "Suggested Users": filteredRecentUserContact,
                    }}
                    handleSelectedList={handleSelectedList}
                  />
                </Box>
                <SearchBox
                  maxLength={50}
                  disabled={false}
                  searchBtnLabel="OK"
                  placeholder="Start typing name"
                  handleSearchChange={handleSearchChange}
                  handleSubmit={closeModalLocal}
                />
              </Select>
            </FormControl>
          </Box>
          <CustomDivider key="bottom-divider2" sx={{ my: 1.25 }} />
          <Box
            sx={{
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
                inputProps={{ maxLength: 1500 }}
                multiline
                value={comment}
                sx={{
                  width: "100%",
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "none !important",
                  },
                  ...beforeAfterStyles,
                }}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <CustomDivider key="bottom-divider3" sx={{ mt: "3px", mb: 1 }} />
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "12px",
                fontWeight: 500,
                color: "#757575",
                paddingBottom: "9px",
                paddingRight: "5px",
              }}
            >
              {`${comment.length}`}/ 1500
            </span>
          </Box>
        </Box>
      </Box>

      <Footer
        isCommentUi={true}
        isForwardUi={true}
        isSubmitted={false}
        showHeader={true}
        disabled={hasAssignTo.length === 0}
        handleClose={closeModal}
        handleSubmitForm={handleSubmit}
        handleAttachImageValue={() => {}}
        handleSelectDocumentValue={() => {}}
      />
    </>
  );
};

export default ForwardTask;
