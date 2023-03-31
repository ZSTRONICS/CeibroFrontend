import { useState } from "react";
import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { ChatListInterface } from "../../constants/interfaces/chat.interface";
import { RootState } from "../../redux/reducers";
import ChatUserMenu from "../Utills/ChatChip/ChatUserMenu";
// import ChatSearch from "./../Utills/ChatChip/ChatSearch";
import AddChatMember from "../Utills/ChatChip/AddChatMember";
import { ClipLoader } from "react-spinners";
import TextField from "components/Utills/Inputs/TextField";
import { editRoomName, getAllChats } from "redux/action/chat.action";
import MessageSearch from "./MessageSearch";
import assets from "assets/assets";

interface ChatBoxHeaderProps {
  enable: boolean;
  chat: ChatListInterface;
}

const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    upScrollLoading,
    chat: allChats,
    selectedChat,
  } = useSelector((store: RootState) => store.chat);

  const myChat =
    allChats?.length > 0 &&
    allChats?.find?.((room: any) => String(room._id) === String(selectedChat));
  const individualChatName = myChat?.members?.find(
    (member: any) => member._id !== user._id
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e?.target?.value);
  };

  const handleUpdate = () => {
    setLoading(true);
    dispatch(
      editRoomName({
        body: { name },
        success: () => {
          setEdit(false);
          // let allRooms = JSON.parse(JSON.stringify(allChats));
           const index = allChats?.length > 0 &&
             allChats.findIndex(
               (room: any) => String(room._id) === String(selectedChat));
               console.log('index',index);
          if (index > -1) {
            allChats[index].name = name;
            dispatch(getAllChats());
          }
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: myChat?._id,
      })
    );
  };

  const handleCancel = () => {
    setEdit(false);
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleUpdate();
    }
  };
 
  return (
    <>
      <Grid container className={classes.wrapper}>
        <AddChatMember />
        {upScrollLoading && (
          <div className={classes.loadingWrapper}>
            <div className={classes.innerLoading}>
              <ClipLoader size={20} color={colors.primary} />
            </div>
          </div>
        )}
        {myChat && (
          <>
            <Grid item xs={6} md={2} className={classes.editWrapper}>
              {!edit && (
                <>
                  {myChat?.project && (
                    <div className={classes.iconContainer}>
                      <img
                        src={assets.EditIcon}
                        onClick={() => {
                          setEdit(true);
                          setName(myChat.name);
                        }}
                        className={classes.editIcon}
                        alt=""
                      />
                    </div>
                  )}
                </>
              )}
              {myChat?.isGroupChat === false && (
                <div className={classes.editProject}>
                  <Typography className={classes.username}>
                    {`${individualChatName?.firstName} ${individualChatName?.surName}`}
                  </Typography>
                  {individualChatName?.companyName && (
                    <Typography className={classes.projectName}>
                      Company:{" "}
                      <span className={classes.projectTitle}>
                        {" "}
                        {individualChatName?.companyName}{" "}
                      </span>
                    </Typography>
                  )}
                </div>
              )}
              {edit ? (
                <div className={`${classes.editInputWrapper} editInputWrapper`}>
                  <TextField
                    inputProps={{ maxLength: 20 }}
                    value={name}
                    onChange={handleNameChange}
                    onkeyDown={handleKeyDown}
                  />
                  <IconButton size="small" onClick={handleCancel}>
                    <Clear className={classes.cancelIcon} />
                  </IconButton>
                  {loading ? (
                    <div className={classes.loading}>
                      <CircularProgress disableShrink={false} size={15} />
                    </div>
                  ) : (
                    <IconButton size="small" onClick={handleUpdate}>
                      <Check className={classes.checkIcon} />
                    </IconButton>
                  )}
                </div>
              ) : (
                <>
                  <div className={classes.editProject}>
                    <Typography className={classes.username}>
                      {myChat?.name}
                    </Typography>
                    {myChat?.project && (
                      <Typography className={classes.projectName}>
                        Project:{" "}
                        <span className={classes.projectTitle}>
                          {" "}
                          {myChat?.project?.title}{" "}
                        </span>
                      </Typography>
                    )}
                  </div>
                </>
              )}
            </Grid>
            <Grid item xs={8} className={classes.moreWrapper}>
              <MessageSearch />
              <ChatUserMenu enable={props?.enable} />
            </Grid>
            {/* <Grid item xs={1} className={classes.moreWrapper}>
            <ChatUserMenu enable={props?.enable} />
          </Grid> */}
          </>
        )}
      </Grid>
    </>
  );
};

export default ChatBoxHeader;

const useStyles = makeStyles({
  iconContainer: {
    width: "35px",
    height: "35px",
  },
  editProject: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingLeft: 16,
    textOverflow: "ellipsis",
    "@media (max-width:960px)": {
      justifyContent: "center",
    },
  },
  wrapper: {
    justifyContent: " space-between",
    padding: "0 50px 0 0",
    borderBottom: `1px solid ${colors.grey}`,
    height: 55,
    "@media (max-width:960px)": {
      height: 60,
    },
  },
  editIcon: {
    cursor: "pointer",
    color: colors.textPrimary,
    fontSize: "34px !important",
    borderRadius: 5,
    border: `0.5px solid ${colors.lightGrey}`,
    padding: 6,
    width: "100%",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontStyle: "normal",
    textOverflow: "ellipsis",
    // width: "120px",
  },
  editWrapper: {
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: '1px solid #ecf0f1'
  },
  editInputWrapper: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "flex",
  },
  cancelIcon: {
    fontSize: 18,
    color: colors.btnRed,
    cursor: "pointer",
  },
  checkIcon: {
    fontSize: 18,
    color: colors.green,
    cursor: "pointer",
  },
  usernameWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width:960px)": {
      justifyContent: "center",
    },
  },
  loading: { display: "flex", alignItems: "center" },
  avatarWrapper: {
    paddingLeft: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  moreWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width:960px)": {
      display: "none",
    },
  },
  projectName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontStyle: "normal",
    textOverflow: "ellipsis",
    width: "120px",
    fontWeight: 500,
    fontSize: 10,
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: colors.textPrimary,
  },
  loadingWrapper: {
    position: "absolute",
    left: "55%",
    top: "10%",
    zIndex: 3,
  },
  innerLoading: {
    padding: 5,
    background: "white",
    display: "flex",
    borderRadius: "50%",
    boxShadow: "0px 1px 17px #cac6c6",
  },
});
