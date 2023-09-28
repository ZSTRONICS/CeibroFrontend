import { Badge, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CustomStack } from "components/CustomTags";
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
      <CustomStack
        className={classes.connectionsContainer}
        gap={2}
        sx={{ justifyContent: "space-between", flexWrap: "no-wrap" }}
      >
        <div>
          <ConnectionIcon />
          <div className={classes.connectionText}>
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
            />
          </div>
        </div>

        <Link to="/connections">
          <Button
            color="primary"
            variant="outlined"
            sx={{ fontWeight: "500", fontSize: "14px" }}
          >
            View
          </Button>
        </Link>
      </CustomStack>
    </>
  );
};

export default Connections;

const useStyles = makeStyles({
  connectionsContainer: {
    border: `1px solid #E2E4E5`,
    background: colors.white,
    padding: "10px 14px",
    marginTop: 10,
  },
  iconContainer: {
    width: "34px",
    padding: "4px 5px 0px 4px",
  },
  icon: {
    width: "100%",
  },
  connectionText: {
    fontSize: 15,
    display: "inline-block",
    fontWeight: 500,
    paddingLeft: "16px",
    paddingTop: 4,
  },
  badge: {
    marginLeft: "20px",
  },
});
