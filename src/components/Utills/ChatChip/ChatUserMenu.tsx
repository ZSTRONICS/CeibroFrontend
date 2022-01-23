import { IconButton, makeStyles, Typography } from "@material-ui/core"
import { Delete, Image, Info, MoreVert, PeopleOutline, PersonAddOutlined } from "@material-ui/icons"
import { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { useDispatch } from "react-redux"
import assets from "../../../assets/assets"
import colors from "../../../assets/colors"
import { setMembersDialog } from "../../../redux/action/chat.action"

const ChatUserMenu = () => {
    const classes = useStyles()
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();

    const handleToggle = () => {
        setShow(!show)
    }

    const openMembersDialog = () => {
        dispatch(setMembersDialog(true));
    }

    return (
        <div className="dropdown">
            {/* <MoreVert className={classes.moreIcon} onClick={handleToggle} /> */}
            <IconButton onClick={handleToggle} >
                <img src={assets.moreIcon} className={classes.moreIcon} />
            </IconButton>
            {show && (
                    <OutsideClickHandler onOutsideClick={handleToggle}>
                        <div className={`dropdown-content ${classes.dropdownContent}`}>

                            <div onClick={openMembersDialog} className={`${classes.menuWrapper} dropdown-menu`}>
                                <img src={assets.addUser} />
                                <Typography className={classes.menuText}>
                                    Add People
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

export default ChatUserMenu

const useStyles = makeStyles({
    moreIcon: {
        cursor: 'pointer'
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