import { makeStyles, Typography } from "@material-ui/core"
import { BookmarkBorder, Chat, Delete, MoreVert, Star, StarBorder } from "@material-ui/icons"
import { useState } from "react"
import { BsBookmark } from "react-icons/bs"
import { GrVolume, GrVolumeMute } from "react-icons/gr"
import OutsideClickHandler from "react-outside-click-handler"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import colors from "../../../assets/colors"
import { ChatListInterface } from "../../../constants/interfaces/chat.interface"
import { addToFavourite, getAllChats, muteChat } from "../../../redux/action/chat.action"
import { RootState } from "../../../redux/reducers"

interface ChatListMenueInt {
    room: ChatListInterface
}

const ChatListMenu: React.FC<ChatListMenueInt> = (props) => {
    const { room } = props;
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { chat } = useSelector((state: RootState) => state.chat);
    const isMuted = room?.mutedBy?.includes(user.id);
    const isFavourite = room?.pinnedBy?.includes(user.id);
    const dispatch = useDispatch();

    const handleToggle = (e: any) => {
        e.stopPropagation();
        setShow(!show)
    }

    const markAsUnread = () => {
    }

    const handleChatMute = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(muteChat({ other: room._id, success: () => {
            const message = `Chat ${isMuted ? "Un muted": "muted"}`;
            setShow(false);
            dispatch(getAllChats({ success: () => {
                toast.success(message);
            }}))
        } }));   
    }

    const handleFavouriteClick = (e: any) => {
        e.stopPropagation()
        dispatch(addToFavourite({ other: room._id, success: () => {
            setShow(false);
            dispatch(getAllChats());
        } }));  
    }

    return (
        <div className="dropdown">
            <MoreVert className={classes.moreIcon} onClick={handleToggle} />
            {show && (
                    <OutsideClickHandler onOutsideClick={handleToggle}>
                        <div className={`dropdown-content ${classes.dropdownContent}`}>
                            <div className={`${classes.menuWrapper} dropdown-menu pointer`} >
                                <Chat className={classes.menuIcon} />
                                <Typography className={classes.menuText}>
                                    Mark unread
                                </Typography>
                            </div>
                            <div className={`${classes.menuWrapper} dropdown-menu pointer ${classes.starMenu}`} onClick={handleChatMute}>
                                {isMuted ? (
                                    <GrVolumeMute className={classes.menuIcon} />
                                ): (
                                    <GrVolume className={classes.menuIcon} />
                                )}
                                <Typography className={classes.menuText}>
                                    {isMuted ? "Un mute": "Mute"} chat
                                </Typography>
                            </div>

                            <hr className={classes.break} />

                            <div className={`${classes.menuWrapper} dropdown-menu pointer`} onClick={handleFavouriteClick}>
                                {isFavourite? 
                                    (<Star className={`${classes.star} ${classes.menuIcon}`} />): 
                                    (<StarBorder className={`${classes.star} ${classes.menuIcon}`} />)
                                }
                                <Typography className={`${classes.menuText} ${classes.starText}`}>
                                    {isFavourite? (
                                        "Remove from favorites"
                                        ): (
                                        "Add to favorites"
                                    )}
                                </Typography>
                            </div>

                            <hr className={classes.break} />

                            <div className={`${`${classes.menuWrapper} dropdown-menu`} ${classes.deleteConversation}`}>
                                <Delete className={classes.menuIcon} />
                                <Typography className={`${classes.menuText} ${classes.deleteText}`}>
                                    Delete conversation
                                </Typography>
                            </div>
                        </div>
                    </OutsideClickHandler>
                )
            }
        </div>
    )
}

export default ChatListMenu

const useStyles = makeStyles({
    moreIcon: {
        fontSize: 24,
        color: colors.textPrimary
    },
    dropdownContent: {
        minWidth: 180,
        display: 'block'
    },
    menuWrapper: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start'
    },
    menuIcon: {
        fontSize: 14
    },
    star: {
        color: colors.darkYellow,
        fontSize: 20
    },
    starText: {
        marginLeft: "4px !important"
    },
    starMenu: {
        display: 'flex',
        alignItems: ''
    },
    menuText: {
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 10,
        height: 30,
        color: colors.textPrimary
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.grey}`
    },
    deleteConversation: {
        color: colors.btnRed
    },
    deleteText: {
        color: colors.btnRed
    }
})