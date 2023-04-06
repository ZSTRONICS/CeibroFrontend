import {
  makeStyles,
  Typography,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import { Grid, Button } from "@mui/material";
import colors from "../../assets/colors";
import { INVITATIONS_LIST } from "../../constants/invitations.constants";
import NameAvatar from "../Utills/Others/NameAvatar";
import ViewProfile from "./ViewProfile";
import React, { useEffect, useState } from "react";

import {
  getMyConnections,
  resendInvites,
  revokeInvites,
} from "redux/action/user.action";

import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { UserInterface } from "constants/interfaces/user.interface";
import {
  createSingleRoom,
  setSelectedChat,
} from "../../redux/action/chat.action";

import {
  getPinnedMessages,
  getRoomMedia,
  getRoomMessages,
  getRoomQuestioniars,
} from "../../redux/action/chat.action";
import { useHistory } from "react-router-dom";
import taskActions from "redux/action/task.action";
import { toast } from "react-toastify";
interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const [connections, setConnection] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

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
  }, []);

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

  const startRoom = (id: string) => {
    const payload = {
      other: { _id: id },
      success: (res: any) => {
        history.push("chat");
        startChatRoom(res.data.newChat._id);
      },
    };
    dispatch(createSingleRoom(payload));
  };

  const handleResendInvite = (
    inviteId: string,
    isEmailInvite: boolean,
    email: string
  ) => {
    const payload = {
      body: { inviteId, isEmailInvite, email },
      success: (res: any) => {
        toast.success("Invite resent successfully");
      },
    };
    dispatch(resendInvites(payload));
    const payload2 = {
      success: (res: any) => {
        setConnection(res?.data?.myConnections);
      },
    };
    dispatch(getMyConnections(payload2));
  };

  const handleReInvokeInvite = (inviteId: string, isEmailInvite: boolean) => {
    const payload = { body: { inviteId, isEmailInvite } };
    dispatch(revokeInvites(payload));
    const payload2 = {
      success: (res: any) => {
        toast.success("Invite revoked successfully");
        setConnection(res?.data?.myConnections);
      },
    };
    dispatch(getMyConnections(payload2));
  };

  return (
    <Grid container className={classes.wrapper}>
      {loading && <CircularProgress size={20} className={classes.progress} />}
      {connections.length < 1 && (
        <Typography className={classes.notRecord}>
          No connection found
        </Typography>
      )}

      <Grid
        item
        xs={12}
        sx={
          {
            // height: "85vh",
            // overflow: "auto",
            // paddingBottom: "50px",
          }
        }
      >
        {connections?.map?.((connection: any) => {
          const inviteId = connection?._id;
          const email = connection?.email;
          if (!connection?.sentByMe && connection?.status === "pending") {
            return;
          }
          const user: UserInterface = connection?.sentByMe
            ? connection.to
            : connection.from;
          if (user === null) {
            return;
          }
          return (
            <Grid
              item
              xs={12}
              key={user._id}
              id={user._id}
              className={classes.chipWrapper}
            >
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  // xs={12} md={5} lg={7}
                  className={classes.userWrapper}
                >
                  {!connection.email && (
                    <>
                      <NameAvatar
                        firstName={user?.firstName}
                        surName={user?.surName}
                        url={user?.profilePic}
                      />
                      <div className={classes.nameWrapper}>
                        <Typography className={classes.name}>
                          {`${user?.firstName} ${user?.surName}`}
                        </Typography>
                        <Typography className={classes.subTitleText}>
                          {user?.companyName
                            ? user?.companyName
                            : "No company added"}
                        </Typography>
                      </div>
                    </>
                  )}
                  {connection.email && (
                    <>
                      <div className={classes.nameWrapper}>
                        <Typography className={classes.name}>
                          {connection.email}
                        </Typography>
                      </div>
                    </>
                  )}

                  {(connection.status === "pending" || connection.email) && (
                    <Chip
                      className={classes.chip}
                      variant="outlined"
                      label="Invited"
                      size="small"
                    ></Chip>
                  )}
                </Grid>
                <Grid
                  item
                  // xs={12} sm={12} md={8} lg={5}

                  className={classes.btnWrapper}
                >
                  {!connection.email && connection.status !== "pending" && (
                    <>
                      {" "}
                      <Button
                        className={classes.btn}
                        variant="contained"
                        // size="small"
                        size={isTabletOrMobile ? "small" : "medium"}
                        color="primary"
                        disabled={connection.email}
                        onClick={() =>
                          startRoom(
                            connection.sentByMe
                              ? connection.to._id
                              : connection.from._id
                          )
                        }
                      >
                        Message
                      </Button>
                      <Button
                        // sx={{
                        //   "@media(max-width:413px)": {
                        //     padding: "5px",
                        //   },
                        // }}
                        className={`${classes.btn} ${classes.centerBtn}`}
                        variant="contained"
                        onClick={openTaskModal}
                        size={isTabletOrMobile ? "small" : "medium"}
                        // size="small"
                        color="primary"
                        disabled={connection.email}
                      >
                        Create task
                      </Button>
                    </>
                  )}
                  {connection.status !== "accepted" && (
                    <>
                      <Button
                        className={`${classes.btn} ${classes.centerBtn}`}
                        variant="contained"
                        size={isTabletOrMobile ? "small" : "medium"}
                        // size="small"
                        style={{ background: colors.btnGreen, color: "white" }}
                        onClick={() =>
                          handleResendInvite(
                            inviteId,
                            connection.isEmailInvite,
                            email
                          )
                        }
                      >
                        Resend
                      </Button>
                      <Button
                        onClick={() =>
                          handleReInvokeInvite(
                            inviteId,
                            connection.isEmailInvite
                          )
                        }
                        className={`${classes.btn} ${classes.centerBtn}`}
                        variant="contained"
                        size={isTabletOrMobile ? "small" : "medium"}
                        // size="small"
                        style={{ background: colors.btnRed, color: "white" }}
                      >
                        Revoke
                      </Button>
                    </>
                  )}
                  {!connection.email && (
                    <ViewProfile
                      connectionId={connection._id}
                      disabled={connection.email ? true : false}
                      userId={user._id}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Connections;

const useStyles = makeStyles({
  wrapper: {
    // overflowY: "auto",
    // border: "1px solid",
    background: colors.white,
    padding: 20,
  },
  chipWrapper: {
    paddingTop: 10,
    paddingBottom: "10px",
    borderBottom: "1px solid #ECF0F1",
    "@media (max-width:600px)": {
      paddingTop: 10,
    },
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  subTitleText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  nameWrapper: {
    paddingLeft: 10,
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
    // justifyContent: "flex-end",
    gap: "15px",
    "@media (max-width:960px)": {
      // alignItems: "center",
    },
    "@media (max-width:600px)": {
      paddingTop: "10px",
    },
  },
  btn: {
    fontSize: 12,
    // padding:"4px 5px"
    // fontWeight: "bold",
    "@media (max-width:960px)": {
      marginTop: "10px",
    },
    "@media (max-width:363px)": {
      minWidth: "90px",
    },
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "100px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  notRecord: {
    color: "#909090",
    textAlign: "center",
    position: "absolute",
    zIndex: 999,
    left: 0,
    right: 0,
    top: 200,
  },
  chip: {
    color: colors.white,
    borderColor: colors.darkYellow,
    background: colors.darkYellow,
    fontSize: 12,
    fontWeight: 500,
    marginLeft: 10,
  },
  centerBtn: {
    "@media (max-width:600px)": {
      // marginTop: "10px",
    },
  },
});
