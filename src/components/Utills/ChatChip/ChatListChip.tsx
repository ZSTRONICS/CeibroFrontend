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
  const dispatch = useDispatch();
  const { chat } = props;

  const { name, unreadCount, lastMessage, project, } = chat;
  let { lastMessageTime } = chat
  const { user } = useSelector((state: RootState) => state.auth);

  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );


  lastMessageTime = String(lastMessageTime).replace('a minute ago', '1m ago')
  lastMessageTime = String(lastMessageTime).replace('an hour ago', '1h ago')

  lastMessageTime = String(lastMessageTime)?.replace(' hours', 'h')
  lastMessageTime = String(lastMessageTime)?.replace(' days', 'd')
  lastMessageTime = String(lastMessageTime)?.replace(' minutes', 'm')
  lastMessageTime = String(lastMessageTime)?.replace(' months', 'M')
  lastMessageTime = String(lastMessageTime)?.replace(' years', 'Y')

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
  const unreadLocalCount = unreadCount > 0 ? unreadCount : null;
  console.log(unreadLocalCount && unreadLocalCount.length, 'length')
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
        <CBox flex='3 1 0' minWidth={0}>
          {chat.isGroupChat ? (
            <Typography className={classes.userName}>{name}</Typography>
          ) : (
            <Typography
              className={classes.userName}
            >{`${individualFirstName} ${individualSurName}`}</Typography>
          )}
          {project?.title && (
            <Typography className={classes.chatProject}>
              <span>Project: &nbsp;&nbsp;</span>
              <span className={classes.chatProjectName}>{project.title}</span>
            </Typography>
          )}
          <Typography className={classes.message}>
            {lastMessage?.message?.substr(0, 22)}
          </Typography>

        </CBox>

        <CBox flex='4 1 0' style={{ gap: 5 }} display='flex' position='relative' justifyContent='space-between' alignItems='center'>
          <CBox flex='1'>
            <CBox display='flex' onClick={handleFavouriteClick}>
              {bookmarked ? (
                <Star className={classes.startFilled} />
              ) : (
                <StarBorder className={classes.bookmarked} />
              )}
            </CBox>
          </CBox>
          <CBox display='flex' flex='3'>


            <Typography className={classes.time}>{lastMessageTime}</Typography>

          </CBox>
          {unreadLocalCount && unreadLocalCount.length == null ?
            <CBox display='flex' flex='1'>
              <CBox className={classes.unreadCounter}>
                {unreadLocalCount}
              </CBox>

            </CBox>



            :
            ''

          }


          <CBox display='flex' flex='1'>

            <ChatListMenu room={chat} />
          </CBox>
        </CBox>


      </CBox>



    </>
  )
};

export default ChatListChip;


