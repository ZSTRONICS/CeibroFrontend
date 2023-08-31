import { Button, Typography, makeStyles } from "@material-ui/core";
import { Badge, Grid, Stack } from "@mui/material";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import colors from "../../assets/colors";
import { RootState } from "../../redux/reducers/appReducer";

interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { connections } = useSelector((state: RootState) => state?.user);

  // useEffect(() => {
  //   dispatch(getMyConnectionsCount());
  // }, []);

  const handleClick = () => {
    history.push("/connections");
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className={classes.connectionsContainer}
      >
        <Grid item>
          <Stack direction={"row"}>
            <div className={classes.iconContainer}>
              <ConnectionIcon />
            </div>
            <Typography variant="body1" className={classes.connectionText}>
              My Connections
              <Badge
                showZero={true}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "#F1B740 !important",
                  },
                }}
                badgeContent={connections.count}
                className={classes.badge}
              ></Badge>
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
  connectionsContainer: {
    border: `1px solid #E2E4E5`,
    background: colors.white,
    padding: "10px 15px",
    marginTop: 10,
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
