import React, { useState } from "react";
// material & react-icon
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ClipLoader } from "react-spinners";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPinnedMessages, goToMessage, openViewQuestioniarDrawer,
  pinMessage, setDownBlock, setSelectedQuestioniar
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";

// components
import { CBox } from "components/material-ui";
import { UserInterface } from "constants/interfaces/user.interface";
import moment from "moment-timezone";
import colors from "../../../assets/colors";
import { SAVE_MESSAGES } from "../../../config/chat.config";
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface";
import NameAvatar from "../Others/NameAvatar";
import ChatMessageMenu from "./ChatMessageMenu";
import SeenBy from "./SeenBy";

interface MessageChatProps {
  message: ChatMessageInterface;
  enable: boolean;
}

const MessageChat:React.FC<MessageChatProps> = React.memo((props) => {
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

  time = String(time).replace('a minute ago', '1m ago')
  time = String(time).replace('an hour ago', '1h ago')

  time = String(time).replace(' hours', 'h')
  time = String(time).replace(' days', 'd')
  time = String(time).replace(' minutes', 'm')
  time = String(time).replace(' months', 'M')
  time = String(time).replace(' years', 'Y')

  let myMessag = sender?.id === user.id
  const dispatch = useDispatch();

  const borderStyle = `1px solid ${colors.senderBoxBorder}`
  const bgColor = myMessag ? colors.senderBox : colors.receiverBoxBg

  const getStyles = () => {
    return {
      background: message.type === "questioniar" ? colors.questioniarPrimary : bgColor,
      boxShadow: "none",
      border: myMessag ? borderStyle : `1px solid ${colors.receiverBoxBorder}`,
      borderRadius: myMessag ? '12px 0px 12px 12px' : '0px 12px 12px 12px',
    };
  };

  function getNameStyle() {
    return {
      color: myMessag ? colors.senderBoxTitle : colors.receiverBoxTitle
    }
  }
  function getClass() {
    return {
      display: myMessag ? 'flex' : 'flex',
      flexDirection: myMessag ? 'column' : 'column',
      alignItems: myMessag && 'flex-end',
      marginRight: myMessag && 21,
    }
  }

  const handlePinClick = () => {
    dispatch(setDownBlock(false))
    let myMsgs = JSON.parse(JSON.stringify(messages));
    const index = messages?.findIndex(
      (msg: ChatMessageInterface) => String(msg._id) === String(message._id));

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
      other: message._id,
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
    dispatch(goToMessage(replyOf._id, messages.length));
  };

  const handleClick = () => {
    if (type === "questioniar") {
      dispatch(setSelectedQuestioniar(message._id));
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
        key={message._id}
        id={message._id} //id is must fot go-to reply message 
      >

        <Grid item xs={8} onClick={handleClick}>
          <CBox >

            <CBox display='flex' flexDirection={myMessag ? 'row-reverse' : 'row'} alignItems='center' className={classes.userInfo}>

              <NameAvatar
                firstName={sender?.firstName || ""}
                surName={sender?.surName}
                url={sender?.profilePic}
              />
              <CBox width='100%' ml={1.5} style={getClass()}>
                <Typography className={classes.username} style={getNameStyle()}>

                  {sender?.firstName} {sender?.surName}
                </Typography>
                <CBox display='flex' alignItems='center'>
                  <Typography className={classes.company}>
                    {sender?.companyName}
                  </Typography>
                  {/* <span className={classes.separator}>.</span> */}
                  {/* <Typography className={classes.company}>
                    Project manager
                  </Typography> */}
                </CBox>

              </CBox>
            </CBox>
            <CBox display='flex' justifyContent='space-between' mr={myMessag ? 4 : 0}>
              {message._id && loadingMessages?.includes?.(message._id) && (
                <ClipLoader color={colors.textGrey} size={6} />
              )}
              <CBox className={`${classes.messageBox} ${'replyMessageBg'}`} style={getStyles()}>
                {message.type !== "questioniar" && (
                  <>
                    {pinnedBy?.includes(user?.id) ? (
                      <CBox onClick={handlePinClick} style={{ cursor: 'pointer' }}>

                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.07143 15.9286L2.57143 10.4286L15.1429 2.57143L21.4286 8.85714L13.5714 21.4286L8.07143 15.9286Z" fill="#0076C8" />
                          <path d="M1 23L8.07143 15.9286M1 8.85714L15.1429 23M13.5714 1L23 10.4286M2.57143 10.4286L15.1429 2.57143M13.5714 21.4286L21.4286 8.85714" stroke="#0076C8" />
                        </svg>

                      </CBox>
                      // <AiFillPushpin
                      //   className={classes.pinIcon}
                      //   onClick={handlePinClick}
                      // />
                    ) : (
                      <CBox onClick={handlePinClick} style={{ cursor: 'pointer' }}>

                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 23L8.07143 15.9286M1 8.85714L15.1429 23M13.5714 1L23 10.4286M2.57143 10.4286L15.1429 2.57143M13.5714 21.4286L21.4286 8.85714" stroke="#0076C8" />
                        </svg>

                      </CBox>
                      // <AiOutlinePushpin
                      //   className={classes.pinIcon}
                      //   onClick={handlePinClick}
                      // />
                    )}
                  </>
                )}
                <CBox flex='1 1 0' display='flex' alignItems={replyOf ? 'flex-start' : 'flex-start'} flexDirection='column' style={{ wordBreak: 'break-word', textAlign: 'justify', width: '100%' }}>
                  {replyOf && (
                    <Grid
                      onClick={handleReplyClick}
                      container
                      className={classes.reply}
                    // className={`${classes.replyWrapper} ${!myMessag && classes.receiverReply}`}
                    >
                      <CBox>
                        {message.type === "message" && <><CBox>
                          <Typography
                            className={classes.replyToTitle}
                          >{`${replyOf?.sender?.firstName} ${replyOf?.sender?.surName}`}</Typography>
                        </CBox>
                          <Typography
                            className={`${classes.replyToMsg} ${'textOverflowY'}`}>
                            {replyOf?.message}</Typography>
                        </>}
                        {replyOf.type === "questioniar" && <span>Questioniar</span>}
                        {replyOf.type === "voice" && <span>Voice</span>}
                      </CBox>
                    </Grid>
                  )}

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
                  <CBox flex='1 1 0' textAlign='center' className={classes.pinTime}>
                    <CBox display='flex' alignItems='flex-end' height='100%'>
                      <Typography className={classes.time}>{time}</Typography>
                    </CBox>
                  </CBox>
                </CBox>

              </CBox>
              <CBox pt={1.5}>
                {<ChatMessageMenu message={message} />}
              </CBox>
            </CBox>
            <CBox display='flex' justifyContent='flex-end' width='100%' pr={8.6}>
              {readBy?.map((readyByUser: UserInterface, i: any) => {
                if (readyByUser.id === user.id || sender.id !== user.id) {
                  return <></>
                }
                return (
                  <SeenBy key={readyByUser.id} url={readyByUser?.profilePic} firstName={readyByUser.firstName} surName={readyByUser.surName} />
                )
              })}
            </CBox>

          </CBox>

        </Grid>
      </Grid>
    </>
  );

})

export default MessageChat;

const useStyles = makeStyles({
  replyToTitle: {
    color: `${colors.receiverBoxTitle}`,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  replyToMsg: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 14,
    color: '#787878'
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
  receiverReply: {
    // background: `${colors.senderBox} !important` ,
    borderLeft: `6px solid ${colors.senderBoxTitle} !important`,
    '& .MuiTypography-root': {
      color: `${colors.senderBoxTitle}`,
      fontSize: 14,
    }
  },
  replyWrapper: {
    '& .MuiTypography-root': {
      fontFamily: 'Inter',
      fontSize: 14,
    },
    color: colors.textGrey,
    cursor: "pointer",
    borderLeft: `6px solid ${colors.receiverBoxTitle}`,

    padding: 12,
    // background: `${colors.receiverBoxBg}` ,
    background: "#f0f0f0",
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
    fontSize: 16,
    fontWeight: 800,
    color: '#F1B740',
    lineHeight: '1'
  },
  time: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    // textAlign: 'right'
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
    // padding: "10px 0px 0px 3px",
  },
  iconsWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  pinIcon: {
    color: colors.textPrimary,
    fontSize: 30,
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
  separator: {
    color: '#000000',
    margin: '0px 6px'

  },
  userInfo: {
    '& .MuiAvatar-rounded': {
      borderRadius: '1000px !important',
      height: 35,
      width: 35,

    }
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    border: '1px solid rgba(0, 118, 200, 0.48)',

    padding: '10px 10px 6px 10px',
    marginBottom: 7,
    marginLeft: 42,
    gap: 3,
  },
  pinTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%'
  },
  reply: {
    backgroundColor: '#f5f7f8',
    borderLeft: '6px solid #0076C8',
    borderRadius: 5,
    padding: 11,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 8,
    '&:hover': {
      cursor: 'pointer'
    }
  }
});
