import { useEffect, useState } from "react";
// material
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Typography } from "@mui/material";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CHAT_TYPE,
  SET_CHAT_SEARCH,
  SET_FAVOURITE_FILTER,
} from "../../config/chat.config";
import { clearSelectedChat, getAllChats } from "../../redux/action/chat.action";

// components
import assets from "assets/assets";
import colors from "../../assets/colors";
import ChatList from "./ChatList";
import ChatRoomSearch from "./ChatRoomSearch";
import { Stack } from "@mui/system";
import { Divider, MenuItem } from "@mui/material";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { RootState } from "redux/reducers";

const ChatSidebar = () => {
  const classes = useStyles();

  const messageListType = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Unread",
      value: "unread",
    },
    {
      name: "Favorites",
      value: "favorites",
      icon: assets.favouriteFilledIcon,
    },
  ];
  const { chat } = useSelector((state: RootState) => state.chat);
  const [filterChatLocal, setFilterChatLocal] = useState<any[]>([]);

  const [filter, setFilter] = useState(messageListType[0].name);
  const [filterParams, setFilterParams] = useState({
    searchWithNameAndGroup: "",
  });


  useEffect(()=>{
    setFilterChatLocal(chat)
  },[])

  const dispatch = useDispatch();

  const handleMessageTypeClick = (chatType: any, index: number) => {
    setFilter(chatType.name);
    if (index === 2) {
      handleMenuClick(true);
    } else {
      handleMenuClick(false);
    }
    dispatch({
      type: SET_CHAT_TYPE,
      payload: chatType.value,
    });
  };

  const handleMenuClick = (value: boolean) => {
    dispatch({
      type: SET_FAVOURITE_FILTER,
      payload: value,
    });
  };
  // const filterDataOnParams = (params: any) => {
  //   let filtereLocal: any = [...users];
  //   if (String(params.searchWithNameEmail).length > 0) {
  //     filtereLocal = filtereLocal.filter((user: any) => {
  //       const fullName = `${user?.firstName} ${user?.surName}`
  //         .toLocaleLowerCase()
  //         .includes(params.searchWithNameEmail.toLowerCase());
  //       const searchEmail = String(user?.email)
  //         .toLocaleLowerCase()
  //         .includes(params.searchWithNameEmail.toLowerCase());
  //       const finalResult = fullName || searchEmail;
  //       return finalResult;
  //     });
  //   }
  //   if (params.startDate !== "" || params.endDate !== "") {
  //     filtereLocal = filtereLocal.filter((item: any) => {
  //       const itemDate = new Date(item.createdAt);
  //       const start = params.startDate ? new Date(params.startDate) : null;
  //       const end = params.endDate ? new Date(params.endDate) : null;
  //       return (!start || itemDate >= start) && (!end || itemDate <= end);
  //     });
  //   }

  //   setFilterParams({ ...params });
  //   if (
  //     params.searchWithNameEmail === "" &&
  //     params.startDate === "" &&
  //     params.endDate === ""
  //   ) {
  //     //setFilterUsersLocal(users);
  //   } 
  //   // else {
  //   //   setFilterUsersLocal(filtereLocal);
  //   // }
  // };
  const handleChatSearch = (e: any) => {
    if (e.target.value === "") {
  
    } else {
     
    }
  }

  const handleChatRoomSearch = (e: any) => {

    dispatch(clearSelectedChat());
    dispatch({
      type: SET_CHAT_SEARCH,
      payload: e?.target?.value,
    });
    dispatch(getAllChats());
  };

  return (
    <Grid container className={classes.outerWrapper}>
      {/* <Grid item xs={12} className={classes.iconsWrapper}>
        <Grid
          item
          xs={6}
          className={`${classes.menuOuterWrapper} ${classes.rightBorder}`}
        >
          <Chat
            onClick={() => handleMenuClick(false)}
            className={`${classes.menuIcons} ${
              !favouriteFilter ? classes.activeIcon : ""
            }`}
          />
        </Grid>
        <Grid item xs={6} className={classes.menuOuterWrapper}>
          <StarBorder
            onClick={() => handleMenuClick(true)}
            className={`${classes.menuIcons} ${
              favouriteFilter ? classes.activeIcon : ""
            }`}
          />
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <ChatRoomSearch onChange={handleChatRoomSearch} />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          "@media(max-width:1500px)": {
            overflowX: "auto",
          },
        }}
      >
        <CustomStack direction="row">
          {messageListType.map((chatType: any, index: number) => {
            return (
              // <>
              <Box
                onClick={() => handleMessageTypeClick(chatType, index)}
                key={index}
                className={`${classes.messageTypeText} 
              ${index < 2 && classes.borderRight}
               ${filter === chatType.name ? classes.activeMessageType : ""}`}
              >
                <Typography
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "inter",
                  }}
                >
                  {chatType.name === "Favorites" ? (
                    <span
                      style={{
                        paddingRight: "8px",
                        fontSize: "20px",
                        color: "#f1bb4b",
                        fontWeight: 900,
                      }}
                    >
                      &#9733;
                    </span>
                  ) : (
                    ""
                  )}
                  {chatType.name}
                  {/* {`${
                    String(chatType.name) === "Favorites" ? (
                      <span>
                        "&#9733;"
                      </span>
                    ) : (
                      ""
                    )
                  } ${chatType.name}`} */}
                </Typography>
              </Box>
              //  {index < 2 && <Typography className={classes.messagetypeBreak}>|</Typography>}
              // </>
            );
          })}
        </CustomStack>
      </Grid>
      <Grid item xs={12} className={`${classes.chatList} hide-scrollbar`}>
        <ChatList />
      </Grid>
    </Grid>
  );
};

export default ChatSidebar;

const useStyles = makeStyles({
  borderRight: {
    borderRight: "2px solid #DBDBE5;",
    // padding: "0 30px",
    // paddingRight: 23,
    // padding: "0 26px",
  },
  outerWrapper: {
    border: `0.5px solid ${colors.grey}`,
    borderTop: "none",
    height: "100%",
    display: "block",
  },
  iconsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderBottom: `0.5px solid ${colors.grey}`,
  },
  menuOuterWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  rightBorder: {
    borderRight: `1px solid ${colors.grey}`,
    // padding: "0 40px",
  },
  menuIcons: {
    fontSize: 20,
    color: colors.textPrimary,
    padding: 8,
    cursor: "pointer",
  },
  addWrapper: {
    flex: 2,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  activeIcon: {
    color: colors.white,
    background: colors.darkYellow,
    borderRadius: 50,
  },
  addText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 500,
  },
  addIcon: {
    fontSize: 20,
  },
  messageTypeWrapper: {
    // overflowX: "auto",
    // display: "flex",
    // justifyContent: "center",
    // padding: "15px 20px",
    width: "100%",
    alignItems: "center",
  },
  messageTypeText: {
    // maxWidth: "100px",
    // width: "100px",
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "inter",
    color: colors.textPrimary,
    cursor: "pointer",
  },
  // messagetypeBreak: {
  //   color: colors.mediumGrey,
  // },
  activeMessageType: {
    color: colors.black,
  },
  chatList: {
    height: "calc(100vh - 170px)",
    overflowY: "auto",
    overflowX: "hidden",
  },
});
