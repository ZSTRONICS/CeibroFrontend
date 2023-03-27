import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { mapUsers } from "helpers/user.helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAvailableChatUsers } from "redux/action/user.action";
import colors from "../../../assets/colors";
import {
  addTempMemberToChat,
  getAllChats,
  setTempMembersDialog,
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import SelectDropdown from "../Inputs/SelectDropdown";

interface AddChatMemberProps {}

const AddTempChatMember: React.FC<AddChatMemberProps> = () => {
  const classes = useStyles();
  const { tempMembersDialog, selectedChat, chat } = useSelector(
    (state: RootState) => state.chat
  );
  const chatMembers =
    chat?.find((room: any) => room._id === selectedChat)?.members || [];
  const memberIds = chatMembers?.map((member: any) => member._id);
  const [availableUsers, setAvailableUsers] = useState<any>([]);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleOk = () => {
    dispatch(
      addTempMemberToChat({
        other: {
          roomId: selectedChat,
          userId: selectedUser?.value,
        },
        success: () => {
          dispatch(getAllChats());
          toast.success("New member added successfully");
          setSelectedUser(null);
        },
      })
    );
    handleClose();
  };

  useEffect(() => {
    if (selectedChat && tempMembersDialog) {
      const payload = {
        other: selectedChat,
        success: (res: any) => {
          const myUsers = mapUsers(res.data.message);
          setAvailableUsers(myUsers);
        },
      };
      dispatch(getAvailableChatUsers(payload));
    }
  }, [tempMembersDialog]);

  const handleClose = () => {
    dispatch(setTempMembersDialog(false));
  };

  return (
    <Dialog open={tempMembersDialog} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Select a user"}</DialogTitle>
      <DialogContent>
        <div className={classes.dropdownWrapper}>
          <SelectDropdown
            title="User"
            placeholder="Please select a user"
            data={availableUsers}
            value={selectedUser}
            handleChange={(e: any) => setSelectedUser(e)}
            noOptionMessage="No user available"
          />
        </div>
      </DialogContent>
      <DialogActions
        style={{
          paddingRight: "25px",
        }}
      >
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancel
        </Button>
        <Button disabled={!selectedUser} onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTempChatMember;

const useStyles = makeStyles({
  menuWrapper: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },
  dropdownWrapper: {
    maxWidth: 300,
    width: 300,
    height: 70,
  },
});
