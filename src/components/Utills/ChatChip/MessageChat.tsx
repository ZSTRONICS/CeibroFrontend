import { Grid, makeStyles, Typography } from "@material-ui/core";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import colors from "../../../assets/colors";
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface";
import NameAvatar from "../Others/NameAvatar";
import { IoReturnUpForward } from "react-icons/io5";
import FileView from "./FileView";
import { useState } from "react";
import ChatMessageMenu from "./ChatMessageMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  getPinnedMessages,
  openViewQuestioniarDrawer,
  pinMessage,
  setSelectedQuestioniar,
} from "../../../redux/action/chat.action";
import FilePreviewer from "./FilePreviewer";
import { SAVE_MESSAGES } from "../../../config/chat.config";
import $ from "jquery";
import assets from "../../../assets/assets";
import { ClipLoader } from "react-spinners";

interface MessageChatProps {
  message: ChatMessageInterface;
}

const MessageChat: React.FC<MessageChatProps> = (props) => {
  const { message } = props;
  const {
    replyOf,
    _id,
    type,
    voiceUrl,
    username,
    time,
    companyName,
    message: messageText,
    seen,
    myMessage,
    files,
  } = message;
  const { loadingMessages } = useSelector((root: RootState) => root.chat);
  const classes = useStyles();
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );
  const dispatch = useDispatch();
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  const getStyles = () => {
    return {
      background:
        message.type === "questioniar"
          ? colors.questioniarPrimary
          : myMessage
          ? colors.grey
          : colors.white,
      boxShadow: "none",
    };
  };

  const handlePinClick = () => {
    let myMsgs = JSON.parse(JSON.stringify(messages));
    const index = messages?.findIndex(
      (msg: ChatMessageInterface) => String(msg._id) == String(message._id)
    );
    const myMsg = messages[index];
    if (myMsg?.pinnedBy?.includes?.(user.id)) {
      myMsg.pinnedBy = myMsg?.pinnedBy?.filter?.(
        (elem: any) => String(elem) !== String(user.id)
      );
    } else {
      myMsg?.pinnedBy?.push?.(user.id);
    }

    myMsgs[index] = myMsg;

    const payload = {
      other: message._id,
      success: () => {
        dispatch({
          type: SAVE_MESSAGES,
          payload: JSON.parse(JSON.stringify(myMsgs)),
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

  const handleReplyClick = () => {
    if (replyOf?.id) {
      const elem = document.getElementById(replyOf.id);
      if (elem) {
        elem?.scrollIntoView();
      }
    }
  };

  const handleClick = () => {
    if (type === "questioniar") {
      dispatch(setSelectedQuestioniar(message._id));
      dispatch(openViewQuestioniarDrawer());
    }
  };

  return (
    <Grid
      container
      justifyContent={myMessage ? "flex-end" : "flex-start"}
      className={classes.outerWrapper}
      id={_id}
    >
      {message.id && loadingMessages?.includes?.(message.id) && (
        <ClipLoader color={colors.textGrey} size={6} />
      )}
      <Grid item xs={9} onClick={handleClick}>
        <div className={classes.innerWrapper} style={getStyles()}>
          {type === "questioniar" && (
            <div className={classes.questioniarWrapper}>
              <Typography className={classes.questionText}>
                Questioniar
              </Typography>
              <img src={assets.blueDocument} />
            </div>
          )}
          {replyOf && (
            <Grid
              onClick={handleReplyClick}
              container
              className={classes.replyWrapper}
            >
              {message.type === "message" && <span>{replyOf?.message}</span>}
              {replyOf.type === "questioniar" && <span>Questioniar</span>}
              {replyOf.type === "voice" && <span>Voice</span>}
            </Grid>
          )}
          <Grid container>
            <Grid item xs={3} md={1}>
              <NameAvatar firstName={username} />
            </Grid>
            <Grid item xs={11}>
              <div className={classes.titleWrapper}>
                <div className={classes.usernameWrapper}>
                  <Typography className={classes.username}>
                    {username}
                  </Typography>

                  <Typography className={classes.time}>{time}</Typography>
                </div>
                <div className={classes.projectWrapper}>
                  <Typography className={classes.company}>
                    Company . {companyName}
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
                  {files?.map?.((file: any) => {
                    return (
                      <Grid item xs={2} className={` ${classes.imageWrapper}`}>
                        <FilePreviewer file={file} showControls={false} />
                      </Grid>
                    );
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
                      display: "flex",
                      alignItems: "flex-start",
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
          <Typography className={classes.visibility}>
            {/* {seen ? "Seen" : "Unseen"} */}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={1} className={classes.iconsWrapper}>
        {message?.pinnedBy?.includes?.(user?.id) ? (
          <AiFillPushpin className={classes.pinIcon} onClick={handlePinClick} />
        ) : (
          <AiOutlinePushpin
            className={classes.pinIcon}
            onClick={handlePinClick}
          />
        )}
        <ChatMessageMenu message={message} />
      </Grid>
    </Grid>
  );
};

export default MessageChat;

const useStyles = makeStyles({
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
    padding: 8,
    background: colors.white,
    boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
    borderRadius: 4,
    position: "relative",
    color: colors.textPrimary,
  },
  titleWrapper: {},
  usernameWrapper: {
    display: "flex",
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
    marginTop: 20,
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
});
