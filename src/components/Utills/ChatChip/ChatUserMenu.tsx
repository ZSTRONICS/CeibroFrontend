import { IconButton, makeStyles, Typography } from "@material-ui/core";
import {
  DeleteOutlined,
  Image,
  Info,
  MoreVert,
  PeopleOutline,
  PersonAddOutlined,
} from "@material-ui/icons";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import {
  deleteConversation,
  getAllChats,
  setMembersDialog,
  setSelectedChat,
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers/appReducer";

interface ChatUserMenuInt {
  enable: boolean;
}

const ChatUserMenu: React.FC<ChatUserMenuInt> = (props) => {
  const classes = useStyles();
  const { enable } = props;
  const [show, setShow] = useState(false);
  const { selectedChatId } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleToggle = () => {
    enable && setShow(!show);
  };

  const openMembersDialog = () => {
    dispatch(setMembersDialog(true));
  };

  const handleDeleteClick = (e: any) => {
    e.stopPropagation();
    confirm({ description: "Are you confirm want to delete" }).then(() => {
      dispatch(
        deleteConversation({
          other: selectedChatId,
          success: () => {
            dispatch(
              getAllChats({
                success: (_res: any) => {
                  if (_res?.data?.[0]?._id) {
                    dispatch(setSelectedChat({ other: _res?.data?.[0]?._id }));
                  }
                },
              })
            );
          },
        })
      );
    });
  };

  return (
    <div className="dropdown">
      {/* <MoreVert className={classes.moreIcon} onClick={handleToggle} /> */}
      <IconButton style={{ opacity: enable ? 1 : 0.5 }} onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            {/* {selectedChatId.isGroupChat === "true" && ( */}
            <div
              onClick={openMembersDialog}
              className={`${classes.menuWrapper} dropdown-menu`}
            >
              <div className={classes.iconContainer}>
                <img src={assets.addUser} className={classes.menuIcon} />
              </div>
              <Typography className={classes.menuText}>Add People</Typography>
            </div>
            {/* )} */}

            <hr className={classes.break} />

            <div
              onClick={handleDeleteClick}
              className={`${`${classes.menuWrapper} dropdown-menu`} ${
                classes.deleteConversation
              }`}
            >
              <div className={classes.iconContainer}>
                <img src={assets.DeleteIcon} className={classes.menuIcon} />
              </div>
              <Typography
                className={`${classes.menuText} ${classes.deleteText}`}
              >
                Delete Chat
              </Typography>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default ChatUserMenu;

const useStyles = makeStyles({
  moreIcon: {
    cursor: "pointer",
  },
  dropdownContent: {
    minWidth: 180,
    display: "block",
  },
  menuWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: "20px",
  },
  menuIcon: {
    width: "100%",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  deleteConversation: {
    color: colors.btnRed,
  },
  deleteText: {
    color: colors.btnRed,
  },
});
