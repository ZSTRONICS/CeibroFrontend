import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { CustomStack, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { getFileIconThumbnail } from "components/Utills/FileBox";
import React from "react";

function FilesContentList() {
  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      {[1, 2, 3, 4].map((item) => (
        <>
          <ListItem
            alignItems="flex-start"
            sx={{
              borderBottom: "1px solid #E2E4E5",
              "& .MuiListItemSecondaryAction-root": {
                right: "0",
              },
            }}
            secondaryAction={
              <CustomStack>
                <LabelTag>Today at 12:23:34 PM</LabelTag>
                <GenericMenu
                  isProjectGroup={true}
                  options={[
                    {
                      menuName: "Go to file location",
                      callBackHandler: () => {},
                    },
                    {
                      menuName: "Share",
                      callBackHandler: () => {},
                    },
                    {
                      menuName: "Download",
                      callBackHandler: () => {},
                    },
                  ]}
                  key={1}
                  paddingTop={0}
                  disableMenu={false}
                />
              </CustomStack>
            }
            disablePadding
          >
            <ListItemAvatar>
              {/* fileType */}
              {getFileIconThumbnail(".pdf", 35, 40)}
              {/* <Avatar
                variant="rounded"
                alt="RS"
                src="/static/images/avatar/1.jpg"
              /> */}
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
                    uploaded by
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default FilesContentList;
