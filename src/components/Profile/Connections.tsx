import { Badge, Button, MenuItem } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import ConnectionIcon from "components/material-ui/icons/connections/ConnectionIcon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducers/appReducer";

const Connections = () => {
  const { userAllContacts } = useSelector((state: RootState) => state.user);
  return (
    <>
      <CustomStack
        gap={2}
        sx={{
          justifyContent: "space-between",
          flexWrap: "no-wrap",
          border: "1px solid #E2E4E5 !important",
          padding: "6px 14px",
          marginTop: 1.2,
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            cursor: "unset",
            "&.MuiMenuItem-root": {
              padding: "4px 0",
              gap: "10px",
            },
            "&.MuiMenuItem-root:hover": {
              backgroundColor: "unset",
            },
          }}
        >
          <ConnectionIcon />
          My Connections
          <Badge
            sx={{
              color: "#F1B740",
              padding: "0px  14px",
            }}
            color="primary"
            badgeContent={userAllContacts.length}
            overlap="circular"
          />
        </MenuItem>
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
