import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Badge,  Button, Grid, makeStyles, Typography } from "@material-ui/core";
import colors from "../../assets/colors";
import { RootState } from "../../redux/reducers";
import { getMyConnectionsCount } from "redux/action/user.action";
import assets from "assets/assets";
import { Stack } from "@mui/material";

interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { connections } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    dispatch(getMyConnectionsCount());
  }, []);

  const handleClick = () => {
    history.push("/connections");
  };

  return (
    <>
      <Grid container xs={12} justifyContent="space-between" className={classes.connectionsContainer}>
        <Grid item>
          <Stack direction={"row"}>
           <div className={classes.iconContainer}>
            <img src={assets.contactIcon} alt="" className={classes.icon} />
          </div>
          <Typography variant="body1" className={classes.connectionText}>
            My connections
           {connections&& <Badge
              color="primary"
              badgeContent={connections}
              className={classes.badge}
            ></Badge>}
          </Typography>
          </Stack>
        </Grid>
        <Grid item>
        <Button onClick={handleClick} color="primary" variant="outlined">
              View
            </Button>
        </Grid>

      </Grid>
    </>
  );
};

export default Connections;

const useStyles = makeStyles({
  connectionsContainer:{
    borderTop: `1px solid ${colors.lightGrey}`,
    background: colors.white,
    padding: "10px 15px",
    marginTop: 20,
  },
  iconContainer: {
    width: "34px",
    padding: "3px 5px 0px 4px",
  },
  icon: {
    width: "100%",
  },
  connectionText: {
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: 7,
    paddingTop: 4,
  },
  badge: {
    marginLeft: 20,
  },
});
