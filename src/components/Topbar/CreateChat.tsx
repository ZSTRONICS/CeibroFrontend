
import React from "react";
import { Avatar, Button, Divider, makeStyles } from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CBox } from "components/material-ui";
import CustomModal from "components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { removeCurrentUser } from "../../helpers/chat.helpers";
import { createChatRoom } from "../../redux/action/auth.action";
import { getAllChats } from "../../redux/action/chat.action";
import {
  getAllProjectMembers,
  getAllProjects
} from "../../redux/action/project.action";
import { RootState } from "../../redux/reducers";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChatRoomSearch from "components/Chat/ChatRoomSearch";
import image from "./images/user.png";
import 
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


const CreateChat = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>();
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth?.user);
  const createChatLoading = useSelector(
    (state: RootState) => state.chat.createChatLoading
  );

  const values = removeCurrentUser(dbUsers, userInfo?.id);
  const { allProjects, projectMembers } = useSelector(
    (store: RootState) => store.project
  );

  const toggle = () => {
    setOpen(!open);
  };

  const handleOutsideClick = () => {
    setOpen(false);
  };

  const handleProjectChange = (e: any) => {
    setProject(e);
    setUsers([]);
    dispatch(
      getAllProjectMembers({
        other: {
          projectId: e.value,
          excludeMe: true,
        },
      })
    );
  };

  const handleUserChange = (e: any) => {
    if (!users?.includes?.(e?.target?.value)) {
      setUsers([...users, e.target.value]);
    } else {
      removeSelectedUser(e?.target?.value);
    }
  };

  const removeSelectedUser = (userId: any) => {
    setUsers(users?.filter?.((user: any) => String(user) !== String(userId)));
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuOptions = () => {
    setAnchorEl(null);
  }

  const [chat, setChat] = useState();
  const [chatForm, setChatForm]: any = useState(false)

  const handleChat = (method: string) => {
    setChat(method)
    setChatForm(true)
    setAnchorEl(null);

  }
  const handleChatRoomSearch = (e: any) => {
    dispatch(clearSelectedChat())
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: e?.target?.value,
    })
    dispatch(getAllChats())
  }

  useEffect(() => {
    dispatch(getAllProjects());
    setUsers([]);
  }, []);

  useEffect(() => {
    if (open) {
      dispatch(getAllProjects());
    }
    setUsers([]);
    setProject(null);
  }, [open]);

  const handleSubmit = () => {
    const payload = {
      body: {
        name,
        members: users,
        projectId: project.value,
      },
      success: () => {
        setName("");
        setProject(null);
        setUser(null);
        handleOutsideClick();
        dispatch(getAllChats());
      },
    };
    dispatch(createChatRoom(payload));
  };

  return (
    <div className="dropdown">
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        New chat
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuOptions}
        className={classes.selectChat}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={() => handleChat('Individual')}>Individual Chat</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleChat('group')}>Group Chat</MenuItem>

      </Menu>

      <Dialog
        open={chatForm}
        className={classes.chatDialog}
        onClose={() => setChatForm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {chat === 'Individual' &&
          <DialogContent>

            <CBox className={classes.chatbox}>
              <ChatRoomSearch onChange={handleChatRoomSearch} />

            </CBox>
            <CBox fontFamily='Inter' fontWeight={600} color='#0076C8' fontSize={14} mt={2.5} mb={1.3}>
              Frequently Contacted
            </CBox>
            {[...Array(8)].map(() => (
              <CBox display='flex' mb={2}>
                <CBox>
                  <Avatar src={image} alt="contact profile" variant="square" />
                </CBox>
                <CBox ml={1.6}>
                  <CBox fontSize={14} color='#000' fontWeight={600}>
                    Ilja Nikolajev
                  </CBox>
                  <CBox display='flex'>
                    {[...Array(2)].map(() => (
                      <CBox fontSize={12} color='#605C5C' fontFamily='Inter' fontWeight={500}>
                        Company &nbsp;

                      </CBox>

                    )

                    )}


                  </CBox>
                </CBox>
              </CBox>
            )

            )}


          </DialogContent>

        }
        <DialogActions>
          <Button variant="contained" color='primary'>
            Start conversation
          </Button>
          <Button onClick={() => setChatForm(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


    </div >

  );
};

export default CreateChat;


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
  }
}));
