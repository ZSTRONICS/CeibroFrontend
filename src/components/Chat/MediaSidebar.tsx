import { Badge } from '@material-ui/core';
import { Image, Person, PersonOutlined } from '@material-ui/icons';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';
import { GoFileMedia } from 'react-icons/go';
import { MdArticle, MdOutlineArticle } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CHAT_SIDE_BAR } from '../../config/chat.config';
import { RootState } from '../../redux/reducers';
import ChatMembers from './ChatMembers';

const MediaSidebar = () => {
    const classes = useStyles();
    const { sidebarOpen } = useSelector((state: RootState) => state.chat);
    const [openIndex, setOpenIndex] =  useState<number>(0);
    const dispatch = useDispatch();

    const getStyles = () => {
        return {
            width: sidebarOpen? 240: 50
        }
    }

    const handleClick = (index: number) => {
        if(!sidebarOpen) {
            dispatch({ 
                type: SET_CHAT_SIDE_BAR,
                payload: true
            });
        }
        setOpenIndex(openIndex => index === openIndex ? 0: index);
    }

    const handleOutsideClick = () => {
        if(sidebarOpen) {
            setOpenIndex(0);
            dispatch({ 
                type: SET_CHAT_SIDE_BAR,
                payload: false
            });
        } 
    }


    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <div style={getStyles()} className={classes.mediaSidebarWrapper}>
            <button className="accordion" onClick={() => handleClick(1)}>
                <span>
                    <Badge 
                        badgeContent={4} 
                        color="secondary"
                        classes={{
                            badge: classes.font1
                        }}
                    >
                        <PersonOutlined color="action" />
                    </Badge>
                    {sidebarOpen && <span className="accordion-title">Chat members</span>}
                </span>
                {sidebarOpen && (
                    <KeyboardArrowDown/>
                )}
            </button>
            {openIndex === 1 && <ChatMembers />}

            <button className="accordion" onClick={() => handleClick(2)}>
                <span>
                    <AiOutlinePushpin style={{ fontSize: 20 }} color="action" />
                    {sidebarOpen && <span className="accordion-title">Pinned messages</span>}
                </span>
                {sidebarOpen && (
                    <KeyboardArrowDown/>
                )}
            </button>

            <button className="accordion" onClick={() => handleClick(3)}>
                <span>
                    <Badge badgeContent={4} color="secondary">
                        <Image />
                    </Badge>
                    {sidebarOpen && <span className="accordion-title">
                        Media & Files   
                    </span>}
                </span>  
                {sidebarOpen && (
                    <KeyboardArrowDown/>
                )}
                
            </button>

        </div>
        </OutsideClickHandler>
    )
}

export default MediaSidebar;

const useStyles = makeStyles({
    mediaSidebarWrapper: {
        position: 'absolute',
        right: 30,
        height: "calc(100vh - 100px)",
        display: 'flex',
        flexDirection: 'column',
    },
    font1: {
        fontSize: "0.5rem"
      },
});
