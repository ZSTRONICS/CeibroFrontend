import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptAllInvites,
  closeViewIvitations,
} from "redux/action/user.action";
import { RootState } from "redux/reducers/appReducer";
import colors from "../../assets/colors";
import InvitationsList from "./InvitationsList";

interface IViewInvitationsProps {
  hideBtn?: boolean;
}

const ViewInvitations: React.FunctionComponent<IViewInvitationsProps> = (
  props
) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const classes = useStyles();
  const { openInvites } = useSelector((state: RootState) => state.user);
  const { hideBtn } = props;

  const handleOpen = () => {};

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
  //         setmyAllInvites(res?.data);
  //       },
  //     };
  //     dispatch(getMyAllInvites(payload));
  //   };

  const acceptAllHandler = (accepted: boolean) => {
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

  const handleClose = () => {
    dispatch(closeViewIvitations());
  };

  return (
    <>
      {!hideBtn && (
        <Button color="primary" onClick={handleOpen} variant="outlined">
          View
        </Button>
      )}
      <Dialog onClose={handleClose} open={openInvites}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
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
