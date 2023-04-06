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
      sx={{ width: "100%", bgcolor: "background.paper" }}
      subheader={
        <ListSubheader
          component="div"
          sx={{
            position: "relative",
            "&.MuiListSubheader-root": { p: 0 },
            lineHeight: "30px",
            fontFamily: "inter",
            fontSize: "12px",
            fontWeight: 500,
            color: "#605C5C",
            // paddingRight: "20px",
          }}
        >
          {props.subheaderTitle}
        </ListSubheader>
      }
    >
      {props.groupMembers?.map((member: any) => {
        const labelId = `checkbox-list-secondary-label-${member._id}`;
        return (
          <ListItem
            // sx={{ paddingLeft: "15px" }}
            // sx={{ right: "12px" }}
            sx={
              {
                // "& .css-1vegh7w-MuiButtonBase-root-MuiCheckbox-root": {
                //   padding: "0px",
                // },
              }
            }
            disablePadding
            aria-disabled
            key={member._id}
            secondaryAction={
              <Checkbox
                sx={{
                  padding: "0",
                  marginRight: "0px",
                  "&.MuiCheckbox-root": {
                    color: "#ADB5BD",
                  },

                  "&.Mui-checked": {
                    color: "#1976d2",
                  },
                }}
                disableRipple
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
              <ListItemAvatar sx={{ width: "30px", height: "30px" }}>
                <NameAvatar
                  firstName={member.firstName}
                  surName={member.surName}
                  url={member.profilePic}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  "& .css-et1ao3-MuiTypography-root": {
                    fontFamily: "inter",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#000000",
                  },
                }}
                id={labelId}
                primary={`${member.firstName} ${member.surName}`}
                secondary={`Company. ${
                  member?.companyName ? member?.companyName : "N/A"
                }`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
