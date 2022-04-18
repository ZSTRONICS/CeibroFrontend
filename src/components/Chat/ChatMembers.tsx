import { Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../assets/assets";
import { RootState } from "../../redux/reducers";
import NameAvatar from "../Utills/Others/NameAvatar";
import { useConfirm } from "material-ui-confirm";
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { toast } from "react-toastify";
import { UserInterface } from "constants/interfaces/user.interface";
import ChatMemberSearch from "./ChatMemberSearch";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const ChatMembers = () => {
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const members = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
        ?.members
    : [];
  const [searchText, setSearchText] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = (userId: any) => {
    // console.log('confirm is ', confirm
    confirm({ description: "User will be removed from this chat" }).then(() => {
      dispatch(
        addMemberToChat({
          other: {
            roomId: selectedChat,
            userId: userId,
          },
          success: () => {
            dispatch(getAllChats());
            toast.success("Chat member removed successfully");
          },
        })
      );
    });
  };

  const handleSearchChange = (e: any) => {
    setSearchText(e?.target?.value);
  };

  let myMembers = members;
  if (searchText && members) {
    myMembers = members?.filter((member: UserInterface) => {
      console.log(
        'checking searchText "',
        searchText,
        '" in ',
        member.firstName
      );
      return (
        member?.firstName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        member?.surName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    });
  }

  return (
    <div className="chat-members">
      <ChatMemberSearch value={searchText} handleChange={handleSearchChange} />
      {myMembers?.map?.((member: UserInterface) => {
        return (
          <Grid key={member.id} container className="chat-member-chip">
            <Grid item xs={2} style={{ paddingTop: 5 }}>
              <NameAvatar
                firstName={member?.firstName}
                surName={member?.surName}
                url={member?.profilePic}
                variant="small"
              />
            </Grid>
            <Grid
              item
              xs={8}
              style={{ padding: 2, display: "flex", flexDirection: "column" }}
            >
              <Typography className={`chat-member-name ${classes.memberName}`}>
                {member.firstName} {member.surName}
              </Typography>
              <Typography
                className={`${classes.memberCompany} chat-member-company`}
              >
                Company: {member.companyName}
              </Typography>
            </Grid>
            <Grid item xs={2} style={styles.trashWrapper}>
              <IconButton onClick={() => handleClick(member.id)}>
                <img
                  className="w-16"
                  src={assets.trashIcon}
                  style={styles.trashImage}
                />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default ChatMembers;

const styles = {
  trashWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trashImage: {
    cursor: "pointer",
  },
};

const useStyles = makeStyles({
  memberName: {
    fontSize: 14,
    fontWeight: 700,
  },
  memberCompany: {
    fontSize: 12,
    fontWeight: 500,
  },
});
