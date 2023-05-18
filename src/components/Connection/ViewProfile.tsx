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

import colors from "../../assets/colors";
import { createSingleRoom } from "../../redux/action/chat.action";
import {
  getPinnedMessages,
  getRoomMedia,
  getRoomMessages,
  getRoomQuestioniars,
  setSelectedChat,
} from "../../redux/action/chat.action";

import taskActions from "../../redux/action/task.action";
import { useMediaQuery } from "react-responsive";
import { UserCeibroData } from "constants/interfaces/user.interface";
import UserProfileView from "components/Profile/UserProfileView";
import { CustomStack } from "components/CustomTags";
import { TopBarTitle } from "components/CustomTags";
import assets from "assets/assets";

interface IViewProfileProps {
  userId: string;
  disabled: boolean;
  connectionId: string;
  userData?: UserCeibroData | undefined | null;
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = (props) => {
  const { userId, disabled, connectionId, userData } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [getUser, setGetUser] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  // const getUserData = () => {
  //   const payload = {
  //     success: (val: any) => {
  //       setGetUser(val.data);
  //       handleToggle();
  //     },
  //     other: {
  //       userId,
  //     },
  //   };
  //   dispatch(getUserById(payload));
  // };

  const handleToggle = () => {
    setOpen((prev: boolean) => !prev);
    // console.log("userData", userData);
  };

  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

  const startChatRoom = (roomId: string) => {
    dispatch(
      getRoomMessages({
        other: {
          roomId: roomId,
          limit: 20,
        },
        success: () => {},
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
        history.push("chat");
        startChatRoom(res.data.newChat._id);
      },
    };
    dispatch(createSingleRoom(payload));
  };

  return (
    <>
      <Button
        sx={{
          padding: "4px 10px",
          textTransform: "capitalize",
          border: "1px solid #0076C8",
          // "@media(max-width:960px)": {
          //   marginTop: "10px",
          // },
          // "@media(max-width:413px)": {
          //   padding: "5px",
          // },
        }}
        onClick={handleToggle}
        className={`${classes.btn} ${classes.centerBtn}`}
        variant="outlined"
        size={isTabletOrMobile ? "small" : "medium"}
        color="primary"
        disabled={disabled}
      >
        View profile
      </Button>

      <Dialog
        onClose={handleToggle}
        open={open}
        sx={{
          "& .MuiPaper-root": { margin: { xs: 0.3, md: 2.5 } },
        }}
      >
        <CustomStack
          sx={{ margin: "14.2px 4px 2px 20px" }}
          justifyContent="space-between"
        >
          <TopBarTitle sx={{ fontSize: { xs: 16, md: 24 } }}>
            User profile
          </TopBarTitle>
          <CButton
            label={<assets.CloseIcon />}
            ado
            variant="text"
            sx={{ padding: "1px 10px" }}
            onClick={handleToggle}
          />
        </CustomStack>

        <Divider sx={{ margin: "5px 0 15px 0" }} />
        <UserProfileView userData={getUser} />
        <Grid
          item
          container
          gap={2}
          justifyContent="flex-start"
          alignItems="center"
          px={2}
          sx={{ mb: "20%" }}
        >
          <Button
            className={classes.btn}
            variant="contained"
            size="medium"
            color="primary"
            onClick={openTaskModal}
            sx={{ textTransform: "capitalize", width: "80%" }}
          >
            Create task
          </Button>
          <assets.MoreVertOutlinedIcon />
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
