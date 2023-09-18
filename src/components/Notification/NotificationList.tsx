import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import {
  CDateTime,
  CustomStack,
  ProjectAdminRoleTag,
} from "components/CustomTags";
import EmptyScreenDescription from "components/Tasks/EmptyScreenDescription";
import React from "react";
// let mapItem: any[] = [1,3,4,5,6,7,8,9];
var aDay = 24 * 60 * 60 * 1000;
const mapItem: any[] = [
  // { id: '1', text: 'Item 1', timestamp: new Date(Date.now()-aDay*2) },
  // { id: '3', text: 'Item 3', timestamp: new Date(Date.now()-aDay*1) },
  // { id: '6', text: 'Item 6', timestamp: (new Date(Date.now()-aDay*23))},
  // { id: '2', text: 'Item 2', timestamp: 1649144582000 },
];

const NotificationList = () => {
  function timeSince(date: any) {
    let newDate: any = new Date();
    var seconds = Math.floor((newDate - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  const groupByDate = (items: any[]): { [date: string]: any[] } => {
    const groups: { [date: string]: any[] } = {};

    items.forEach((item) => {
      const date = timeSince(item.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  const groups = groupByDate(mapItem);
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 442,
          minWidth: 400,
          bgcolor: "background.paper",
          position: "relative",
          minHeight: 200,
          maxHeight: "calc(100vh - 120px)",
          overflow: "auto",
          // padding:'8px 0px',
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader disableGutters>
          <Box sx={{ pl: 2.3, py: 2 }}>
            <ProjectAdminRoleTag sx={{ fontSize: 20 }}>
              Notifications
            </ProjectAdminRoleTag>
          </Box>
          <Divider />
        </ListSubheader>
        {mapItem.length > 0 ? (
          Object.keys(groups).map((date) => (
            <>
              <li>
                <ul>
                  <ListSubheader
                    disableGutters
                    disableSticky={true}
                    sx={{ textAlign: "center", lineHeight: "20px", pt: 0.5 }}
                  >
                    {date}
                  </ListSubheader>
                  {groups[date].map((item) => (
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
                      <ListItemAvatar
                        sx={{
                          width: 50,
                          height: 60,
                          minWidth: 40,
                          "& .MuiAvatar-root": {
                            width: 40,
                            height: 40,
                          },
                        }}
                      >
                        <Avatar variant="circular">AK</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {
                              " — I'll be in your neighborhood doing errands this jis as;"
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            </>
          ))
        ) : (
          <ListItemText
            sx={{ pt: 3, textAlign: "center" }}
            primary={
              <>
                <div style={{ height: "50vh" }}>
                  <EmptyScreenDescription
                    showWaterMark={true}
                    content={[
                      {
                        heading: "",
                        description:
                          "You have no new notifications from the \nlast 30 days.",
                      },
                    ]}
                  />
                </div>
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
