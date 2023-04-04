import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { CDateTime } from "components/CustomTags";
let mapItem = [1, 2, 3, 4];
const NotificationList = () => {
  return (
    <>
      <List
        sx={{
          // width: "100%",
          width: 442,
          bgcolor: "background.paper",
          position: "relative",
          maxHeight: "500px",
          minHeight: 250,
          height: "100%",
          overflow: "auto",
          // padding:'8px 0px',
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {mapItem.length > 0 ? (
          mapItem.map((item: any) => (
            <ListItem
              divider
              key={`item}-${item}`}
              secondaryAction={
                <CustomStack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <CDateTime>18.02.2023</CDateTime>
                  <CDateTime
                    sx={{
                      display: "flex",
                      fontSize: "10px",
                      alignItems: "flex-end",
                    }}
                  >
                    14:07
                  </CDateTime>
                </CustomStack>
              }
            >
              <ListItemAvatar>
                <Avatar
                  variant="circular"
                  alt={`Avatar n°$`}
                  src={`/static/images/avatar/$1.jpg`}
                />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <Typography>{`Name ${item}`}</Typography>
                      <Typography> send </Typography>
                    </div>
                  </>
                }
                secondary={
                  <>
                    {/* <div style={{ paddingTop: "10px" }}> */}
                    <Typography>Title</Typography>
                    <Typography> show title description</Typography>
                    {/* </div> */}
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItemText
            primary={
              <>
                <Typography>No data found!</Typography>
              </>
            }
          />
        )}
        {/* {[0, 1, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader
                sx={{ textAlign: "center" }}
              >{`Today ${sectionId}`}</ListSubheader>

            
            </ul>
          </li>
        ))} */}
      </List>
    </>
  );
};

export default NotificationList;
