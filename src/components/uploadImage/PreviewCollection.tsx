import * as React from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

import ListSubheader from "@mui/material/ListSubheader";
import { Box } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function PreviewCollection() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: "25px",
          bottom: "7px",
          maxWidth: "345px",
          width: "100%",
        }}
      >
        <List
        disablePadding
          component="nav"
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          
          <ListSubheader disableGutters>
          <Box
            sx={{
              bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                pb: open ? 0 : 2.5,
                "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Build"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                }}
                secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
          </Box>
          </ListSubheader>
          {open && <> {[0, 1, 2, 3, 4, 5].map((item) => (
            <ListItem key={`item--${item+0.88}`}>
              <ListItemText primary={`Item ${item}`} />
            </ListItem>
          ))}
          </>}
         
        </List>
      </Box>
    </>
  );
}

export default PreviewCollection;
