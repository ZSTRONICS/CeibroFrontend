import { useEffect, useState } from 'react';

// material
import { Avatar, Button, makeStyles } from "@material-ui/core";

// redux
import { useDispatch } from "react-redux";
import { clearSelectedChat, getAllChats } from "../../redux/action/chat.action";

// components
import ChatRoomSearch from 'components/Chat/ChatRoomSearch';
import { CBox } from "components/material-ui";
import { SET_CHAT_SEARCH } from 'config/chat.config';
import { UserInterface } from 'constants/interfaces/user.interface';
import { getMyConnections } from 'redux/action/user.action';
import colors from "../../assets/colors";

const CreateIndividualChat =(props:any) => {
    const {individualChat}= props
    const classes = useStyles();
    const dispatch = useDispatch();
const [connections, setConnection] = useState<any>({})
const [loading, setLoading] = useState<boolean>(false)
const [chatOptions, setChatOptions] = useState<boolean>(true)

useEffect(() => {
    const payload = {
      success: (res: any) => {
        setConnection(res?.data?.myConnections)
      },
      finallyAction: () => {
        setLoading(false)
      },
    }
    setLoading(true)
    dispatch(getMyConnections(payload))
  }, [])
  
  const handleChatRoomSearch = (e: any) => {
    dispatch(clearSelectedChat())
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: e?.target?.value,
    })
    dispatch(getAllChats())
  }

  return (<>
{ individualChat ===true&&
              <CBox padding={3.1}>

                <CBox className={classes.chatbox}>
                  <ChatRoomSearch onChange={handleChatRoomSearch} />
                </CBox>
                <CBox fontFamily='Inter' fontWeight={600} color='#0076C8' fontSize={14} mt={2.5} mb={1.3}>
                  Frequently Contacted
                </CBox>
                {connections?.map?.((connection: any) => {
                  const user: UserInterface = connection?.sentByMe ? connection.to : connection.from;

                  return (
                    <CBox display='flex' mb={2} className={classes.ChatList} onClick={() => console.log('clicked')}>
                      <CBox>
                        <Avatar src={user?.profilePic} alt="contact profile" variant="square" />
                      </CBox>
                      <CBox ml={1.6}>
                        <CBox fontSize={14} color='#000' fontWeight={600}>
                          {`${user?.firstName} ${user?.surName}`}
                        </CBox>
                        <CBox display='flex'>

                          <CBox fontSize={12} color='#605C5C' fontFamily='Inter' fontWeight={500}>
                            {user.companyName} &nbsp;
                          </CBox>
                        </CBox>
                      </CBox>
                    </CBox>
                  )

                })}
                <CBox display='flex' justifyContent='flex-end'>
                  <Button variant="contained" color='primary' disabled>
                    Start conversation
                  </Button>
                  <Button onClick={() => setChatOptions(true)}>
                    Cancel
                  </Button>
                </CBox>
              </CBox>
            }
</>  )
}

export default CreateIndividualChat

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    outerMenu: {
      width: 350,
      left: 0,
    },
    searchInput: {
      width: 340,
      height: 30,
      border: `1px solid ${colors.borderGrey}`,
    },
    smallRadioButton: {
      fontSize: "14px !important",
      "& svg": {
        width: "0.8em",
        height: "0.8em",
      },
      "&$checked": {
        color: "green",
      },
    },
    suggestedUsersTitle: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.textGrey,
      marginBottom: 10,
    },
    wrapper: {
      // borderBottom: `1px solid ${colors.grey}`,
      marginBottom: 5,
    },
    titleText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subTitleText: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.textGrey,
    },
    actionWrapper: {
      display: "flex",
      justifyContent: "flex-start",
      gap: 25,
      paddingTop: 10,
      paddingBottom: 15,
    },
    actionBtn: {
      fontSize: 12,
      fontWeight: "bold",
    },
    time: {
      fontSize: 12,
      fontWeight: "bold",
      color: colors.textGrey,
    },
    suggestUser: {
      maxHeight: 300,
      overflow: "auto",
    },
    selectedUser: {
      height: 50,
      width: 50,
      position: "relative",
    },
    cancelIcon: {
      fontSize: 14,
      position: "absolute",
      color: colors.textGrey,
      top: -5,
      right: 5,
    },
    selectChat: {
      '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
        width: '100%',
        maxWidth: '400px !important',
        top: '60px !important'
      },
      '& .MuiMenuItem-root': {
        color: '#0076C8',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'Inter'
      }
    },
    chatbox: {
      border: '1px solid #DBDBE5',
      borderRadius: 4,
      '& .MuiAvatar-root': {
        borderRadius: '5px !important',
        height: '40 !important',
        weight: '40 !important'
      }
    },
    chatDialog: {
      '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        width: '100%',
        maxWidth: '400px !important'
      }
    },
    ChatList: {
  
      transitionTimingFunction: ' ease-in',
      transition: ' 0.2s',
    }
  }));