import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { acceptAllInvites } from "redux/action/user.action";
import colors from "../../assets/colors";
import NameAvatar from "../Utills/Others/NameAvatar";
import InvitationsList from "./InvitationsList";
import { useDispatch } from "react-redux";

interface IViewInvitationsProps {}

const ViewInvitations: React.FunctionComponent<IViewInvitationsProps> = (
  props
) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  //   React.useEffect(() => {
  //     const payload = {
  //       success: (val: any) => {
  //         setAcceptAll(val);
  //       },
  //     };
  //     dispatch(acceptAllInvites(payload));
  //   }, []);

  //   const getMyInvites = () => {
  //     const payload = {
  //       success: (res: any) => {
  //         // console.log("all invites", res?.data[0]?.from);
  //         setmyAllInvites(res?.data);
  //       },
  //     };
  //     dispatch(getMyAllInvites(payload));
  //   };

  const acceptAllHandler = (accepted: boolean) => {
    console.log("id", accepted);
    const payload = {
      success: (val: any) => {
        //  @ts-ignore
        ref?.current?.getMyInvites(); //accessing invitationList component
      },
      other: {
        accepted,
      },
    };
    dispatch(acceptAllInvites(payload));
  };

  return (
    <>
      <Button color="primary" onClick={handleToggle} variant="outlined">
        View
      </Button>
      <Dialog onClose={handleToggle} open={open}>
        <DialogTitle>
          <div className={classes.titleWrapper}>
            <Button
              className={classes.acceptBtn}
              color="primary"
              variant="text"
              onClick={() => acceptAllHandler(true)}
            >
              Accept all
            </Button>
            <Button
              className={classes.declineBtn}
              variant="text"
              onClick={() => acceptAllHandler(false)}
            >
              Decline all
            </Button>
          </div>
        </DialogTitle>
        <InvitationsList ref={ref} />
      </Dialog>
    </>
  );
};

export default ViewInvitations;

const useStyles = makeStyles({
  titleWrapper: {
    width: 400,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${colors.mediumGrey}`,
    paddingBottom: 10,
  },
  acceptBtn: {
    fontSize: 14,
    fontWeight: 500,
  },
  declineBtn: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.btnRed,
  },
});
