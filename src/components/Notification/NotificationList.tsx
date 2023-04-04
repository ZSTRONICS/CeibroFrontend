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

const NotificationList = () => {
  return (
    <>
      <List
        sx={{
          // width: "100%",
          width: 442,
          border: "1px solid",
          bgcolor: "background.paper",
          position: "relative",
          maxHeight: "500px",
          height: "100%",
          overflow: "auto",
          // padding:'8px 0px',
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader
                sx={{ textAlign: "center" }}
              >{`Today ${sectionId}`}</ListSubheader>

              {[0, 1].map((item) => (
                <ListItem
                  divider
                  key={`item-${sectionId}-${item}`}
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
                    variant="square"
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
              ))}
            </ul>
          </li>
        ))}
      </List>
    </>
  );
};

export default NotificationList;
