
import { Badge, Grid, makeStyles, Typography } from "@material-ui/core";
import assets from "assets/assets";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInvitesCount } from "redux/action/user.action";
import colors from "../../assets/colors";
import { RootState } from "../../redux/reducers/appReducer";
import InputInvite from "./InputInvite";
import ViewInvitations from "./ViewInvitations";
interface InvitationsProps {}

const Invitations: React.FunctionComponent<InvitationsProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { invites } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    dispatch(getMyInvitesCount());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.inviteWrapper}>
        <InputInvite onError={(err: string) => setError(err)} />
        {error && (
          <Typography style={{ paddingTop: 10 }} className={"error-text"}>
            {error}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} className={classes.viewInvitation}>
        <Typography className={classes.inivite}>
        <div className={classes.smartMenuIcon}>
            <img src={assets.InvitaionIcon} className={classes.connectionIcon} alt="Invitaion"/>
              </div>
              <Typography variant='body1' className={classes.invitationText}>
                Invitations
              </Typography>
           
        <Badge showZero={true} badgeContent={invites.count} className={classes.badge}></Badge>
        </Typography>
        <ViewInvitations />
      </Grid>
    </Grid>
  );
};

export default Invitations;

const useStyles = makeStyles({
  smartMenuIcon:{
    width:'34px',
    padding: '3px 5px 0px 4px'
  },
  connectionIcon:{
    width: '100%'
  },
  inviteWrapper: {
    background: colors.white,
    padding: "20px 15px",
    borderRadius: 5,
  },
  viewInvitation: {
    borderTop: `1px solid ${colors.lightGrey}`,
    background: colors.white,
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inivite: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
    padding: '0 2px'
  },
  invitationText:{
    paddingLeft: '5px'
  },
  badge: {
    marginLeft: 20,
    color: colors.white,
  },
});
