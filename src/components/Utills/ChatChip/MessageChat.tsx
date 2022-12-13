import { useRef, useState } from "react";
// material & react-icon
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { IoReturnUpForward } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPinnedMessages, goToMessage, openViewQuestioniarDrawer,
  pinMessage, setSelectedQuestioniar
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";

// components
import { CBox } from "components/material-ui";
import { UserInterface } from "constants/interfaces/user.interface";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import { SAVE_MESSAGES } from "../../../config/chat.config";
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface";
import NameAvatar from "../Others/NameAvatar";
import ChatMessageMenu from "./ChatMessageMenu";
import FilePreviewer from "./FilePreviewer";
import SeenBy from "./SeenBy";
import moment from "moment-timezone";

interface MessageChatProps {
  message: ChatMessageInterface;
  enable: boolean;
}

const MessageChat: React.FC<MessageChatProps> = (props) => {
  const { message } = props;
  const {
    replyOf,
    type,
    voiceUrl,
    message: messageText,
    files,
    sender,
    title,
    readBy,
    pinnedBy,
    createdAt
  } = message;

  const { loadingMessages } = useSelector((root: RootState) => root.chat);
  const classes = useStyles();
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );

  let time = moment.utc(moment(createdAt)).fromNow()
  let myMessag = sender?.id === user.id
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const bodyRef = useRef(null);
  const toggleView = () => {
    setView(!view);
  };

const borderStyle = `1px solid ${colors.senderBoxBorder}`
const bgColor = myMessag? colors.senderBox: colors.receiverBoxBg

  const getStyles = () => {
    return {
      background: message.type === "questioniar" ? colors.questioniarPrimary: bgColor,
      boxShadow: "none",
      border: myMessag? borderStyle:`1px solid ${colors.receiverBoxBorder}`
    };
  };

  function getNameStyle(){
    return{
      color: myMessag? colors.senderBoxTitle: colors.receiverBoxTitle
    }
  }

  const handlePinClick = () => {
    let myMsgs = JSON.parse(JSON.stringify(messages));
    const index = messages?.findIndex(
      (msg: ChatMessageInterface) => String(msg.id) === String(message.id));

    const myMsg = messages[index];
    if (myMsg?.pinnedBy?.includes(user.id)) {
      // un-pin message
      myMsg.pinnedBy = myMsg?.pinnedBy?.filter(
        (elem: any) => String(elem) !== String(user.id));
    } else {
      // pin message
      myMsg?.pinnedBy?.push(user.id);
    }

    myMsgs[index] = myMsg;

    const payload = {
      other: message.id,
      success: (res: any) => {
        dispatch({
          type: SAVE_MESSAGES,
          payload: JSON.parse(JSON.stringify(myMsgs)),
        });
        dispatch(getPinnedMessages({ other: selectedChat }));
      },
    };
    dispatch(pinMessage(payload));
  };

  // const handleFileClick = (file: any) => {
  //   window.open(file.url, '_blank')
  // }

  const handleAllFilesDownload = () => {
    files?.map?.((file: any) => {
      window.open(file.url);
    });
  };

  const handleReplyClick = () => {
    dispatch(goToMessage(replyOf?.id));
  };

  const handleClick = () => {
    if (type === "questioniar") {
      dispatch(setSelectedQuestioniar(message.id));
      dispatch(openViewQuestioniarDrawer());
    }
  };

  // const getQuickBtnStyles = () => {
  //   return {
  //     background: myMessag ? colors.white : colors.grey,
  //     border: myMessag ? colors.grey : colors.white,
  //   };
  // };

  // const handleSend = (text: string) => {
  //   if (text) {
  //     const formdata = new FormData();

  //     formdata.append("message", text);
  //     formdata.append("chat", selectedChat);

  //     const myId = String(new Date().valueOf());
  //     const newMessage = {
  //       sender: user,
  //       time: "a few seconds ago",
  //       message: text,
  //       seen: true,
  //       type: "message",
  //       myMessage: String(user.id),
  //       // id: myId,
  //       _id: myId,
  //     };
  //     const payload: any = {
  //       body: formdata,
  //       success: (res: any) => {
  //         dispatch(
  //           updateMessageById({
  //             other: {
  //               oldMessageId: myId,
  //               newMessage: res.data,
  //             },
  //           })
  //         );
  //         dispatch(
  //           getRoomMedia({
  //             other: selectedChat,
  //           })
  //         );
  //       },
  //     };

  //     dispatch(sendReplyMessage(payload));

  //     dispatch({
  //       type: PUSH_MESSAGE,
  //       payload: newMessage,
  //     });
  //   }
  //   // bodyRef && bodyRef?.current?.scrollToEnd()
  // }

  // const senderUserId = (sender?.id === user.id)
  return (
     <>
      <Grid
        container
        justifyContent={myMessag ? "flex-end" : "flex-start"}
        className={classes.outerWrapper}
        id={message.id}
      >
        {message.id && loadingMessages?.includes?.(message.id) && (
          <ClipLoader color={colors.textGrey} size={6} />
        )}
        <Grid item xs={6} onClick={handleClick}>
          <div className={`${classes.innerWrapper}`} style={getStyles()}>
            {type === "questioniar" && (
              <div className={classes.questioniarWrapper}>
                <Typography className={classes.questionText}>
                  {title}
                </Typography>
                <img className="w-16" src={assets.blueDocument} alt="" />
              </div>
            )}
            {replyOf&& (
              <Grid
                onClick={handleReplyClick}
                container
                className={`${classes.replyWrapper} ${!myMessag&& classes.receiverReply}`}
              >
                {message.type === "message" && <><CBox>
                          <Typography
                            className={classes.replyToTitle}
                          >{`${replyOf?.sender?.firstName} ${replyOf?.sender?.surName}`}</Typography>
                        </CBox>
                <span  className={classes.replyToMsg}>{replyOf?.message}</span>
                  </>}
                {replyOf.type === "questioniar" && <span>Questioniar</span>}
                {replyOf.type === "voice" && <span>Voice</span>}
              </Grid>
            )}
            <Grid container ref={bodyRef}>
              <Grid item xs={3} md={1}>
                <NameAvatar
                  firstName={sender?.firstName || ""}
                  surName={sender?.surName}
                  url={sender?.profilePic}
                />
              </Grid>
              <Grid item xs={9} md={11} className={classes.sideName}>
                <div className={classes.titleWrapper}>
                  <div className={classes.usernameWrapper}>
                    <div className={classes.nameWrapper}>
                      <Typography className={classes.username} style={getNameStyle()}>
                        {sender?.firstName} {sender?.surName}
                      </Typography>
                      <Typography className={classes.time}>{time}</Typography>
                    </div>
                    {/* {!isTabletOrMobile && type !== "questioniar" && (
                      <div className={classes.quickReplyWrapper}>
                        {sender?.id === user.id ? (
                          <></>
                        ) : (
                          <>
                            { (
                              <>
                                <button
                                  className={classes.quickBtn}
                                  style={getQuickBtnStyles()}
                                  onClick={() => handleSend("OK")}
                                >
                                  OK
                                </button>
                                <button
                                  className={classes.quickBtn}
                                  style={getQuickBtnStyles()}
                                  onClick={() => handleSend("?")}
                                >
                                  ?
                                </button>
                                <button
                                  className={classes.quickBtn}
                                  style={getQuickBtnStyles()}
                                  onClick={() => handleSend("Done")}
                                >
                                  Done
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )} */}
                  </div>
                  <div className={classes.projectWrapper}>
                    <Typography className={classes.company}>
                      {sender?.companyName}
                    </Typography>
                  </div>
                </div>

                <div className={classes.messageBody}>
                  {type === "message" && (
                    <Typography className={classes.messageText}>
                      {messageText}
                    </Typography>
                  )}
                  {type === "voice" && (
                    <audio style={{ maxWidth: "100%" }} controls>
                      <source src={voiceUrl} />
                    </audio>
                  )}
                </div>
              </Grid>
              <Grid item xs={1}></Grid>

              {files && files.length > 0 && (
                <Grid item xs={10} className={classes.filesWrapper}>
                  <Grid container>
                    {files?.map?.((file: any, i: any) => {
                      return (
                        <Grid
                          key={i}
                          item
                          xs={2}
                          className={` ${classes.imageWrapper}`}
                        >
                          <FilePreviewer file={file} showControls={false} />
                        </Grid>
                      );
                    })}

                    <Grid
                      item
                      xs={4}
                      style={{
                        paddingTop: 17,
                        gap: 4,
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                      className={classes.imageWrapper}
                    >
                      <div
                        className={classes.fileIconWrapper}
                        onClick={handleAllFilesDownload}
                      >
                        <BsDownload className={classes.fileIcon} />
                      </div>
                      <div
                        className={classes.fileIconWrapper}
                        onClick={toggleView}
                      >
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
              {readBy?.map((readyByUser: UserInterface, i: any) => {
                if (readyByUser.id === user.id  || sender.id !== user.id){
                  return <></>
                }
                return (
                  <SeenBy key={i} url={readyByUser?.profilePic} firstName={readyByUser.firstName} surName={readyByUser.surName} />
                )
              })}
            </div>
            {readBy && readBy?.length > 1 && sender.id === user.id &&(
              <Typography className={classes.visibility}>{'seen' }</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={1} className={classes.iconsWrapper}>
          {message.type !== "questioniar" && (
            <>
              {pinnedBy?.includes(user?.id) ? (
                <AiFillPushpin
                  className={classes.pinIcon}
                  onClick={handlePinClick}
                />
              ) : (
                <AiOutlinePushpin
                  className={classes.pinIcon}
                  onClick={handlePinClick}
                />
              )}
            </>
          )}
          { <ChatMessageMenu message={message} /> }
        </Grid>
      </Grid>
    </>
);

}
 
export default MessageChat;

const useStyles = makeStyles({
  replyToTitle: {
    color: `${colors.receiverBoxTitle}`,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  replyToMsg:{
    fontFamily:'Inter',
    fontWeight: 500,
    fontSize: 14
  },
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
  receiverReply:{
    // background: `${colors.senderBox} !important` ,
    borderLeft: `6px solid ${colors.senderBoxTitle} !important`,
    '& .MuiTypography-root':{
      color: `${colors.senderBoxTitle}`,
      fontSize: 14,
    }
  },
  replyWrapper: {
    '& .MuiTypography-root':{
      fontFamily: 'Inter',
      fontSize: 14,
    },
    color: colors.textGrey,
    cursor: "pointer",
    borderLeft: `6px solid ${colors.receiverBoxTitle}`,

    padding: 12,
    // background: `${colors.receiverBoxBg}` ,
    background: "#f0f0f0" ,
    marginBottom: 10,
    "& span": {
      width: "100%",
      wordBreak: "break-all",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
      
    },
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
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: 800,
    color: '#F1B740',
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
