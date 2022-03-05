import {
  Button,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import colors from "../../assets/colors";
import { INVITATIONS_LIST } from "../../constants/invitations.constants";
import NameAvatar from "../Utills/Others/NameAvatar";
import ViewProfile from "./ViewProfile";
import React, { useEffect, useState } from "react";
import taskActions from "../../redux/action/project.action";
import { getMyConnections } from "redux/action/user.action";

import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { UserInterface } from "constants/interfaces/user.interface";
interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const [connections, setConnection] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  const openTaskDrawer = () => {
    dispatch(taskActions.openDrawer());
  };

  useEffect(() => {
    const payload = {
      success: (res: any) => {
        // console.log("all conn", res);
        setConnection(res?.data);
      },
      finallyAction: () => {
        setLoading(false);
      },
    };
    setLoading(true);
    dispatch(getMyConnections(payload));
  }, []);

  console.log("connectiongh", connections);

  return (
    <Grid container className={classes.wrapper} style={{ minHeight: 100 }}>
      {loading && <CircularProgress size={20} className={classes.progress} />}
      {connections.length < 1 && (
        <Typography className={classes.notRecord}>
          Connection not found
        </Typography>
      )}

      {connections?.map?.((connection: any) => {
        const user: UserInterface = connection?.sentByMe
          ? connection.to
          : connection.from;
        return (
          <Grid item xs={12} className={classes.chipWrapper}>
            <Grid container>
              <Grid item xs={12} md={4} lg={7} className={classes.userWrapper}>
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
                    {user?.companyName}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={8} lg={5} className={classes.btnWrapper}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  size={isTabletOrMobile ? "small" : "medium"}
                  color="primary"
                >
                  Start conversation
                </Button>
                <Button
                  className={`${classes.btn} ${classes.centerBtn}`}
                  variant="contained"
                  onClick={openTaskDrawer}
                  size={isTabletOrMobile ? "small" : "medium"}
                  color="primary"
                >
                  Create task
                </Button>
                <ViewProfile userId={user?.id} />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Connections;

const useStyles = makeStyles({
  wrapper: {
    background: colors.white,
    padding: 20,
  },
  chipWrapper: {
    paddingTop: 10,
    ["@media (max-width:600px)"]: {
      paddingTop: 20,
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
    justifyContent: "space-evenly",
    ["@media (max-width:960px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    ["@media (max-width:960px)"]: {
      width: "100%",
      marginTop: 10,
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
    top: 100,
  },
  centerBtn: {
    ["@media (max-width:960px)"]: {
      marginTop: 10,
    },
  },
});
