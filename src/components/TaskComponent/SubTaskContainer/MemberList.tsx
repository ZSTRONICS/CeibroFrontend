import { Box, ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import assets from "assets/assets";
import { TaskStatus } from "../Tabs/TaskCard";

function MemberList({ id }: any) {
  return (
    <div>
      <Box width="100%">
        <ListItem key={1}>
          <ListItemAvatar>
            {/* <Avatar alt="avatar" variant="square" src={assets.AddIcon} /> */}
          </ListItemAvatar>
          <ListItemText
            id={id}
            primary={<Typography>line Item1</Typography>}
            secondary={
              <TaskStatus
                sx={{
                  background: "#1976d2",
                  width: "55px",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "10px",
                }}
              >
                Assigned
              </TaskStatus>
            }
          />

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Stack>
        </ListItem>
      </Box>
    </div>
  );
}

export default MemberList;
