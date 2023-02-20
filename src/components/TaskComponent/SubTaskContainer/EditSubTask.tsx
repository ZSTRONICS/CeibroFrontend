import {
  Button,
  Typography,
  Icon,
  Box,
  IconButton,
  ListItem,
  Hidden,
  ListItemAvatar,
  List,
  ListItemText,
  Avatar,
  ListSubheader,
  TextField,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import assets from "assets/assets";
import MemberList from "./MemberList";
import CButton from "components/Button/Button";
import { CustomStack } from "../Tabs/TaskCard";
import { ListUserName } from "components/CustomTags";
import { CBox } from "components/material-ui";
import { getColorByStatus } from "config/project.config";
import { styled } from "@mui/system";

// import colors from "assets/colors";

function EditSubTask() {
  return (
    <>
      <ListSubheader
        inset
        component="div"
        sx={{
          position: "relative",
          "&.MuiListSubheader-root": { padding: "2px 11px 14px 2px" },
        }}
      >
        <CustomStack sx={{ padding: "0 15px" }} gap={2}>
          <TextField
            size="small"
            name="title"
            fullWidth
            id="outlined-basic"
            label="Member"
            placeholder="Select members"
            variant="outlined"
            // onChange={(e) => {
            // }}
          />
          <CButton label="Add" variant="contained" />
        </CustomStack>
      </ListSubheader>
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          maxHeight: "600px",
          overflow: "auto",
          height: "100%",
        }}
      >
        {[1, 2, 3, 4, 5].map((item: any) => (
          <ListItem key={item}
            secondaryAction={
              <CButton
                label={"Delete"}
                variant="outlined"
                styles={{
                  borderColor: "#FA0808",
                  fontSize: 12,
                  fontWeight: "bold",
                  borderWidth: 2,
                  color: "#FA0808",
                }}
              />
            }
          >
            <ListItemAvatar>
              <Avatar variant="rounded" src="" />
            </ListItemAvatar>
            <ListItemText
              secondaryTypographyProps={{
                maxWidth: "80px",
                width: "100%",
                borderRadius: "3px",
              }}
              //   primaryTypographyProps={{}}
              primary={
                <>
                  {/* <label style={{}}>added by</label> */}
                  <ListUserName
                  // sx={{borderTop:'1px solid'}}
                  >
                    Ilja Nikolajev
                  </ListUserName>
                </>
              }
              secondary={
                <>
                  <SubtaskState
                    sx={{
                      background: `${getColorByStatus("assigned")}`,
                    }}
                  >
                    assigned
                  </SubtaskState>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default EditSubTask;

const SubtaskState = styled(Box)`
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  color: white;
  padding: 3px 7px;
  border-radius: 3px;
  text-transform: capitalize;
  text-align: center;
`;
// max-width: 300px;
// width: 100%;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;
