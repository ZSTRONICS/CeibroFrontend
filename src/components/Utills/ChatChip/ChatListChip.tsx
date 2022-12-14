import { Badge, Grid, Typography } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import colors from "../../../assets/colors";
import NameAvatar from "../Others/NameAvatar";
import ChatListMenu from "./ChatListMenu";
import { ChatListInterface } from "../../../constants/interfaces/chat.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { addToFavourite, getAllChats } from "../../../redux/action/chat.action";
import useStyles from './ChatListStyles'
import { socket } from "services/socket.services"
import { CBox } from "components/material-ui";
interface ChatListInterfaceProps {
  chat: ChatListInterface;
  handleClick?: (e: any) => void;

}

const ChatListChip: React.FC<ChatListInterfaceProps> = (props) => {
  const classes = useStyles();

  const { chat } = props;

  const { name, unreadCount, lastMessageTime, lastMessage, project, } = chat;

  const { user } = useSelector((state: RootState) => state.auth);

  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  // const { projects } = useSelector((state: RootState) => state.project);

  const dispatch = useDispatch();
  let avaterInfo: any = {};
  const chatMembers = [...chat.members, ...chat.removedAccess]

  if (chat.isGroupChat === false) {
    let chatMember = chatMembers.filter((item) => item.id !== user.id);
    if (chatMember.length === 0) {
      chatMember = chat.removedMembers;
    }

    chatMember
      .filter((item) => item.id !== user.id)
      .map((item: any) => (
        (avaterInfo.firstName = item.firstName),
        (avaterInfo.surName = item.surName),
        (avaterInfo.picUrl = item.profilePic)
      ));
  }

  const individualFirstName = avaterInfo.firstName;
  const individualSurName = avaterInfo.surName;
  const individualPicUrl = avaterInfo.picUrl;

  const handleClick = () => {
    props.handleClick?.(chat);
  };

  const getStyles = () => {
    if (selectedChat === chat._id && socket.getAppSelectedChat() !== chat._id) {
      socket.setAppSelectedChat(chat._id);
    }

    return {
      backgroundColor:
        String(selectedChat) === String(chat._id)
          ? colors.lightGrey
          : colors.white,
    };
  };

  const handleFavouriteClick = (e: any) => {
    e.stopPropagation();
    dispatch(
      addToFavourite({
        other: chat._id,
        success: () => {
          dispatch(getAllChats());
        },
      })
    );
  };

  const bookmarked = chat?.pinnedBy?.includes(user?.id);
  const unreadLocalCount = unreadCount > 0 ? unreadCount : '2'
  return (
    <>
      <CBox display='flex' alignItems='center' width='100%' onClick={handleClick} style={getStyles()} className={classes.chatListWrapper} >
        <CBox flex='1 1 0'>
          {chat.isGroupChat ? (
            <NameAvatar background="white" firstName={name} />
          ) : (
            <NameAvatar
              background="white"
              firstName={individualFirstName}
              surName={individualSurName}
              url={individualPicUrl}
            />
          )}
        </CBox>
        <CBox flex='3 1 0'>
          {chat.isGroupChat ? (
            <Typography className={classes.userName}>{name}</Typography>
          ) : (
            <Typography
              className={classes.userName}
            >{`${individualFirstName} ${individualSurName}`}</Typography>
          )}
          <Typography className={classes.message}>
            {lastMessage?.message?.substr(0, 22)}
          </Typography>
          {project?.title && (
            <Typography className={classes.chatProject}>
              <span>Project: &nbsp;&nbsp;</span>
              <span className={classes.chatProjectName}>{project.title}</span>
            </Typography>
          )}
        </CBox>

        <CBox flex='3 1 0' display='flex' position='relative' justifyContent='space-between' alignItems='center'>
          <CBox>
            <CBox display='flex' onClick={handleFavouriteClick}>
              {bookmarked ? (
                <Star className={classes.startFilled} />
              ) : (
                <StarBorder className={classes.bookmarked} />
              )}
            </CBox>
          </CBox>
          <CBox display='flex'>


            <Typography className={classes.time}>{lastMessageTime}</Typography>
            <Badge className={classes.unreadCounter} badgeContent={unreadLocalCount} color="primary">&nbsp;</Badge>
            {/* <CBox className={classes.unreadCounter}>
              {unreadLocalCount}
            </CBox> */}
            {/* <Badge
              overlap="circular"
              badgeContent={unreadLocalCount}
              color="error"
            className={classes.unreadCounter}
            ></Badge> */}
          </CBox>
          <CBox display='flex'>

            <ChatListMenu room={chat} />
          </CBox>
        </CBox>


      </CBox>


      {/* <Grid
        className={classes.chatListWrapper}
        container
      >
        <Grid container>
       
          <Grid item xs={2} className={classes.avatarWrapper}>
            <CSkeleton variant="circular" width={40} height={40} />
          </Grid>

          <Grid item xs={6} className={classes.messageDetailWrapper}>
            <CBox mt={1.6}>
              <CSkeleton variant="rectangular" width={40} height={10} />
            </CBox>
          </Grid>

          <Grid item xs={2} className={classes.timeOuterWrapper}>
            <div>
              <CSkeleton variant="rectangular" width={20} height={15} />
            </div>
            <div className={classes.timeWrapper}>
              {unreadCount && unreadCount > 0 && (
                <Badge
                  overlap="circular"
                  badgeContent={unreadCount}
                  color="error"
                ></Badge>
              )}
              <Typography className={classes.time}>{lastMessageTime}</Typography>
            </div>
          </Grid>

          <Grid item xs={1} className={classes.timeWrapper}>
            <CSkeleton variant="rectangular" width={5} height={20} />
          
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} style={{ paddingLeft: 6 }}>
            <CSkeleton variant="rectangular" width={80} height={10} />
          </Grid>
        </Grid>
      </Grid> */}

    </>
  )
};

export default ChatListChip;


