import { useEffect, useCallback, useState } from "react";

// material
import { Avatar, Button, makeStyles, Popover } from "@material-ui/core";

// redux
import { useDispatch } from "react-redux";
import { createSingleRoom, getAllChats } from "../../redux/action/chat.action";

// components
import ChatRoomSearch from "components/Chat/ChatRoomSearch";
import { CBox } from "components/material-ui";
import { UserInterface } from "constants/interfaces/user.interface";
import { getMyConnections } from "redux/action/user.action";
import { toast } from "react-toastify";

export let dbUsers = [
  {
    label: "Test 1",
    value: "61ec20bb778f854909aec4d2",
    color: "green",
  },
  {
    label: "Test 2",
    value: "61ec2121778f854909aec4d7",
    color: "green",
  },
  {
    label: "Test 3",
    value: "61ec2139778f854909aec4dc",
    color: "green",
  },
  {
    label: "Test 4",
    value: "61ec220d778f854909aec4fa",
    color: "green",
  },
];

const CreateIndividualChat = (props: any) => {

  const { ButtonId, open, individualEl, handleClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [connections, setConnection] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchField] = useState("");

  useEffect(() => {
    const payload = {
      success: (res: any) => {
        setConnection(res?.data?.myConnections);
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(getMyConnections(payload));
    return () => {
      setConnection([])
    }
  }, []);

  // const sortCon = connections.sort(function(a:any, b:any){
  //     const user = a?.sentByMe? a.to: b.from;
  //     var nameA = user.firstName.toLowerCase(), nameB = user.firstName.toLowerCase();
  //     if (nameA < nameB) //sort string ascending
  //      return -1;
  //     if (nameA < nameB)
  //      return 1;
  //     return 0; 
  //    });

  
  const filterdList = connections?.filter((person: any) => {
    const user = person?.sentByMe ? person?.to : person?.from;
    const fullName = `${user?.firstName} ${user?.surName}`
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       user?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  })

  const handleChatRoomSearch = useCallback((e: any) => {
    const searchVal = e.target.value
    setSearchField(searchVal)
  }, []);

  const startSingleRoomChat = (_id: string) => {
    const payload = {
      other: { _id }, success: () => {
        //  dispatch(setSelectedChat({ other: id }));
        toast.success('single chat room started')
        dispatch(getAllChats());
      }
    }
    dispatch(createSingleRoom(payload))
    handleClose()
  }

  return (
    <>
      <Popover
        id={ButtonId}
        open={open}
        anchorEl={individualEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 45,
          horizontal: "left",
        }}
      >
        <CBox padding={2.5} className={classes.outerMenu}>
          <CBox className={classes.chatbox}>
            <ChatRoomSearch onChange={handleChatRoomSearch} />
          </CBox>
          <CBox
            fontFamily="Inter"
            fontWeight={600}
            color="#0076C8"
            fontSize={14}
            mt={2.5}
            mb={1.3}
          >
            Frequently Contacted
          </CBox>
          {filterdList?.map((connection: any) => {

            if(connection.status !== 'accepted' ) return
            const startRoomId = connection.sentByMe ? connection?.to?._id : connection?.from?._id
            const user: UserInterface = connection?.sentByMe
              ? connection.to
              : connection.from;
            if(user===null) return
            return (
              <CBox
                display="flex"
                mb={2}
                className={classes.ChatList}
                onClick={() => startSingleRoomChat(startRoomId)}
                key={startRoomId}
              >
                <CBox>
                  <Avatar
                    src={user?.profilePic}
                    alt="contact profile"
                    variant="square"
                  />
                </CBox>
                <CBox ml={1.6}>
                  <CBox fontSize={14} color="#000" fontWeight={600}>
                    {`${user?.firstName} ${user?.surName}`}
                  </CBox>
                  <CBox display="flex">
                    <CBox
                      fontSize={12}
                      color="#605C5C"
                      fontFamily="Inter"
                      fontWeight={500}
                    >
                      {user?.companyName} &nbsp;
                    </CBox>
                  </CBox>
                </CBox>
              </CBox>
            );
          })}

          <CBox display="flex" justifyContent="flex-end" >
            {/* <Button variant="contained" color="primary" disabled>
              Start conversation
            </Button> */}
            <Button onClick={handleClose}>Cancel</Button>
          </CBox>
        </CBox>
      </Popover>
    </>
  );
};

export default CreateIndividualChat;

const useStyles = makeStyles((theme) => ({
  outerMenu: {
    width: "100%",
    maxWidth: 370,
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
  chatbox: {
    border: "1px solid #DBDBE5",
    borderRadius: 4,
    "& .MuiAvatar-root": {
      borderRadius: "5px !important",
      height: "40 !important",
      weight: "40 !important",
    },
  },
  ChatList: {
    transitionTimingFunction: " ease-in",
    transition: " 0.2s",
    padding: '1px 3px',
    '&:hover': {
      // boxShadow: '1px 0px 2px 4px #19181833',
      boxShadow: '1px 0px 2px 4px #eeecec',
      background: '#f1f1f1',
      cursor: 'pointer'
    }
  },
}));
