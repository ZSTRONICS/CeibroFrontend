import { Grid, makeStyles, Typography } from "@material-ui/core"
import { AttachFile, Close, EmojiEmotionsOutlined, Image, Mic, SendOutlined } from "@material-ui/icons"
import colors from "../../assets/colors"
import Picker from 'emoji-picker-react';
import { FormEvent, useContext, useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import { SocketContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { PUSH_MESSAGE, SEND_MESSAGE, SET_REPLY_TO_ID } from "../../config/chat.config";
import AudioRecorder from './AudioRecorder'
import { sendReplyMessage } from "../../redux/action/chat.action";
// @ts-ignore
import FileViewer from 'react-file-viewer';
// @ts-ignore
import { FileIcon, defaultStyles } from 'react-file-icon';
import { getFileType } from '../../utills/file'
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";
interface ChatFormInterface {
    handleSendClick: (a: string) => string
}

const ChatForm: React.FC<ChatFormInterface> = (props) => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const classes = useStyles();
    const { chat: chats, selectedChat, replyToId } = useSelector((state: RootState) => state.chat);
    const socket:any = useContext(SocketContext) || null;
    const dispatch = useDispatch();
    const [files, setFiles] = useState<any>();
    const [filesPreview, setFilesPreview] = useState<any>([]);

    const onEmojiClick = (e: any, emojiObj: any) => {
        setText(`${text}${emojiObj.emoji}`)
    }

    const toggleEmoji = () => {
        setOpen(!open)
    }

    const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const handleKeyDown = (e: any) => {
        if(e.key === "Enter") {
            handleSend();
        }
    }

    const handleCloseReply = () => {
        dispatch({
            type: SET_REPLY_TO_ID,
            payload: null
        })
    }

    const handleSend = () => {
        if(text) {
            const formdata = new FormData();
            
            formdata.append("message", text);
            formdata.append("chat", selectedChat);

            if(files && Object.values(files)?.length > 0) {
                for (const key of Object.keys(files)) {
                    formdata.append('products', files[key]);
                }
            }

            const payload: any = {
                body: formdata
            }
            if(replyToId) {   
                payload.body.messageId = replyToId;             
            }
            dispatch(sendReplyMessage(payload));

            dispatch({
                type: PUSH_MESSAGE,
                payload: {
                  username: "Test user",
                  time: "20m ago",
                  companyName: "Test company",
                  message: text,
                  seen: true,
                  myMessage: true,
                  replyOf: replyToId,
                  files: files && Object.keys(files)?.length > 0 ? filesPreview: []
                }
              });
            handleCloseReply();
            setFiles(null);
            setFilesPreview(null);
            // props.handleSendClick(text)
            setText('')
        }
    }

    const handleFileChange = (e: any) => {
        const newFiles = e.target.files;
        let oldFiles = files;
        if(!oldFiles) {
            oldFiles = {};
        }
        setFiles({...newFiles});
        const previews = Object.values(newFiles).map((file: any) => {
            return ({
                fileType: getFileType(file),
                url: URL.createObjectURL(file)
            })
        });
        setFilesPreview([...previews]);   
    }

    return (
        <Grid className={classes.wrapper} container>
            <Grid item xs={12} className={classes.inputWrapper}>
                {replyToId && 
                    <div className={classes.replyTitle}>
                        <Typography>
                            Reply
                        </Typography>
                        <Typography className={classes.closeReply} onClick={handleCloseReply}>
                            <Close/>
                        </Typography>
                    </div>
                }
                <input 
                    value={text} 
                    onChange={handleTextChange} 
                    onKeyPress={handleKeyDown} 
                    type="text"
                    disabled={!selectedChat} 
                    placeholder={selectedChat? "Type a message": "Select a chat room"} 
                    className={`messageInput ${classes.messageInput}`} 
                />
                <div className={classes.sendWrapper}>
                    <SendOutlined onClick={handleSend} className={classes.sendIcon} />
                </div>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', paddingLeft: 20 }}>
                {filesPreview && filesPreview.map((preview: any) => {
                    console.log('preview is ', preview)
                    return <FilePreviewer 
                                file={preview}
                                // handleClick={handleFileClick}
                            />
                })}
            </Grid>
            <Grid item xs={12} className={classes.btnWrapper}>
                <EmojiEmotionsOutlined onClick={toggleEmoji} className={classes.btnIcon}/>
                
                <label className="custom-file-upload">
                    <AttachFile className={classes.btnIcon}/>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        multiple={true}
                    />
                </label>
                <Mic className={classes.btnIcon}/>
                
                <label className="custom-file-upload">
                    <Image className={classes.btnIcon}/>
                    <input 
                        type="file" 
                        accept="image/png, image/gif, image/jpeg" 
                        onChange={handleFileChange}
                        multiple={true}
                    />
                </label>
                
                {open &&
                    <OutsideClickHandler
                        onOutsideClick={toggleEmoji}
                    > 
                        <div className={classes.emojisWrapper}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    </OutsideClickHandler>
                }
                {/* <AudioRecorder /> */}
            </Grid>
        </Grid>
    )
}

export default ChatForm

const useStyles = makeStyles({
    replyTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        background: colors.grey,
        padding: 6,
        paddingRight: 10,
        borderRadius: 10,
        color: colors.textGrey,
    },
    closeReply: {
        fontSize: 12,
        cursor: 'pointer',
        '&:hover': {
            color: colors.primaryRed
        }
    },
    wrapper: {
        // height: 100,
        borderTop: `1px solid ${colors.lightGrey}`,
        paddingTop: 10,
        position: 'relative'
    },
    preview: {
        height: 50,
        width: 50,
        padding: 10
    },  
    inputWrapper: {
        height: 50,
        paddingLeft: 15,
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${colors.lightGrey}`,
    },
    sendWrapper: {
        fontSize: 18,
        textAlign: 'center'
    },
    sendIcon: {
        background: colors.darkYellow,
        padding: 10,
        color: colors.white
    },
    messageInput: {
        width: '90%',
        height: 45,
        border: 'none',
        paddingLeft: 10,
        '&:focus': {
            border: 'none'
        },
        '&:hover': {
            border: 'none'
        },
        '&:active': {
            border: 'none'
        },
        '&:focus-visible': {
            border: 'none',
            outline: 'none'
        }
    },
    btnWrapper: {
        display: 'flex',
        paddingLeft: 20,
        paddingTop: 10,
        gap: 20
    },
    btnIcon: {
        color: colors.textPrimary,
        fontSize: 20,
        cursor: 'pointer'
    },
    emojisWrapper: {
        position: 'absolute',
        top: -250,
        left: 0
    }
})