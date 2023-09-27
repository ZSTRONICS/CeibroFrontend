import { Badge, Button, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colors from "../../assets/colors";
import { RootState } from "../../redux/reducers/appReducer";

const Connections = () => {
  const classes = useStyles();
  const { userAllContacts } = useSelector((state: RootState) => state.user);

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
                badgeContent={userAllContacts.length || 0}
                className={classes.badge}
              ></Badge>
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Link to="/connections">
            <Button
              color="primary"
              variant="outlined"
              sx={{ fontWeight: "500", fontSize: "14px" }}
            >
              View
            </Button>
          </Link>
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
