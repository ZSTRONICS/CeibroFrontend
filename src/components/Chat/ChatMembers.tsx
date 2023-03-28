
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { Grid, IconButton, Typography, Button } from "@material-ui/core";
// redux-imports
import { addMemberToChat, getAllChats } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
// components
import { UserInterface } from "constants/interfaces/user.interface";
import assets from "assets/assets";
import useStyles from "./styles";
import ChatMemberSearch from "./ChatMemberSearch";
import ChatMemberFilters from "./ChatMemberFilters";
import NameAvatar from "components/Utills/Others/NameAvatar";
import RollOver from "components/RollOver/RollOver";
import { createSingleRoom } from "../../redux/action/chat.action";
import { useHistory } from "react-router-dom";
import CustomModal from "components/Modal";
import ProfileContent from "components/Profile/ProfileContent";
import { getUserById } from "redux/action/user.action";
interface Props{
  enable:boolean
}

const ChatMembers:React.FC<Props> = ({enable}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false)
  const [getUser, setGetUser] = useState<any>({})
  const { selectedChat, chat } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

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
  
   // start singleRoom chat
  const startRoom = (id: string) => {
    const payload = { other: { id }, success: () => dispatch(getAllChats()) };
    dispatch(createSingleRoom(payload));
  };

  const handleMembersShow = (e: any) => {
    e.stopPropagation();
    setShow((prev) => !prev);
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
  const handleToggleClose = (userId:any) => {
    const payload = {
      success: (val: any) => {
        setGetUser(val.data)
      },
      other: {
        userId,
      },
    }
    dispatch(getUserById(payload))

    setOpen((prev)=> !prev)
  }
  return (
    <div className="chat-members">
      <ChatMemberFilters handleMembersShow={handleMembersShow} show={show} />
      <ChatMemberSearch value={searchText} handleChange={handleSearchChange} />
      {myMembers &&
        myMembers?.map?.((member: UserInterface, i: any) => {
          return (
            <Grid key={member._id} container className="chat-member-chip">
              <Grid item xs={2} style={{ paddingTop: 5 }}>
                <NameAvatar
                  // styleAvater={}
                  firstName={member?.firstName}
                  surName={member?.surName}
                  url={member?.profilePic}
                  size="small"
                />
              </Grid>
              <Grid item xs={8} className={classes.memberPreview}>
                <Typography
                  className={`chat-member-name ${classes.memberName}`}
                >
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
               {enable&& <IconButton onClick={(e) => handleToggle(e, i)} tabIndex={i}>
                  <img src={assets.moreIcon} className={classes.moreIcon} alt=""/>
                </IconButton>}
                {btnIndex === i && (
                  <RollOver handleToggle={handleToggle}>
                    <div
                      className={`${classes.menuWrapper} dropdown-menu pointer`}
                    >
                      <Button variant="text" className={classes.iconBtn}
                      onClick={()=>handleToggleClose(member._id)}
                      startIcon={<assets.PeopleAltOutlinedIcon />}>
                      View Profile
                      </Button>
                      <CustomModal showCloseBtn={false} isOpen={open} title="Profile Overview" handleClose={()=>handleToggleClose(member._id)}>
                       <ProfileContent getUser={getUser} />
                        </CustomModal>
                      {/* <img src={assets.usersIcon} className="width-16" />
                      <Typography
                        className={`${classes.menuText} align-center`}
                      >
                        View Profile
                      </Typography> */}
                    </div>
                    <div
                      className={`${classes.menuWrapper} dropdown-menu pointer`}
                    >
                      <Button variant="text" className={classes.iconBtn}
                       onClick={() => startRoom(member._id)}
                      startIcon={<assets.ChatOutlinedIcon />}>
                      Start Chat
                      </Button>
                      {/* <img src={assets.chatIcon} className="width-16" />
                    <Typography className={`${classes.menuText} align-center`} >
                      Start Chat
                    </Typography> */}
                    </div>
                    {/* make adming and remove admin */}
                    <div
                      className={`${classes.menuWrapper} dropdown-menu pointer`}
                    >
                      <assets.SupervisorAccountOutlinedIcon className="width-16" />
                      <Typography
                        className={`${classes.menuText} align-center`}
                      >
                        Remove Admin
                      </Typography>
                    </div>
                    <hr className={classes.break} />
                    <div
                      className={`${`${classes.menuWrapper} dropdown-menu`} ${
                        classes.deleteConversation
                      }`}
                      onClick={()=> handleClick(member._id)}
                    >
                      <img src={assets.DeleteIcon} className={`width-16`} alt="deleteIcon"/>
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
