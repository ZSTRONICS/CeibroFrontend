import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { makeStyles } from "@material-ui/core";

import CButton from "components/Button/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserById } from "redux/action/user.action";
import colors from "../../assets/colors";
import { createSingleRoom } from "../../redux/action/chat.action";
import { getPinnedMessages, getRoomMedia, getRoomMessages, getRoomQuestioniars, setSelectedChat } from "../../redux/action/chat.action";

import taskActions from "../../redux/action/task.action";
import {
  deleteMyConnection,
  getMyConnections,
} from "../../redux/action/user.action";
import { useMediaQuery } from "react-responsive";
import ProfileViewGlobal from "components/Profile/ProfileViewGlobal";

interface IViewProfileProps {
  userId: string;
  disabled: boolean;
  connectionId: string;
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = (props) => {
  const { userId, disabled, connectionId } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [getUser, setGetUser] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const getUserData = () => {
    const payload = {
      success: (val: any) => {
        setGetUser(val.data);
        handleToggle();
      },
      other: {
        userId,
      },
    };
    dispatch(getUserById(payload));
  };

  const handleToggle = () => {
    setOpen((prev: boolean) => !prev);
  };
  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

  // const handleDelete = () => {
  //   const id: string = connectionId;
  //   const payload: any = {
  //     other: {
  //       id,
  //     },
  //     params: {
  //       isEmailInvited: false,
  //     },
  //     success: () => dispatch(getMyConnections()),
  //   };
  //   dispatch(deleteMyConnection(payload));
  //   handleToggle();
  // };

  const startChatRoom = (roomId: string) => {
    dispatch(
      getRoomMessages({
        other: {
          roomId: roomId,
          limit: 20,
        },
        success: () => { },
      })
    );

    dispatch(
      getRoomMedia({
        other: roomId,
      })
    );
    dispatch(
      getPinnedMessages({
        other: roomId,
      })
    );
    const payload = {
      other: roomId,
    };
    dispatch(getRoomQuestioniars(payload));

    dispatch(setSelectedChat({ other: roomId }));
  };

  const startRoom = () => {
    const payload = {
      other: { _id: userId },
      success: (res: any) => {
        history.push("chat")
        startChatRoom(res.data.newChat._id)
       
      }
    };
    dispatch(createSingleRoom(payload));
  };

  return (
    <>
      <Button
        sx={{
          padding: "4px 10px",
          textTransform: "capitalize",
          // "@media(max-width:960px)": {
          //   marginTop: "10px",
          // },
          // "@media(max-width:413px)": {
          //   padding: "5px",
          // },
        }}
        onClick={getUserData}
        className={`${classes.btn} ${classes.centerBtn}`}
        variant="outlined"
        size={isTabletOrMobile ? "small" : "medium"}
        color="primary"
        disabled={disabled}
      >
        View profile
      </Button>

      <Dialog onClose={handleToggle} open={open}>
        <DialogTitle>
          <div className={classes.titleWrapper}>
            <div className={classes.imgWrapper}>
              <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                Profile
              </Typography>
            </div>
            <CButton
              label="Close"
              variant="outlined"
              sx={{ padding: "1px 10px" }}
              onClick={handleToggle}
            />
          </div>
        </DialogTitle>

        <Divider sx={{ margin: "5px 0 15px 0" }} />
        <ProfileViewGlobal userData={getUser} />
        <Grid
          item
          container
          gap={2}
          justifyContent="flex-end"
          pr={2.5}
          pb={2.6}
        >
          <Button
            className={classes.btn}
            onClick={startRoom}
            variant="contained"
            size="medium"
            color="primary"
            sx={{ textTransform: "capitalize" }}
          >
            Message
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            size="medium"
            color="primary"
            onClick={openTaskModal}
            sx={{ textTransform: "capitalize" }}
          >
            Create task
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default ViewProfile;

const useStyles = makeStyles({
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 2,
    alignItems: "center",
  },
  ProfileAvatar: {
    width: "200px",
    height: "200px",
  },
  wrapper: {
    // border: "1px solid black",
    overflowX: "hidden",
    marginLeft: "20px",
    width: "100%",
    maxWidth: "450px",
  },
  imgWrapper: {
    display: "flex",
    flexDirection: "row",
    // maxWidth: 80,
    // maxHeight: 80,
  },
  img: {
    width: "100%",
  },
  close: {
    color: colors.primary,
    cursor: "pointer",
  },
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  btnWrapper: {
    // textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `25px 0px`,

    "@media (max-width:960px)": {
      flexDirection: "column",
      flexWrap: "wrap",
    },
    "@media (max-width:450px)": {
      overflow: "hidden",
    },
  },
  detailRow: {
    display: "flex",
    paddingTop: 5,
    gap: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
  },
  companyRow: {
    paddingTop: 40,
  },
  email: {
    color: colors.textPrimary,
  },
  centerBtn: {
    "@media (max-width:960px)": {
      marginTop: "20px",
    },
  },
});
