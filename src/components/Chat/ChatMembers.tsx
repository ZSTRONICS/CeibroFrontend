// @ts-nocheck
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { Grid, IconButton, Typography  } from '@material-ui/core'
// redux-imports
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
// components
import { UserInterface } from "constants/interfaces/user.interface";
import assets from 'assets/assets'
import useStyles from "./styles";
import ChatMemberSearch from "./ChatMemberSearch";
import ChatMemberFilters from "./ChatMemberFilters";
import NameAvatar from 'components/Utills/Others/NameAvatar'
import RollOver from "components/RollOver/RollOver";

const ChatMembers = () => {
  const classes = useStyles();
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const members = selectedChat
    ? chat.find((room: any) => String(room._id) == String(selectedChat))
        ?.members
    : [];
    
  const [searchText, setSearchText] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const [btnIndex, setBtnIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleToggle = (e: any, i: any) => {
    e.stopPropagation();
    setBtnIndex(i);
  };
  // const findAdmins=(arr:any)=>{
  //   const admins = arr.filter((admin:any)=> admin.role === 'admin')
  // }

  const handleMembersShow = (e: any) => {
    e.stopPropagation();
    setShow((prev)=> !prev)
  };

  const handleClick = (userId: any) => {
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
      return (
        member?.firstName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        member?.surName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    });
  }

  return (
    <div className="chat-members">
      <ChatMemberFilters handleMembersShow={handleMembersShow} show={show} findAdmins={findAdmins}/>
      <ChatMemberSearch value={searchText} handleChange={handleSearchChange} />
      {myMembers&& myMembers?.map?.((member: UserInterface, i: any) => {
        return (
          <Grid key={member.id} container className="chat-member-chip">
            <Grid item xs={2} style={{ paddingTop: 5 }}>
              <NameAvatar
                // styleAvater={}
                firstName={member?.firstName}
                surName={member?.surName}
                url={member?.profilePic}
                variant="small"
              />
            </Grid>
            <Grid item xs={8} className={classes.memberPreview}>
              <Typography className={`chat-member-name ${classes.memberName}`}>
                {member.firstName} {member.surName}
              </Typography>
              {member.companyName && (
                <Typography
                  className={`${classes.memberCompany} chat-member-company`}
                >
                  Company: {member.companyName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={2} style={styles.trashWrapper}>
              <IconButton onClick={(e) => handleToggle(e, i)} tabIndex={i}>
                <img src={assets.moreIcon} className={classes.moreIcon} />
              </IconButton>
              {btnIndex === i && (
                <RollOver handleToggle={ handleToggle}>
                  <div
                    className={`${classes.menuWrapper} dropdown-menu pointer`}
                  >
                    <img src={assets.usersIcon} className="width-16" />
                    <Typography className={`${classes.menuText} align-center`}>
                      View Profile
                    </Typography>
                  </div>
                  <div
                    className={`${classes.menuWrapper} dropdown-menu pointer`}
                  >
                    <img src={assets.chatIcon} className="width-16" />
                    <Typography className={`${classes.menuText} align-center`}>
                      Start Chat
                    </Typography>
                  </div>
                  {/* make adming and remove admin */}
                  <div
                    className={`${classes.menuWrapper} dropdown-menu pointer`}
                  >
                    <assets.SupervisorAccountOutlinedIcon className="width-16" />
                    <Typography className={`${classes.menuText} align-center`}>
                      Remove Admin
                    </Typography>
                  </div>
                  <hr className={classes.break} />
                  <div
                    className={`${`${classes.menuWrapper} dropdown-menu`} ${
                      classes.deleteConversation
                    }`}
                    // onClick={handleDeleteClick}
                  >
                    <img src={assets.DeleteIcon} className={`width-16`} />
                    <Typography
                      className={`${classes.menuText} align-center ${classes.deleteText}`}
                    >
                      Delete Member
                    </Typography>
                  </div>
                </RollOver>
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

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
export default ChatMembers;
