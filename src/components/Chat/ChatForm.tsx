import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  AttachFile,
  Close,
  EmojiEmotionsOutlined,
  Image,
  Mic,
} from "@material-ui/icons";
import Button from "@mui/material/Button";
import Picker from "emoji-picker-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IoDocument } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../App";
import assets from "../../assets/assets";
import colors from "../../assets/colors";
import { io } from "socket.io-client";
import {
  PUSH_MESSAGE,
  SET_REPLY_TO_ID,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from "../../config/chat.config";
import {
  getRoomMedia,
  getAllChats,
  openQuestioniarDrawer,
  sendReplyMessage,
  setMessagesRead,
  updateMessageById,
} from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import { getFileType } from "../../utills/file";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";
import VoiceRecorder from "./VoiceRecorder";
import { socket } from "services/socket.services";

interface ChatFormInterface {
  handleSendClick: (a: string) => string;
  enable: boolean;
}

const ChatForm: React.FC<ChatFormInterface> = (props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { enable } = props;
  const classes = useStyles();
  const {
    chat: chats,
    selectedChat,
    replyToId,
    messages,
  } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any>();
  const [showRecorder, setShowRecorder] = useState<boolean>(false);
  const [filesPreview, setFilesPreview] = useState<any>([]);

  useEffect(() => {
    setFiles(null);
    setFilesPreview(null);
    setText("");
  }, [selectedChat]);

  const onEmojiClick = (e: any, emojiObj: any) => {
    if (!enable) {
      return;
    }
    setText(`${text}${emojiObj.emoji}`);

    toggleEmoji();
  };

  const toggleEmoji = () => {
    if (!enable) {
      return;
    }
    setOpen(!open);
  };

  const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
    if (!enable) {
      return;
    }
    setText(e.currentTarget.value);
  };

  const handleKeyDown = (e: any) => {
    if (!enable) {
      return;
    }
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCloseReply = () => {
    if (!enable) {
      return;
    }
    dispatch({
      type: SET_REPLY_TO_ID,
      payload: null,
    });
  };

  const handleSend = () => {
    if (!enable) {
      return;
    }
    if (text) {
      let payload: any = {};
      payload.message = text;
      payload.chat = selectedChat;
      payload.type = "message";

      if (files && Object.values(files)?.length > 0) {
        for (const key of Object.keys(files)) {
          payload.products = files[key];
        }
      }

      if (replyToId) {
        payload.messageId = replyToId;
      }

      let replyMessage = null;
      if (replyToId) {
        replyMessage = messages?.find(
          (msg: any) => String(msg._id) == String(replyToId)
        );
        if (replyMessage) {
          replyMessage.id = replyMessage._id;
        }
      }

      payload.files =
        files && Object.keys(files)?.length > 0 ? filesPreview : [];

      const myId = new Date().valueOf();
      payload.myId = myId;
      const newMessage = {
        sender: user,
        time: "1 seconds ago",
        message: text,
        seen: true,
        type: "message",
        myMessage: true,
        id: myId,
        replyOf: replyMessage || replyToId,
        files: files && Object.keys(files)?.length > 0 ? filesPreview : [],
      };

      socket.emit(SEND_MESSAGE, payload);
  
      dispatch({
        type: PUSH_MESSAGE,
        payload: newMessage,
      });
      dispatch(setMessagesRead({ other: selectedChat }));
      //handleCloseReply();
      //dispatch(setMessagesRead({ other: data.chat }));
      

      setFiles(null);
      setFilesPreview(null);
      setText("");
    }
  };

  socket.on(RECEIVE_MESSAGE, (payload: any) => {
    const data = payload.data;

    if (String(data.chat) == String(selectedChat)) {
      
      dispatch(
        updateMessageById({
          other: {
            oldMessageId: payload.myId,
            newMessage: data.message,
          },
        })
      );

      dispatch(
        getRoomMedia({
          other: data.chat,
        })
      );
    } else {
        dispatch(getAllChats());
      //  playChatSound(data);
    }
  });

  const handleFileChange = (e: any) => {
    if (!enable) {
      return;
    }
    const newFiles = e.target.files;
    let oldFiles = files;
    if (!oldFiles) {
      oldFiles = {};
    }
    setFiles({ ...newFiles });
    const previews = Object.values(newFiles).map((file: any) => {
      return {
        fileType: getFileType(file),
        fileName: file.name,
        url: URL.createObjectURL(file),
      };
    });
    setFilesPreview([...previews]);
    setText(" ");
  };

  const handleFileClick = (id: number) => {
    if (!enable) {
      return;
    }
    setFiles((file: any) => {
      delete file[id];
      return file;
    });
    setFilesPreview((file: any) => {
      return [...file.slice(0, id), ...file.slice(id + 1, file.length)];
    });
  };

  const handleOpenQuestioniar = () => {
    if (!enable) {
      return;
    }
    dispatch(openQuestioniarDrawer());
  };

  const handleCancelVoice = () => {
    setShowRecorder(false);
  };

  const handleSendVoice = (blob: any) => {
    if (blob) {
      setShowRecorder(false);
      const formdata = new FormData();
      formdata.append("type", "voice");
      formdata.append("chat", selectedChat);
      formdata.append("products", blob.blob, `${new Date().valueOf()}.mp3`);

      let replyMessage = null;
      const myId = new Date().valueOf();

      dispatch({
        type: PUSH_MESSAGE,
        payload: {
          type: "voice",
          username: user?.firstName + " " + user.surName,
          sender: user,
          time: "1 seconds ago",
          seen: true,
          myMessage: true,
          replyOf: replyMessage,
          voiceUrl: blob.url,
          id: myId,
        },
      });
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
        },
      };
      dispatch(sendReplyMessage(payload));

      handleCloseReply();
      setFiles(null);
      setFilesPreview(null);
      // props.handleSendClick(text)
      setText("");
    }
  };

  if (!selectedChat) {
    return null;
  }

  return (
    <Grid
      className={classes.wrapper}
      container
      style={{ opacity: enable ? 1 : 0.5 }}
    >
      {!showRecorder && (
        <Grid item xs={12} className={classes.inputWrapper}>
          {replyToId && (
            <div className={classes.replyTitle}>
              <Typography>Reply</Typography>
              <Typography
                className={classes.closeReply}
                onClick={handleCloseReply}
              >
                <Close />
              </Typography>
            </div>
          )}
          <input
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyDown}
            type="text"
            disabled={!selectedChat || !enable}
            placeholder={
              selectedChat
                ? enable
                  ? "Type a message"
                  : "You were removed from this chat"
                : "Select a chat room"
            }
            style={
              replyToId || showRecorder
                ? {
                    width: "75%",
                  }
                : {
                    width: "90%",
                  }
            }
            className={`messageInput black-input ${classes.messageInput}`}
          />
          <div className={classes.sendWrapper}>
            <img
              src={assets.sendIcon}
              onClick={handleSend}
              className={classes.sendIcon}
            />
            {/* <Button variant="contained" onClick={handleSend} endIcon={<assets.SendIcon />} /> */}
          </div>
        </Grid>
      )}
      {showRecorder && (
        <VoiceRecorder
          handleSubmit={handleSendVoice}
          onCancel={handleCancelVoice}
        />
      )}

      {filesPreview && filesPreview.length > 0 && (
        <Grid item xs={12} className={classes.filePreviewer}>
          {filesPreview &&
            filesPreview.map((preview: any, index: number) => {
              return (
                <FilePreviewer
                  file={preview}
                  id={index}
                  handleClick={handleFileClick}
                  showControls={true}
                />
              );
            })}
        </Grid>
      )}
      {selectedChat && (
        <Grid item xs={12} className={classes.btnWrapper}>
          <img
            src={assets.emoji}
            onClick={toggleEmoji}
            className={"width-16 pointer"}
          />

          <label className={classes.customFileUpload}>
            <img src={assets.clip} className="width-16 pointer" />
            <input
              disabled={!enable}
              type="file"
              onChange={handleFileChange}
              multiple={true}
            />
          </label>

          <img
            src={assets.mic}
            onClick={() => {
              if (!enable) return;
              setShowRecorder(!showRecorder);
            }}
            className={`width-16 pointer`}
          />

          {/* <label className="custom-file-upload">
            <img src={assets.camera} className={`width-16 pointer`} />
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
              multiple={true}
              disabled={!enable}
            />
          </label> */}
          <Typography className={classes.gapLine}>|</Typography>
          <img
            src={assets.primaryNudgeIcon}
            className="pointer"
            style={{ height: 18 }}
          />
          <Typography className={classes.gapLine}>|</Typography>
          <img
            src={assets.blueDocument}
            onClick={handleOpenQuestioniar}
            className={`width-16 pointer`}
          />

          {open && (
            <OutsideClickHandler onOutsideClick={toggleEmoji}>
              <div className={classes.emojisWrapper}>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            </OutsideClickHandler>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default ChatForm;

const useStyles = makeStyles({
  customFileUpload: {
    paddingTop: "6px",
  },
  replyTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    background: colors.grey,
    padding: 6,
    paddingRight: 10,
    borderRadius: 10,
    color: colors.textGrey,
  },
  gapLine: {
    color: colors.grey,
  },
  closeReply: {
    fontSize: 12,
    cursor: "pointer",
    "&:hover": {
      color: colors.primaryRed,
    },
  },
  wrapper: {
    // height: 100,
    borderTop: `2px solid ${colors.lightGrey}`,
    paddingTop: 10,
    position: "relative",
  },
  preview: {
    height: 50,
    width: 50,
    padding: 10,
  },
  inputWrapper: {
    height: 50,
    paddingLeft: 15,
    display: "flex",
    alignItems: "center",
    borderBottom: `2px solid ${colors.lightGrey}`,
  },
  sendWrapper: {
    fontSize: 18,
    textAlign: "center",
    cursor: "pointer",
  },
  sendIcon: {
    borderRadius: 5,
    background: colors.primary,
    padding: 10,
    color: colors.white,
  },
  messageInput: {
    height: 45,
    border: "none",
    paddingLeft: 10,
    "&:focus": {
      border: "none",
    },
    "&:hover": {
      border: "none",
    },
    "&:active": {
      border: "none",
    },
    "&:focus-visible": {
      border: "none",
      outline: "none",
    },
  },
  btnWrapper: {
    display: "flex",
    paddingLeft: 20,
    paddingTop: 10,
    alignItems: "center",
    gap: 28,
    "@media (max-width:960px)": {
      gap: 12,
    },
  },
  btnIcon: {
    color: colors.textPrimary,
    fontSize: 18,
    cursor: "pointer",
  },
  emojisWrapper: {
    position: "absolute",
    top: -260,
    left: 0,
  },
  filePreviewer: {
    display: "flex",
    gap: 15,
    flexWrap: "wrap",
    background: "#dadbdb",
    padding: "8px 15px",
  },
});
