import { Grid, makeStyles, Typography } from "@material-ui/core"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import { BsDownload } from "react-icons/bs"
import colors from "../../../assets/colors"
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface"
import NameAvatar from "../Others/NameAvatar"
import { IoReturnUpForward } from 'react-icons/io5'
import FileView from './FileView'
import { useState } from "react"
import ChatMessageMenu from "./ChatMessageMenu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/reducers"
import { pinMessage } from "../../../redux/action/chat.action"
import FilePreviewer from './FilePreviewer'
import { SAVE_MESSAGES } from "../../../config/chat.config"

interface MessageChatProps {
    message: ChatMessageInterface
}

const MessageChat: React.FC<MessageChatProps> = (props) => {

    const { message } = props
    const { replyOf, username, time, companyName, message: messageText, seen, myMessage, files } = message
    const classes = useStyles();
    const { user } = useSelector((state: RootState) => state.auth);
    const { messages } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    const [view, setView] = useState(false);

    const toggleView = () => {
        setView(!view)
    }

    const getStyles = () => {
        return {
            background: myMessage? colors.grey: colors.white,
            boxShadow: "none"
        }
    }

    const handlePinClick = () => {
        let myMsgs = JSON.parse(JSON.stringify(messages));
        const index = messages?.findIndex((msg: ChatMessageInterface) => String(msg._id) == String(message._id))
        const myMsg = messages[index];
        if(myMsg?.pinnedBy?.includes?.(user.id)) {
            myMsg.pinnedBy = myMsg?.pinnedBy?.filter?.((elem: any) => String(elem) !== String(user.id))
        } else {
            myMsg?.pinnedBy?.push?.(user.id);  
        }

        myMsgs[index] = myMsg;
    
        const payload = {
            other: message._id,
            success: () => {
                dispatch({
                    type: SAVE_MESSAGES,
                    payload: JSON.parse(JSON.stringify(myMsgs))
                })
            }
        }
        dispatch(pinMessage(payload));
    }

    const handleFileClick = (file: any) => {
        window.open(file.url, "_blank")
    }

    const handleAllFilesDownload = () => {
        files?.map?.((file: any) => {
            console.log('workingfor', file)
            window.open(file.url)
        })
    }

    return (
        <Grid 
            container 
            justifyContent={myMessage? "flex-end": "flex-start"} 
            className={classes.outerWrapper}
        >
            <Grid item xs={9}>
                <div className={classes.innerWrapper} style={getStyles()}>
                    {replyOf && (
                        <Grid container className={classes.replyWrapper}>
                            <span>
                                “Reply: {replyOf?.message?.substring?.(0, 20)} ...”
                            </span>
                        </Grid>
                    )}
                    <Grid container>
                        <Grid item xs={1}>
                            <NameAvatar name={username} />
                        </Grid>
                        <Grid item xs={11}>
                            <div className={classes.titleWrapper}>
                                <div className={classes.usernameWrapper}>
                                    <Typography className={classes.username}>
                                        {username}
                                    </Typography>

                                    <Typography className={classes.time}>
                                        {time}
                                    </Typography>
                                </div>
                                <div className={classes.projectWrapper}>
                                    <Typography className={classes.company}>
                                        Company . {companyName}
                                    </Typography>
                                </div>
                            </div>

                            <div className={classes.messageBody}>
                                <Typography className={classes.messageText}>
                                    {messageText}
                                </Typography>
                            </div>

                        </Grid>
                        <Grid item xs={1}></Grid>

                        {files && files.length > 0 && ( 
                                <Grid item xs={10} className={classes.filesWrapper}>
                                    <Grid container>
                                        {files?.map?.((file: any) => {
                                            return (
                                                <Grid item xs={2} className={` ${classes.imageWrapper}`}>
                                                    <FilePreviewer 
                                                        file={file}
                                                        showControls={false}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                        {/* <Grid item xs={2} className={classes.imageWrapper}>
                                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                        </Grid>
                                        <Grid item xs={2} className={classes.imageWrapper}>
                                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                        </Grid> */}

                                        <Grid item xs={4} style={{ paddingTop: 17, gap: 4, display: 'flex', alignItems: 'flex-start'  }} className={classes.imageWrapper}>
                                            <div className={classes.fileIconWrapper} onClick={handleAllFilesDownload}>
                                                <BsDownload className={classes.fileIcon}/>
                                            </div>
                                            <div className={classes.fileIconWrapper} onClick={toggleView}>
                                                <IoReturnUpForward  className={classes.fileIcon}/>
                                            </div>
                                        </Grid>

            
                                        {/* {view && <FileView handleClose={toggleView}/>} */}

                                    </Grid>
                                </Grid>
                            )
                            
                        }


                    </Grid>
                </div>
                <div className={classes.seenWrapper}>   
                    <Typography className={classes.visibility}>
                        {seen ? "Seen": "Unseen"}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={1} className={classes.iconsWrapper} onClick={handlePinClick}>
                {message?.pinnedBy?.includes?.(user?.id) ? (
                        <AiFillPushpin className={classes.pinIcon} />
                    ): (
                        <AiOutlinePushpin className={classes.pinIcon} />
                    )
                }
                <ChatMessageMenu message={message} />
            </Grid>
        </Grid>
    )
}

export default MessageChat

const useStyles = makeStyles({
    outerWrapper: {
        padding: 15,
    },
    replyWrapper: {
        padding: 10,
        color: colors.textGrey
    },
    innerWrapper: {
        border: `1px solid ${colors.grey}`,
        padding: 8,
        background: colors.white,
        boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
        borderRadius: 4
    },
    titleWrapper: {
    },
    usernameWrapper: {
        display: 'flex',
        alignItems: 'baseline'
    },
    projectWrapper: {

    },
    messageBody: {
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    time: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
        paddingLeft: 10
    },
    company: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    messageText: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.black
    },
    iconsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10
    },
    pinIcon: {
        color: colors.textPrimary,
        fontSize: 20,
        cursor: 'pointer'
    },
    moreIcon: {
        fontSize: 20,
        color: colors.textPrimary,
        marginTop: 20
    },
    seenWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    visibility: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    filesWrapper: {
        paddingLeft: 10,
        display: 'flex',
        gap: 10,
        marginTop: 20,
        border: "1px solid #dfdede",
        padding: 10
    },
    imageWrapper: {
        padding: 5
    },
    image: {
        width: '100%',
        borderRadius: 4
    },
    fileIcon: {
        fontSize: 15,
        color: colors.textPrimary
    },
    fileIconWrapper: {
        border: `1px solid ${colors.textPrimary }`,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30
    }
})