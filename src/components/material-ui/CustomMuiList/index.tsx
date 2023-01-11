import React from "react";
// mui
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@mui/material";
import NameAvatar from "components/Utills/Others/NameAvatar";

export const CustomMuiList = (props: any) => {
  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
        <ListSubheader
          component="div"
          sx={{ position: "relative", "&.MuiListSubheader-root": { p: 0 } }}
        >
          {props.subheaderTitle}
        </ListSubheader>
      }
    >
      {props.groupMembers?.map((member: any) => {
        const labelId = `checkbox-list-secondary-label-${member._id}`;
        return (
          <ListItem
            disablePadding
            aria-disabled
            key={member._id}
            secondaryAction={
              <Checkbox
                sx={{
                  "&.MuiCheckbox-root": {
                    color: "#ADB5BD",
                  },
                  "&.Mui-checked": {
                    color: "#1976d2",
                  },
                }}
                disableRipple
                edge="end"
                value={member._id}
                onChange={props.handleUserChange}
                checked={props.checkboxChecked.some(
                  (id: any) => id === member._id
                )}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
          >
            <ListItemButton
              sx={{ p: 0, pb: 0.5 }}
              disableRipple
              onClick={() => props.handleUserId(member._id)}
            >
              <ListItemAvatar>
                <NameAvatar
                  firstName={member.firstName}
                  surName={member.surName}
                  url={member.profilePic}
                />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${member.firstName} ${member.surName}`}
                secondary={`${
                  member?.companyName ? "Company ." + member?.companyName : ""
                }`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
