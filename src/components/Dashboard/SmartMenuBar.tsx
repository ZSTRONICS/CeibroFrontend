import React from "react";
import { Badge, Button, Grid, makeStyles } from "@material-ui/core";
import colors from "../../assets/colors";
import InputInvite from "../Profile/InputInvite";
import { useHistory } from "react-router";
import assets from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/appReducer";
import {
  openViewInvitations,
} from "redux/action/user.action";
import ViewInvitations from "components/Profile/ViewInvitations";
import Box from "@mui/material/Box";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";

const SmartMenuBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { connections } = useSelector((state: RootState) => state?.user);
  const { invites } = useSelector((state: RootState) => state?.user);


  const goToConnections = () => {
    history.push("/connections");
  };

  return (
    <Grid container >
      <Grid item xs={12} md={5} lg={4}>
        <div className={`${classes.connectionWrapper} ongoing-badge`}>
          <Box className={classes.connectionTitle}>
            <div className={classes.smartMenuIcon}>
            <ConnectionIcon />
            </div>
            <span className="align-center">
              <span
                className={`${classes.marginLeft} ${classes.myConnections}`}
              >
                My Connections
              </span>
              <Badge overlap='circular' showZero={true} badgeContent={connections.count} color="primary"></Badge>
            </span>
          </Box>

          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={goToConnections}
            className={classes.viewBtn}
          >
            View
          </Button>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        lg={3}
        className={classes.invitationOuterWrapper}
      >
        <div className={`${classes.connectionWrapper} ongoing-badge`}>
          <Box className={classes.connectionTitle}>
            <div className={classes.smartMenuIcon}>
              <img
                alt="InvitaionIcon"
                src={assets.InvitaionIcon}
                className={classes.connectionIcon}
              />
            </div>
            <span className="align-center">
              <span
                className={`${classes.marginLeft} ${classes.myConnections}`}
              >
                Invitations
              </span>
            <Badge showZero={true} badgeContent={invites.count} color="error"></Badge>
            </span>
          </Box>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            className={classes.viewBtn}
            onClick={() => dispatch(openViewInvitations())}
          >
            View
          </Button>
          <ViewInvitations hideBtn={true} />
        </div>
      </Grid>

      <Grid item xs={12} md={3} lg={5}>
        <div className={classes.searchWrapper}>
          <InputInvite />
        </div>
      </Grid>
    </Grid>
  );
};

export default SmartMenuBar;

const useStyles = makeStyles({
  smartMenuIcon: {
    width: "34px",
    padding: "3px 5px 0px 4px",
  },
  connectionWrapper: {
    background: colors.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 15px",
    height: 60,
    "@media (max-width:960px)": {
      justifyContent: "space-between",
      padding: "10px 10px",
    },
  },
  marginLeft: {
    paddingRight: 20,
  },
  myConnections: {
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: "8px",
  },
  connectionTitle: {
    fontSize: 14,
    color: colors.black,
    display: "flex",
    alignItems: "center",
  },
  connectionIcon: {
    width: "100%",
  },
  inviteIcon: {
    fontSize: 18,
    color: colors.primary,
    paddingRight: 10,
  },
  invitationOuterWrapper: {
    paddingLeft: 10,
    "@media (max-width:960px)": {
      padding: 0,
    },
  },
  searchInput: {
    height: 10,
    width: "100%",
  },
  searchWrapper: {
    padding: "0px 15px",
    height: 60,
    background: colors.white,
    display: "flex",
    alignItems: "center",
  },
  viewBtn: {
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    borderWidth: "1.5px",
  },
});
