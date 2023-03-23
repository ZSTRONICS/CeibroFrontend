import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";

// mui
import {
  Button, CircularProgress, Grid,
  List,
  ListItem,
  makeStyles, Typography
} from "@material-ui/core";

// redux
import { useDispatch } from "react-redux";
import { acceptInvite, getMyAllInvites } from "redux/action/user.action";
import colors from "../../assets/colors";
import { InvitationInterface } from "../../constants/interfaces/invitation.interface";
// components
import NameAvatar from "../Utills/Others/NameAvatar";

interface IInvitationsListProps {
  ref?: any;
}

const InvitationsList: React.FunctionComponent<IInvitationsListProps> =
  forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [myAllInvites, setmyAllInvites] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const isDiabled = !loading ? false : true;
    useEffect(() => {
      getMyInvites();
    }, []);
    useImperativeHandle(ref, () => ({ getMyInvites }), []);
    const getMyInvites = () => {
      const payload = {
        success: (res: any) => {
          setmyAllInvites(res?.data?.invites.count);
        },
        finallyAction: () => {
          setLoading(false);
        },
      };
      setLoading(true);
      dispatch(getMyAllInvites(payload));
    };

    const acceptHandler = (accepted: boolean, inviteId: any) => {
      const payload = {
        success: () => {
          getMyInvites();
        },
        other: {
          accepted,
          inviteId,
        },
      };
      dispatch(acceptInvite(payload));
    };

    return (
      <List style={{ minHeight: 300 }}>
        {loading && <CircularProgress size={20} className={classes.progress} />}
        {myAllInvites?.length < 1 && (
          <Typography className={classes.notRecord}>
            No Invitation Found
          </Typography>
        )}
        {myAllInvites?.map?.((invitation: InvitationInterface) => {
          return (
            <ListItem>
              <Grid container className={classes.wrapper}>
                <Grid item xs={2}>
                  <NameAvatar
                    firstName={invitation?.from?.firstName}
                    surName={invitation?.from?.surName}
                    url={invitation?.from?.profilePic}
                  />
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <Typography className={classes.titleText}>
                      {`${invitation?.from?.firstName} ${invitation?.from?.surName}`}
                    </Typography>
                    <Typography className={classes.subTitleText}>
                      Company
                    </Typography>
                  </div>
                  <div className={classes.actionWrapper}>
                    <Button
                      className={classes.actionBtn}
                      color="primary"
                      variant="contained"
                      disabled={isDiabled}
                      onClick={() => acceptHandler(true, invitation?._id)}
                    >
                      Accept
                      {/* <Typography className={classes.btnText}>
                        Accept
                      </Typography>
                      {isDiabled && loading && (
                        <CircularProgress
                          size={20}
                          className={classes.progress}
                        />
                      )} */}
                    </Button>
                    <Button
                      className={classes.actionBtn}
                      variant="contained"
                      onClick={() => acceptHandler(false, invitation?._id)}
                    >
                      Decline
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.time}>
                    {invitation?.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    );
  });

export default InvitationsList;

const useStyles = makeStyles({
  wrapper: {
    borderBottom: `1px solid ${colors.grey}`,
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
    fontWeight: 500,
    color: colors.textGrey,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "50px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  notRecord: {
    color: "#909090",
    textAlign: "center",
    marginTop: "50px",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
