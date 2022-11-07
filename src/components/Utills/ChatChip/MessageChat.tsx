import { Grid, makeStyles, Typography } from "@material-ui/core";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import colors from "../../../assets/colors";
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface";
import NameAvatar from "../Others/NameAvatar";
import { IoReturnUpForward } from "react-icons/io5";
import FileView from "./FileView";
import { useRef, useState } from "react";
import ChatMessageMenu from "./ChatMessageMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  getPinnedMessages,
  openViewQuestioniarDrawer,
  pinMessage,
  setSelectedQuestioniar,
  updateMessageById,
  getRoomMedia,
  sendReplyMessage,
  goToMessage,
} from "../../../redux/action/chat.action";
import FilePreviewer from "./FilePreviewer";
import { SAVE_MESSAGES, PUSH_MESSAGE } from "../../../config/chat.config";
import $ from "jquery";
import assets from "../../../assets/assets";
import { ClipLoader } from "react-spinners";
import { classNames } from "react-select/src/utils";
import { UserInterface } from "constants/interfaces/user.interface";
import SeenBy from "./SeenBy";
import { useMediaQuery } from "react-responsive";

const MessageChat = () => {
  const classes = useStyles();

  const { loadingMessages } = useSelector((root: RootState) => root.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages, selectedChat, chat } = useSelector(
    (state: RootState) => state.chat
  );

 const { type, myMessage,  files,} = messages;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const bodyRef = useRef(null);

  const toggleView = () => {
    setView(!view);
  };

  const handlePinClick = (messageId:string) => {
   
    const checkPinedMesg:any = messages.filter((item:any) =>{
      if(item._id === messageId){
        return item
      }
    } )

    let msgPinnedBy = checkPinedMesg?.pinnedBy

    if (msgPinnedBy?.includes?.(user.id)) {
      // my message pinned
      checkPinedMesg.pinnedBy = checkPinedMesg?.pinnedBy?.filter?.((elem: any) => String(elem) !== String(user.id));
    } else {
      // other message pinned=
      checkPinedMesg?.pinnedBy?.push?.(user.id);
    }

    const payload = {
      other: messageId,
      success: () => {
        dispatch({
          type: SAVE_MESSAGES,
          payload: JSON.parse(JSON.stringify(checkPinedMesg)),
        });
        dispatch(getPinnedMessages({ other: selectedChat }));
      },
    };
    dispatch(pinMessage(payload));
  };

  const handleFileClick = (file: any) => {
    window.open(file.url, "_blank");
  };

  const handleAllFilesDownload = () => {
    files?.map?.((file: any) => {
      window.open(file.url);
    });
  };

  const handleReplyClick = (id:any) => {
    dispatch(goToMessage(id));
  };

  const handleClick = () => {
    if (type === "questioniar") {
      dispatch(setSelectedQuestioniar(messages._id));
      dispatch(openViewQuestioniarDrawer());
    }
  };

  const getQuickBtnStyles = () => {
    return {
      background: myMessage ? colors.white : colors.grey,
      border: myMessage ? colors.grey : colors.white,
    };
  };

  const handleSend = (text: string) => {
    if (text) {
      const formdata = new FormData();

      formdata.append("message", text);
      formdata.append("chat", selectedChat);

      const myId = new Date().valueOf();
      const newMessage = {
        sender: user,
        time: "1 seconds ago",
        message: text,
        seen: true,
        type: "message",
        myMessage: true,
        id: myId,
      };
      const payload: any = {
        body: formdata,
        success: (res: any) => {
          dispatch(
            updateMessageById({
              other: {
                oldMessageId: myId,
                newMessage: res.data,
              },
            })
          );
          dispatch(
            getRoomMedia({
              other: selectedChat,
            })
          );
        },
      };

      dispatch(sendReplyMessage(payload));

      dispatch({
        type: PUSH_MESSAGE,
        payload: newMessage,
      });
    }
    // bodyRef && bodyRef?.current?.scrollToEnd()
  };

  return (
    <>
      {messages &&
        messages.map((item:any) => {
          const {
            replyOf,_id, type, voiceUrl, time, message, seen, myMessage, files, sender, title,readBy,pinnedBy
          } = item;
          return <>
          <Grid
          key={_id+time}
      container
      justifyContent={myMessage ? 'flex-end' : 'flex-start'}
      className={classes.outerWrapper}
      id={_id}
    >
      {message.id && loadingMessages?.includes?.(message.id) && (
        <ClipLoader color={colors.textGrey} size={6} />
      )}
      <Grid item xs={6} onClick={handleClick}>
        <div className={classes.innerWrapper} style={{background: `${myMessage?colors.lightGrey:colors.white}`,boxShadow:'inset 1px -1px 1px rgb(0 0 0 / 10%)'}}>
          {type === 'questioniar' && (
            <div className={classes.questioniarWrapper}>
              <Typography className={classes.questionText}>{title}</Typography>
              <img className="w-16" src={assets.blueDocument} />
            </div>
          )}
          {replyOf && (
            <Grid onClick={()=>handleReplyClick(replyOf?.id)} container className={classes.replyWrapper}>
              {replyOf.type === 'message' && <span>{replyOf?.message}</span>}
              {replyOf.type === 'questioniar' && <span>Questioniar</span>}
              {replyOf.type === 'voice' && <span>Voice</span>}
            </Grid>
          )}
          <Grid container ref={bodyRef}>
            <Grid item xs={3} md={1} >
              <NameAvatar
                firstName={sender?.firstName || sender?.user?.firstName || ''}
                surName={sender?.surName || sender?.user?.surName || ''}
                url={sender?.profilePic ||sender?.user?.profilePic || '' }
              />
            </Grid>
            <Grid item xs={9} md={11} className={classes.sideName}>
              <div className={classes.titleWrapper}>
                <div className={classes.usernameWrapper}>
                  <div className={classes.nameWrapper}>
                    <Typography className={classes.username}>
                      {sender?.user?.firstName || sender?.firstName || ''} {sender?.user?.surName || sender?.surName || ''}
                    </Typography>
                    <Typography className={classes.time}>{time}</Typography>
                  </div>
                  {!isTabletOrMobile && type !== 'questioniar' && (
                    <div className={classes.quickReplyWrapper}>
                     {sender?.id === user.id ? 
                     <></>
                    : <>
                      <button
                        className={classes.quickBtn}
                        style={getQuickBtnStyles()}
                        onClick={() => handleSend('OK')}
                      >
                        OK
                      </button>
                      <button
                        className={classes.quickBtn}
                        style={getQuickBtnStyles()}
                        onClick={() => handleSend('?')}
                      >
                        ?
                      </button>
                      <button
                        className={classes.quickBtn}
                        style={getQuickBtnStyles()}
                        onClick={() => handleSend('Done')}
                      >
                        Done
                      </button>
                      </>
                    }
                    </div>
                  )}
                </div>
                <div className={classes.projectWrapper}>
                  <Typography className={classes.company}>{sender?.companyName}</Typography>
                </div>
              </div>

              <div className={classes.messageBody}>
                {type === 'message'&& (
                  <Typography className={classes.messageText}>{message}</Typography>
                )}
                {type === 'voice' && (
                  <audio style={{ maxWidth: '100%' }} controls>
                    <source src={voiceUrl} />
                  </audio>
                )}
              </div>
            </Grid>
            <Grid item xs={1}></Grid>

            {files && files.length > 0 && (
              <Grid item xs={10} className={classes.filesWrapper}>
                <Grid container>
                  {files?.map?.((file: any,i:any) => {
                    return (
                      <Grid key={i+time} item xs={2} className={` ${classes.imageWrapper}`}>
                        <FilePreviewer file={file} showControls={false} />
                      </Grid>
                    )
                  })}
                  {/* <Grid item xs={2} className={classes.imageWrapper}>
                                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                        </Grid>
                                        <Grid item xs={2} className={classes.imageWrapper}>
                                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                        </Grid> */}

                  <Grid
                    item
                    xs={4}
                    style={{
                      paddingTop: 17,
                      gap: 4,
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                    className={classes.imageWrapper}
                  >
                    <div className={classes.fileIconWrapper} onClick={handleAllFilesDownload}>
                      <BsDownload className={classes.fileIcon} />
                    </div>
                    <div className={classes.fileIconWrapper} onClick={toggleView}>
                      <IoReturnUpForward className={classes.fileIcon} />
                    </div>
                  </Grid>

                  {/* {view && <FileView handleClose={toggleView}/>} */}
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
        <div className={classes.seenWrapper}>
          <div className={classes.seenByWrapper}>
            {readBy?.map((user: UserInterface,i:any) => {
              return (
                <SeenBy key={i+time} url={user?.profilePic} firstName={user.firstName} surName={user.surName} />
              )
            })}
          </div>
          {readBy && readBy?.length > 0 && (
            <Typography className={classes.visibility}>{seen ? 'Seen' : 'Unseen'}</Typography>
          )}
        </div>
      </Grid>
      <Grid item xs={1} className={classes.iconsWrapper}>
        {message.type !== 'questioniar' && (
          <>
            {pinnedBy?.includes?.(user?.id) ? (
              <AiFillPushpin className={classes.pinIcon} onClick={()=>handlePinClick(_id)} />
            ) : (
              <AiOutlinePushpin className={classes.pinIcon} onClick={()=>handlePinClick(_id)}  />
            )}
          </>
        )}
        <ChatMessageMenu message={message} />
      </Grid>
    </Grid></>;
        })}
    </>
  );
};

export default MessageChat;

const useStyles = makeStyles({
  sideName: {
    paddingLeft: 15,
  },
  outerWrapper: {
    padding: 15,
  },
  questioniarWrapper: {
    position: "absolute",
    right: 0,
    display: "flex",
    gap: 5,
    paddingRight: 10,
    paddingTop: 10,
    cursor: "pointer",
    alignItems: "center",
  },
  questionText: {
    fontWeight: 500,
    fontSize: 14,
  },
  replyWrapper: {
    color: colors.textGrey,
    cursor: "pointer",
    borderLeft: `2px solid ${colors.textPrimary}`,
    padding: 12,
    background: "rgba(0, 0, 0, 0.05)",
    marginBottom: 10,
  },
  innerWrapper: {
    border: `1px solid ${colors.grey}`,
    padding: "8px 8px 4px",
    background: colors.white,
    boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
    borderRadius: 4,
    position: "relative",
    color: colors.textPrimary,
  },
  titleWrapper: {},
  usernameWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  projectWrapper: {},
  messageBody: {
    wordBreak: "break-word",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  time: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingLeft: 10,
  },
  company: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  messageText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    padding: "10px 0px 0px 3px",
  },
  iconsWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  pinIcon: {
    color: colors.textPrimary,
    fontSize: 20,
    cursor: "pointer",
  },
  moreIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: 20,
  },
  seenWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  visibility: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  filesWrapper: {
    paddingLeft: 10,
    display: "flex",
    gap: 10,
    margin: "10px 0",
    border: "1px solid #dfdede",
    padding: 10,
  },
  imageWrapper: {
    padding: 5,
  },
  image: {
    width: "100%",
    borderRadius: 4,
  },
  fileIcon: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  fileIconWrapper: {
    border: `1px solid ${colors.textPrimary}`,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
  },
  quickReplyWrapper: {
    display: "flex",
    gap: 10,
  },
  nameWrapper: {
    display: "flex",
    alignItems: "flex-end",
  },
  quickBtn: {
    background: colors.white,
    color: colors.primary,
    fontSize: 12,
    fontWeight: 500,
    border: `1px solid ${colors.grey}`,
    boxSizing: "border-box",
    borderRadius: 4,
    cursor: "pointer",
    padding: "4px 8px",
  },
  seenByWrapper: {
    marginRight: 10,
    display: "flex",
    gap: 10,
    marginTop: 4,
  },
});
